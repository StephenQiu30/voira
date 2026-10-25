---
类型: research
状态: 草案
版本: 0.1
更新: 2026-10-25
---

# 07 参考仓库到网页PoC实现映射

记录：RES-008；任务：T-024。输入为[当前需求索引](../requirement/01-数字人MVP需求草案.md)，输出为[逐功能设计](../design/00-功能设计索引.md)。本文回答“如何用参考仓库帮助实现我们自己的需求”，不把第三方功能直接变成产品承诺。

## 01 研究范围与来源

2026-10-25通过GitHub连接器重新读取仓库元信息、最新提交、完整文件树及7份关键文件。最新提交仍为[5559ec5](https://github.com/garycaogan/ai-live-avatar/commit/5559ec5440c93814737155183dbe832df0b9f215)，提交时间2026-10-19T13:47:27Z；以下源码链接固定到该提交。

核查问题为：会话怎么创建/结束；文字如何驱动人物；网页如何播放；怎样判断播完；哪些模块适用于本机Codex问答；哪些功能应后置。沿用reverse-engineer-anything的证据分层方法，完整源码使用普通仓库阅读，不运行二进制或启动动态逆向。两个独立只读复核分别检查控制/生命周期和舞台/调度，未运行服务或Mock测试。

本地15份选定源码与Git树逐文件核对：原归档均多一个末尾换行，移除该换行后Git blob SHA全部匹配；原文件未改写，正文行号不受影响。该归档仍不是完整checkout。可复核元信息、blob SHA与限制见[证据JSON](evidence/ai-live-avatar-design-review.json)。

## 02 源码事实与设计影响

| 事实编号 | 固定源码与观察 | 本项目设计判断 |
|---|---|---|
| SRC-01 | [README](https://github.com/garycaogan/ai-live-avatar/blob/5559ec5440c93814737155183dbe832df0b9f215/README.md)说明仓库负责调度/工作台，生成由Vidu提供；作者角色、人设、音色及素材未公开 | 可以借鉴编排机制；不能获得作者原形象，也不能部署成离线数字人模型。使用自己的蓝色大肥鱼与授权资产 |
| SRC-02 | [vidu.py 47—68、90—160行](https://github.com/garycaogan/ai-live-avatar/blob/5559ec5440c93814737155183dbe832df0b9f215/live/vidu.py#L47-L160)：REST创建/查询，WS初始化与控制；type100与102分别封装 | 保留协议分层，适配到FastAPI；我们只把Codex最终回答交给text_tts，不沿用供应商问答 |
| SRC-03 | [session.py 410—522行](https://github.com/garycaogan/ai-live-avatar/blob/5559ec5440c93814737155183dbe832df0b9f215/live/session.py#L410-L522)：准备形象→创建live→保存RTC信息→WS初始化；头像按图像哈希缓存 | 借鉴资产哈希及独立连接状态；补创建意图持久化和creation_unknown，不能把异常一律当未创建 |
| SRC-04 | [stage.html 327—395行](https://github.com/garycaogan/ai-live-avatar/blob/5559ec5440c93814737155183dbe832df0b9f215/static/stage.html#L327-L395)：ARTC入会，只订阅远端，关闭本地音视频发布；退房销毁SDK | React中隔离MediaAdapter，真实首帧后替换预览；不索要摄像头/麦克风。返回其他provider应显示不支持，不能拿ARTC参数硬接 |
| SRC-05 | [stage.html 187—210、298—310行](https://github.com/garycaogan/ai-live-avatar/blob/5559ec5440c93814737155183dbe832df0b9f215/static/stage.html#L187-L310)：video固定静音，声音由SDK处理；video.play失败被吞掉 | 重做远端声音控制及持续反馈；只切video.muted或调用video.play不能证明RTC音频已解锁 |
| SRC-06 | [stage.html 444—449行](https://github.com/garycaogan/ai-live-avatar/blob/5559ec5440c93814737155183dbe832df0b9f215/static/stage.html#L444-L449)通过SSE获取状态；5秒周期是舞台心跳 | 本项目选择HTTP快照轮询以减少状态通道，属于简化改造，不是源码已有轮询方案 |
| SRC-07 | [session.py 854—919行](https://github.com/garycaogan/ai-live-avatar/blob/5559ec5440c93814737155183dbe832df0b9f215/live/session.py#L854-L919)：自动队列、按回复字数估时、kick跳过等待、空闲暖场 | 全部不作为当前轮次推进器。人工继续必须另建；计时、文本事件、WS写入均不能证明用户已听完 |
| SRC-08 | [session.py 524—554行](https://github.com/garycaogan/ai-live-avatar/blob/5559ec5440c93814737155183dbe832df0b9f215/live/session.py#L524-L554)在挂断异常后仍进入本地finish；[1038—1073行](https://github.com/garycaogan/ai-live-avatar/blob/5559ec5440c93814737155183dbe832df0b9f215/live/session.py#L1038-L1073)混合供应商积分与时间估算 | 必须补ending/end_unknown和供应商核对；未知费用留null，不能照搬缺失填0、默认时长和积分上限 |
| SRC-09 | [session.py 125—186行](https://github.com/garycaogan/ai-live-avatar/blob/5559ec5440c93814737155183dbe832df0b9f215/live/session.py#L125-L186)主要在内存维护状态；[776—827行](https://github.com/garycaogan/ai-live-avatar/blob/5559ec5440c93814737155183dbe832df0b9f215/live/session.py#L776-L827)包含自动续开、舞台占用与心跳 | 可借鉴单控制者和租约；关闭自动续开。所核查路径没有本地Codex适配、人工确认三轮记忆或跨重启幂等账本，需补建 |
| SRC-10 | [router.py 177—267行](https://github.com/garycaogan/ai-live-avatar/blob/5559ec5440c93814737155183dbe832df0b9f215/live/router.py#L177-L267)、[queue.py](https://github.com/garycaogan/ai-live-avatar/blob/5559ec5440c93814737155183dbe832df0b9f215/live/queue.py)提供规则路由与直播队列 | 仅作为未来换装/动作/礼物/队列参考；不能推断已有商品资料库、商品讲解轮换或国内平台互动接入 |
| SRC-11 | [stage.html 418—440行](https://github.com/garycaogan/ai-live-avatar/blob/5559ec5440c93814737155183dbe832df0b9f215/static/stage.html#L418-L440)、[broadcast.py 502—553行](https://github.com/garycaogan/ai-live-avatar/blob/5559ec5440c93814737155183dbe832df0b9f215/live/broadcast.py#L502-L553)包含轨道录制/传输与ffmpeg输出 | 推流、录制、OBS、ffmpeg不进入当前网页运行依赖 |
| SRC-12 | [test_e2e.py 27—63、156—190行](https://github.com/garycaogan/ai-live-avatar/blob/5559ec5440c93814737155183dbe832df0b9f215/tests/test_e2e.py#L27-L190)使用Mock Vidu并验证发送间隔 | 可借鉴异常注入与时序断言，不证明真实口型、音频播完、停费或模型质量 |

## 03 建议实现结构

保持已确认的Next.js/React与FastAPI，不直接复制aiohttp服务或整套工作台。按源码机制重建小范围适配：ViduClient负责外部协议；SessionService负责会话状态；TurnService串行管理问题、Codex、答案校验和播读；MediaAdapter负责RTC与声音；本地SQLite只记录意图、关联ID和用量。最近3轮正文只放内存。

本机Codex是新增回答生成层。Vidu text_tts能力依据既有[官方参数/音色核验](evidence/local-codex-poc-decision-sources.json)，不是仅凭参考仓库常量推断可用。Codex进程隔离、JSONL终态解析、取消和认证必须分别验证；不以read-only参数或帮助页代替测试。

当前需要补建的关键行为为：持久化幂等、未知结果核对、人工继续、三轮上下文、Codex生成边界、按试验累计的用量账本，以及SDK音频失败反馈。无需为此引入Redis、直播事件队列、云平台、多租户或常驻MCP服务。

## 04 实现顺序与出口

1. 冻结功能设计、图像/音色配置结构和接口模型；具体声音与送模图仍按Q-004评审。
2. 在另行授权实现后建立前后端应用、同源边界、只读配置检查、幂等账本与状态机；先用模拟依赖验证失败路径，不访问收费服务。
3. 接入单会话创建、RTC展示、声音恢复与结束核对；先确保能可靠退出，再增加问答。
4. 完成本地Codex适配、受限运行验证、答案校验；再接Vidu text_tts，禁止自动续开、暖场和失败重发。
5. 接人工继续与最近3轮上下文；验证双击、结束竞争、重启和晚到结果。
6. 用户确认账号、测试规模和预算后，按TC-016—020执行真实短测；记录首音、动态形象、回答语义和结束/费用证据，失败如实保留。

具体职责与接口见[共享设计](../design/03-Vidu网页PoC最小业务设计.md)，每个当前功能有独立设计；13项后置功能的源码参考和重新进入条件见[设计索引](../design/00-功能设计索引.md)。上述为依赖顺序，不是已授权的代码任务或测试额度。

## 05 许可、未知与评审结论

仓库[LICENSE](https://github.com/garycaogan/ai-live-avatar/blob/5559ec5440c93814737155183dbe832df0b9f215/LICENSE)为MIT；未来如复制或改写实质代码，应保留版权和许可声明。第三方SDK、云服务和人物资产各有自己的使用边界；作者私有素材不因代码开源而可取得。本轮只整理设计，没有复制代码进应用目录。

本轮静态证据足以决定“借鉴协议与媒体分层，补建本地问答和可靠性”，不足以确认声音可用、动态保形、首音延迟、SDK音频恢复、Codex工具隔离或供应商停费。所有真实TC保持未执行；具体voice ID、送模版本和动态观感待评审，预算等实际调用前再定。
