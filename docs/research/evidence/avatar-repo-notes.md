---
类型: research
状态: 草案
版本: 0.1
更新: 2026-10-25
---

# 参考仓库角色资产补充证据

## 01 问题、来源与边界

本记录回答：网页数字人PoC要准备什么角色图片、音色与人设；参考仓库哪些方法可以借鉴，哪些不能直接当成我们的形象规格。主需求仍以[网页PoC需求v0.4](../../requirement/01-数字人MVP需求草案.md)为准，当前不加入直播、换装、自动暖场或素材管理后台。

来源为`garycaogan/ai-live-avatar`固定提交`5559ec5440c93814737155183dbe832df0b9f215`。2026-10-25通过GitHub插件重新读取README、角色创建、声音处理、会话组装，并补取`live/assets.py`、`config.example.json`、`persona.md`、`.gitignore`。新增原文见[源码证据JSON](avatar-repo-source-excerpts.json)，完整目录树复用[仓库快照](github-repository-snapshot.json)，原有选定源码见[reference](../reference/ai-live-avatar/README.md)。

方法：依照reverse-engineer-anything，先提出“角色需要哪些资产”的单一问题，再沿配置→资产准备→会话创建追踪输入。未安装、启动或调用该项目；没有真实数字人画面/声音验收，也未获取作者私有资产。以下参数均是固定源码事实或作者建议，不冒充Vidu当前官方限制。

## 02 已证实的资产路线

