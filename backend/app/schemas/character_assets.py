"""角色美术Agent的输入与准备结果，不包含供应商私有参数。"""

from typing import Annotated, Literal, Self

from pydantic import (
    BaseModel,
    ConfigDict,
    Field,
    StringConstraints,
    model_validator,
)

SkillId = Literal["character-turnaround", "character-card"]
Medium = Literal["anime", "photorealistic", "illustration"]
Text = Annotated[
    str, StringConstraints(strip_whitespace=True, min_length=1, max_length=2000)
]
AssetId = Annotated[
    str,
    StringConstraints(
        strip_whitespace=True,
        min_length=1,
        max_length=128,
        pattern=r"^[a-zA-Z0-9][a-zA-Z0-9_-]*$",
    ),
]
Details = Annotated[tuple[Text, ...], Field(max_length=12)]


class StrictModel(BaseModel):
    """拒绝未知参数，冻结制作任务的结构化字段。"""

    model_config = ConfigDict(extra="forbid", frozen=True)


class CharacterProfile(StrictModel):
    """与媒介分离的角色身份、衣饰及表演需求。"""

    character_id: AssetId
    display_name: Annotated[Text, Field(max_length=80)]
    persona: Annotated[Text, Field(max_length=300)]
    appearance: Text
    costume: Text
    accessories: Details = ()
    props: Details = ()
    expressions: Details = ()
    actions: Details = ()
    invariants: Annotated[Details, Field(min_length=1)]
    exclusions: Details = ()


class ReferenceImage(StrictModel):
    """逻辑素材引用；不接受文件路径、访问凭据或远程URL。"""

    asset_id: AssetId
    role: Literal["identity", "costume", "prop", "pose"]


class PrepareRequest(StrictModel):
    """准备一次指定角色和媒介的美术任务。"""

    skill_id: SkillId
    medium: Medium
    character: CharacterProfile
    references: Annotated[
        tuple[ReferenceImage, ...], Field(min_length=1, max_length=5)
    ]

    @model_validator(mode="after")
    def validate_references(self) -> Self:
        """核对主身份、参考唯一性和各Skill的输入边界。"""
        if self.references[0].role != "identity":
            raise ValueError("第一张参考必须是identity身份基准")
        ids = [reference.asset_id for reference in self.references]
        if len(ids) != len(set(ids)):
            raise ValueError("参考素材ID不能重复")
        if self.skill_id == "character-turnaround" and any(
            reference.role != "identity" for reference in self.references
        ):
            raise ValueError("三视图只接受身份参考，避免带入坐姿或道具")
        if self.skill_id == "character-card" and (
            not self.character.expressions or not self.character.actions
        ):
            raise ValueError("设定卡需要明确的表情和动作特写要求")
        return self


class SkillInfo(StrictModel):
    """可追溯的本地Skill定义，版本为文件内容SHA-256。"""

    skill_id: SkillId
    description: str
    version: str
    source_url: str
    provenance: str


class OutputSpec(StrictModel):
    """两种整张设定资产的规格；不代表独立透明素材。"""

    format: Literal["png"] = "png"
    aspect_ratio: Literal["3:2"] = "3:2"
    transparent_background: Literal[False] = False
    background: Literal["white"] = "white"
    review_required: Literal[True] = True


class PreparedTask(StrictModel):
    """已准备但尚未调用图像工具的任务快照。"""

    status: Literal["prepared"] = "prepared"
    skill: SkillInfo
    request: PrepareRequest
    instructions: str
    prompt: str
    output: OutputSpec
    checks: tuple[str, ...]
