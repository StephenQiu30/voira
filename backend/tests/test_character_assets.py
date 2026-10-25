"""角色制作任务准备与本机HTTP边界的行为验证。"""

import json

import pytest
from fastapi.testclient import TestClient
from pydantic import ValidationError

from app.main import app
from app.schemas import character_assets as schemas
from app.services import character_assets as service


@pytest.fixture
def client() -> TestClient:
    return TestClient(app, base_url="http://127.0.0.1")


def request_body(
    skill_id: schemas.SkillId = "character-turnaround",
) -> dict[str, object]:
    return {
        "skill_id": skill_id,
        "medium": "anime",
        "character": service.deepseek_profile().model_dump(mode="json"),
        "references": [{"asset_id": "deepseek-reference", "role": "identity"}],
    }


@pytest.mark.parametrize("skill_id", ["character-turnaround", "character-card"])
def test_prepared_task_is_reproducible_and_not_generated(
    client: TestClient,
    skill_id: schemas.SkillId,
) -> None:
    request = request_body(skill_id)
    first = client.post("/api/agents/character-assets/prepare", json=request)
    second = client.post("/api/agents/character-assets/prepare", json=request)
    assert first.status_code == 200
    assert first.json() == second.json()
    task = schemas.PreparedTask.model_validate(first.json())
    assert task.status == "prepared"
    assert task.skill.skill_id == skill_id
    assert len(task.skill.version) == 64
    assert task.request.references[0].asset_id == "deepseek-reference"
    assert task.output.transparent_background is False
    assert set(first.json()) == {
        "status",
        "skill",
        "request",
        "pose",
        "instructions",
        "prompt",
        "output",
        "checks",
    }
    with pytest.raises(ValidationError):
        task.request.character.display_name = "改变身份"


def test_custom_photorealistic_character_has_no_deepseek_defaults(
    client: TestClient,
) -> None:
    body = request_body("character-card")
    body["medium"] = "photorealistic"
    body["character"] = {
        "character_id": "kimi",
        "display_name": "Kimi",
        "persona": "沉静好奇",
        "appearance": "成年黑发男性",
        "costume": "灰色长外套",
        "invariants": ["短发与灰色外套"],
        "expressions": ["专注", "惊讶"],
        "actions": ["抬手示意"],
    }
    result = client.post("/api/agents/character-assets/prepare", json=body)
    assert result.status_code == 200
    task = schemas.PreparedTask.model_validate(result.json())
    assert task.request.character.props == ()
    assert task.request.character.exclusions == ()
    assert "蓝色大肥鱼" not in task.prompt
    assert "灰色长外套" in task.prompt
    assert task.request.medium == "photorealistic"


@pytest.mark.parametrize(
    "field,value",
    [
        ("skill_id", "../../private"),
        ("medium", "unspecified"),
        ("references", []),
        ("references", [{"asset_id": "/etc/passwd", "role": "identity"}]),
        (
            "references",
            [{"asset_id": "https://example.com", "role": "identity"}],
        ),
        ("references", [{"asset_id": "reference", "role": "pose"}]),
        ("references", [{"asset_id": "same", "role": "identity"}] * 2),
        (
            "references",
            [
                {"asset_id": "reference", "role": "identity"},
                {"asset_id": "chair", "role": "prop"},
            ],
        ),
        ("transparent_background", True),
    ],
)
def test_invalid_tasks_are_rejected(
    client: TestClient,
    field: str,
    value: object,
) -> None:
    body = request_body()
    body[field] = value
    response = client.post("/api/agents/character-assets/prepare", json=body)
    assert response.status_code == 422


@pytest.mark.parametrize("field", ["expressions", "actions"])
def test_card_requires_expression_and_action_direction(
    client: TestClient,
    field: str,
) -> None:
    body = request_body("character-card")
    profile = service.deepseek_profile().model_dump(mode="json")
    profile[field] = []
    body["character"] = profile
    assert (
        client.post(
            "/api/agents/character-assets/prepare",
            json=body,
        ).status_code
        == 422
    )


def test_card_preserves_reference_responsibilities(client: TestClient) -> None:
    body = request_body("character-card")
    body["references"] = [
        {"asset_id": "face", "role": "identity"},
        {"asset_id": "chair", "role": "prop"},
        {"asset_id": "gesture", "role": "pose"},
    ]
    response = client.post("/api/agents/character-assets/prepare", json=body)
    assert response.status_code == 200
    assert response.json()["request"]["references"] == body["references"]


@pytest.mark.parametrize("appearance", ["  ", "a" * 2001])
def test_profile_rejects_empty_and_oversized_input(
    client: TestClient,
    appearance: str,
) -> None:
    body = request_body()
    profile = service.deepseek_profile().model_dump(mode="json")
    profile["appearance"] = appearance
    body["character"] = profile
    assert (
        client.post(
            "/api/agents/character-assets/prepare",
            json=body,
        ).status_code
        == 422
    )


