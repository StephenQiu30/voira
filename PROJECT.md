---
类型: 规范
状态: 有效
版本: 0.11
更新: 2026-10-25
---

# PROJECT — 项目结构与工程约定

## 01 用途与确认依据

本文是声伴 · Voira（工程目录voira）的目录、技术栈和跨端协作入口。2026-10-25 用户明确要求创建前后端目录并编写工程规范：前端采用 Next.js、React、shadcn/ui、Radix UI、Tailwind CSS、Prettier、ESLint、Axios、Zustand、Umi OpenAPI；后端采用 FastAPI，遵循 Google 风格。

后端目录统一拼写为 `backend`。本轮创建目录骨架和规范文件，尚未安装依赖、生成应用或编写业务代码；目录存在不代表项目可运行。当前[业务需求索引v0.10](docs/requirement/01-数字人MVP需求草案.md)已按用户指令改为先跑通网页数字人，直播后置；工程栈和以下目录约定不变。Vidu、蓝色大肥鱼、合成画面和问答已确认；本地优先及本地Codex回答已确认，接入协议从简；音色方向、人设、回答长度、人工继续及最近3轮上下文已确认；具体音色/送模/观感待评审，账号预算等实际调用前再定，不以外部开播权限为前置条件。

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
│   │   └── integrations/         # 外部服务适配与协议隔离
│   └── tests/                    # 后续后端测试
├── frontend/                     # Next.js 前端，独立管理 Node 依赖
│   ├── AGENTS.md                 # 前端规范入口
│   ├── README.md                 # 前端说明
│   ├── public/                   # 可公开访问的静态资源
│   │   ├── characters/           # 按姿态状态组织，每个目录五位角色
│   │   │   ├── 01-natural/       # 状态一：自然坐姿
│   │   │   ├── 02-crossed/       # 状态二：翘腿坐姿
│   │   │   └── 03-leaning/       # 状态三：侧斜坐姿
│   │   └── scenes/               # 配套场景背景
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

`main.py`、`__init__.py`、页面、依赖清单、锁文件和工具配置均在后续应用初始化时创建，目前不在上图中冒充已交付。数据库、迁移、队列和独立媒体进程的目录按正式设计需要添加，不预建微服务或供应商专属工程。`docs/research/reference/` 始终作为参考资料保存。

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

版本尚未锁定。初始化时核验 Node/Python、Next.js/React、shadcn/Radix/Tailwind、FastAPI/Pydantic 和生成器的兼容组合，记录版本并生成各端锁文件；不使用漂移的 `latest` 作为可复现基线。媒体路线已确定为Vidu；[最小业务设计](docs/design/03-Vidu网页PoC最小业务设计.md)提出ARTC订阅、SQLite和HTTP状态快照，本地Codex作为回答生成进程，建议codex exec后交给Vidu text_tts；这些接入细节仍待验证。部署先本机，包管理器未锁定。

