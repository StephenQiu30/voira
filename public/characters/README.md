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

## ChatGPT · 银白龙裔

| 特点 | 最终立绘 | 当前定义 |
|---|---|---|
| Q版 | [master.png](chibi/chatgpt/master.png) | 大头小身体、微鼓脸颊、银白层叠短裙 |
| 少女 | [master.png](maiden/chatgpt/master.png) | 柔和轻盈、双手轻合、蓬松裙层 |
| 成女 | [master.png](adult/chatgpt/master.png) | 沉静知性、舒展体态、收腰花瓣裙与摊手动作 |
| 礼服 | [master.png](gown/chatgpt/master.png) | 前短后长层叠礼服，领口、袖缘和裙边点缀银白蕾丝 |

四张均为1024×1536透明PNG，共同身份为银白长发、双龙角、淡紫眼睛及银色交织结形发饰；紫色仅少量点缀。当前每种特点只有立绘，新三视图、设定卡与五态尚未制作。前端现用旧五态仍保留，不能作为新形象的身份参考。

生成定义见[ChatGPT四风格配置入口](../../backend/app/skills/references/chatgpt/README.md)。正式目录只保留上述采用图，未采用候选与原始提示词留在output临时目录。

## Claude · 向日葵

| 特点 | 最终立绘 | 当前定义 |
|---|---|---|
| Q版 | [master.png](chibi/claude/master.png) | 大头小身体、双手轻合、闭眼浅笑 |
| 少女 | [master.png](maiden/claude/master.png) | 柔和轻盈、无眼镜、合手短裙 |
| 成女 | [master.png](adult/claude/master.png) | 细金框眼镜、扶镜动作与深棕主裙 |
| 礼服 | [master.png](gown/claude/master.png) | 细金框眼镜、米白深棕层叠长裙、蕾丝及金色花饰 |

四张均为1024×1536透明PNG；铜橙长发、脸侧细辫、向日葵与棕色发饰保持共同身份。生成定义见[Claude四风格配置入口](../../backend/app/skills/references/claude/README.md)。每种特点当前仅有立绘，新三视图、设定卡与五态待制作；前端现用坐姿资源暂时保留，不作为新形象的身份参考。
