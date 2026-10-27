# 工作区 Agent 入口

- 仓库根目录保留`.git`，GitHub仓库名仍为`voira`，不重复初始化Git。
- `voira-server/`包含原有项目及知识库；开始工作先读[项目AGENTS](voira-server/AGENTS.md)，执行和提交规范以该文件为准。未经用户授权不提交、推送或部署。
- 根目录`public/`为本地完整资源库，由根级/public/规则忽略，不上传GitHub。`voira-server/frontend/public`为独立真实目录，只保存页面需要的展示资源并随前端提交；不使用指向本地资源库的符号链接。
- `voira-pet/`是独立Git仓库，定位为ChatGPT Work宠物；遵循其[AGENTS](voira-pet/AGENTS.md)。外层Git忽略该目录，不作为普通文件或gitlink提交；宠物制作遵循Pets插件流程，不自动扩展独立应用。
- 保留并行改动；迁移后的任务状态和验证摘要仍由`voira-server/BLACKLOG.md`、`voira-server/HANDOVER.md`唯一维护。