规范正文：[前端开发规范](docs/templates/07-前端开发规范.md) · [后端开发规范](docs/templates/08-后端开发规范.md)。统一视觉以[DESIGN](DESIGN.md)为准，提交格式以[AGENTS第05节](AGENTS.md#05-代码提交规范)的 `type(scope): xxx` 为准。两端README和AGENTS只维护入口，不复制整套规则。

## 04 接口与生成代码协作

1. 正式设计先定义接口及 DES 编号，再在 FastAPI 路由和 Pydantic 模型实现。HTTP业务接口使用 `/api` 前缀，按功能组织APIRouter；目录和URL不引入版本号分层。稳定且唯一的 `operation_id`、tags、状态码、请求/响应及错误模型共同构成契约。
2. 接口文档通过Python类型注解、Pydantic模型字段与路由装饰器声明（summary、description、responses等）自动生成。FastAPI默认在 `/openapi.json` 提供OpenAPI JSON接口文件，`/docs` 提供Swagger UI展示；两者使用同一份自动生成的定义，不手写或另行导出契约文件。
3. 前端通过 `@umijs/openapi` 的声明式配置与现成CLI读取后端 `/openapi.json`，输出到 `frontend/src/api/`；配置使用后端环境地址，不写入凭据。不编写额外生成/导出脚本文件，不建立脚本目录。固定生成器版本与配置，禁止手改生成代码或另写一份同义 DTO。
4. 通过生成器自定义请求导入接入 `frontend/src/lib/` 中的 Axios 适配层。先核对锁定版本的请求签名，再实现参数映射和返回值适配；不能假设 Axios 实例与生成器默认 request 签名兼容。
5. 变更模型或接口后，从自动更新的 `/openapi.json` 再生成客户端、检查差异、执行两端静态检查及契约测试。覆盖可空与可选、枚举、错误响应、取消、multipart、路径前缀和实际使用的响应类型。FastAPI输出的OpenAPI规范版本与生成器支持范围须通过样例验证；规范版本不同于业务URL版本，不直接改规范版本字段伪装兼容。读取schema不得触发真实生成、开播或收费会话。

以上是待落地的工程流程，目前没有可运行应用、自动文档端点或生成物。OpenAPI客户端用于HTTP控制接口；RTC、WebSocket或SSE如经设计采用，须单独描述协议、鉴权、事件及重连语义。自动文档机制依据[FastAPI官方入门指南](https://fastapi.tiangolo.com/tutorial/first-steps/)（2026-10-25核对）。

## 05 工程边界与维护

- Next.js 服务端承担页面渲染及必要代理，FastAPI 承担业务规则；不在 Next.js Route Handlers 中重复实现一套核心业务。浏览器共享状态不能充当数字人会话、计费或任务结果的事实来源。
- 长期供应商密钥保存在后端。`NEXT_PUBLIC_*` 和 public 目录均视为公开内容；服务端密钥不得经 props、日志或生成契约泄漏。环境示例仅保留占位值。
- 本轮完成依据见[工程目录与规范落地计划](docs/plan/06-工程目录与规范落地计划.md)。后续运行检查与真实服务验收按阶段记录；尚未存在的命令不写成可运行步骤。
- 目录变化同步本文与[知识库导航](docs/00-知识库导航.md)；规则变化修改所属规范。状态仅维护在 [BLACKLOG](BLACKLOG.md)，交接只更新 [HANDOVER](HANDOVER.md)。

## 06 设计交付资产

产品显示名为声伴 · Voira，工程目录与GitHub仓库统一为voira。统一视觉见[DESIGN](DESIGN.md)；界面草案与Logo/token资产位于[docs/design](docs/design/01-网页体验界面设计.md)及其assets目录。资产CSS是设计交接内容，尚未接入frontend/src/app/globals.css；本轮未生成应用、依赖清单或组件代码。

角色静态素材按用户要求保存在frontend/public/characters，以01-natural（自然坐姿）、02-crossed（翘腿坐姿）、03-leaning（侧斜坐姿）分目录；每个状态固定为deepseek.png、gemini.png、claude.png、grok.png、chatgpt.png。切换状态通过目录区分，不在public文件名继续堆叠v2/v3版本号。

旧版本保存在docs/design/assets/characters/history/v1与v2，用户姿态参考保存在同级references；public仅维护当前三状态共15张角色图。配套背景继续位于frontend/public/scenes；来源、实际提示词、状态映射及哈希见[素材记录](docs/design/02-五位角色素材生成记录.md)。这些文件不构成可运行前端或实时姿态切换能力。


## 07 业务设计入口

[功能设计索引](docs/design/00-功能设计索引.md)将16项网页PoC功能分别落到DES-018—033，列出职责、流程、内部/外部接口、数据生命周期、故障与验收；[共享设计v0.6](docs/design/03-Vidu网页PoC最小业务设计.md)集中维护8个HTTP端点、会话/输入状态及SQLite拟建结构。参考仓库适配理由见[RES-008](docs/research/07-参考仓库到网页PoC实现映射.md)。这不改变已确认技术栈，也不表示已创建这些服务或数据库。


## 08 仓库身份与本地路径

2026-10-25用户直接授权创建仓库并按产品设计改名。GitHub为[StephenQiu30/voira](https://github.com/StephenQiu30/voira)，当前为私有空仓库；本地真实路径`/Users/stephenqiu/Desktop/StephenQiu/voira`，Git初始分支main，origin为`https://github.com/StephenQiu30/voira.git`。

旧路径`/Users/stephenqiu/Desktop/StephenQiu/DigitalHuman`是指向voira的兼容符号链接，不是第二份工程或第二个Git仓库。保留它以兼容正在运行的设计会话及已有Codex项目路径；应用侧保存的项目标签/路径不因文件夹改名自动更新，后续操作优先使用真实路径。所有旧路径使用者迁移后才能移除该链接。

本次没有提交或推送；本地文档、素材及骨架仍未跟踪。新增.gitignore排除秘密配置、运行状态、依赖/缓存和SQLite文件；未来首次提交仍需逐文件审核，不自动全量暂存。业务实现与模型调用授权边界不变。
