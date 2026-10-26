---
类型: 设计
状态: 草案
版本: 0.7
更新: 2026-10-25
---

# 26 DeepSeek角色生成提示词

## 01 当前方向与参考

**T-086适用范围更新**：下文第02—04节及第05节角色卡原文服务于既有二次元DeepSeek套图，不作为新真人版本的通用提示词。用户已明确LLM拟人化允许真人风格；新三视图采用[设计20第03.1节](20-人物三视图视觉设定.md#031-当前采用的skill与适配)指定的ce1406d8 Skill及左三视图／右正脸特写布局。若制作真人版本，须按其媒介重新编写该角色提示词，不直接执行下文锁定2D anime CG的原文。T-089已按用户新上传的DeepSeek坐姿参考生成一张二次元三视图候选；不代表七人统一采用二次元。

原生成输入已移入本地output；后续以各正式路径下的最终图作为连续性参考。本文保留DeepSeek样稿提示词与实际生成证据；T-090运行服务使用[backend两套Skill和独立角色配置](../../backend/README.md)，不自动执行本文历史原文。坐姿提示词遵循已确认要求：**不同坐姿、一种姿势一张图、不要抱枕、不要过度设计**。参考用户指定的[原自然坐姿](../../frontend/public/characters/01-natural/deepseek.png)，并实际查看同目录五人及DeepSeek的[交叠腿](../../frontend/public/characters/03-casual/deepseek.png)、[侧斜坐姿](../../frontend/public/characters/04-playful/deepseek.png)。只生成DeepSeek，不混用其他人的脸或服装。

当前只维护有效提示词；已撤销的抱枕与拼版原文随本次清理移除。角色故事见[设计24](24-七位角色背景与人设.md)。

**T-094当前坐姿入口**：[character-seated-poses](../../backend/app/skills/character-seated-poses/SKILL.md)，动作以其poses.json为准。下文第02—04节保留先前套图生成证据，不作为新五种个性化动作的执行入口；当前选定卡与T-094参考快照优先。

## 02 连续性与输出约束

- 保留原成年脸、深蓝卷发、蓝瞳、褶边头饰、小白花与藏蓝蝴蝶结、蓝宝石领结、藏蓝米白裙、金色植物刺绣及藏蓝鞋。
- 白丝袜是完整、不透肤、哑光纯白连裤袜；裙下大腿、膝、小腿、脚踝与鞋内脚背都覆盖，与手和脸的肤色明显区分。不得画成肤色或裸腿。
- 所有图不露尾巴，不增加鳍耳、龙角或翅膀；所有图不新增抱枕、散放靠垫或手持道具，原座椅固定软垫保留。
- 独立坐姿每张一个人物、一把原座椅；真实透明背景，无标题、标签、边框、拼版、特写或场景装饰。三视图与既有人设卡另存，不把姿势资产做成宣传海报。
- 坐姿画布统一1024×1536，同一正面机位、椅子相近尺度及落地位置；身体随坐姿真实变化，不通过拉伸强行对齐头顶。不同站／坐图不要求同样总高度。生成不是确定性几何复用，不宣称像素级一致。
- 五种姿势是自然叠手、交叠腿、双腿侧斜、前倾倾听、侧倚托腮；必须改变腿部方向或上身重心，不能只换表情手势。交叠腿是坐姿参考中的有意姿态；标准站立三视图仍须双腿平行。

## 03 独立坐姿公共前缀

每张实际提示词＝本节全文＋第04节对应姿势段落，中间两个换行。内置imagegen；transparent_background=true。此为T-089更新后的下一轮坐姿提示词，尚未执行透明坐姿重制；历史白底套图仍保留。

```text
Use case: identity-preserve. Produce ONE standalone full-body SEATED illustration of the original adult DeepSeek woman. Use the supplied project character as exact identity, costume, rendering and chair reference. Preserve her original adult face, gentle blue eyes, deep navy long wavy hair and braided details, loop forelock, ivory ruffle headband, navy ribbon bows and ivory flowers, blue oval gemstone neck bow, ivory blouse, navy puff sleeves and long embroidered sleeves, navy fitted waist with gold lacing, elaborate original navy-and-ivory layered high-low dress with fine gold botanical embroidery, navy rounded closed-toe ankle-strap platform shoes. Refined softly painted detailed 2D anime CG exactly like the original, not a redesign or simplified doll.
Mandatory: all visible thighs, knees, shins, ankles and feet inside the shoes wear continuous 100-denier fully opaque MATTE PURE WHITE tights, distinctly white rather than the peach skin of face and hands. Only soft cool neutral gray fabric shadows. No bare legs, no nude or translucent hosiery.
Reuse the original cream upholstered pale champagne-gold armchair, same oval backrest, smooth upholstery, low curved padded armrests, slim legs and restrained carved edges. No added ornament, no enlarged throne.
NO lap pillow or loose cushion, no held prop, no tail, fin ears, horns or wings. Only the woman and her existing armchair. No words, titles, numbers, labels, border, inset, collage, detail panels or multiple figures.
Genuinely transparent background with preserved PNG alpha; no painted checkerboard, white backdrop, dark backing, floor plane, cast shadow, glow, gradient, halo, scenery or decorative elements. Preserve fine hair strands, lace edges and chair openings with clean alpha; white clothing and opaque white tights remain opaque. Portrait 2:3 canvas, ideally 1024x1536. Same frontal camera, chair centered, chair front feet near 93% image height, natural seated hair apex near 5%, full head/hair/dress/feet/chair inside a comfortable margin. Keep consistent adult anatomy and scale; posture may change silhouette but camera zoom and chair size stay fixed. Show believable five-finger hands, connected joints and coherent cloth-over-seat overlap. The pose changes must be real changes in body/leg placement rather than only facial expressions.
```

## 04 五种姿势段落与文件

### 4.1 自然叠手

输出：[deepseek-01-natural.png](../../frontend/public/characters/01-natural/deepseek.png)。唯一参考：public原自然DeepSeek图。

```text
NATURAL SEATED POSE: Keep the original natural seated posture almost unchanged: hips comfortably centered on seat, torso upright but relaxed, gentle small head tilt and closed-mouth warm smile, both hands lightly folded on the skirt on her lap. Knees close together, calves hang naturally down, two shoes beside one another on the ground. No crossed knee, no raised hand, no leaning on elbow. This is the baseline image for the other four.
```

### 4.2 交叠腿

输出：[deepseek-02-crossed.png](../../frontend/public/characters/03-casual/deepseek.png)。有序参考：本轮自然叠手→public交叠腿；第二张仅供姿势。

```text
LEG-CROSSED SEATED POSE: Reference 1 is the approved identity baseline and MUST control face, clothes, white tights, chair and scale. Reference 2 supplies ONLY the existing project's crossed-leg posture. Sit comfortably back with one thigh naturally crossed over the other at the knee, the upper shin angling diagonally and its shoe lifted clear, lower foot grounded. Hands loosely folded on the upper knee, torso upright and relaxed, gentle confident small smile. Clearly visible crossed-leg silhouette, correct two legs and joints, not merely crossed ankles. Dress covers lap modestly and drapes naturally over the crossed thighs. Do not copy reference 2's dark background or nude-looking leg material.
```

### 4.3 双腿侧斜

输出：[deepseek-03-side-legs.png](../../frontend/public/characters/04-playful/deepseek.png)。有序参考：本轮自然叠手→public侧斜图；第二张仅供姿势。

```text
SIDE-ANGLED LEGS SEATED POSE: Reference 1 controls identity, clothes, WHITE tights, chair and scale. Reference 2 supplies ONLY the existing project's leaning/diagonally grouped legs pose. Hips remain on center of chair, torso leans gently to viewer-right to balance both knees and lower legs angled together toward viewer-left. Knees remain adjacent and uncrossed, both shoes side by side near the left front of the chair. Both hands folded on the lap. A calm small smile and subtle head tilt; clearly asymmetric body silhouette and diagonal parallel legs, not the baseline vertical legs. Keep the chair facing straight forward and unrotated. Do not copy the dark background or skin-colored hosiery from reference 2.
```

### 4.4 前倾倾听

输出：[deepseek-04-forward.png](../../frontend/public/characters/02-listening/deepseek.png)。唯一参考：本轮自然叠手图。

```text
FORWARD-LEANING SEATED POSE: Same woman and fixed frontal chair/camera as the reference. Hips stay supported on the front half of the chair seat, upper body inclines gently forward from the hips toward viewer in engaged listening, shoulders relaxed, chin slightly lowered, attentive soft eyes and a tiny closed-mouth smile. Both hands rest separately and lightly on her knees over the skirt, left hand on left knee and right hand on right knee. Knees adjacent, both opaque-white-stockinged lower legs vertical with both feet planted slightly back under knees. Clearly different torso angle and separated hands versus baseline; no theatrical wave, no exaggerated bow, no crouching, no hands fused into lace. Whole figure remains in original framing.
```

### 4.5 侧倚托腮

输出：[deepseek-05-side-rest.png](../../frontend/public/characters/05-thinking/deepseek.png)。唯一参考：本轮自然叠手图。

```text
RELAXED SIDE-REST SEATED POSE: Same woman and fixed frontal chair/camera as reference. Hips remain supported in the chair, torso visibly but gently inclines toward the armrest on viewer-left. Her RIGHT elbow rests securely on that armrest and her right hand lightly supports the side of her cheek near jaw, head inclined toward that hand. Her LEFT hand rests relaxed on the skirt in her lap. Knees close, both legs extend gently toward viewer-right with parallel opaque-white-stockinged shins, ankles uncrossed and both shoes grounded. Warm thoughtful half-smile, relaxed and comfortable, no dramatic acting. Show a believable supported elbow and natural wrist, no arm passing through wooden frame. Clear side-weighted silhouette that differs from upright and forward poses.
```

## 05 配套三视图与角色设定图

[现存三视图](../../frontend/public/characters/turnarounds/deepseek.png)包含不透肤白丝袜，属于旧版输出；新制作采用左侧正面／90度侧面／背面等尺度站姿、右侧正脸特写，具体以设计20为准。现存图只供核对已有造型，不能把旧布局或二次元媒介当作新版本硬约束。

**当前正式设定卡（T-092选定，T-093脚部修正）**：[DeepSeek设定卡](../../frontend/public/characters/cards/deepseek.png)。用户明确选用本轮重新上传的版本，先按附件原始像素采用，不采用T-091的v2白袜修正版；后按用户反馈仅优化右下脚部特写，见第08节。旧“主图＋四处细节”卡面与其编辑提示词已被替代，从本文移除重复原文；历史生成摘要仍见素材记录02。

现卡采用坐姿主图、四种表情、叠手／前倾／托腮细节、座椅／配饰／鞋履特写；后续编辑以此正式图为参考。独立坐姿仍要求真实透明，不能直接拿白底设定卡作舞台人物。

### 5.1 T-089 三视图实际提示词

唯一参考为用户本轮上传的单人坐姿图，本地副本、完整样稿及生成清单位于output/character-design/t089-deepseek-turnaround。内置imagegen调用一次，transparent_background=false，实际输出1536×1024 RGB PNG。左正／侧／背站姿，右侧正脸特写；背面结构由参考推导，并非既有背面资料复刻。实际提示词：

```text
Use case: identity-preserve.
Create a polished DeepSeek character TURNAROUND REFERENCE SHEET based on reference image 1, which is the sole authoritative identity, costume and painting-style reference. This is an adult woman personifying an LLM.
Wide landscape white opaque canvas, approximately 3:2. On the LEFT three quarters: THREE separate full-body standing views, ordered FRONT, STRICT 90-DEGREE PROFILE facing left, and BACK. Align all three heads and shoe soles at identical heights and use identical body proportions. On the RIGHT quarter: one large FRONT-FACING head-and-shoulders detail. Clean generous separation, no overlapping figures. All full figures entirely inside canvas including hair, skirts, shoes and train. No text, labels, logos, borders, panels or watermark.
Preserve her soft adult face, gentle blue eyes, long deep blue/violet-blue wavy hair with fine braid details, curved loop forelock, ivory ruffle headband, navy ribbon bows and small ivory flowers, dangling earrings, navy throat bow with blue oval gemstone, ivory high-frilled blouse, navy puffed shoulders and long embroidered sleeves, fitted navy waist with gold lacing. Preserve elaborate navy and ivory layered high-low dress, fine gold botanical embroidery, ivory lace and many ruffles, small floral ornaments and ribbons. Keep the reference's luxurious softly painted detailed 2D anime CG rendering and natural adult anatomy, no simplification or photorealistic conversion.
Standing translation: relaxed upright neutral posture, head level, arms hanging naturally slightly clear of torso, empty relaxed hands, both legs parallel and uncrossed, feet grounded. Retain skirt construction and full long outer train with believable standing drape; do not redesign into a short uniform. ALL visible legs from thighs through ankles and feet in shoes wear fully opaque matte PURE WHITE tights, clearly distinct from the peach skin of face and hands, using only subtle cool gray textile shading. Navy closed-toe rounded platform ankle-strap shoes with ivory flower decorations matching reference.
The profile must be a true side silhouette, not three-quarter; the back must face completely away. Keep identical headband, hair color/length, bodice and sleeve construction across views. Infer concealed back structure conservatively from the reference, no added symbols, oversized bows or invented ornament.
The right portrait faithfully retains the reference face and hair, calm friendly closed-mouth expression and frontal eye contact, upright head.
No chair in this structural standing sheet. No pillow, handheld prop, tail, fin ears, horns or wings. No additional characters, poses, inset objects or expression grid. Solid white background, no checkerboard, dark backing, gradients or environment. Soft even diffuse lighting, only tiny neutral contact shadows at shoes.
```

## 06 目视检查与交付边界

三视图／设定卡检查背景、视角、完整构图、白丝袜和身份连续性；独立坐姿另外检查真实alpha、发丝／蕾丝／椅子空隙边缘及姿势差异。不能只凭提示词或图片预览宣称透明。

T-089候选已目视检查三站姿、脸部特写、白袜及无尾巴／抱枕；完整鞋履与裙摆可见。背部发饰、侧面鼻唇、鞋跟高度和刺绣仍需用户评审，未验证严格正投影或3D一致性。候选只在本地output，未覆盖public，未同步Figma、提交或推送。设定卡现已由T-092替换为用户选定附件；五张透明坐姿尚未重新生成。历史交付与当前入口见素材记录02。

## 07 T-091 角色设定卡实际执行

按[character-card Skill](../../backend/app/skills/character-card/SKILL.md)及DeepSeek独立配置准备任务，Skill内容版本dc5b3311776b378c3a11d77c770af9b18a0520c9ba2c20ee376232ed53e091fd。实际出图由聊天内置imagegen执行，不是backend或LibTV私有Skill的自动调用。

首轮提示词指定横版白底、左侧完整坐姿主图、右侧四种差异化表情／三处动作／道具配饰；原坐姿图控制身份、画风及椅子，三视图仅供服装。第二轮仅要求将所有可见腿部修正为连续不透肤哑光纯白连裤袜、保留其余布局与文本；实际局部漂移见素材记录02第25节。

精确提示词与输入快照位于本地output/character-design/t091-deepseek-card下的prompt-v1.txt、prompt-v2.txt、prepared-task.json；历史生成哈希在manifest.json。T-092用户另行指定附件作为正式版本，已清理v1／v2 PNG；任务输入与提示词保留用于追溯，当前正式图与清理清单见素材记录02第26节。

## 08 T-093 脚部特写局部编辑

用户要求优化右下脚部，针对已有正式卡片使用precise-object-edit；限定右下约x=1210—1535、y=735—1000区域，重建两个分离且结构一致的左右鞋，改善脚踝、鞋口、扣带和鞋底透视，保留已选主体色调与整卡版式。内置imagegen调用一次，transparent_background=false；实际原文见output/character-design/t093-footwear-fix/prompt.txt。

已更新正式卡片，当前版本以素材记录02第27节为准；这是用户授权的局部修正，不恢复此前被用户舍弃的全图白袜调色。

## 09 T-094 自然陪伴透明基准

当前任务用character-seated-poses、pose_id=natural准备，身份与座椅参考为T-093正式设定卡。实际由内置imagegen单次生成1024×1536 RGBA PNG，输出output/character-design/t094-natural/deepseek-natural.png；输入快照、完整提示词prompt.txt、prepared-task.json与alpha检查记录在同目录。未自动替换现用坐姿，其他四张尚未生成。

提示词约束单人单椅、正面机位、自然叠手、并拢双膝、平行小腿与不交叉脚踝，保留已选卡面色调；不得复制卡片标题或特写拼版。透明背景由参数transparent_background=true指定，并实际读取PNG alpha验收，不能仅凭工具参数认定通过。

## 10 T-095 四种独立坐姿

用户授权继续其余四张。每次使用同一T-094自然基准和T-093正式卡，分别准备listening、casual、playful、thinking，调用内置imagegen一次，均transparent_background=true。实际提示词分别保存在output/character-design/t095-seated-poses的listening-prompt.txt、casual-prompt.txt、playful-prompt.txt、thinking-prompt.txt；同名前缀prepared.json保留Skill版本与动作定义。

主约束为同一成年人物／服装／座椅、正面全身、单人单椅、无文字拼版／新增道具。动作分别为前倾双手放膝、交叠腿抬掌解释、侧斜双腿抬食指、右肘靠扶手托腮。此次任务快照按用户选定卡面修正袜色描述为米白，不执行旧预设额外漂白。当前为候选，局部细节和前端深浅背景效果仍需评审。
