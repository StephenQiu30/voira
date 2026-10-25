---
类型: 设计
状态: 草案
版本: 0.1
更新: 2026-10-26
---

# 28 Claude角色生成提示词

## 01 T-100 角色与交付

用户要求先提交Grok工作再继续Claude设计；前批已以9e179e7推送main。Claude沿用[设计24](24-七位角色背景与人设.md)中家族大小姐背景、沉稳细腻克制的性格，以及铜橙长波浪发、暖棕眼睛、细金框眼镜、向日葵、象牙白／深棕礼服、浅色丝袜和深棕厚底鞋。不得新增家书、书本、锁链或受伤姿态。

新增[Claude配置](../../backend/app/skills/profiles/claude.json)，复用通用三视图与设定卡Skill；不新增查询端点。卡面采用DeepSeek系列的小衬线标题、左主坐姿、右上四表情、中部手部及两动作、下方已有座椅／配饰／眼镜／双鞋细节。表演为倾听、思考、克制会心笑、认真异议及轻扶眼镜。

## 02 T-101 三视图占比与自然轮廓

最新用户要求以DeepSeek三视图占比为准，改善右特写方块感；不能通过缩小为头像解决。规则维护于[三视图Skill](../../backend/app/skills/character-turnaround/SKILL.md)：大幅正面半身特写约占画布80%—85%高度，保持大头像视觉重量，以发丝／肩线自然轮廓及下缘渐隐融入白底。服务prepare同步输出此验收项，内容版本随Skill自动变化。中间小头像稿被用户否定，不作为后续基准。

## 03 实际执行与限制

内置imagegen共4次：三视图首稿、设定卡、三视图缩小尝试、按用户修正恢复DeepSeek占比。最新候选为output/character-design/t100-claude/claude-turnaround.png与claude-card.png，均1536×1024 RGB白底。初稿和小头像稿仅供追溯。

实际提示词、参考副本、prepare快照与manifest.json均保存在同目录。prepare快照为规则更新后的准备结果；实际生图由聊天内置工具执行，卡片使用DeepSeek版式参考，最终三视图使用用户DeepSeek附件作为占比参考，API没有style字段，不能声称后端已执行生图或私有LibTV Skill。

目视检查角色锚点、三站姿、特写占比、表情动作及双鞋结构；大特写的侧边留白较紧，衣饰微细差异与正投影一致性未作严格验证。背面沿用旧卡线索并保守推导。当前为候选，未替换frontend资源或页面，未制作Claude五张独立透明坐姿；后续独立图仍必须真实alpha透明。

## 04 T-102 五张独立透明坐姿（2026-10-26）

用户要求继续五种形象图。沿用character-seated-poses与Claude配置，先生成natural，其余四张追加natural作为比例和材质参考。五动作分别为并膝叠手的自然陪伴、双手分放膝上的认真倾听、交叠腿抬掌解释的轻松闲聊、侧斜双腿轻抬食指的含蓄回应（playful）、扶手支肘的托腮思考。表演按Claude沉稳细腻的人设收敛，不使用Grok坏笑。

共5次内置imagegen，均transparent_background=true。文件在output/character-design/t102-claude-poses/claude-{natural,listening,casual,playful,thinking}.png，逐张实际提示词、prepare快照、输入卡片副本及manifest.json同目录。五图均1024×1536 RGBA，alpha范围0—254，四角全透明；原图目视检查动作及手脚结构。发丝／宽裙边余量较紧，细小饰件与椅雕仍有差异，未验收深浅底浏览器效果。未替换frontend资源或页面，未提交推送。

## 05 T-103 正式资源采用（2026-10-26）

用户授权将最新图替换历史资源。Claude三张现用坐姿、两张备用坐姿及三视图／设定卡均已复制到frontend/public/characters，路径和校验见素材记录02第35节。上文候选状态为生成当时记录，当前采用本批最终图；未改页面控件。
