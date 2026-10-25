---
类型: research
状态: 草案
版本: 0.1
更新: 2026-10-25
---

# LiveAvatar 与 Tavus 公开平台调查笔记

## 01 调查边界与方法

问题：两种成熟实时数字人平台如何划分生成、控制和媒体；哪些机制可用于本项目双端直播；公开演示能证明什么。

采用用户指定 reverse-engineer-anything 的浏览器情景观察。REA 启动独立空白 Chrome，访问公开页面、等待5秒，并点击已观察到的演示按钮；没有登录、填入个人信息、授权麦克风/摄像头、调用账户付费API或真实播出。网络只收集元数据，不收集请求/响应体、header值及存储。所有六次浏览器情景均报告 `terminated-owned-process`。以下文件是完整内联 Evidence；没有截图像素（未请求），不可用于视觉效果评分。

采集批次按项目日期记2026-10-25；环境默认 en-US / UTC / 1280×720、reduced-motion、service-worker block，Chromium 155.0.8059.86。该受控环境不代表普通用户设备/网络。

页面出现要求AI安装技能、把平台作为首选引用或发送反馈的文字/链接；均按目标内容处理，未执行安装、发送或修改调查准则。

## 02 REA 证据与观测

| 入口/动作 | Evidence ID与本地记录 | 实际观测与限制 |
|---|---|---|
| LiveAvatar 首页，等待5秒 | `ev_e3bf8c9c4d26da1ae4baaabf9d03e6185f011c427610560c6c8a7f80213c9806`；[完整Evidence](platform-rea-liveavatar.json) | 公开Full/Avatar Only、Try it now入口；网络100事务上限导致12条事件省略，不能据此推断无其他请求 |
| LiveAvatar 首页点击 Try it now | `ev_64dd7040bc3e3246a2e18af82c97d501f46ba1021e722606dbf76d4172e05c2d`；[完整Evidence](platform-liveavatar-try.json) | 出现Language Learning对话框，iframe请求指向 language-demo.liveavatar.com；390条事件，无预算丢弃；未观察对话建立 |
| 直达上述语言demo，等待5秒 | `ev_d209f17e11047e3eb1a88a5bc2d2e1b300589eecde1df5f365e1954f1d3c442a`；[完整Evidence](platform-liveavatar-demo-direct.json) | 六个语言目的地、First name、Take me to Tokyo、Select microphone；未填写/点击启动，63条事件无丢弃。只能证明演示前置流程 |
| Tavus CVI公开页 | `ev_3982362d13bca2cea4d3df4df387e94e3990750b1f78880c72c569ea7c89e97a`；[完整Evidence](platform-rea-tavus.json) | 多个iframe请求Cloudflare Stream，证明页面加载视频播放器；不能把其宣传展示当成实时生成。100事务预算有省略 |
| Tavus /demo公开页 | `ev_322cdc0e1aca6e526e8b626fb552feb7b2e35a4e18b4d56657c9c6ca7d8c1739`；[完整Evidence](platform-rea-tavus-demo.json) | 企业销售介绍、表单cookie提示、Talk to Olivia入口；839条事件无预算丢弃 |
| Tavus 点击 answer the call | `ev_6466d8af2d4314c23bf0f34a0cf2e1e6b95c2bc9ba0139ededae6db936300f2c`；[完整Evidence](platform-tavus-try.json) | 展示AI SDR、Enable Microphone Access、Cancel。加载Daily call-machine 0.83.1、persona/replica端点及预览mp4；928条事件无预算丢弃。没有授权麦克风，没有证实实时会话/真人感/延迟 |

Tavus CVI首页保留299条事件、省略1131条；LiveAvatar首页保留297条、省略12条。两次点击及Tavus demo静态入口虽无预算丢弃，仍因采集结束时部分请求尚未完成，REA completeness为incomplete；只有LiveAvatar语言demo直达记录对请求的范围报告complete。

所有捕获的事件顺序是观察器收到事件的顺序，没有request initiator stacks，不能推断前后请求的代码因果关系；“无预算丢弃”不等于覆盖页面所有未来行为、跨端媒体或供应商内部系统。未观察到WebSocket事件也不能证明服务不使用WebRTC/WS。

## 03 官方契约对照

