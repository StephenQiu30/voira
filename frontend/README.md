# frontend — 声伴 · Voira

## 01 当前交付

T-084已初始化Next.js App Router应用，完成BasicLayout（Header／Content／Footer）、单人物舞台、人物档案、固定头像栏、三姿态Tabs及明暗主题。桌面／平板／手机采用响应式结构，不把Figma画板坐标直接固定到视口。

当前只有形象选择页面。角色／姿态切换是本地静态展示，不表示接入五个模型；交流按钮禁用并显示服务未连接。聊天、完整记录、直播、队列、真实音视频与API均未实现。后续按[计划09](../docs/plan/09-网页PoC逐功能实现与验收计划.md)分批推进。

## 02 启动与检查

本轮环境Node 24.19.0、npm 12.0.2。依赖精确版本与package-lock.json已保存。

```sh
npm ci
npm run dev -- --hostname 127.0.0.1 --port 3000
```

生产检查与启动：

```sh
npm run typecheck
npm run lint
npm run format:check
npm run build
npm run start -- --hostname 127.0.0.1 --port 3000
```

端口占用时选空闲应用端口，不终止其他项目。以上命令在frontend目录执行，不需要后端、密钥或模型账户。

## 03 结构与资源

- src/components/layout/basic-layout.tsx：品牌、场景背景、主内容槽和页脚；不维护会话业务状态。
- src/features/character-stage：角色静态数据与展示交互；页面装配保持在src/app/page.tsx。
- src/components/ui：shadcn Radix版组件源码；共享变体与焦点态集中维护。
- src/app/globals.css：黑白灰语义token、液态玻璃材质与响应式规则。字体本地加载Geist，中文使用系统回退。
- public/characters/stage：本轮从Git基线提取的三张透明DeepSeek舞台图，对齐当前Figma；最新白底母版仍保存在原姿态目录，未覆盖。其他四位角色复用现用透明PNG。
- public/scenes、public/brand：复用既有背景和SVG标志，无临时Figma素材URL。

主题偏好存储键为voira-theme，初次访问默认暗色。无自动轮播；头像切换不改尺寸，方向键仅移动Tab焦点，Enter／Space确认选择；支持减少动效偏好。

工程与视觉规范见[PROJECT](../PROJECT.md)、[DESIGN](../DESIGN.md)和[前端规范](../docs/templates/07-前端开发规范.md)。Axios、Zustand与Umi OpenAPI保留为后续真实功能依赖，本批没有为了布局安装或伪造生成客户端。
