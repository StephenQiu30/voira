---
类型: 规范
状态: 有效
更新: 2026-10-27
---

# PROJECT — 项目结构与工程约定

## 01 工程定位

本目录就是仓库[StephenQiu30/voira](https://github.com/StephenQiu30/voira)，路径为`/Users/stephenqiu/Desktop/StephenQiu/voira`。网页项目、知识库与规范都在仓库根目录。`public/`是仅本地保存的完整资源库，不上传GitHub；`voira-pet/`是独立的[ChatGPT Work宠物仓库](https://github.com/StephenQiu30/voira-pet)，拥有自己的.git，本仓库忽略该目录。当前DeepSeek已完成v2动画精灵图、校验及Pets创建，其余三位仍为静态素材。运行、开发与供应商秘密均以本机实际配置为准。

业务范围见[需求索引](docs/requirement/01-数字人MVP需求草案.md)，当前实现与未测项见[HANDOVER](HANDOVER.md)。本文只维护工程职责，不追加交付历史。

## 02 目录职责

下表路径相对仓库根目录。

| 位置 | 职责 |
|---|---|
| frontend/src/app | Next.js App Router装配、页面与全局样式 |
| frontend/src/components | 通用组件；ui为Radix版shadcn，layout为BasicLayout |
| frontend/src/features | 按业务组织的状态、视图和交互 |
| frontend/src/api | Umi OpenAPI生成的类型与HTTP请求；接入时生成，不手写DTO替代 |
| frontend/src/lib、hooks、stores、types | 基础请求／配置、共享Hook、必要Zustand状态、非生成类型；按实际需要添加 |
| public/characters、scenes、brand | 仅本地的完整资源库，由根/public/规则忽略；按特点／人物保存最终图片，旧图暂存output |
| frontend/public | 独立真实目录，只保存页面实际展示的人物、场景和品牌资源；随前端提交，不依赖本地素材库 |
| voira-pet/public/characters/chibi | 四位角色各立绘与设定卡的独立副本；DeepSeek宠物成品另见voira-pet/public/pets/deepseek |
| backend/app/api、schemas、services | 功能路由、Pydantic边界、用例编排 |
| backend/app/core、integrations | 配置／基础设施、外部AI及媒体适配；按实现需要增加 |
| backend/app/skills | 三套输出任务规则、四套人物风格Skill、poses.json和当前角色profiles；不存生成中间图 |
| frontend/tests、backend/tests | 对应端检查；不默认调用付费服务 |
| docs | 可持久维护的需求、设计、验收、计划和规范；导航定义阅读入口 |
| output、.local | Git忽略的过程产物／恢复副本，不属于知识库或运行服务 |

不预建微服务、空抽象、脚本目录或供应商专属工程；数据库迁移按正式设计必要性增加。SQLite意图账本为业务方案，尚未实现。

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

依赖版本以各端package.json／package-lock.json、pyproject.toml／uv.lock为准，避免本文再复制一份版本清单。后端使用uv；启动和检查命令分别由[frontend README](frontend/README.md)与[backend README](backend/README.md)维护。

Next.js负责页面和必要代理，FastAPI负责业务；不在Route Handlers重复实现核心规则。共享会话以服务端为准，浏览器状态不能作为计费或任务成功依据。部署本机优先；七项AI适配与Vidu边界见[共享设计](docs/design/03-Vidu网页PoC最小业务设计.md)。

## 04 接口与生成代码协作

1. 正式设计先定义接口及 DES 编号，再在 FastAPI 路由和 Pydantic 模型实现。HTTP业务接口使用 `/api` 前缀，按功能组织APIRouter；目录和URL不引入版本号分层。稳定且唯一的 `operation_id`、tags、状态码、请求/响应及错误模型共同构成契约。
2. 接口文档通过Python类型注解、Pydantic模型字段与路由装饰器声明（summary、description、responses等）自动生成。FastAPI默认在 `/openapi.json` 提供OpenAPI JSON接口文件，`/docs` 提供Swagger UI展示；两者使用同一份自动生成的定义，不手写或另行导出契约文件。
3. 前端通过 `@umijs/openapi` 的声明式配置与现成CLI读取后端 `/openapi.json`，输出到 `frontend/src/api/`；配置使用后端环境地址，不写入凭据。不编写额外生成/导出脚本文件，不建立脚本目录。固定生成器版本与配置，禁止手改生成代码或另写一份同义 DTO。
4. 通过生成器自定义请求导入接入 `frontend/src/lib/` 中的 Axios 适配层。先核对锁定版本的请求签名，再实现参数映射和返回值适配；不能假设 Axios 实例与生成器默认 request 签名兼容。
5. 变更模型或接口后，从自动更新的 `/openapi.json` 再生成客户端、检查差异、执行两端静态检查及契约测试。覆盖可空与可选、枚举、错误响应、取消、multipart、路径前缀和实际使用的响应类型。FastAPI输出的OpenAPI规范版本与生成器支持范围须通过样例验证；规范版本不同于业务URL版本，不直接改规范版本字段伪装兼容。读取schema不得触发真实生成、开播或收费会话。

角色准备接口已有自动文档；其前端生成客户端兼容尚未验收。RTC与Vidu WS另按业务设计定义，不由HTTP客户端替代。自动文档机制依据[FastAPI官方入门指南](https://fastapi.tiangolo.com/tutorial/first-steps/)（2026-10-25核对）。

## 05 安全与维护

长期密钥仅后端持有，frontend/public、NEXT_PUBLIC变量及浏览器props均视为公开内容；示例配置只含占位。生成器和schema读取不能创建收费会话。共享规范见[前端](docs/templates/07-前端开发规范.md)与[后端](docs/templates/08-后端开发规范.md)；提交规则归[AGENTS](AGENTS.md)。

## 06 设计交付资产

完整最终资源置于本地public/characters、scenes、brand，不上传GitHub；frontend/public为独立目录，按现有URL复制页面所需资源，部署不依赖根public。当前展示集合为9张人物、2张场景与1张品牌SVG。DeepSeek五态保存在characters/adult/deepseek下，以pose_id.png命名；礼服立绘与卡片保存在gown/deepseek。其余四位当前引用characters/adult/{character_id}/master.png，只启用自然陪伴；缺失动作生成并采用后再启用。四风格均以特点／人物组织master.png与card.png；旧编号姿态、cards及turnarounds目录移到被忽略的output。同路径替换可用版本查询参数刷新缓存，须同时核对Next Image优化器兼容。

候选、旧稿、参考图、生成清单放output，不在public或docs另建history／pending／review-set。造型和正式资源入口归[视觉设定20](docs/design/20-人物三视图视觉设定.md)；运行Skill与角色配置是制作规则唯一来源，prepared不代表真实生图，静态资源不代表AI或数字人会话已接通。
