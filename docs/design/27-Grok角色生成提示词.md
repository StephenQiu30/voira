---
类型: 设计
状态: 草案
版本: 0.1
更新: 2026-10-25
---

# 27 Grok角色生成提示词

## 01 T-097 制作范围

用户要求继续设计Grok。本批沿用现有成年二次元造型，制作独立三视图和设定卡候选；不改页面或覆盖正式资源。人设见[设计24第06节](24-七位角色背景与人设.md)，视觉见[设计20](20-人物三视图视觉设定.md)。

金色长双马尾、蓝瞳、黑红金礼服、黑丝袜和星轮鞋饰为识别锚点。已有小型金色发饰保留，吸血鬼族裔及故事物件仍为叙事提案，不据此新增尖牙、角、武器或宴会座次卡。表情突出挑眉坏笑、活泼欢笑、得意与认真之间的差异。

## 02 Skill与角色输入

复用backend的character-turnaround和character-card；角色输入独立保存于[profiles/grok.json](../../backend/app/skills/profiles/grok.json)。新配置可作为现有prepare的character输入，不新增角色查询HTTP端点。三视图采用正／90度侧／背三站姿加右侧正脸；设定卡采用主坐姿、四表情、动作与已有座椅／饰件／鞋履细节。

三视图和设定卡白底，其他独立人物素材仍须透明。首图采用[现用自然坐姿](../../frontend/public/characters/01-natural/grok.png)和[旧卡](../../frontend/public/characters/cards/grok.png)作身份参考；旧卡背面仅作结构线索，版式不沿用。

## 03 执行证据

实际提示词、prepare快照、输入副本及生成清单保存于output/character-design/t097-grok。由聊天内置imagegen出图，backend仅准备任务；不声称运行LibTV私有Skill或后端已接入生图。

## 04 与DeepSeek系列样式对齐

用户在制作中明确要求样式与DeepSeek一致。以当前frontend/public/characters/cards/deepseek.png作为卡面版式和绘制质感参考，Grok原图继续控制身份／服装／配色。采用同系列小号衬线标题、短中文简介、左主坐姿、右上四表情、右中手部和两动作、底部座椅／配饰／双鞋特写。特写边缘柔和融入白底，避免旧稿硬切矩形与过大的标题。

三视图生成后调整一次留白及正脸角度；设定卡生成后按此新要求调整一次，共4次调用。最终候选为grok-turnaround.png和grok-card.png，均1536×1024不透明白底。卡片首稿仅留本地追溯，当前以样式对齐稿为准。最终卡面编辑的实际输入另包含DeepSeek样式参考；prepare快照记录首次任务，不冒称后端已有style参考字段。

目视检查三站姿、正脸、角色锚点及卡面分区；背面借鉴旧卡并保守推导，未做严格正投影／三维一致性验证。衣饰、椅雕、鞋饰的微小生成差异仍待评审。未制作独立透明坐姿，未替换public或修改页面。

## 05 T-098 主坐姿腿内侧修正

用户截图指出双腿交叠处内侧穿插。以当前完整卡为编辑目标，内置imagegen局部修正一次，清除内侧多余黑色袜面褶块，梳理两腿接触阴影与酒红裙衬遮挡。保持交叠姿势、同系列卡面布局及其余分区；未声明区域外像素完全不变。

最新候选仍为output/character-design/t097-grok/grok-card.png，修正前版本保留为grok-card-before-leg-fix.png，实际提示词card-inner-leg-fix-prompt.txt及manifest.json记录此次编辑。T-097原四次加本次共五次生成调用，未替换frontend正式资源。

## 06 T-099 五张独立透明坐姿

用户继续要求五种形象图。复用character-seated-poses及Grok配置，natural／listening／casual／playful／thinking分别prepare；动作沿用poses.json，实际提示词按Grok人设调整表演为含蓄坏笑、专注倾听、抬掌反问、挑眉提示与带机锋的托腮思考，避免复制DeepSeek的统一温柔表情。

首张参考T-098修正版卡，其余四张追加本批natural作为比例／绘制基准；共5次内置imagegen调用，全部transparent_background=true。独立图片、逐张prompt.txt及prepared.json保存在output/character-design/t099-grok-poses，manifest.json记录哈希及alpha。保留单人单椅、完整鞋履和裙衬遮挡要求，没有增加新道具。

实际五张均1024×1536 RGBA，alpha范围0—254。构图完整但发丝及宽裙边余量偏紧，未验收深浅底浏览器效果；饰件和椅雕有细部生成差异。当前五图为候选，未修改现用资源或页面。