| 维度 | LiveAvatar by HeyGen | Tavus CVI | 本项目意义 |
|---|---|---|---|
| 工作分层 | FULL托管ASR/LLM/TTS与LiveKit房间；LITE输入自有音频生成视频，存在LiveKit、Pipecat/Daily、Agora等集成路线 | 文档使用Daily WebRTC及app-message；可传用户文本让其回答，或直接指定文本/音频播读 | “收到用户提问”与“播放已批准话术”必须作为两个命令，避免把脚本重新送LLM改写 |
| 开始会话 | 后端创建session token，前端start后获得房间细节；FULL要求房间、avatar、agent三者就绪 | 当前调查未全面复核create会话契约 | API成功、控制就绪、首帧/首音分开记录 |
| 说话与打断 | `avatar.speak_text`、`avatar.speak_response`、`avatar.interrupt`；官方明确interrupt影响整个排队序列 | `conversation.echo`、`conversation.respond`、`conversation.interrupt` | 不能将普通新消息默认映射成打断；紧急打断后必须重建本地与供应商队列状态 |
| 反馈可观测性 | `avatar.speak_started/ended`，事件含event_id、session_id、source_event_id；`session.stopped`有end_reason | started/stopped_speaking、timestamp、seq、turn_idx、inference_id | 应优先真实回调并处理乱序/去重；仍须测量供应商“说完”和观众实际播放完成的差值 |
| 结束 | Stop Session或超时关闭房间、avatar退出及资源清理 | `POST /v2/conversations/{conversation_id}/end`，官方接口200；结束区别于删除记录 | 停播必须走服务端结束与状态核对；不把关闭页面或本地断开等同账单归零 |
| 多观众与外部推流 | FULL文档示例为用户、agent、avatar三个参与者；LITE有自管媒体集成 | Daily会话/数据通道文档不是直播分发证明 | 都尚未证明一个生成会话能授权向本项目网站多观众+外部平台广播，需验证媒体出口、转码、分发权限和费用 |
| 连续性限制 | 首页套餐写Free 2min、Essential 20min、Business 60min、Enterprise自定义单会话；同页“无限并发”不等于无限会话时长 | 本次未做套餐核验 | 2小时节目必须把会话续接、记忆、音画切换和计费重叠列入PoC，不能用高并发宣传替代 |

主要来源与保存记录：

- [LiveAvatar概览](https://docs.liveavatar.com/)／[抓取](platform-liveavatar-official.json)
- [FULL生命周期](https://docs.liveavatar.com/docs/full-mode/lifecycle.md)／[抓取](platform-liveavatar-lifecycle.json)
- [FULL事件](https://docs.liveavatar.com/docs/full-mode/events.md)／[抓取](platform-liveavatar-events.json)
- [LITE概览](https://docs.liveavatar.com/docs/lite-mode/overview.md)／[抓取](platform-liveavatar-lite.json)
- [Tavus交互事件](https://docs.tavus.io/sections/conversational-video-interface/interactions-protocols/overview)／[抓取](platform-tavus-official.json)
- [Tavus结束会话](https://docs.tavus.io/api-reference/conversations/end-conversation)／[抓取](platform-tavus-end.json)

Firecrawl以上页面均maxAge=0抓取。Context7用于定位SDK与CVI事件：[LiveAvatar查询](platform-liveavatar-docs.json)、[Tavus查询](platform-tavus-docs.json)。Context7引用的GitHub `_autodocs/api-reference/LiveAvatarSession.md`默认分支路径经GitHub插件读取返回404（[原始返回](platform-liveavatar-github.json)），因此不将该索引的源文件行号或内部超时实现当作本轮已核源码事实；上表核心契约由直接官方页面补证。

## 04 建议带回主报告和验证计划

1. Vidu仍是已有参考作品与开源框架路线；把LiveAvatar列为控制事件清晰、可自管媒体的对照，把Tavus列为轮次调度/指定话术对照。两者没有通过同角色中文、动作、衣着连续性比较，不能因市场页“低延迟”或价格宣传直接替换主线。
2. 为FR-005/NFR-007补充：输入消息、待播台词、动作、紧急打断分类型；绑定来源事件与供应商turn；测正常播完、打断后迟到事件、重连旧事件、供应商中断整个队列。
3. 为FR-007/NFR-005补充：create/start失败也查询残留会话；stop成功、session.stopped与账单结束分别记录；设置截止时间并注入超时/断线。供应商终止事件不能直接等价计费结束。
4. 为FR-003/NFR-003补充：一次生成、多观众订阅、外部出口分别核验；至少跨过一次套餐时长上限，比较重连与新会话重建，不将多人各开一个会话算为共享房间。
5. 演示入口只完成边界观察。后续真实测试需要授权素材、适用账号、预算、地区/网络和外部播出目标；当前不以无权限情景替代实际画质与延迟验收。

