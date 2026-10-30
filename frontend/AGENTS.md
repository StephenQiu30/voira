# 前端 Agent 入口

1. 遵循根目录[AGENTS](../AGENTS.md)，按[PROJECT](../PROJECT.md)、[前端规范](../docs/standard/frontend/01-前端开发规范.md)组织代码；视觉统一引用[DESIGN](../DESIGN.md)，不复制另套配色表。
2. 当前是网页PoC，T-084已实现前端布局与静态形象选择页；真实会话仍未接入。使用Next.js与已锁定的radix-nova shadcn/ui，黑白灰、无装饰边框，保留焦点及状态反馈；不扩展直播工作台或未批准页面。组件用shadcn CLI添加。Vercel CLI只在frontend目录、核对项目后使用；当前未链接，不自动link或部署。
3. Umi OpenAPI生成代码放在src/api，禁止手改；通过配置与现成CLI读取自动接口定义，不创建额外脚本文件或目录。
4. 提交继承[根目录提交规范](../AGENTS.md#05-代码提交规范)，使用type(scope): xxx。按实际情况记录类型/格式/构建与浏览器结果，静态检查不代替真实音视频验收。

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
