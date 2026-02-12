# AI Chat OutlineMate - Landing Page

AI Chat OutlineMate 插件的官方介绍落地页。

## 项目简介

AI Chat OutlineMate 是一款 Chrome 浏览器扩展，为主流 AI 对话平台（ChatGPT、Gemini、豆包、Kimi、通义千问）生成侧边栏对话大纲导航，帮助用户快速回溯和定位历史消息。

**Chrome 应用商店地址：** [安装链接](https://chromewebstore.google.com/detail/mfaehobnglhaopfeoacafaeaplpekmfg)

## 核心功能

- **对话大纲导航** — 自动提取用户提问，生成可点击的侧边栏大纲
- **AI 回复预览** — 大纲中显示 AI 回复摘要
- **深色模式适配** — 自动检测页面主题，无缝适配
- **中英双语** — 跟随浏览器语言，支持手动切换
- **键盘导航** — 方向键、Home/End 快速浏览
- **隐私安全** — 纯本地运行，零数据收集

## 落地页技术栈

- 纯 HTML + CSS + JavaScript（无框架依赖）
- 字体：Inter（Google Fonts）
- 默认暗黑模式，支持亮/暗切换
- 中英双语 i18n，根据浏览器语言自动初始化
- 响应式布局（480px / 768px / 1024px / 1440px）
- IntersectionObserver 滚动入场动画
- prefers-reduced-motion 无障碍适配

## 目录结构

```
landing/
├── index.html              # 页面入口
├── README.md               # 本文件
└── static/
    ├── style.css           # 样式
    ├── script.js           # 交互逻辑（主题切换、i18n、动画）
    ├── logo/               # 平台 logo 图片
    │   ├── openai.png
    │   ├── gemini.png
    │   ├── 豆包.png
    │   ├── 月之暗面.png
    │   └── 通义千问.png
    └── sc/                 # 插件截图
        ├── 1.png / 2.png / 3.png       # 中文版截图
        └── 11.png / 22.png / 33.png    # 英文版截图
```

## 本地预览

直接在浏览器中打开 `index.html` 即可预览。

## AI 对话开发记录

本落地页通过与 AI 助手（Claude）对话协作完成，以下是关键开发节点：

### 第 1 轮：初始生成

- **需求**：根据 ai-chat-outlinemate 项目生成单页落地页，现代专业风格，支持深色模式，字体 Inter
- **产出**：完成 HTML 结构（Navbar + Hero + Features + Platforms + Screenshots + CTA + Footer）、CSS 样式（亮/暗双主题变量、响应式布局）、JS 交互（主题切换、中英双语 i18n、滚动动画）
- **设计决策**：Hero 采用左右两栏布局，左侧文案 + 右侧截图；配色基于插件红色主题 `#e04e3e`

### 第 2 轮：交互优化 + 路径修复 + Logo 替换

- **问题 1**：feature-card hover 过渡生硬 → 改用 `cubic-bezier(0.4, 0, 0.2, 1)` 缓动曲线，300ms 分属性过渡
- **问题 2**：用户将截图、JS、CSS 移动到 `static/` 子目录 → 更新所有资源路径
- **问题 3**：平台 logo 使用 SVG 占位符 → 替换为 `static/logo/` 下的实际 PNG 图片（openai、gemini、豆包、月之暗面、通义千问）

### 第 3 轮：截图语言联动

- **问题**：截图区域使用 tab 切换中英文版本，应改为跟随当前语言自动切换
- **修改**：移除 tab UI 和相关 CSS/JS，在 `setLang()` 中根据语言自动更新所有 `.screenshot-card` 的图片 src

### 第 4 轮：风格重构 — 暗黑优先

- **需求**：参考深色渐变风格设计图，重构为暗黑优先风格，插件已上线 Chrome 应用商店
- **重大变更**：
  - CSS 变量反转：`:root` 改为深色配色（`#0a0e1a`），`[data-theme="light"]` 为亮色覆盖
  - Hero 改为居中布局，移除右侧截图，统计数据改为三张独立带边框卡片横排
  - 添加顶部/底部暖色渐变光晕（`.hero-glow-top` / `.hero-glow-bottom`）
  - 卡片使用 `rgba(255,255,255,0.04)` 半透明背景 + 细边框玻璃质感
  - 所有安装链接更新为真实 Chrome Web Store 地址
  - JS 默认主题改为 `'dark'`

### 第 5 轮：细节修复

- **卡片 hover 高亮阴影**：feature-card 和 platform-card hover 时添加 `0 0 40px var(--color-glow-warm)` 暖色光晕
- **默认暗黑模式**：严格校验 localStorage 存储值，仅接受 `'light'` 或 `'dark'`
- **语言初始化**：检测 `navigator.language`，中文地区（`zh-*`）显示中文，其他地区默认英文；增加 `navigator.userLanguage` 兼容
- **README 生成**：本文件
