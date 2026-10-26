---
name: character-style-chibi
description: 制作或延展Q版大头小身体角色；使用当前人物配置组织造型、比例和表情，以DeepSeek的chibi形象为已确认示例。
metadata:
  source_url: null
  provenance: Voira用户确认的四种独立人物特点与当前造型定义
---

# Q版萌系

## 风格定义

约三头身、圆润头脸和短小四肢，重点是清楚可读的轮廓、眼神与少量标志饰物。按参考保留长发量感，服装细节适配小体型。

本Skill定义人物外观，具体服装和身份读取所选人物的当前profile。输出类型另按[共用制作流程](../references/character-style-workflow.md)选择立绘、三视图、设定卡或动作图。

## Claude当前定义

读取[Claude四风格入口](../references/claude/README.md)和[claude-chibi.json](../profiles/claude-chibi.json)，以[当前母图](../../../../public/characters/chibi/claude/master.png)确定比例、脸型、铜橙长发、向日葵及米白深棕衣装。Q版与少女无眼镜，成女和礼服使用细金框眼镜；只读取本特点配置，不套用其他人物的服饰、道具或动作。当前各特点只有独立立绘。

## ChatGPT当前定义

读取[ChatGPT四风格入口](../references/chatgpt/README.md)及本特点的[chatgpt-chibi.json](../profiles/chatgpt-chibi.json)，以[对应母图](../../../../public/characters/chibi/chatgpt/master.png)锁定脸型、比例、双龙角、银色结形发饰和完整衣装。银白为主，紫色仅点缀眼睛与小宝石；直接描述当前profile，不套用下述DeepSeek专属定义。新形象当前只有独立立绘。

## DeepSeek当前定义

读取[当前角色配置](../profiles/deepseek-chibi.json)中的全部造型字段，直接写成完整的人物描述。该配置是此特点的文字事实源；完整图像参考在[对应最终形象](../../../../public/characters/chibi/deepseek/master.png)。保留蓝色大肥鱼温柔耐心、轻松、略带小机灵的个性，表演强度按本特点调整。

双手轻合、抬手招呼或看向伙伴；手势幅度适合Q版身体，表情可更鲜明。

先查看参考，再描述profile中已经确定的脸、发型、服装、配色、鞋履与道具。当前造型的完整正向描述应成为提示词主体，具体动作及构图放在其后。

## 验收重点

核对所选特点的比例与气质、所选角色的识别点、服装与鞋履结构，以及动作中的手指和重心。按[保存与检查规则](../references/character-style-workflow.md#保存与检查)检查alpha与完整构图，并将候选和采用结果分开保存。