def test_data_is_serialized_without_template_evaluation(
    client: TestClient,
) -> None:
    body = request_body()
    profile = service.deepseek_profile().model_dump(mode="json")
    profile["appearance"] = '${HOME} "quoted"\n</data> {placeholder}'
    body["character"] = profile
    response = client.post("/api/agents/character-assets/prepare", json=body)
    assert response.status_code == 200
    assert response.json()["request"]["character"] == profile
    assert (
        json.dumps(profile["appearance"], ensure_ascii=False)
        in (response.json()["prompt"])
    )


@pytest.mark.parametrize(
    "origin",
    [
        "https://evil.example",
        "null",
        "http://localhost.evil",
        "http://[",
        "http://localhost:bad",
        "http://localhost/path",
    ],
)
def test_foreign_or_malformed_origin_rejected(
    client: TestClient,
    origin: str,
) -> None:
    assert (
        client.post(
            "/api/agents/character-assets/prepare",
            json=request_body(),
            headers={"Origin": origin},
        ).status_code
        == 403
    )


def test_local_origin_and_host_checks(client: TestClient) -> None:
    assert (
        client.get(
            "/api/agents/character-assets/skills",
            headers={"Origin": "http://localhost:3000"},
        ).status_code
        == 200
    )
    assert (
        client.get(
            "/api/agents/character-assets/skills",
            headers={"Host": "external.example"},
        ).status_code
        == 400
    )


def test_registry_and_openapi_expose_only_preparation(
    client: TestClient,
) -> None:
    skills = client.get("/api/agents/character-assets/skills")
    assert skills.status_code == 200
    assert [skill["skill_id"] for skill in skills.json()] == list(
        service.SKILL_IDS
    )
    profile = client.get("/api/agents/character-assets/profiles/deepseek")
    assert profile.status_code == 200
    assert profile.headers["cache-control"] == "no-store"
    assert profile.json()["character_id"] == "deepseek"
    schema = client.get("/openapi.json")
    assert schema.status_code == 200
    operations = [
        operation["operationId"]
        for path in schema.json()["paths"].values()
        for operation in path.values()
    ]
    assert set(operations) == {
        "listCharacterAssetSkills",
        "getDeepSeekCharacterProfile",
        "prepareCharacterAssetTask",
        "listCharacterSeatedPoses",
    }
    assert len(operations) == len(set(operations))
    assert (
        client.post("/api/agents/character-assets/generate").status_code == 404
    )


@pytest.mark.parametrize(
    "pose_id", ["natural", "listening", "casual", "playful", "thinking"]
)
def test_selected_seated_pose_has_transparent_output(
    client: TestClient,
    pose_id: str,
) -> None:
    body = request_body("character-seated-poses")
    body["pose_id"] = pose_id
    result = client.post("/api/agents/character-assets/prepare", json=body)
    assert result.status_code == 200
    task = schemas.PreparedTask.model_validate(result.json())
    assert task.pose is not None
    assert task.pose.pose_id == pose_id
    assert task.status == "prepared"
    assert task.output.transparent_background is True
    assert task.output.background == "transparent"
    assert task.output.aspect_ratio == "2:3"
    assert task.pose.body in task.prompt
    assert all(
        other.body not in task.prompt
        for other in service.list_poses()
        if other.pose_id != pose_id
    )


@pytest.mark.parametrize(
    "skill_id,pose_id",
    [
        ("character-seated-poses", None),
        ("character-seated-poses", "unknown"),
        ("character-seated-poses", ["natural", "casual"]),
        ("character-turnaround", "natural"),
        ("character-card", "thinking"),
    ],
)
def test_pose_selection_cannot_be_missing_invalid_or_leak_to_cards(
    client: TestClient,
    skill_id: schemas.SkillId,
    pose_id: object,
) -> None:
    body = request_body(skill_id)
    body["pose_id"] = pose_id
    assert (
        client.post(
            "/api/agents/character-assets/prepare",
            json=body,
        ).status_code
        == 422
    )


def test_pose_catalog_has_all_five_unique_options(client: TestClient) -> None:
    result = client.get("/api/agents/character-assets/poses")
    assert result.status_code == 200
    assert [item["pose_id"] for item in result.json()] == [
        "natural",
        "listening",
        "casual",
        "playful",
        "thinking",
    ]
    assert len({item["body"] for item in result.json()}) == 5


def test_output_spec_cannot_contradict_transparency() -> None:
    with pytest.raises(ValidationError):
        schemas.OutputSpec(transparent_background=True)
    with pytest.raises(ValidationError):
        schemas.OutputSpec(aspect_ratio="2:3", background="transparent")


def test_seated_version_includes_pose_resource(
    tmp_path,
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    from importlib import resources

    from app import skills

    folder = tmp_path / "character-seated-poses"
    folder.mkdir()
    original = resources.files(skills).joinpath("character-seated-poses")
    for name in ("SKILL.md", "poses.json"):
        (folder / name).write_bytes(original.joinpath(name).read_bytes())
    monkeypatch.setattr(service.resources, "files", lambda _: tmp_path)
    before = service.load_skill("character-seated-poses")[0].version
    poses = json.loads((folder / "poses.json").read_text())
    poses[0]["expression"] = "克制而温暖的笑容"
    (folder / "poses.json").write_text(json.dumps(poses, ensure_ascii=False))
    assert service.load_skill("character-seated-poses")[0].version != before
