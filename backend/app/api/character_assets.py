"""本机角色美术Agent的Skill查询和任务准备接口。"""

from fastapi import APIRouter

from app.schemas import character_assets as schemas
from app.services import character_assets as service

router = APIRouter(prefix="/agents/character-assets", tags=["角色美术Agent"])


@router.get(
    "/skills",
    operation_id="listCharacterAssetSkills",
    summary="列出三视图与设定卡Skill",
)
def list_skills() -> tuple[schemas.SkillInfo, ...]:
    """返回本地Skill来源和内容版本，不调用图像模型。"""
    return service.list_skills()


@router.get(
    "/profiles/deepseek",
    operation_id="getDeepSeekCharacterProfile",
    summary="读取DeepSeek造型预设",
)
def deepseek_profile() -> schemas.CharacterProfile:
    """提供独立角色配置，可用于真人或绘画媒介的任务输入。"""
    return service.deepseek_profile()


@router.post(
    "/prepare",
    operation_id="prepareCharacterAssetTask",
    summary="准备角色素材生成任务",
    description="仅校验和组装Skill，不读取图片、不调用模型或保存任务。",
)
def prepare(request: schemas.PrepareRequest) -> schemas.PreparedTask:
    """返回prepared状态和制作输入，不表示已经出图。"""
    return service.prepare(request)
