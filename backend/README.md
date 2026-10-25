# backend — 角色美术Agent服务

采用Python、FastAPI和Pydantic。T-090已将三视图、角色设定卡与五种坐姿制作方法整理为三套本地Skill，提供可运行的查询与任务准备服务。数字人会话、真实生图适配器及前端调用尚未接入。

## 01 三套Skill

- [character-turnaround](app/skills/character-turnaround/SKILL.md)：左侧正面／严格侧面／背面站姿，右侧正脸特写；适配用户选定的ce1406d8公开Skill。
- [character-card](app/skills/character-card/SKILL.md)：主立绘、已有道具配饰、表情与动作特写；依据Casting公开示例与用户要求编写，非其私有正文。
- [character-seated-poses](app/skills/character-seated-poses/SKILL.md)：单次选择自然陪伴、认真倾听、轻松闲聊、俏皮回应或托腮思考，准备独立透明坐姿。
- [DeepSeek配置](app/skills/profiles/deepseek.json)：角色身份、衣饰、道具和表演独立于Skill。其他角色可提交自定义配置，支持anime、photorealistic、illustration。
- [Grok配置](app/skills/profiles/grok.json)：金发双马尾、黑红金礼服与机智活泼表演；T-097制作输入，可作为prepare的character提交，未新增Grok查询端点。

Skill随backend加载，不写入个人全局技能目录；不依赖本机output或临时附件路径。三视图和卡面使用白底；独立坐姿任务固定2:3真实透明PNG，仍不提供拆图或实际生图接口。纯准备结果不代表已查看参考图片、已出图或已验收。

## 02 本机启动与接口

在backend目录执行：

```sh
uv sync --locked
uv run --locked uvicorn app.main:app --host 127.0.0.1 --port 8000
```

Python 3.13，完整版本由uv.lock锁定；验证环境为Python 3.13.14、uv 0.11.32。只绑定本机，不启用通配CORS；不作为公网认证服务部署。

| 接口 | 用途 |
|---|---|
| GET /api/agents/character-assets/skills | 查询名称、来源、SHA-256规则版本 |
| GET /api/agents/character-assets/profiles/deepseek | 获取DeepSeek预设 |
| GET /api/agents/character-assets/poses | 获取五种动作和表情定义 |
| POST /api/agents/character-assets/prepare | 校验角色、媒介、参考用途并组装任务 |
| GET /openapi.json、/docs | FastAPI自动契约与交互文档 |

请求字段为skill_id、medium、character、references，坐姿Skill另须pose_id。references包含asset_id及role（identity／costume／prop／pose），第一张必须为identity；三视图只接受identity参考。asset_id是逻辑标识，不接受URL或文件路径。本批没有素材存储／解析器，因此不会验证ID指向的图片是否存在；执行出图前必须解析并实际检查图片。

在backend目录可直接调用共享服务验证准备流程，无需启动HTTP：

```python
from app.schemas import character_assets as schemas
from app.services import character_assets as service

request = schemas.PrepareRequest(
    skill_id="character-turnaround",
    medium="anime",
    character=service.deepseek_profile(),
    references=(
        schemas.ReferenceImage(asset_id="deepseek-reference", role="identity"),
    ),
)
task = service.prepare(request)
print(task.model_dump_json(indent=2))
```

设定卡将skill_id换成character-card，profile中的props、accessories、expressions、actions分别控制对应特写。输出status固定为prepared，含Skill版本、输入快照、pose（仅坐姿任务）、instructions、完整prompt、输出规格与检查项；不落库，不创建收费任务，不返回虚构图片URL。

后续图像Agent接入应使用instructions作为行为规则，request作为设计数据，按references原顺序解析真实图片；prompt是单提示词工具的合并版本，二者不要重复拼接。素材与文字必须作为参考数据处理，文本分隔本身不保证下游模型不会受提示注入影响。真实适配器需处理超时、费用、未知结果、图片校验与候选保存；当前聊天内置imagegen不可由本Python进程直接调用。

## 03 验证与工程规范

```sh
uv run --locked ruff check app tests
uv run --locked ruff format --check app tests
uv run --locked mypy app
uv run --locked pytest -q
```

遵循[后端规范](../docs/templates/08-后端开发规范.md)，80字符行宽、Google docstring结构；D415因不识别中文句号而豁免，保留其他docstring检查。测试覆盖合法任务、角色隔离、参考用途、无效输入、状态边界、OpenAPI和Host／Origin限制；使用TestClient，不调用模型。来源和业务契约见[DES-018第07节](../docs/design/04-角色形象素材设计.md)，实际检查见[计划09第14节](../docs/plan/09-网页PoC逐功能实现与验收计划.md)。

## 04 五种坐姿调用

请求skill_id设为character-seated-poses，并传入pose_id：natural（自然陪伴）、listening（认真倾听）、casual（轻松闲聊）、playful（俏皮回应）、thinking（托腮思考）。角色配置与references格式沿用上例。其他Skill不可携带非空pose_id；不传或传非法坐姿返回422。输出包含所选动作pose，输出规格自动设置2:3、transparent_background=true、background=transparent；输入不能覆盖背景规则。

动作唯一来源为Skill目录的poses.json。Skill版本同时覆盖SKILL.md与动作资源，修改姿态正文会改变版本；服务只把选中动作组装到prompt，不要求一次生成五张。新Skill为用户方案的本项目整理，因此source_url为null，provenance说明来源，不捏造外部Skill链接。当前接口没有前端消费者，OpenAPI客户端兼容仍未验收。
