# 后端 Agent 入口

1. 遵循根目录[AGENTS](../AGENTS.md)，按[PROJECT](../PROJECT.md)、[后端规范](../docs/templates/03-后端开发规范.md)组织代码；Google Python风格和FastAPI框架用法分别依据官方来源。
2. T-090已实现内部角色美术Skill查询／任务准备，入口见README；真实生图、会话业务仍未接入，不直接运行研究快照。API按功能放在app/api，无版本号分层；接口文档由FastAPI注解、模型及路由声明自动生成，不创建导出脚本或脚本目录。
3. 提交继承[根目录提交规范](../AGENTS.md#05-代码提交规范)，使用type(scope): xxx；保留并行改动，分别记录Mock、真实依赖和终止核验证据，不以HTTP成功代替会话真正结束。

4. 三套运行Skill维护在app/skills，角色预设独立放profiles；services负责组装，不从HTTP输入读取任意文件或抓取URL。prepared只代表任务准备，不能写成图片已生成。
