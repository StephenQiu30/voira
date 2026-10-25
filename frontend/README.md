# frontend — Next.js 前端

## 01 工程入口

采用 Next.js + React + TypeScript + shadcn/ui（Radix UI）+ Tailwind CSS + Prettier + ESLint + Axios + Zustand + Umi OpenAPI。目录职责及接口协作见 [PROJECT](../PROJECT.md)，实现遵循 [前端开发规范](../docs/templates/07-前端开发规范.md)。

主题配色、字体与无边框界面统一遵循[DESIGN](../DESIGN.md)，代码提交遵循[根目录AGENTS](../AGENTS.md#05-代码提交规范)。

## 02 当前内容

src下已创建app、api、components/ui、features、hooks、lib、stores、types，另有public、tests目录。Umi OpenAPI生成的API类型与请求文件统一放在 `src/api/`；使用声明式配置与现成CLI读取后端自动生成的 `/openapi.json`，不创建额外脚本文件或脚本目录。尚未创建页面、package.json、锁文件、工具配置或生成客户端，当前不可构建或启动。

## 03 后续落地

初始化时锁定兼容版本并落地 App Router、TypeScript strict、ESLint/Prettier 与 Radix 组件配置；验证 FastAPI 契约到 Umi OpenAPI/Axios 的适配后，再写入真实可运行的命令。Umi OpenAPI只承担生成工具职责，任务前置条件以 [BLACKLOG](../BLACKLOG.md) 为准。
