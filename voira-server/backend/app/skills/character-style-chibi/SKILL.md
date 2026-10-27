---
name: character-style-chibi
description: 制作或延展Q版大头小身体角色；使用当前人物配置组织造型、比例和表情，以DeepSeek的chibi形象为统一画风基准。
metadata:
  source_url: null
  provenance: Voira用户确认的四种独立人物特点与当前造型定义
---

# Q版萌系

## 风格定义

所有角色制作本特点时，必须先查看[DeepSeek对应画风母图](../../../../../public/characters/chibi/deepseek/master.png)，统一比例、线条、光影、材质、发束和衣饰层次；目标角色自身母图与profile负责身份及配色。按[共用画风规则](../references/character-style-workflow.md#全角色统一画风基准)组合两类参考，不用其他角色衍生图替代DeepSeek基准。

约三头身、圆润头脸和短小四肢，重点是清楚可读的轮廓、眼神与少量标志饰物。按参考保留长发量感，服装细节适配小体型。

本Skill定义人物外观，具体服装和身份读取所选人物的当前profile。输出类型另按[共用制作流程](../references/character-style-workflow.md)选择立绘、三视图、设定卡或动作图。

## Gemini当前定义

读取[Gemini四风格入口](../references/gemini/README.md)和[gemini-chibi.json](../profiles/gemini-chibi.json)，以[当前母图](../../../../../public/characters/chibi/gemini/master.png)锁定蓝紫长发、猫耳、琥珀双瞳和星饰衣装。本特点已采用[设定卡](../../../../../public/characters/chibi/gemini/card.png)，完整独立动作仍待制作；不从旧坐姿资源继承座具。

## Claude当前定义

读取[Claude四风格入口](../references/claude/README.md)和[claude-chibi.json](../profiles/claude-chibi.json)，以[当前母图](../../../../../public/characters/chibi/claude/master.png)确定比例、脸型、铜橙长发、向日葵及米白深棕衣装。Q版与少女无眼镜，成女和礼服使用细金框眼镜；只读取本特点配置，不套用其他人物的服饰、道具或动作。当前各特点已采用独立立绘与设定卡。

## ChatGPT当前定义

读取[ChatGPT四风格入口](../references/chatgpt/README.md)及本特点的[chatgpt-chibi.json](../profiles/chatgpt-chibi.json)，以[对应母图](../../../../../public/characters/chibi/chatgpt/master.png)锁定脸型、比例、双龙角、银色结形发饰和完整衣装。银白为主，紫色仅点缀眼睛与小宝石；直接描述当前profile，不套用下述DeepSeek专属定义。新形象当前已采用独立立绘与设定卡。

## DeepSeek当前定义

读取[当前角色配置](../profiles/deepseek-chibi.json)中的全部造型字段，直接写成完整的人物描述。该配置是此特点的文字事实源；完整图像参考在[对应最终形象](../../../../../public/characters/chibi/deepseek/master.png)。保留蓝色大肥鱼温柔耐心、轻松、略带小机灵的个性，表演强度按本特点调整。

双手轻合、抬手招呼或看向伙伴；手势幅度适合Q版身体，表情可更鲜明。

先查看参考，再描述profile中已经确定的脸、发型、服装、配色、鞋履与道具。当前造型的完整正向描述应成为提示词主体，具体动作及构图放在其后。

## 验收重点

核对所选特点的比例与气质、所选角色的识别点、服装与鞋履结构，以及动作中的手指和重心。按[保存与检查规则](../references/character-style-workflow.md#保存与检查)检查alpha与完整构图，并将候选和采用结果分开保存。
