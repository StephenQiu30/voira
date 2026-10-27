# 前端 Agent 入口

1. 遵循根目录[AGENTS](../AGENTS.md)，按[PROJECT](../PROJECT.md)、[前端规范](../docs/templates/07-前端开发规范.md)组织代码；视觉统一引用[DESIGN](../DESIGN.md)，不复制另套配色表。
2. 当前是网页PoC，T-084已实现前端布局与静态形象选择页；真实会话仍未接入。使用Next.js与Radix版shadcn/ui，黑白灰、无装饰边框，保留焦点及状态反馈；不扩展直播工作台或未批准页面。
3. Umi OpenAPI生成代码放在src/api，禁止手改；通过配置与现成CLI读取自动接口定义，不创建额外脚本文件或目录。
4. 提交继承[根目录提交规范](../AGENTS.md#05-代码提交规范)，使用type(scope): xxx。按实际情况记录类型/格式/构建与浏览器结果，静态检查不代替真实音视频验收。
