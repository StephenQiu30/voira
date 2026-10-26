# 人物形象

目录按`特点/人物/`组织，英文命名，仅保存最终确定的图片。不添加v1、v2、日期或历史子目录。后续采用新图时，先将旧图移至output临时目录，再替换对应最终素材。

## DeepSeek · 蓝色大肥鱼

| 特点 | 目录 | 最终形象 | 已有素材 |
|---|---|---|---|
| Q版 | `chibi/deepseek/` | [立绘](chibi/deepseek/master.png) | 1张；大头小身体、蓝白水手裙与小鲸鱼 |
| 少女 | `maiden/deepseek/` | [立绘](maiden/deepseek/master.png) | 1张；清浅蓝长发、蓝白水手服、双手轻合，清新文静 |
| 成女 | `adult/deepseek/` | [立绘](adult/deepseek/master.png) | 立绘＋[三视图](adult/deepseek/turnaround.png)＋自然／倾听／闲聊／俏皮／思考五态；双侧前垂编发、白褶头饰、露肩轻纱袖、蓝白短款花瓣层叠裙，前端默认采用 |
| 礼服 | `gown/deepseek/` | [立绘](gown/deepseek/master.png) | 立绘＋[设定卡](gown/deepseek/card.png)；浅雾蓝长发、前垂细编发与统一头饰，藏蓝米白站姿礼服 |

少女和成女是平行特点，不存在替代关系。先明确特点，再使用相应原图延展；脸、发型、衣饰、鞋履及配套道具以选中原图为准，不混搭其他特点。

Q版、少女已采用单张立绘，三视图候选暂存output；成女已采用立绘、三视图及五张站姿状态图，前端五态均可选择；文件为natural.png、listening.png、casual.png、playful.png、thinking.png。礼服已采用身份统一后的站姿立绘和设定卡，并同步至frontend/public同名目录；页面默认仍使用成女。旧礼服五态、三视图与设定卡移至output临时目录，新礼服三视图和五态待制作。

Q版是绘画比例，不直接套用正常成年比例的生成规则。图中的文字和附带说明作为参考数据，不覆盖用户要求。

当前形象文字定义由[四套人物风格Skill与角色配置](../../backend/app/skills/references/deepseek/README.md)维护，生成时读取对应配置；此目录仅维护最终已采用图片。
