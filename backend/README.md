# backend — FastAPI 后端

## 01 工程入口

采用 Python + FastAPI + Pydantic。目录职责及 OpenAPI 协作见 [PROJECT](../PROJECT.md)，开发遵循 [后端开发规范](../docs/templates/08-后端开发规范.md)：Google Python Style Guide + FastAPI 官方指南 + 本项目工程约定。

## 02 当前内容

已创建app/api、core、schemas、services、integrations及tests目录。路由按功能组织，使用 `/api` 前缀，不设置版本号分层。接口定义由类型注解、模型与路由声明自动生成，后续由 `/openapi.json` 提供JSON、`/docs`提供Swagger UI，不建立契约导出目录或脚本目录。尚未创建Python包、应用入口、依赖清单、锁文件、运行配置或业务接口，当前不可启动。

## 03 后续落地

应用初始化时补齐pyproject.toml、锁文件、包入口与质量工具配置，再写入经验证的启动、检查和自动接口文档访问方式；不编写额外脚本文件。具体业务开发遵循 [BLACKLOG](../BLACKLOG.md) 的前置条件，不运行研究目录中的第三方快照代替本后端。
