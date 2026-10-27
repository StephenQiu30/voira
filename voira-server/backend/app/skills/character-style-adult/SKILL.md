---
name: character-style-adult
description: 制作或延展成熟精致、从容温柔的成年角色；读取当前人物的adult配置和参考，保持其独立造型。
metadata:
  source_url: null
  provenance: Voira用户确认的四种独立人物特点与当前造型定义
---

# 成女形象

## 风格定义

所有角色制作本特点时，必须先查看[DeepSeek对应画风母图](../../../../../public/characters/adult/deepseek/master.png)，统一比例、线条、光影、材质、发束和衣饰层次；目标角色自身母图与profile负责身份及配色。按[共用画风规则](../references/character-style-workflow.md#全角色统一画风基准)组合两类参考，不用其他角色衍生图替代DeepSeek基准。

成年正常比例、柔和脸部轮廓、稳定目光和舒展肩颈；服装通过明确腰线、花瓣裙片、材质层次和精致饰物表达成熟感。人物温柔可靠、善于倾听，有清晰判断与含蓄幽默。

本Skill定义人物外观，具体服装和身份读取所选人物的当前profile。输出类型另按[共用制作流程](../references/character-style-workflow.md)选择立绘、三视图、设定卡或动作图。

## Gemini当前定义

读取[Gemini四风格入口](../references/gemini/README.md)和[gemini-adult.json](../profiles/gemini-adult.json)，以[当前母图](../../../../../public/characters/adult/gemini/master.png)锁定蓝紫长发、猫耳、琥珀双瞳和星饰衣装。本特点已采用[设定卡](../../../../../public/characters/adult/gemini/card.png)，成女独立五态已生成，资源采用与前端启用状态见HANDOVER；不从旧坐姿资源继承座具。

## Claude当前定义

读取[Claude四风格入口](../references/claude/README.md)和[claude-adult.json](../profiles/claude-adult.json)，以[当前母图](../../../../../public/characters/adult/claude/master.png)确定比例、脸型、铜橙长发、向日葵及米白深棕衣装。Q版与少女无眼镜，成女和礼服使用细金框眼镜；只读取本特点配置，不套用其他人物的服饰、道具或动作。当前各特点已采用独立立绘与设定卡。

## ChatGPT当前定义

读取[ChatGPT四风格入口](../references/chatgpt/README.md)及本特点的[chatgpt-adult.json](../profiles/chatgpt-adult.json)，以[对应母图](../../../../../public/characters/adult/chatgpt/master.png)锁定脸型、比例、双龙角、银色结形发饰和完整衣装。银白为主，紫色仅点缀眼睛与小宝石；直接描述当前profile，不套用下述DeepSeek专属定义。新形象当前已采用独立立绘与设定卡。

## DeepSeek当前定义

读取[当前角色配置](../profiles/deepseek-adult.json)中的全部造型字段，直接写成完整的人物描述。该配置是此特点的文字事实源；完整图像参考在[对应最终形象](../../../../../public/characters/adult/deepseek/master.png)。保留蓝色大肥鱼温柔耐心、轻松、略带小机灵的个性，表演强度按本特点调整。

DeepSeek采用用户定稿的雾蓝波浪长发、双侧前垂细编发、弯曲呆毛与白褶头饰，蓝宝石领结、露肩轻纱灯笼袖、藏蓝收腰与蓝白短款花瓣层叠礼裙。温柔从容地摊开手掌与鲸鱼互动，另一手轻提裙侧；肩颈自然，动作舒展且有明确重心。

当前profile与public母图均已同步用户选定的短款花瓣裙成女形象。制作时保持这张母图的脸型、头饰、前垂编发、领结和露肩袖结构，按具体输出任务调整姿态。

先查看参考，再描述profile中已经确定的脸、发型、服装、配色、鞋履与道具。当前造型的完整正向描述应成为提示词主体，具体动作及构图放在其后。

## DeepSeek五态动作

五态均采用当前成女全身站姿、相同衣装与鲸鱼伙伴，独立竖版2:3透明PNG；按下表只生成所选动作。自然陪伴作为系列占幅参考，脸部和鞋履沿用当前母图。动作由手势与神态区分，完整保留头饰、裙摆和双鞋。

| pose_id | 状态 | 动作与表情 |
|---|---|---|
| natural | 自然陪伴 | 一手摊开与鲸鱼互动，另一手轻触裙侧；温和浅笑 |
| listening | 认真倾听 | 双手在身前轻合，微收下颌、专注看向对方 |
| casual | 轻松闲聊 | 一手摊开解释，另一手轻置腰前；嘴唇轻启、自然回应 |
| playful | 俏皮回应 | 轻眨一眼，指尖与鲸鱼鼻尖保持小段距离；含蓄会心笑 |
| thinking | 托腮思考 | 一手托腮，另一手臂在腰前承托肘部；眼神沉静 |

鲸鱼保持圆滚蓝色外形、米白腹部、圆眼和心形小水柱，漂浮于肩侧。检查五张主体占幅、脸与鞋底位置，保留合理的姿势差异；不得以非透明底或拉伸裁切来统一大小。原有坐姿Skill不用于此组站姿。

## 其余四位成女五态

五态共用natural、listening、casual、playful、thinking语义。自然陪伴沿用各自已采用master.png；另四态保持同一成年比例、衣装、完整站姿和真实透明背景。以本角色master为身份与占幅参考，同时使用DeepSeek成女母图控制画风；三视图只校验结构，不将单张动作生成拼版。四位均不新增手持道具或座具。

| 角色 | 认真倾听 listening | 轻松闲聊 casual | 俏皮回应 playful | 托腮思考 thinking |
|---|---|---|---|---|
| Gemini | 双手在腰前轻合，略抬眉、专注好奇 | 一手抬食指说明，另一手低位摊掌，嘴唇微张 | 轻眨眼，脸旁小幅双指手势，明朗笑意 | 指尖托下颌，另一手承托肘部，目光略向上 |
| Claude | 双手低位交叠，微收下颌，透过眼镜温和注视 | 单手小幅摊开解释，另一手置于腹前，嘴唇轻启 | 指尖轻靠唇角，闭眼含蓄会心笑 | 轻扶镜框，另一前臂承托肘部，收眉专注思考 |
| Grok | 双臂松弛交叠，略挑眉，带有兴趣的浅笑 | 一手在肩侧掌心向外示意，另一手置腰，灵动接话 | 单指点颊、轻眨眼，含蓄坏笑 | 松握指节托腮，另一臂承托，侧望带一点机灵 |
| ChatGPT | 双手腹前轻叠，肩颈舒展，稳定专注目光 | 双手在胸腰间适度展开解释，手势平衡，轻启嘴唇 | 指尖轻靠唇角、含蓄眨眼与浅笑，保留知性 | 指尖托下颌、另一臂承托，略垂侧望，神态沉静 |

Grok成女读取[grok-adult.json](../profiles/grok-adult.json)和[当前母图](../../../../../public/characters/adult/grok/master.png)，保留金色双马尾、蓝瞳、黑红金衣装、星轮配饰及黑丝袜；旧grok.json坐姿定义不用于本组。Claude各态保留细金框眼镜；Gemini保留双猫耳与琥珀双瞳；ChatGPT保留双角、银白主色和透明无色水晶鞋，淡紫仅作点缀。

人物占幅以当前母图为准，完整保留发饰、发梢、裙摆和双鞋，建议可见主体高度约95%—97%；不拉伸身体或裁切饰物统一大小。脸型、衣饰和鞋履相同不等于动作合格，须逐张检查表情差异、手指、承托关系、腿部遮挡及实际alpha。生成与正式采用状态归HANDOVER，不因本表存在而自动启用前端。

## 验收重点

核对所选特点的比例与气质、所选角色的识别点、服装与鞋履结构，以及动作中的手指和重心。按[保存与检查规则](../references/character-style-workflow.md#保存与检查)检查alpha与完整构图，并将候选和采用结果分开保存。
