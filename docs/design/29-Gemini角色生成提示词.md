---
类型: 设计
状态: 草案
版本: 0.1
更新: 2026-10-26
---

# 29 Gemini角色生成提示词

## 01 T-105 制作范围

用户要求继续Gemini形象设计，先交三视图及设定卡候选。身份依据[设计20](20-人物三视图视觉设定.md)与[设计24第05节](24-七位角色背景与人设.md#05-gemini--追着新可能奔跑的猫耳探索者)，保留成年蓝紫长卷发、一对猫耳、琥珀双瞳、金色星饰、蓝紫珍珠白层叠礼服、白色菱格褶边短袜与蓝紫厚底粗跟扣带鞋。异色瞳、双尾、折叠星图及魔法物件未确认，不加入本批。

## 02 Skill与系列设计

新增独立[Gemini配置](../../backend/app/skills/profiles/gemini.json)，复用character-turnaround与character-card，不新增运行接口。表情区分好奇、惊喜、明朗灵感与认真推敲；动作采用食指提示与前倾抬掌分享，避免套用其他角色的统一浅笑。

三视图沿用T-101大幅右侧正脸半身特写，占比匹配用户给定DeepSeek参考，发梢和衣饰下缘柔和渐隐。左边正／侧／背三站姿完整保留，旧Gemini卡仅供服饰与背面结构参考。设定卡采用DeepSeek系列小衬线标题、左主坐姿、右上四表情、中部手与两动作、底部座椅／星饰／双鞋细节。蓝紫配色与星形胸饰不得被DeepSeek蓝宝石配件替代。

## 03 执行与验证

内置imagegen共4次：三视图首稿、卡片首稿、三视图右侧构图整理、胸饰特写修正。当前最终候选为output/character-design/t105-gemini/gemini-turnaround.png、gemini-card.png，两张均1536×1024 RGB白底。首稿仅留追溯；实际提示词、输入副本、prepare快照、每次引用及SHA-256见同目录manifest.json。

Pydantic配置加载和两类prepare通过；图片实际读取尺寸／通道与目视检查完成。右侧仍保留大幅半身占比，胸饰已由首稿错误椭圆蓝宝石修正为金色四芒星与紫色菱形晶石链。编辑不声明区域外逐像素不变。复杂星链、鞋扣和椅雕仍有微细生成差异，三视图未做严格正投影／三维一致性验收，边缘留白偏紧，候选待视觉评审。

后端只准备任务，实际系列参考由聊天工具传入；API没有style参考字段，也未执行LibTV私有Skill。未替换frontend、修改页面、生成五种独立坐姿或提交推送。后续独立图仍须真实alpha透明；卡片特写不冒充已导出的独立素材。

## 04 T-107 五种独立透明状态（2026-10-26）

用户要求继续五种状态图。复用坐姿Skill与Gemini配置，先生成自然陪伴作为连续性基准，后四张追加其作为身份／尺度参考。natural为并膝叠手浅笑，listening为前倾分手放膝与好奇专注，casual为交叠腿抬掌分享，playful为侧斜双腿轻抬食指的灵感回应，thinking为托腮凝思。沿用琥珀双瞳与金色星形胸饰，不新增尾巴、异色瞳或手持道具。

五次内置imagegen，全部transparent_background=true。输出位于output/character-design/t106-gemini-poses/gemini-{natural,listening,casual,playful,thinking}.png，实际提示词、prepare、参考卡与manifest同目录。均1024×1536 RGBA，alpha0—254，四角全透明。原图目视完成；猫耳、发丝、宽裙边及鞋底余量偏紧，思考图肘部支撑部分被宽袖遮挡，微细星链／鞋扣／椅雕有差异，深浅底浏览器效果未验收。当前候选未替换frontend或提交推送。

## 05 T-108 正式资源采用

用户明确采用最新图并提交main推送。三视图、设定卡及五张状态图进入frontend/public/characters；现用三姿态映射natural／casual／playful，listening／thinking为备用。T-107原为并行撞号的T-106，现统一任务与验收编号，原始output/t106-gemini-poses路径保留作证据。正式采用记录见素材记录02第38节。
