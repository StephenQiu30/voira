---
类型: 规范
状态: 有效
版本: 0.14
更新: 2026-10-25
---

# PROJECT — 项目结构与工程约定

## 01 用途与确认依据

本文是声伴 · Voira（工程目录voira）的目录、技术栈和跨端协作入口。2026-10-25 用户明确要求创建前后端目录并编写工程规范：前端采用 Next.js、React、shadcn/ui、Radix UI、Tailwind CSS、Prettier、ESLint、Axios、Zustand、Umi OpenAPI；后端采用 FastAPI，遵循 Google 风格。

后端目录统一拼写为 `backend`。初始阶段创建目录骨架和规范；T-084已在用户授权下初始化可运行Next.js前端及人物选择页布局，T-090已交付backend角色美术Skill及任务准备服务；前端API客户端、真实生图和数字人业务仍未实现。当前[业务需求索引v0.10](docs/requirement/01-数字人MVP需求草案.md)已按用户指令改为先跑通网页数字人，直播后置；工程栈和以下目录约定不变。Vidu、蓝色大肥鱼、合成画面和问答已确认；本地优先及本地Codex回答已确认，接入协议从简；音色方向、人设、回答长度、人工继续及最近3轮上下文已确认；具体音色/送模/观感待评审，账号预算等实际调用前再定，不以外部开播权限为前置条件。

本版按用户补充要求简化：路由按功能组织，不设置版本目录或版本号URL前缀；接口文档由FastAPI声明自动生成；不创建自定义脚本文件或脚本目录；前端API生成结果统一放入 `frontend/src/api/`。

功能需求按用户要求一功能一文档，docs/requirement的01文档只维护索引、阶段范围与共享约束；独立FR链接设计、PRD及计划，不新建第二份当前规格。

## 02 实际目录

以下目录已创建；空目录中的 `.gitkeep` 仅用于保留结构，不是应用代码。以后新增有实际内容的文件时可移除对应占位文件。

```text
voira/
├── PROJECT.md                    # 目录、技术栈、跨端约定的唯一入口
├── DESIGN.md                     # Vercel风格、主题与无边框视觉规范
├── README.md                     # 项目阅读入口
├── AGENTS.md                     # Agent 工作入口
├── BLACKLOG.md                   # 唯一任务队列与状态
├── HANDOVER.md                   # 交接与验证边界
├── backend/                      # FastAPI 后端，独立管理 Python 依赖
│   ├── AGENTS.md                 # 后端规范入口
│   ├── README.md                 # 后端说明
│   ├── app/
│   │   ├── api/                  # 按功能组织HTTP路由、请求边界与依赖
│   │   ├── core/                 # 配置、日志、异常等基础能力
│   │   ├── schemas/              # Pydantic 请求与响应模型
│   │   ├── services/             # 用例编排与业务规则
│   │   ├── skills/               # 三视图／设定卡／坐姿Skill及角色预设
│   │   └── integrations/         # 外部服务适配与协议隔离
│   └── tests/                    # 后续后端测试
├── frontend/                     # Next.js 前端，独立管理 Node 依赖
│   ├── AGENTS.md                 # 前端规范入口
│   ├── README.md                 # 前端说明
│   ├── public/                   # 可公开访问的静态资源
│   │   ├── characters/           # 最终坐姿、三视图与设定图
│   │   │   ├── 01-natural/       # 自然陪伴
│   │   │   ├── 02-listening/     # 认真倾听
│   │   │   ├── 03-casual/        # 轻松闲聊
│   │   │   ├── 04-playful/       # 俏皮回应
│   │   │   ├── 05-thinking/      # 托腮思考
│   │   │   ├── turnarounds/      # 最终三视图
│   │   │   └── cards/            # 最终角色设定图
│   │   ├── scenes/               # 最终场景背景
│   │   └── brand/                # Logo与字标SVG
│   ├── src/
│   │   ├── app/                  # App Router 页面、布局与全局样式
│   │   ├── components/
│   │   │   └── ui/               # 基于 Radix UI 的 shadcn/ui 组件源码
│   │   ├── features/             # 经需求确认后按功能组织的界面与交互
│   │   ├── hooks/                # 跨功能可复用 React Hooks
│   │   ├── lib/                  # Axios 适配、配置读取和基础工具
│   │   ├── api/                  # Umi OpenAPI 生成的API类型与请求代码
│   │   ├── stores/               # Zustand 客户端共享状态
│   │   └── types/                # 非生成的前端专属类型
│   └── tests/                    # 后续前端测试
└── docs/
    ├── .obsidian/                # 已有本地知识库配置
    ├── 00-知识库导航.md
    ├── requirement/              # 实际需求
    ├── design/                   # 界面、资产、逐功能设计与共享业务契约
    ├── prd/                      # 实际产品验收规格草案
    ├── plan/                     # 实际执行计划与 PoC 研究草案
    ├── templates/                # 模板与有效编写/开发规范
    └── research/                 # 研究、原始证据与第三方参考源码
```