| 事实 | 精确证据 | 对网页PoC的影响 |
|---|---|---|
| 参考项目把图片、人物描述与音色交给Vidu生成实时画面、声音和回复；它自身是编排层 | [README 3—5](https://github.com/garycaogan/ai-live-avatar/blob/5559ec5440c93814737155183dbe832df0b9f215/README.md#L3-L5)、[session 457—476](https://github.com/garycaogan/ai-live-avatar/blob/5559ec5440c93814737155183dbe832df0b9f215/live/session.py#L457-L476) | 最小准备物是角色底图、音色配置、人设与开场指令；这条路线不要求先建3D骨骼、VRM、Live2D模型或动作绑定 |
| 作者测试中的实际形象、人设、音色、素材库和录屏未公开 | [README 5](https://github.com/garycaogan/ai-live-avatar/blob/5559ec5440c93814737155183dbe832df0b9f215/README.md#L5)、[gitignore 8—13](https://github.com/garycaogan/ai-live-avatar/blob/5559ec5440c93814737155183dbe832df0b9f215/.gitignore#L8-L13) | 仓库不能提供可直接复用的作者角色，无法据此保证复现相同长相、音色或私有人设 |
| 示例配置只给角色结构，引用的`assets/avatars/xiaoshen.jpg`不在固定提交目录树内；音色字段为空 | [config 13—22](https://github.com/garycaogan/ai-live-avatar/blob/5559ec5440c93814737155183dbe832df0b9f215/config.example.json#L13-L22)、[完整树证据](github-repository-snapshot.json) | “下载仓库”不等于已有可运行角色；需要自己提供素材和可用voice ID |
| 会话从图片读取字节并上传`/live/v1/avatars`；成功后缓存资产ID，失败路径尝试直接传image_uri | [session 478—508](https://github.com/garycaogan/ai-live-avatar/blob/5559ec5440c93814737155183dbe832df0b9f215/live/session.py#L478-L508)、[vidu 55—62](https://github.com/garycaogan/ai-live-avatar/blob/5559ec5440c93814737155183dbe832df0b9f215/live/vidu.py#L55-L62) | 需区分“图片文件准备好”“供应商角色资产就绪”“网页实际动态合格”三个状态；不能只验收静态图 |
| 完整目录树未包含本地数字人模型权重；实现调用云API | [完整树证据](github-repository-snapshot.json)、[vidu 47—62](https://github.com/garycaogan/ai-live-avatar/blob/5559ec5440c93814737155183dbe832df0b9f215/live/vidu.py#L47-L62) | 不把它评估成可离线运行或自托管模型；画质、口型、响应和费用均需真实供应商验证 |

## 03 图片、构图与制作方法

**作者建议：** 底图定义长相、衣服、房间与常驻表情。单人、近景、双手在桌上、自然表情是作者认为效果好的构图；README的**1.2:1**专指抖音竖屏上方横画幅，后文配套OBS画布为1296×1080。这不证明网页必须采用1.2:1，也不证明Vidu只接受该比例。[README 74—82](https://github.com/garycaogan/ai-live-avatar/blob/5559ec5440c93814737155183dbe832df0b9f215/README.md#L74-L82)、[README 96—104](https://github.com/garycaogan/ai-live-avatar/blob/5559ec5440c93814737155183dbe832df0b9f215/README.md#L96-L104)。

**源码事实：** 工作台离线生图可选9:16、1:1、16:9，默认9:16，任务指定2K和单张输出；最多引用四张图片。可选PHOTO_REAL后缀要求手机实拍质感、自然皮肤纹理、轻微噪点与柔和度，避免美颜、棚拍、CG、动漫、文字和水印。另有场景模板要求保持同一张脸、发型、发色、衣服与配饰，采用头到胸的自然近景。这些是作者的提示词与调用配置，不是已证实的生成效果。[workbench 34—68](https://github.com/garycaogan/ai-live-avatar/blob/5559ec5440c93814737155183dbe832df0b9f215/live/workbench.py#L34-L68)、[workbench 742—767](https://github.com/garycaogan/ai-live-avatar/blob/5559ec5440c93814737155183dbe832df0b9f215/live/workbench.py#L742-L767)。

| 层次 | 源码实际行为 | 不应推导成 |
|---|---|---|
| 文件接收 | 类型识别包括jpg/jpeg/png/webp/heic | 所有这些格式都被供应商直接支持 |
| 素材库归档 | PNG/WebP/HEIC或大于3,000,000字节的图调用`shrink_to_jpeg(..., 2048)` | 模型输入限3MB或2048像素 |
| 新建角色 | 从图库取一张图，调用`shrink_to_jpeg(..., 1280)`生成角色base文件 | 模型强制1280最长边 |
| 缩放实现 | sips路径按最长边缩放；ffmpeg回退仅限制宽度；两者都没有时按原格式复制 | 所有环境必然输出相同尺寸JPEG |
| 送模 | 从角色图片读取全部字节；PNG标image/png，其余标image/jpeg，转data URI | 送模阶段再次自动裁切、校正人脸或保证格式正确 |

证据：[workbench 38—43](https://github.com/garycaogan/ai-live-avatar/blob/5559ec5440c93814737155183dbe832df0b9f215/live/workbench.py#L38-L43)、[162—177](https://github.com/garycaogan/ai-live-avatar/blob/5559ec5440c93814737155183dbe832df0b9f215/live/workbench.py#L162-L177)、[430—450](https://github.com/garycaogan/ai-live-avatar/blob/5559ec5440c93814737155183dbe832df0b9f215/live/workbench.py#L430-L450)、[assets 103—114](https://github.com/garycaogan/ai-live-avatar/blob/5559ec5440c93814737155183dbe832df0b9f215/live/assets.py#L103-L114)、[session 478—482](https://github.com/garycaogan/ai-live-avatar/blob/5559ec5440c93814737155183dbe832df0b9f215/live/session.py#L478-L482)。

**对我们提出的制作建议，尚非用户确认：** 使用有权使用的原创人物母版，先定单一身份、固定服装、固定房间和自然中性表情，再制作网页预览裁切及送模派生图。图片应能清楚看到眼睛与嘴，避免前景物遮挡；这属于便于动态评审的建议，并非从源码发现的API校验规则。图片背景属于角色画面的一部分，不应默认抠成透明PNG或要求网页实时换背景。头像卡片裁切不得覆盖或替代完整送模底图。若并行界面稿已有多位候选，保留该集合，PoC仅从中选择一个角色做真实链路验证。

可给后续素材制作使用的**草案brief**：同一位原创成人角色，单人、头肩至胸或腰的自然近景，面部无遮挡，目光接近镜头，表情放松，服装和环境固定；保持自然皮肤和日常拍摄质感，预留网页裁切空间，无文字和水印。性别、年龄感、发型、服装、房间和颜色应来自用户参考与当前设计稿，不从仓库默认角色或音色名称擅自确定。本轮不执行生图。

## 04 音色与人设

| 项目 | 固定源码证据 | 网页PoC建议 |
|---|---|---|
| 系统音色 | 工作台内有qwen_omni音色硬编码清单，同时请求`GET /live/v1/voices`读取克隆音色；`assets/voices.json`是运营者私有精选库。[workbench 45—59](https://github.com/garycaogan/ai-live-avatar/blob/5559ec5440c93814737155183dbe832df0b9f215/live/workbench.py#L45-L59)、[662—687](https://github.com/garycaogan/ai-live-avatar/blob/5559ec5440c93814737155183dbe832df0b9f215/live/workbench.py#L662-L687) | 优先选择一个实际账号可用的系统音色，记录voice ID、provider及试听反馈；硬编码名单不是当前服务可用性的证明 |
| 克隆输入 | 处理为24kHz单声道，先截取最多30秒，再调速/调音高；处理后不足5秒拒绝，作者推荐10—20秒；提供逐字稿或调用转写，上传公开临时音频URL后请求Vidu克隆。[workbench 689—739](https://github.com/garycaogan/ai-live-avatar/blob/5559ec5440c93814737155183dbe832df0b9f215/live/workbench.py#L689-L739) | 声音克隆增加授权、样本、转写、第三方上传与费用依赖，当前需求已明确不要求；不能把10—20秒写成所有供应商统一要求 |
| 人设字段 | name最多20字符，note最多80，greeting_instruction最多200；persona_text范围20—6000字符；每角色写入独立`personas/{key}.md`。[workbench 430—475](https://github.com/garycaogan/ai-live-avatar/blob/5559ec5440c93814737155183dbe832df0b9f215/live/workbench.py#L430-L475) | 只是参考工具校验，不必完整复制为我们的表单规格；开发配置足够 |
| 人设模板 | 通用persona.md提供AI身份、短句口语、简短回应和边界；它包含弹幕、礼物、暖场、视觉指令等直播上下文。[persona 1—19](https://github.com/garycaogan/ai-live-avatar/blob/5559ec5440c93814737155183dbe832df0b9f215/persona.md#L1-L19) | 保留角色身份和说话风格，改成网页一对一互动；删去未提供的换装/礼物/暖场能力，避免人物承诺做不到的事情 |
| 人设与开场分离 | README建议人设描述风格、少写示例句避免照念；会话单独带greeting_instruction。[README 77](https://github.com/garycaogan/ai-live-avatar/blob/5559ec5440c93814737155183dbe832df0b9f215/README.md#L77)、[session 457—476](https://github.com/garycaogan/ai-live-avatar/blob/5559ec5440c93814737155183dbe832df0b9f215/live/session.py#L457-L476) | 分开维护“身份/风格”“开场意图”“用于验收的固定测试台词”；自动回答还是指定播读仍由Q-004落实，不混成一个模式 |

人设草案可以只包含：角色显示名；如实表明是AI数字人；中文、自然、简短的对话风格；只描述当前网页实际能力；不宣称能换装、唱歌、长期记忆或操作外部设备。人设不负责定义人物的脸和服装，后两者由底图与动态验收共同约束。

## 05 最小资产交付清单与验证影响

下表是对FR-001、NFR-002、NFR-004、NFR-007的建议细化，不建立第二套业务需求编号，也不代表素材已经完成。

| 交付物 | 建议最小内容 | 完成依据 |
|---|---|---|
| 角色说明卡 | 显示名、候选/选定状态、角色版本、形象方向、声音方向与使用范围 | 与当前设计稿和用户参考对应；可区分设计候选与真正进入PoC的一个角色 |
| 形象母版与派生图 | 保留原创母版；单独列送模文件和网页预览裁切；固定服装/场景 | 记录文件名、真实像素、格式和版本；人脸/嘴部清晰，裁切不影响关键部位；供后续真实服务检验 |
| 素材来源记录 | 原创/授权来源、生成方法与prompt版本（若有）、可用范围 | 有可追溯来源；作者私有角色不混入；不写密钥或带凭据链接 |
| 音色选择记录 | 一个实际可用的系统voice ID/provider与试听结论 | 真实账号验证后填“可用”；未经试听或调用只能标“候选” |
| 人设和开场意图 | 简短身份/风格/能力边界；开场意图独立 | 与网页互动模式一致；去掉直播上下文与未实现能力 |
| 角色动态评审记录 | 同一底图与音色的短句、长句、停顿、待机、连续回应样例及异常 | 静态通过与真实动态通过分开；记脸部/服装漂移、嘴部可见性、口型观感、声音适配和清晰度，不编造延迟/帧率实测 |

建议步骤：先复核已有候选资产→选一个进入PoC→检查来源和母版→确认网页构图与送模图→选系统音色→配置简短人设→在已落实账号预算后做真实短测→基于同一组测试语句修改单个因素并记录版本。内置生图、声音克隆、衣柜、动作编辑、多个角色同时运行均不由本研究自动进入当前范围。

## 06 未验证与可复用界限

- 没有看到作者私有原图、真正使用的人设或私有音色；通用模板不证明演示角色的完整人格设计。
- 未核实当前Vidu账号可用系统音色、图像尺寸/字节/API限制、云资产预处理时长、实时输出分辨率或实际口型质量。源码里的2K是离线生图参数，480p/720p是离线视频任务选项，不是实时数字人输出规格。
- 未做角色动态评审；“自然”“不漂移”“口型合格”等均是待观察结果。不能以静态形象图或Figma稿认定FR-011通过。
- 已确认代码MIT不覆盖未分发的作者角色资产，也不替代Vidu/Evolink/RTC的服务使用条件。[README 134—136](https://github.com/garycaogan/ai-live-avatar/blob/5559ec5440c93814737155183dbe832df0b9f215/README.md#L134-L136)。
- 当前只交付本证据与建议，由主研究报告和所属requirement/design/plan吸收；不修改并行形象素材或界面稿，不调用真实生成服务。

本轮静态检查：4份新增完整原文的Git blob SHA与固定树一致；4段插件重新读取的源码与原有本地快照对应行一致；JSON可解析，本笔记6条本地链接及01—06章节编号有效。以上仅是来源和文件结构核验。
