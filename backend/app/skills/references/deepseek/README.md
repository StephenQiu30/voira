# DeepSeek当前形象定义

四种特点分别有独立风格Skill与当前角色配置：

| 特点 | 风格Skill | 当前描述 |
|---|---|---|
| Q版 | [character-style-chibi](../../character-style-chibi/SKILL.md) | [deepseek-chibi.json](../../profiles/deepseek-chibi.json) |
| 少女 | [character-style-maiden](../../character-style-maiden/SKILL.md) | [deepseek-maiden.json](../../profiles/deepseek-maiden.json) |
| 成女 | [character-style-adult](../../character-style-adult/SKILL.md) | [deepseek-adult.json](../../profiles/deepseek-adult.json) |
| 礼服 | [character-style-gown](../../character-style-gown/SKILL.md) | [deepseek.json](../../profiles/deepseek.json) |

提示词读取所选配置的完整当前定义，直接描述人物外观与气质，再追加本次动作和输出形式。四种特点平行保留，少女与成女互不替代。礼服当前定义为完整站姿，默认查询端点已读取此配置。

共同身份以蓝瞳、浅雾蓝长发、大弧线环形呆毛及轻薄白褶蓝白头饰为识别点。Q版保持整齐发束，少女保持顺直轻盈长发，成女与礼服采用宽松波浪和双侧肩前细编发。礼服生成时使用当前成女三视图锁定身份，已采用礼服立绘提供衣装结构；各特写保持同一发色与发型。

最终采用图位于[public人物目录](../../../../../public/characters/README.md)，按特点／deepseek保存；成女已采用用户选定的白褶头饰、双侧前垂编发、露肩轻纱袖及蓝白短款花瓣裙形象，profile与母图一致。礼服身份统一后的站姿与设定卡已采用，旧五态及三视图暂存output，新礼服对应素材待制作；前端已采用成女五态站姿，成女母图与三视图保留为身份参考。图片采用状态与文字定义分别维护。本目录只提供入口，具体流程见[风格制作规则](../character-style-workflow.md)。