T-084已增加前端页面、BasicLayout、人物展示功能及package.json／package-lock.json／Next.js、TypeScript、ESLint、Prettier配置；上图为目录职责示意。T-090已增加后端main.py、角色素材api／schemas／services、两套skills、pyproject.toml和uv.lock。数据库、迁移、队列和独立媒体进程的目录按正式设计需要添加，不预建微服务或供应商专属工程。`docs/research/reference/` 始终作为参考资料保存。

## 03 技术栈与职责

| 端 | 技术 | 工程职责 |
|---|---|---|
| 前端 | Next.js + React + TypeScript | 使用 App Router；TypeScript strict 作为初始化要求；渲染、页面与交互 |
| 前端 | shadcn/ui + Radix UI | 采用 Radix 版本的组件；shadcn 源码置于 components/ui，复杂交互复用 Radix primitives |
| 前端 | Tailwind CSS | 样式与统一设计变量，避免在不同组件重复维护主题值 |
| 前端 | Prettier + ESLint | 分别负责格式和代码质量；配置不得互相冲突 |
| 前端 | Axios | 统一 HTTP 请求、取消、超时与错误适配 |
| 前端 | Zustand | 需要跨组件共享的客户端状态；普通局部状态留在 React |
| 前端 | Umi OpenAPI（`@umijs/openapi`） | 从后端契约生成 TypeScript 类型与请求代码，作为开发工具使用；不引入 Umi 应用框架 |
| 后端 | Python + FastAPI + Pydantic | 接口、校验、业务编排及 OpenAPI 契约；遵循 Google Python Style Guide 和 FastAPI 官方指南 |

T-084前端已锁定Next.js 16.4.3、React 19.3.1、Tailwind CSS 4.3.3与Radix UI 1.8.1，使用npm 12.0.2；完整直接／间接版本见frontend/package.json及package-lock.json。T-090后端使用Python 3.13，FastAPI 0.162.0、Pydantic 2.14.1；依赖使用uv.lock锁定，启动与检查见backend README。初始化时核验 Node/Python、Next.js/React、shadcn/Radix/Tailwind、FastAPI/Pydantic 和生成器的兼容组合，记录版本并生成各端锁文件；不使用漂移的 `latest` 作为可复现基线。媒体路线已确定为Vidu；[最小业务设计](docs/design/03-Vidu网页PoC最小业务设计.md)提出ARTC订阅、SQLite和HTTP状态快照，本地Codex作为回答生成进程，建议codex exec后交给Vidu text_tts；这些接入细节仍待验证。部署先本机，后端包管理器采用uv。

