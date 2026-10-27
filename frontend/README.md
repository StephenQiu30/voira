# frontend — 声伴 · Voira

## 01 当前交付

T-084已初始化Next.js App Router应用，完成BasicLayout（Header／Content／Footer）、单人物舞台、人物档案、固定头像栏、姿态Tabs及明暗主题。桌面／平板／手机采用响应式结构，不把Figma画板坐标直接固定到视口。

T-111已同步最新Figma：七位AI入口、五态Tabs（自然陪伴／认真倾听／轻松闲聊／俏皮回应／托腮思考）、紧凑液态玻璃卡片及固定人物中心。DeepSeek默认采用成女五态站姿，五种状态均可选；Gemini／Claude／Grok／ChatGPT使用已定稿成女立绘，仅自然陪伴可选，其余四态暂禁用；Kimi／Qwen显示形象准备中。切换角色优先保留状态，缺素材时原子回退自然陪伴；禁用状态不借图。

当前只有形象选择页面。角色／姿态切换是本地静态展示，不表示接入七个模型；交流按钮禁用并显示服务未连接。聊天、完整记录、直播、队列、真实音视频与API均未实现。后续按[计划09](../docs/plan/09-网页PoC逐功能实现与验收计划.md)分批推进。

## 02 启动与检查

已验证环境Node 24.19.0、npm 12.0.2。依赖精确版本与package-lock.json已保存。

```sh
npm ci
npm run dev -- --hostname 127.0.0.1 --port 3000
```

生产检查与启动：

```sh
npm run typecheck
npm run lint
npm test
npm run format:check
npm run build
npm run start -- --hostname 127.0.0.1 --port 3000
```

端口占用时选空闲应用端口，不终止其他项目。以上命令在frontend目录执行，不需要后端、密钥或模型账户。

## 03 结构与资源

本目录的 public 保存页面展示资源：9张人物、2张场景和1张品牌SVG，随前端提交，浏览器URL不变。完整素材在仓库根目录 `public/`，只留在本机；页面运行与部署使用本目录的 public。

- src/components/layout/basic-layout.tsx：品牌、场景背景、主内容槽和页脚；不维护会话业务状态。
- src/features/character-stage：角色静态数据与展示交互；页面装配保持在src/app/page.tsx。
- src/components/ui：shadcn Radix版组件源码；共享变体与焦点态集中维护。
- src/app/globals.css：黑白灰语义token、液态玻璃材质与响应式规则。字体本地加载Geist，中文使用系统回退。
- public/characters：frontend/public独立保存页面需要的展示图；characters.ts显式引用已采用成女素材。DeepSeek使用adult/deepseek下的五态PNG，其余四位使用adult/{character}/master.png并禁用缺失动作。未用于页面的四风格立绘与设定卡保留在本地 `public/`；旧编号姿态、cards、turnarounds目录已移入被忽略的output。
- public/scenes、public/brand：复用既有背景和SVG标志，无临时Figma素材URL。

主题偏好存储键为voira-theme，初次访问默认暗色。无自动轮播；头像切换不改尺寸，方向键仅移动Tab焦点，Enter／Space确认选择；支持减少动效偏好。T-113在实际DOM解码后同中心叠化：人物420ms／姿态280ms，旧图保持到新图就绪，不再移动或缩放人物；失败提示持续留在舞台正文并支持重新加载。小高度手机优先保留人物、档案名称、五态、角色和开始入口，收起营销标题及副标题；320px窄屏头像栏内部横向滚动，页面不横向溢出。

工程与视觉规范见[PROJECT](../PROJECT.md)、[DESIGN](../DESIGN.md)和[前端规范](../docs/templates/07-前端开发规范.md)。Axios、Zustand与Umi OpenAPI保留为后续真实功能依赖，本批没有为了布局安装或伪造生成客户端。

## 04 舞台动效

GSAP 3.15.0／@gsap/react 2.1.2通过useGSAP和局部ref管理时间线及事件回调，组件卸载和依赖更新均清理。Three.js 0.186.1运行于按需加载的stage-scene模块，只增强背景氛围，人物继续使用现有DOM图片。Canvas透明、不接管输入；连续渲染最多约30fps，DPR最高1.5、窄舞台1，细指针20个光点／粗指针10个光点。

减少动效时释放WebGL、保持静态光晕；离屏和document.hidden时停止帧循环。切换Kimi／Qwen会卸载装饰层，返回人物时重新建立；释放几何／材质／renderer、观察器和监听。WebGL初始化失败或上下文丢失不影响人物、背景、键盘和主题。验证摘要见[HANDOVER](../HANDOVER.md)；正常运行不要求模型服务。

T-113将人物展示抽为portrait-transition.tsx：持久容器、最多两个带稳定key的图层，完成后只保留当前层；未开始过渡的候选随最新选择更新，已开始的短过渡完成后承接最新目标。通过HTMLImageElement.decode确认实际页面图片就绪，加载失败保留旧图，重试次数按角色／状态独立记录，避免重试新图时重新挂载旧图。去掉背景选择脉冲和缩放，降低静态光晕、地环及光点亮度。验证摘要见[HANDOVER](../HANDOVER.md)；
