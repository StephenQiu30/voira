# 后端 Agent 入口

1. 遵循根目录[AGENTS](../AGENTS.md)，按[PROJECT](../PROJECT.md)、[后端规范](../docs/templates/08-后端开发规范.md)组织代码；Google Python风格和FastAPI框架用法分别依据官方来源。
2. 当前网页PoC的后端目录仍为骨架，不直接运行研究快照。API按功能放在app/api，无版本号分层；接口文档由FastAPI注解、模型及路由声明自动生成，不创建导出脚本或脚本目录。
3. 提交继承[根目录提交规范](../AGENTS.md#05-代码提交规范)，使用type(scope): xxx；保留并行改动，分别记录Mock、真实依赖和终止核验证据，不以HTTP成功代替会话真正结束。