规范正文：[前端开发规范](docs/templates/07-前端开发规范.md) · [后端开发规范](docs/templates/08-后端开发规范.md)。统一视觉以[DESIGN](DESIGN.md)为准，提交格式以[AGENTS第05节](AGENTS.md#05-代码提交规范)的 `type(scope): xxx` 为准。两端README和AGENTS只维护入口，不复制整套规则。

## 04 接口与生成代码协作

1. 正式设计先定义接口及 DES 编号，再在 FastAPI 路由和 Pydantic 模型实现。HTTP业务接口使用 `/api` 前缀，按功能组织APIRouter；目录和URL不引入版本号分层。稳定且唯一的 `operation_id`、tags、状态码、请求/响应及错误模型共同构成契约。
2. 接口文档通过Python类型注解、Pydantic模型字段与路由装饰器声明（summary、description、responses等）自动生成。FastAPI默认在 `/openapi.json` 提供OpenAPI JSON接口文件，`/docs` 提供Swagger UI展示；两者使用同一份自动生成的定义，不手写或另行导出契约文件。
3. 前端通过 `@umijs/openapi` 的声明式配置与现成CLI读取后端 `/openapi.json`，输出到 `frontend/src/api/`；配置使用后端环境地址，不写入凭据。不编写额外生成/导出脚本文件，不建立脚本目录。固定生成器版本与配置，禁止手改生成代码或另写一份同义 DTO。
4. 通过生成器自定义请求导入接入 `frontend/src/lib/` 中的 Axios 适配层。先核对锁定版本的请求签名，再实现参数映射和返回值适配；不能假设 Axios 实例与生成器默认 request 签名兼容。
5. 变更模型或接口后，从自动更新的 `/openapi.json` 再生成客户端、检查差异、执行两端静态检查及契约测试。覆盖可空与可选、枚举、错误响应、取消、multipart、路径前缀和实际使用的响应类型。FastAPI输出的OpenAPI规范版本与生成器支持范围须通过样例验证；规范版本不同于业务URL版本，不直接改规范版本字段伪装兼容。读取schema不得触发真实生成、开播或收费会话。

T-090已提供角色素材准备接口及自动文档端点；该接口尚无前端消费，Umi客户端生成与会话契约仍待后续接入验证。OpenAPI客户端用于HTTP控制接口；RTC、WebSocket或SSE如经设计采用，须单独描述协议、鉴权、事件及重连语义。自动文档机制依据[FastAPI官方入门指南](https://fastapi.tiangolo.com/tutorial/first-steps/)（2026-10-25核对）。

## 05 工程边界与维护

- Next.js 服务端承担页面渲染及必要代理，FastAPI 承担业务规则；不在 Next.js Route Handlers 中重复实现一套核心业务。浏览器共享状态不能充当数字人会话、计费或任务结果的事实来源。
- 长期供应商密钥保存在后端。`NEXT_PUBLIC_*` 和 public 目录均视为公开内容；服务端密钥不得经 props、日志或生成契约泄漏。环境示例仅保留占位值。
- 本轮完成依据见[工程目录与规范落地计划](docs/plan/06-工程目录与规范落地计划.md)。后续运行检查与真实服务验收按阶段记录；尚未存在的命令不写成可运行步骤。
- 目录变化同步本文与[知识库导航](docs/00-知识库导航.md)；规则变化修改所属规范。状态仅维护在 [BLACKLOG](BLACKLOG.md)，交接只更新 [HANDOVER](HANDOVER.md)。

## 06 设计交付资产

最终图片统一放在frontend/public：characters存角色，scenes存场景，brand存Logo与字标。角色按自然陪伴01-natural、认真倾听02-listening、轻松闲聊03-casual、俏皮回应04-playful、托腮思考05-thinking分目录；三视图放turnarounds，设定图放cards。文件名统一为角色名.png，不带版本号；只保留实际完成的角色，不补空文件。

旧稿、参考、候选、生成清单和校验过程统一放本地output，已由.gitignore排除，不提交GitHub。docs只维护设计、当前提示词与最终素材引用；不得在public或docs另建history、references、pending、review-set版本目录。当前DeepSeek七张最终稿见[素材记录](docs/design/02-五位角色素材生成记录.md)，可复用提示词见[设计26](docs/design/26-DeepSeek角色生成提示词.md)。静态图片交付不代表前端应用或动态服务已实现。

## 07 业务设计入口

[功能设计索引](docs/design/00-功能设计索引.md)将16项网页PoC功能分别落到DES-018—033，列出职责、流程、内部/外部接口、数据生命周期、故障与验收；[共享设计v0.6](docs/design/03-Vidu网页PoC最小业务设计.md)集中维护8个HTTP端点、会话/输入状态及SQLite拟建结构。参考仓库适配理由见[RES-008](docs/research/07-参考仓库到网页PoC实现映射.md)。这不改变已确认技术栈，也不表示已创建这些服务或数据库。


## 08 仓库身份与本地路径

2026-10-25用户直接授权创建仓库并按产品设计改名。GitHub为[StephenQiu30/voira](https://github.com/StephenQiu30/voira)，T-060交付核验时为公开仓库且main已有首次资料提交（创建时为私有，本轮未修改可见性）；本地真实路径`/Users/stephenqiu/Desktop/StephenQiu/voira`，Git初始分支main，origin为`https://github.com/StephenQiu30/voira.git`。

旧路径`/Users/stephenqiu/Desktop/StephenQiu/DigitalHuman`是指向voira的兼容符号链接，不是第二份工程或第二个Git仓库。保留它以兼容正在运行的设计会话及已有Codex项目路径；应用侧保存的项目标签/路径不因文件夹改名自动更新，后续操作优先使用真实路径。所有旧路径使用者迁移后才能移除该链接。

T-060已按用户授权审阅并提交推送220个文件，包括文档、设计素材和目录骨架；交付核验见工程计划06第06节。15份研究证据已脱敏，原件仅保留在被忽略的.local目录；运行状态、秘密配置、临时文件、依赖/缓存和SQLite文件不提交。后续仍按明确文件清单审核与提交，保留并行修改；业务实现与模型调用授权边界不变。


## 09 T-084 前端布局基线

用户明确授权从布局开始实现，交付入口见[frontend README](frontend/README.md)。BasicLayout只负责Header／Content／Footer，人物选择状态位于功能组件。Figma桌面61:2473／手机61:2803为视觉依据，T-084曾单独保存stage透明图，T-116已统一归入五态目录并移除重复副本。当前不接入API、媒体、直播或队列业务。实际检查见计划09第12节。

## 10 T-090 角色美术Skill服务

[backend README](backend/README.md)维护启动、接口和调用示例。app/skills/character-turnaround与character-card保存本项目适配的SKILL.md；profiles/deepseek.json保存造型，不将DeepSeek限制写成通用人设。schemas校验输入，services按固定注册项读取规则并生成内容版本，api提供本机查询／prepare，FastAPI提供自动契约。没有真实图像适配器或素材解析器，不把聊天工具当SDK。

规则运行入口归backend两个Skill；docs/design20维护视觉决策，26保留实际样稿提示词与生成证据，第三方快照保持原样。输出规格在schemas中约束，本轮只准备整张三视图／卡面；独立透明素材仍依设计规则另行制作。此服务不改public，不创建脚本目录、数据库或持久任务队列。

T-094扩展character-seated-poses，五种动作集中在poses.json；prepare通过pose_id单选，另增GET /api/agents/character-assets/poses供查询。坐姿输出2:3透明PNG，原三视图／卡片保持3:2白底。规则版本覆盖动作资源；输出图片仍由聊天工具制作，backend不执行真实生图。
