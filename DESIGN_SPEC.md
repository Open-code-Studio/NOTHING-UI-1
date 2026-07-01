# NOTHING UI — 设计规范文档 v1.0

> OPEN OS 默认界面语言 · 基于 Material Design 3 叠层架构 · 深色 · 高密度 · 数据优先

---

## 目录

1. [设计哲学](#1-设计哲学)
2. [颜色系统](#2-颜色系统)
3. [字体与排版](#3-字体与排版)
4. [布局与间距](#4-布局与间距)
5. [组件规范](#5-组件规范)
6. [交互模式](#6-交互模式)
7. [动效与过渡](#7-动效与过渡)
8. [图标与图形](#8-图标与图形)
9. [暗色模式](#9-暗色模式)
10. [组件变体与状态](#10-组件变体与状态)
11. [可访问性](#11-可访问性)
12. [实现指引](#12-实现指引)
13. [设计示例](#13-设计示例)

---

## 1. 设计哲学

### 核心原则

| # | 原则 | 说明 |
|---|------|------|
| **1** | **数据优先（Data First）** | 界面服务于信息，而非装饰。每一个像素都为数据展示而存在，去除一切非功能性视觉元素 |
| **2** | **深度即层级（Depth as Hierarchy）** | 利用 Z 轴叠层建立清晰的信息架构，surface 之间的高度差即信息重要性之差 |
| **3** | **零干扰（Zero Distraction）** | 无渐变、无阴影模糊、无圆角装饰、无动画炫技。界面应消失在用户的注意力之外 |
| **4** | **键盘即王道（Keyboard First）** | 所有操作可通过键盘完成，快捷键体系参考终端/IDE 操作习惯，鼠标为辅助输入方式 |
| **5** | **高密度但不拥挤（Dense but Clear）** | 在有限空间内呈现最大信息量，但不以牺牲可读性为代价。留白是功能性的，而非装饰性的 |

### NOTHING 的含义

"NOTHING" 不是"什么都没有"，而是一种设计立场：

- **不被定义**：不属于 Material、Fluent、HIG 任何一派，但汲取各家之精华
- **不模仿**：不追求"像某个操作系统"，OPEN OS 有自己独特的视觉语言
- **不妥协**：不因"用户习惯"而保留过时的设计范式，不为营销而添加装饰

### 与主流设计系统的根本区别

| 维度 | MD3 | Fluent | HIG | **NOTHING UI** |
|------|-----|--------|-----|----------------|
| 目标用户 | 消费者 | 消费者/企业 | 消费者 | **开发者/极客** |
| 默认模式 | 浅色 | 浅色 | 浅色 | **深色** |
| 信息密度 | 低（大量留白） | 中 | 中 | **高** |
| 圆角 | 大（16-28px） | 大（8-12px） | 中 | **0-4px** |
| 阴影 | 柔和扩散 | 柔和扩散 | 无 | **硬阴影（锐利）** |
| 动效时长 | 300-500ms | 300-500ms | 300ms | **≤200ms** |
| 装饰元素 | 丰富 | 丰富 | 中等 | **无** |

---

## 2. 颜色系统

### 2.1 背景色板（Surfaces）

基于 MD3 叠层模型，背景分为 4 个层级。在深色模式下，更低层（更靠近底层）的颜色更深，更高层的颜色更浅。

| Token | 色值 | 用途 |
|-------|------|------|
| `--surface-0` | `#0A0A0A` | 根背景，桌面/窗口底层 |
| `--surface-1` | `#111111` | 一级容器：侧边栏、面板背景 |
| `--surface-2` | `#181818` | 二级容器：卡片、列表组、对话框 |
| `--surface-3` | `#1E1E1E` | 三级容器：悬浮卡片、弹出菜单、工具提示 |

### 2.2 强调色（Accent）

推荐三种强调色，用于不同场景。系统默认青色，用户可自定义。

| 名称 | 主色 | 悬停 | 激活 |
|------|------|------|------|
| **Cyan（默认）** | `#00BCD4` | `#26C6DA` | `#0097A7` |
| **Green** | `#4CAF50` | `#66BB6A` | `#388E3C` |
| **Orange** | `#FF9800` | `#FFA726` | `#F57C00` |

强调色使用规则：
- **仅用于交互元素**：选中指示器、链接、进度条、焦点环
- **不可用于大面填充**：强调色是"信号"，不是"氛围"
- **不可用于文本**：正文始终为中性色，强调色文本仅用于可交互链接

### 2.3 文本层级

| Token | 色值 | 用途 |
|-------|------|------|
| `--text-primary` | `#F5F5F5` | 主要内容、标题、正文 |
| `--text-secondary` | `#B0B0B0` | 辅助信息、描述文本、元数据 |
| `--text-tertiary` | `#707070` | 弱化文本、占位符、禁用状态文本 |

**对比度（深色模式）**：
- Primary: `#F5F5F5` 对 `#0A0A0A` → 19.2:1 (AAA)
- Secondary: `#B0B0B0` 对 `#0A0A0A` → 7.1:1 (AAA)
- Tertiary: `#707070` 对 `#0A0A0A` → 3.2:1 (AA)

### 2.4 状态色

| 状态 | 主色 | 背景色（半透明） | 用途 |
|------|------|-----------------|------|
| **Success** | `#4CAF50` | `rgba(76,175,80,0.12)` | 操作成功、状态正常 |
| **Warning** | `#FF9800` | `rgba(255,152,0,0.12)` | 警告、需要注意 |
| **Error** | `#F44336` | `rgba(244,67,54,0.12)` | 错误、失败、危险操作 |
| **Info** | `#2196F3` | `rgba(33,150,243,0.12)` | 信息提示、帮助 |

### 2.5 边框与分割线

| Token | 色值 | 用途 |
|-------|------|------|
| `--border-subtle` | `rgba(255,255,255,0.06)` | 次级分割、列表项之间 |
| `--border-default` | `rgba(255,255,255,0.10)` | 默认边框、卡片边缘 |
| `--border-strong` | `rgba(255,255,255,0.16)` | 强分割、聚焦元素边框 |

### 2.6 CSS 变量定义

```css
:root {
  /* ---- Surfaces ---- */
  --surface-0: #0A0A0A;
  --surface-1: #111111;
  --surface-2: #181818;
  --surface-3: #1E1E1E;

  /* ---- Accent (Cyan - Default) ---- */
  --accent:          #00BCD4;
  --accent-hover:    #26C6DA;
  --accent-active:   #0097A7;
  --accent-bg:       rgba(0, 188, 212, 0.12);
  --accent-bg-hover: rgba(0, 188, 212, 0.18);

  /* ---- Text ---- */
  --text-primary:    #F5F5F5;
  --text-secondary:  #B0B0B0;
  --text-tertiary:   #707070;

  /* ---- Status ---- */
  --color-success:       #4CAF50;
  --color-success-bg:    rgba(76, 175, 80, 0.12);
  --color-warning:       #FF9800;
  --color-warning-bg:    rgba(255, 152, 0, 0.12);
  --color-error:         #F44336;
  --color-error-bg:      rgba(244, 67, 54, 0.12);
  --color-info:          #2196F3;
  --color-info-bg:       rgba(33, 150, 243, 0.12);

  /* ---- Border ---- */
  --border-subtle:  rgba(255, 255, 255, 0.06);
  --border-default: rgba(255, 255, 255, 0.10);
  --border-strong:  rgba(255, 255, 255, 0.16);
}
```

---

## 3. 字体与排版

### 3.1 字体栈

NOTHING UI 强制使用系统等宽/无衬线字体，不引入自定义字体文件，保证零加载延迟、像素完美对齐。

#### 系统界面字体（UI Text）

```css
font-family:
  "Inter",                        /* 首选：现代屏显无衬线体 */
  "SF Pro Text",                  /* macOS */
  "Segoe UI",                     /* Windows */
  "Roboto",                       /* Android / Linux fallback */
  "Noto Sans SC", "Noto Sans JP", "Noto Sans KR",  /* CJK */
  "Helvetica Neue", "Arial",
  sans-serif;
```

#### 等宽字体（Code / Terminal）

```css
font-family:
  "JetBrains Mono",               /* 首选：现代编程字体 */
  "SF Mono",                      /* macOS */
  "Cascadia Code",                /* Windows */
  "Fira Code",                    /* Linux */
  "Consolas", "Monaco",
  monospace;
```

### 3.2 字号层级

在高密度布局下，字号范围压缩至 11px – 24px。不使用超过 24px 的标题。

| Token | 字号 | 行高 | 字重 | 用途 |
|-------|------|------|------|------|
| `--text-h1` | 24px | 32px (1.333) | 600 | 页面主标题 |
| `--text-h2` | 18px | 26px (1.444) | 600 | 区块标题 |
| `--text-h3` | 15px | 22px (1.467) | 600 | 子区块标题 |
| `--text-body` | 14px | 20px (1.429) | 400 | 正文 |
| `--text-body-sm` | 13px | 18px (1.385) | 400 | 辅助正文、列表项 |
| `--text-code` | 13px | 20px (1.538) | 400 | 代码块、终端文本 |
| `--text-caption` | 12px | 16px (1.333) | 400 | 标签、状态文本、时间戳 |
| `--text-overline` | 11px | 16px (1.455) | 500 | 分类标签、表头（全大写） |

### 3.3 CSS 定义

```css
:root {
  /* ---- Typography Scale ---- */
  --font-ui:    "Inter", "SF Pro Text", "Segoe UI", "Roboto",
                "Noto Sans SC", "Noto Sans JP", "Noto Sans KR",
                "Helvetica Neue", "Arial", sans-serif;
  --font-mono:  "JetBrains Mono", "SF Mono", "Cascadia Code",
                "Fira Code", "Consolas", "Monaco", monospace;

  --text-h1:       600 24px/32px var(--font-ui);
  --text-h2:       600 18px/26px var(--font-ui);
  --text-h3:       600 15px/22px var(--font-ui);
  --text-body:     400 14px/20px var(--font-ui);
  --text-body-sm:  400 13px/18px var(--font-ui);
  --text-code:     400 13px/20px var(--font-mono);
  --text-caption:  400 12px/16px var(--font-ui);
  --text-overline: 500 11px/16px var(--font-ui);
}
```

### 3.4 排版规则

1. **标题不换行**：H1/H2/H3 单行显示，溢出截断加省略号
2. **正文最大宽度**：70ch（约 560px @14px），超过换行
3. **数字右对齐**：表格中数值列统一右对齐，便于快速对比
4. **代码块不折行**：水平滚动，保持代码格式
5. **使用 tabular-nums**：数字使用等宽数字变体 `font-variant-numeric: tabular-nums`

---

## 4. 布局与间距

### 4.1 网格系统

基础网格单位：**4px**（0.25rem）。所有间距、尺寸必须是 4 的倍数。这意味着所有 margin、padding、width、height 都应能被 4 整除。

**为什么是 4px 而不是 8px？**  
8px 基础网格在低密度 UI 中足够，但在 NOTHING UI 的高密度场景下过于粗糙——8px 的最小步进在紧凑列表中会导致间距过大。4px 允许更精细的间距控制（4/8/12/16/20/24/…），同时保持足够的约束。

| Token | 值 | 倍率 | 用途 |
|-------|-----|------|------|
| `--space-1` | 4px | 1× | 最密间距：图标与文本间隙、紧密排列 |
| `--space-2` | 8px | 2× | 默认内边距、列表项内部间距、按钮组间距 |
| `--space-3` | 12px | 3× | 中等间距、元素组之间、卡片内容区 |
| `--space-4` | 16px | 4× | 卡片内边距、面板内边距、标准留白 |
| `--space-5` | 20px | 5× | 区块标题下方间距 |
| `--space-6` | 24px | 6× | 面板之间间距、页面水平边距 |
| `--space-8` | 32px | 8× | 页面垂直边距、大区块分隔 |
| `--space-10` | 40px | 10× | 大区块分隔、页脚到内容区的距离 |

**间距选择原则**：
- 关系越近，间距越小：同一组件内部用 4-8px，不同组件之间用 12-16px，不同区块之间用 24-32px
- 容器内部用 16px，除非是紧凑列表（8px）

```css
:root {
  --space-1:  4px;
  --space-2:  8px;
  --space-3:  12px;
  --space-4:  16px;
  --space-5:  20px;
  --space-6:  24px;
  --space-8:  32px;
  --space-10: 40px;
}
```

### 4.2 面板布局

系统界面的标准布局：**左窄右宽双面板**，比例约为 **1:3**（左侧 ~25%，右侧 ~75%）。

```
┌────────────────────┬──────────────────────────────────────────────┐
│                    │                                              │
│  左面板            │  右面板（主内容区）                            │
│  (Sidebar / List)  │  (Content / Detail / Editor)                 │
│  宽度: 280-360px   │  flex: 1（剩余空间）                          │
│  默认: 300px       │  最小: 480px                                 │
│  最小: 240px       │                                              │
│                    │                                              │
├────────────────────┴──────────────────────────────────────────────┤
│  状态栏: 28px 高                                                  │
└──────────────────────────────────────────────────────────────────┘
```

| 区域 | 宽度 | 最小宽度 | 说明 |
|------|------|---------|------|
| 左侧面板 | 280px – 360px（默认 **300px**） | 240px | 列表、导航、文件树、侧边栏 |
| 右侧面板 | `flex: 1` 弹性填充 | 480px | 主内容区、详情、编辑器、表单 |
| 面板分隔 | 1px 分割线（`--border-subtle`） | — | 紧贴分隔，无额外间距 |
| 底部状态栏 | 全宽，28px 高 | — | 状态信息、快捷键提示 |
| 最小窗口尺寸 | 1024px × 600px | — | 低于此尺寸收缩左面板并隐藏部分元素 |

**面板比例说明**：默认 300px + flex 约为 1:3 比例（在 1200px 宽窗口下）。当窗口缩小时，左面板保持最小 240px，右面板最小 480px。面板之间**不可拖拽调整比例**——保持布局的一致性。

**三面板布局**（可选）：
当需要文件树 + 列表 + 详情时，使用三列布局：
```
┌──────────┬────────────────┬──────────────────────────┐
│ 文件树    │ 列表           │ 详情                      │
│ 220px    │ 300px (min 240)│ flex: 1                  │
└──────────┴────────────────┴──────────────────────────┘
```

```css
/* 标准双面板 */
.app-layout {
  display: grid;
  grid-template-columns: 300px 1fr;
  grid-template-rows: 1fr 28px;
  height: 100vh;
  background: var(--surface-0);
}

.sidebar {
  background: var(--surface-1);
  border-right: 1px solid var(--border-subtle);
  overflow-y: auto;
}

.main-content {
  background: var(--surface-0);
  overflow-y: auto;
}

.statusbar {
  grid-column: 1 / -1;
  background: var(--surface-1);
  border-top: 1px solid var(--border-subtle);
}

/* 三面板 */
.app-layout.three-panel {
  grid-template-columns: 220px 300px 1fr;
}
```

### 4.3 信息密度原则

NOTHING UI 的核心理念之一是在有限空间内呈现最大信息量。以下是最佳实践：

1. **紧凑列表项**：标准 32px，紧凑 28px，约为传统 Material Design（48-56px）的 60%
2. **最小内边距**：卡片 padding 不超过 16px，按钮组之间 8px
3. **紧凑表格**：行高 28-32px，表头 28px，无额外留白
4. **折叠式面板**：长列表使用可折叠分组，默认展开常用项
5. **虚拟滚动**：长列表（>100 项）使用虚拟滚动，一次仅渲染可见项
6. **无 Hero 区域**：不使用大段空白或"英雄区"引导注意力——内容即焦点
7. **可滚动区域独立**：左面板和右面板各自独立滚动，互不影响
8. **状态栏信息最大化**：底部 28px 状态栏展示版本号、统计信息、快捷键提示

### 4.4 边距与内边距标准

| 区域 | 外边距 | 内边距 | 备注 |
|------|--------|--------|------|
| **页面容器** | 0（全窗） | `24px 32px`（垂直/水平） | 右面板内容区 |
| **卡片** | 底部 16px | `16px`（四周） | 卡片之间的间距 |
| **列表项** | 0 | `0 8px 0 12px`（上右下左） | 左侧预留 2px 指示器空间 |
| **按钮组** | 0 | 子元素间距 8px | 使用 flex gap |
| **对话框** | — | `24px` | 模态窗口内容区 |
| **弹出菜单** | 距离触发元素 4px | `4px 0`（垂直） | 菜单项内边距 `8px 12px` |
| **代码块** | 底部 16px | `12px 16px` | 等宽字体区域 |
| **表格** | 底部 16px | 单元格 `8px 12px` | 表头与行内边距一致 |

### 4.5 响应式断点（可选）

NOTHING UI **桌面端优先**，但提供平板/移动端的基本适配策略。

| 断点 | 宽度范围 | 布局策略 |
|------|---------|---------|
| **Desktop** | ≥ 1024px | 标准双面板，左 300px + 右弹性 |
| **Tablet Landscape** | 768px – 1023px | 左面板收缩至 240px，可折叠 |
| **Tablet Portrait** | 480px – 767px | 单面板，左面板通过汉堡菜单呼出 |
| **Mobile** | < 480px | 单列布局，优先级：内容 > 导航 |

```css
/* 响应式断点 */
@media (max-width: 1023px) {
  .app-layout {
    grid-template-columns: 240px 1fr;
  }
}

@media (max-width: 767px) {
  .app-layout {
    grid-template-columns: 1fr;       /* 单面板 */
  }
  .sidebar {
    position: fixed;
    left: -280px;
    z-index: 100;
    transition: left 200ms var(--ease-emphasized);
  }
  .sidebar.open {
    left: 0;
  }
  .sidebar-overlay {
    display: block;                   /* 点击遮罩关闭 */
  }
}
```

> **注意**：NOTHING UI 的移动端适配是辅助性的。桌面端（≥1024px）是主要目标平台，不应为移动端牺牲桌面端的信息密度。

---

## 5. 组件规范

### 5.1 按钮（Button）

NOTHING UI 提供三种按钮样式（填充、轮廓、文本）+ 一种危险按钮变体，均无圆角（`border-radius: 0`）。

#### 按钮颜色体系

| 颜色类型 | 背景/边框色 | 文字色 | 使用场景 |
|---------|------------|--------|---------|
| **主色（Primary）** | `var(--accent)` | `#000000`（填充）/ `var(--accent)`（轮廓/文本） | 主要操作：提交、确认、安装 |
| **中性（Neutral）** | `var(--border-default)` / 透明 | `var(--text-primary)` | 次要操作：取消、返回、更多选项 |
| **危险（Danger）** | `var(--color-error)` | `#FFFFFF`（填充）/ `var(--color-error)`（轮廓/文本） | 破坏性操作：删除、卸载、清空 |

#### 填充按钮（Filled Button）

用于主要操作。唯一使用强调色背景的按钮。危险操作使用错误色背景。

```css
.btn-filled {
  height: 32px;
  padding: 0 16px;
  border: none;
  border-radius: 0;
  background: var(--accent);
  color: #000000;                    /* 深色背景上的强调色按钮用黑色文字 */
  font: var(--text-body-sm);
  font-weight: 500;
  cursor: pointer;
  transition: background 150ms var(--ease-standard);
  user-select: none;
}
.btn-filled:hover   { background: var(--accent-hover); }
.btn-filled:active  { background: var(--accent-active); }
.btn-filled:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}
.btn-filled:disabled {
  background: rgba(255,255,255,0.08);
  color: var(--text-tertiary);
  cursor: not-allowed;
}
/* 填充按钮 — 危险变体 */
.btn-filled.btn-danger {
  background: var(--color-error);
  color: #FFFFFF;
}
.btn-filled.btn-danger:hover  { background: #E53935; }
.btn-filled.btn-danger:active { background: #C62828; }
```

#### 轮廓按钮（Outline Button）

用于次要操作。适合放在卡片、工具栏中。不支持危险变体（用文本按钮替代）。

```css
.btn-outline {
  height: 32px;
  padding: 0 16px;
  border: 1px solid var(--border-default);
  border-radius: 0;
  background: transparent;
  color: var(--text-primary);
  font: var(--text-body-sm);
  font-weight: 500;
  cursor: pointer;
  transition: border-color 150ms var(--ease-standard),
              background 150ms var(--ease-standard);
  user-select: none;
}
.btn-outline:hover {
  border-color: var(--accent);
  background: var(--accent-bg);
  color: var(--accent);
}
.btn-outline:active { background: var(--accent-bg-hover); }
.btn-outline:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}
.btn-outline:disabled {
  border-color: var(--border-subtle);
  color: var(--text-tertiary);
  cursor: not-allowed;
}
```

#### 文本按钮（Text Button）

用于最低优先级的操作，如"取消"、"了解更多"。也可用于危险变体。

```css
.btn-text {
  height: 32px;
  padding: 0 8px;
  border: none;
  border-radius: 0;
  background: transparent;
  color: var(--accent);
  font: var(--text-body-sm);
  font-weight: 500;
  cursor: pointer;
  transition: background 150ms var(--ease-standard);
  user-select: none;
}
.btn-text:hover   { background: var(--accent-bg); }
.btn-text:active  { background: var(--accent-bg-hover); }
.btn-text:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}
.btn-text:disabled {
  color: var(--text-tertiary);
  cursor: not-allowed;
}
/* 文本按钮 — 危险变体 */
.btn-text.btn-danger { color: var(--color-error); }
.btn-text.btn-danger:hover  { background: var(--color-error-bg); }
.btn-text.btn-danger:active { background: rgba(244, 67, 54, 0.18); }
```

#### 按钮尺寸

| 尺寸 | 高度 | 水平内边距 | 字号 | 最小宽度 | 用途 |
|------|------|-----------|------|---------|------|
| **Small** | 24px | 8px | 12px | 48px | 工具栏按钮、表格内操作、标签内嵌按钮 |
| **Medium**（默认） | 32px | 16px | 13px | 64px | 标准按钮、表单操作、卡片操作 |
| **Large** | 40px | 24px | 14px | 96px | 主要 CTA、对话框主按钮、登录按钮 |

#### 按钮使用场景决策

```
是否为主要操作？
├── 是 → 填充按钮（Filled）
│   └── 是否为破坏性操作（删除/卸载）？
│       └── 是 → 填充按钮 + Danger 变体
└── 否 → 是否在卡片/工具栏中？
    ├── 是 → 轮廓按钮（Outline）
    └── 否 → 操作风险程度？
        ├── 低风险（取消/返回/了解更多） → 文本按钮（Text）
        └── 破坏性（删除/清空） → 文本按钮 + Danger 变体
```

### 5.2 卡片（Card）

卡片用于分组相关内容。NOTHING UI 的卡片极其克制：零圆角、硬阴影、使用 surface 叠层区分。

```css
.card {
  background: var(--surface-2);
  border: 1px solid var(--border-subtle);
  border-radius: 0;                  /* 零圆角 */
  padding: 16px;
  /* 硬阴影：无 blur，仅有偏移 */
  box-shadow:
    0 1px 0 0 rgba(0, 0, 0, 0.3),
    0 2px 0 0 rgba(0, 0, 0, 0.15);
}
```

#### 卡片层级

| 层级 | Surface | 阴影 | 用途 |
|------|---------|------|------|
| Flat | `--surface-2` | 无 | 嵌入面板中的列表卡片 |
| Raised | `--surface-2` | `0 1px 0 rgba(0,0,0,0.3)` | 可交互卡片 |
| Elevated | `--surface-3` | `0 2px 0 rgba(0,0,0,0.3), 0 4px 0 rgba(0,0,0,0.15)` | 悬浮卡片、对话框 |

### 5.3 列表项（List Item）

列表是 NOTHING UI 最核心的组件。标准高度 32px，紧凑 28px。

```css
.list-item {
  display: flex;
  align-items: center;
  height: 32px;                      /* 高密度 */
  padding: 0 8px 0 12px;
  color: var(--text-primary);
  font: var(--text-body-sm);
  border-left: 2px solid transparent; /* 选中指示器预留位 */
  cursor: pointer;
  transition: background 100ms ease, border-color 100ms ease;
  user-select: none;
}
.list-item:hover {
  background: rgba(255, 255, 255, 0.04);
}
.list-item.active {
  background: var(--accent-bg);
  border-left-color: var(--accent);
  color: var(--accent);
}
.list-item .meta {
  margin-left: auto;
  color: var(--text-tertiary);
  font-size: 12px;
}
```

#### 列表项规范

| 属性 | 标准 | 紧凑 |
|------|------|------|
| 高度 | 32px | 28px |
| 左侧内边距 | 12px | 8px |
| 选中指示器宽度 | 2px | 2px |
| 图标尺寸 | 16px | 16px |
| 文本与图标间距 | 8px | 6px |

### 5.4 进度条（Progress Bar）

```css
.progress-bar {
  width: 100%;
  height: 4px;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 0;
  overflow: hidden;
}
.progress-bar-fill {
  height: 100%;
  background: var(--accent);
  transition: width 200ms ease-out;  /* 仅宽度过渡，无发光 */
}
.progress-bar-fill.indeterminate {
  width: 40%;
  animation: indeterminate 1.5s ease-in-out infinite;
}
@keyframes indeterminate {
  0%   { transform: translateX(-100%); }
  100% { transform: translateX(350%); }
}
```

| 属性 | 值 |
|------|-----|
| 高度 | 4px |
| 背景 | `rgba(255,255,255,0.08)` |
| 填充色 | `var(--accent)` |
| 圆角 | 0 |
| 不定动画时长 | 1.5s |

### 5.5 标签页（Tabs）

```css
.tabs {
  display: flex;
  height: 36px;
  border-bottom: 1px solid var(--border-subtle);
}
.tab {
  height: 36px;
  padding: 0 16px;
  border: none;
  border-bottom: 2px solid transparent;
  background: transparent;
  color: var(--text-secondary);
  font: var(--text-body-sm);
  font-weight: 500;
  cursor: pointer;
  transition: color 150ms ease, border-color 150ms ease;
}
.tab:hover {
  color: var(--text-primary);
  background: rgba(255, 255, 255, 0.03);
}
.tab.active {
  color: var(--accent);
  border-bottom-color: var(--accent);
}
```

| 属性 | 值 |
|------|-----|
| 高度 | 36px |
| 水平内边距 | 16px |
| 指示器 | 底部 2px 实线 |
| 指示器颜色 | `var(--accent)` |

### 5.6 搜索栏（Search Bar）

```css
.search-bar {
  display: flex;
  align-items: center;
  height: 32px;
  padding: 0 8px;
  background: var(--surface-2);
  border: 1px solid var(--border-default);
  border-radius: 0;
  transition: border-color 150ms ease, background 150ms ease;
}
.search-bar:focus-within {
  border-color: var(--accent);
  background: var(--surface-3);
}
.search-bar input {
  flex: 1;
  height: 100%;
  border: none;
  background: transparent;
  color: var(--text-primary);
  font: var(--text-body-sm);
  outline: none;
}
.search-bar input::placeholder {
  color: var(--text-tertiary);
}
.search-bar .search-icon {
  width: 16px;
  height: 16px;
  margin-right: 8px;
  color: var(--text-tertiary);
}
```

### 5.7 滚动条（Scrollbar）

NOTHING UI 使用极简滚动条：纤细、半透明、悬停时显现。

```css
/* Webkit (Chrome/Safari/Edge) */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.12);
  border-radius: 0;                  /* 零圆角 */
}
::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.24);
}
::-webkit-scrollbar-corner {
  background: transparent;
}

/* Firefox */
* {
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.12) transparent;
}
```

| 属性 | 值 |
|------|-----|
| 宽度 | 6px |
| 滑块颜色 | `rgba(255,255,255,0.12)` |
| 滑块悬停颜色 | `rgba(255,255,255,0.24)` |
| 滑轨背景 | 透明 |
| 圆角 | 0 |

---

## 6. 交互模式

### 6.1 键盘导航

NOTHING UI 的键盘体系受终端/IDE 启发，所有导航和操作均可纯键盘完成。

#### 全局快捷键

| 快捷键 | 操作 |
|--------|------|
| `Ctrl+K` / `Cmd+K` | 命令面板（全局搜索命令） |
| `Ctrl+P` / `Cmd+P` | 快速打开 / 文件搜索 |
| `Ctrl+Shift+P` / `Cmd+Shift+P` | 命令面板（含设置） |
| `Ctrl+W` / `Cmd+W` | 关闭当前标签/面板 |
| `Ctrl+Shift+W` | 重新打开已关闭的标签 |
| `Ctrl+Tab` | 切换下一个标签 |
| `Ctrl+Shift+Tab` | 切换上一个标签 |
| `Ctrl+1~9` | 跳转到第 N 个标签 |
| `Ctrl+B` / `Cmd+B` | 切换侧边栏 |
| `Ctrl+J` / `Cmd+J` | 切换底部面板（终端/日志） |
| `Ctrl+\\` | 切换分屏 |
| `Escape` | 关闭弹窗/菜单/面板，返回主焦点 |
| `/` | 聚焦搜索栏 |
| `Ctrl+/` | 切换注释 (contextual) |

#### 列表导航

| 按键 | 操作 |
|------|------|
| `↑` / `↓` | 上下移动焦点 |
| `Enter` | 打开/确认当前项 |
| `Space` | 多选模式下切换选中 |
| `Ctrl+A` | 全选 |
| `Shift+↑/↓` | 范围选择 |
| `Home` | 跳转到列表首项 |
| `End` | 跳转到列表末项 |
| `PageUp/PageDown` | 翻页 |

#### 焦点指示器

```css
*:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: -2px;              /* 向内描边，不破坏布局 */
}
```

### 6.2 鼠标交互

| 交互 | 视觉反馈 | 说明 |
|------|---------|------|
| 悬停（Hover） | `rgba(255,255,255,0.04)` 叠加 | 极浅的增亮，仅微提示可交互性 |
| 按下（Press） | `rgba(255,255,255,0.08)` 叠加 | 略深的反馈 |
| 选中（Select） | `var(--accent-bg)` + 左侧指示器 | 明确的选中状态 |
| 拖拽（Drag） | 源位置半透明 + 目标位置插入线 | 列表/面板重排 |

### 6.3 触控支持

桌面端优先，但需确保触控场景下可用。启用触控优化时，系统自动切换至 `--touch-optimized` 模式。

| 元素 | 桌面最小 | 触控最小 | 说明 |
|------|---------|---------|------|
| 可点击区域 | 28×28px | **44×44px** | 遵循 Apple HIG / Material Design 触控标准 |
| 列表项高度 | 32px | 44px | 触控模式放大 37.5% |
| 按钮高度 | 32px（中） | 44px | 触控模式使用大号按钮 |
| 滚动条宽度 | 6px | 8px | 触控略微加宽 |
| 触控手势 | — | 单指滑动（滚动）、双指缩放（可选）、长按（右键菜单） | 桌面端不依赖手势 |

```css
/* 触控优化模式 */
[data-input-mode="touch"] {
  --list-item-height: 44px;
  --button-height: 44px;
  --scrollbar-width: 8px;
}
```

### 6.4 焦点指示器

焦点指示器 **仅在键盘导航时可见**（`:focus-visible`），鼠标点击不显示焦点环。这避免了视觉噪音，同时保证键盘用户的可达性。

```css
/* 默认隐藏焦点（鼠标用户无感） */
*:focus {
  outline: none;
}

/* 键盘导航时显示 2px 强调色内描边 */
*:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: -2px;              /* 向内描边，不破坏布局，不产生额外间距 */
}

/* 输入框焦点：边框变色 */
input:focus-visible,
textarea:focus-visible,
select:focus-visible {
  outline: none;
  border-color: var(--accent);
  box-shadow: 0 0 0 1px var(--accent);  /* 内阴影模拟内描边 */
}
```

| 焦点类型 | 触发方式 | 视觉反馈 | 说明 |
|---------|---------|---------|------|
| 焦点环 | `Tab` / `Shift+Tab` | 2px accent 内描边（`outline-offset: -2px`） | 仅键盘导航可见 |
| 输入框焦点 | 键盘/鼠标点击 | accent 边框 + `box-shadow` 1px 内描边 | 点击也可见（输入场景需要） |
| 跳过焦点 | 鼠标点击 | 无额外视觉反馈 | 避免视觉噪音 |

---

## 7. 动效与过渡

### 7.1 动效原则

1. **快**：所有动效在 200ms 内完成，不超过 250ms
2. **干脆**：无弹性（no bounce）、无过冲（no overshoot）、无弹簧动效。使用标准缓出曲线
3. **功能性**：动效仅服务于状态过渡，不为了"好看"而存在
4. **可跳过**：尊重用户系统级"减少动效"偏好设置（`prefers-reduced-motion`）
5. **不阻塞交互**：动效期间用户可以立即进行下一次操作，无等待期

### 7.2 缓动函数

推荐使用 Material Design 的标准缓动曲线体系。最常用的是 **Standard Easing** `cubic-bezier(0.4, 0.0, 0.2, 1)` —— 快速启动、缓慢减速，给人干脆利落的感觉。

```css
:root {
  /* 标准缓出：通用过渡，最常用。快速启动 → 缓慢减速 */
  --ease-standard:   cubic-bezier(0.4, 0.0, 0.2, 1);

  /* 强调缓出：更强烈的加速感，用于大面积变化的过渡 */
  --ease-emphasized: cubic-bezier(0.05, 0, 0, 1);

  /* 减速缓出：纯减速，适合元素"出现"的场景 */
  --ease-decelerate: cubic-bezier(0.0, 0.0, 0.2, 1);

  /* 加速缓出：纯加速，适合元素"消失"的场景 */
  --ease-accelerate: cubic-bezier(0.4, 0.0, 1, 1);
}
```

**曲线对比**：

| 曲线 | 函数 | 感觉 | 适用 |
|------|------|------|------|
| Standard | `(0.4, 0.0, 0.2, 1)` | 果断、快速 | 通用：悬停、选中、颜色变化 |
| Emphasized | `(0.05, 0, 0, 1)` | 有力、存在感强 | 面板展开/折叠 |
| Decelerate | `(0.0, 0.0, 0.2, 1)` | 平滑出现 | 淡入、下拉菜单、对话框 |
| Accelerate | `(0.4, 0.0, 1, 1)` | 快速消失 | 淡出、关闭、移除 |

### 7.3 应用场景

| 场景 | 时长 | 缓动 | 说明 |
|------|------|------|------|
| 悬停反馈 | 100ms | `ease-standard` | 背景色/边框色变化 |
| 选中切换 | 150ms | `ease-standard` | 左侧指示器 + 背景色 |
| 面板展开/折叠 | 200ms | `ease-emphasized` | 宽度/高度过渡 |
| 页面切换 | 150ms | `ease-decelerate`（入） / `ease-accelerate`（出） | 透明度 + 微平移 |
| 进度条更新 | 200ms | `ease-standard` | 仅宽度过渡 |
| 下拉菜单 | 150ms | `ease-decelerate` | 透明度 + 向下平移 4px |
| 工具提示 | 100ms | `ease-standard` | 仅透明度变化 |

```css
/* 全局动效开关 */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

### 7.4 动效代码示例

```css
/* 面板展开 */
.panel {
  overflow: hidden;
  transition: max-height 200ms var(--ease-emphasized),
              opacity 150ms var(--ease-standard);
}
.panel.collapsed {
  max-height: 0;
  opacity: 0;
}
.panel.expanded {
  max-height: 1000px;                /* 足够大的值 */
  opacity: 1;
}

/* 下拉菜单 */
.dropdown {
  opacity: 0;
  transform: translateY(-4px);
  transition: opacity 150ms var(--ease-decelerate),
              transform 150ms var(--ease-decelerate);
  pointer-events: none;
}
.dropdown.open {
  opacity: 1;
  transform: translateY(0);
  pointer-events: auto;
}
```

---

## 8. 图标与图形

### 8.1 图标风格

- **线框风格**：**2px** 描边（默认）或 1.5px 描边（小尺寸），无填充
- **几何化**：由直线和弧线构成，无有机曲线，无卡通风格
- **像素对齐**：所有线条对齐像素网格，保证清晰锐利。在非 Retina 屏幕上尤其重要
- **统一视觉大小**：圆形图标略大于方形图标（视觉补偿），使所有图标在视觉上等大
- **方形边界框**：所有图标在标准尺寸的方形画布内绘制，如 24×24px

### 8.2 推荐图标库

推荐使用以下开源图标库的线框版本。它们风格一致，开箱即用：

| 图标库 | 特点 | 推荐用途 | 许可证 |
|--------|------|---------|--------|
| **Lucide Icons** | 最接近 NOTHING UI 风格，2px 描边，几何化，TypeScript 原生支持 | **首选推荐** | ISC |
| **Feather Icons** | 经典线框图标库，1.5px 描边，极简克制 | Web 项目 | MIT |
| **Phosphor Icons** | 6 种粗细可选，Regular（1.5px）或 Bold（2px）均可 | 需多粗细的场景 | MIT |

**使用建议**：直接使用 SVG 源码而非图标字体，以获得最佳渲染质量和最小加载体积。

```html
<!-- 使用 Lucide Icons (推荐) -->
<svg class="icon-16" viewBox="0 0 24 24" fill="none"
     stroke="currentColor" stroke-width="2"
     stroke-linecap="square" stroke-linejoin="miter">
  <circle cx="11" cy="11" r="8"/>
  <path d="m21 21-4.3-4.3"/>
</svg>
```

### 8.3 标准尺寸

| 尺寸 | 画布 | 描边宽度 | 用途 |
|------|------|---------|------|
| 12px | 12×12 | 1.5px | 列表项内联指示器、状态点 |
| 16px | 16×16 | 2px | 按钮图标、列表图标、标签页图标 |
| 20px | 20×20 | 2px | 工具栏图标、卡片操作图标 |
| 24px | 24×24 | 2px | 导航图标、系统图标、菜单图标 |
| 32px | 32×32 | 2px | 应用图标（小）、特征图标 |

### 8.4 图标颜色

图标颜色遵循**继承当前文本色**原则，通过 `currentColor` 实现：

| 上下文 | 图标颜色 | Token |
|--------|---------|-------|
| 按钮内（填充） | `#000000`（跟随按钮文字） | 继承 |
| 按钮内（轮廓/文本） | 强调色（跟随按钮文字） | 继承 |
| 列表项（默认） | `var(--text-secondary)` | 次级文本色 |
| 列表项（选中） | `var(--accent)` | 强调色 |
| 导航栏 | `var(--text-primary)` | 主文本色 |
| 工具栏 | `var(--text-secondary)` | 次级文本色 |
| 输入框内 | `var(--text-tertiary)` | 弱化文本色 |
| 状态指示器 | 对应状态色 | `--color-success / warning / error / info` |

### 8.5 图标使用规范

```css
.icon-12 { width: 12px; height: 12px; }
.icon-16 { width: 16px; height: 16px; }
.icon-20 { width: 20px; height: 20px; }
.icon-24 { width: 24px; height: 24px; }
.icon-32 { width: 32px; height: 32px; }

/* 基础图标样式：所有图标共用 */
.icon {
  color: inherit;
  fill: none;
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: square;           /* 方形线端，干净利落 */
  stroke-linejoin: miter;           /* 尖角连接，非圆角 */
  flex-shrink: 0;                   /* 图标大小不变 */
}
```

### 8.6 自定义装饰图形

NOTHING UI 允许使用极简的数据流/电路板风格的装饰图形，用于加载状态占位、空状态插图、系统架构图。

**设计约束**：
- 颜色：`var(--border-default)`（`rgba(255,255,255,0.10)`）
- 线宽：1px
- 构图：仅由直线和 90°/45° 折线构成
- 无填充区域、无渐变、无模糊

**装饰图形灵感来源**：

| 主题 | 描述 | 适用场景 |
|------|------|---------|
| **终端光标** | 闪烁的下划线或块状光标（`█`） | 加载状态、命令行界面 |
| **二进制数据流** | `01` 字符的纵向或横向排列流 | 数据处理界面、日志面板 |
| **网络拓扑** | 节点（小方块）+ 连线（直线/折线）的图结构 | 网络状态、系统架构 |
| **波形** | 简单的方波或阶梯波形 | 音频/信号状态 |
| **电路走线** | 45° 折线和焊盘（小实心圆）构成的电路板图样 | 系统信息、硬件状态 |

```css
/* 数据流装饰示例 */
.data-stream-decoration {
  color: var(--border-default);
  font: var(--text-code);
  font-size: 11px;
  line-height: 1;
  letter-spacing: 2px;
  user-select: none;
  opacity: 0.6;
}
```

---

## 9. 暗色模式

NOTHING UI **默认深色模式**。浅色模式作为辅助方案提供。

### 9.1 CSS 变量命名策略

NOTHING UI 使用**语义化变量名**，不包含 "dark" 或 "light" 前缀。通过切换 CSS 变量值实现主题变化，而非创建第二套变量。

```
✓ 推荐：--surface-0, --text-primary
✗ 避免：--dark-surface-0, --light-surface-0
✗ 避免：--color-bg, --color-text（过于通用，无法表达层级）
```

这种策略的优势：
- **框架无关**：任何框架都能通过替换 CSS 变量值实现主题切换
- **单一来源**：所有组件引用同一套变量，不会出现浅色/深色不一致
- **易于扩展**：未来可增加更多主题（高对比度、色盲优化）而不修改组件代码

### 9.2 深色模式色板（默认）

详见 [颜色系统](#2-颜色系统) 章节。

### 9.3 浅色模式色板

当用户显式切换至浅色模式时，颜色系统反向映射。关键变化：
- **Surface 层级反转**：低层变亮（`#FAFAFA`），高层变深（`#E0E0E0`），与深色模式相反
- **文本色反转**：主文本变为深色（`#1A1A1A`）
- **强调色调整**：保持相同色相，但加深色值以维持白色背景上的对比度
- **状态色调整**：主色加深，背景透明度降至 10%

```css
[data-theme="light"] {
  /* ---- Surfaces (反转: 高层更深，低层更亮) ---- */
  --surface-0: #FAFAFA;
  --surface-1: #F5F5F5;
  --surface-2: #EEEEEE;
  --surface-3: #E0E0E0;

  /* ---- Text (反转) ---- */
  --text-primary:    #1A1A1A;
  --text-secondary:  #616161;
  --text-tertiary:   #9E9E9E;

  /* ---- Accent (加深以维持浅色背景上的对比度) ---- */
  --accent:          #00838F;
  --accent-hover:    #0097A7;
  --accent-active:   #006064;
  --accent-bg:       rgba(0, 131, 143, 0.08);
  --accent-bg-hover: rgba(0, 131, 143, 0.14);

  /* ---- Border (深色线条变浅) ---- */
  --border-subtle:  rgba(0, 0, 0, 0.06);
  --border-default: rgba(0, 0, 0, 0.10);
  --border-strong:  rgba(0, 0, 0, 0.16);

  /* ---- Status (保持色相，加深以适应浅色背景) ---- */
  --color-success:       #2E7D32;
  --color-success-bg:    rgba(46, 125, 50, 0.10);
  --color-warning:       #E65100;
  --color-warning-bg:    rgba(230, 81, 0, 0.10);
  --color-error:         #C62828;
  --color-error-bg:      rgba(198, 40, 40, 0.10);
  --color-info:          #1565C0;
  --color-info-bg:       rgba(21, 101, 192, 0.10);

  /* ---- Scrollbar ---- */
  --scrollbar-thumb:       rgba(0, 0, 0, 0.16);
  --scrollbar-thumb-hover: rgba(0, 0, 0, 0.28);

  /* ---- 按钮填充色（浅色模式下用白色文字） ---- */
  --btn-filled-text: #FFFFFF;
}
```

### 9.4 模式切换实现

三种优先级逐级覆盖：默认深色 < 系统偏好 < 用户显式选择。

```css
/* 第一优先级：默认深色模式 */
:root {
  /* 所有深色模式变量 */
}

/* 第二优先级：跟随系统偏好（仅当用户未手动选择时生效） */
@media (prefers-color-scheme: light) {
  :root:not([data-theme="dark"]) {
    /* 浅色变量 */
  }
}

/* 第三优先级：用户显式选择（最高优先级） */
[data-theme="light"] {
  /* 浅色变量 */
}
[data-theme="dark"] {
  /* 强制深色变量（覆盖系统偏好） */
}
```

```html
<!-- 用户选择器示例 -->
<button onclick="document.documentElement.dataset.theme = 'light'">
  浅色模式
</button>
<button onclick="document.documentElement.dataset.theme = 'dark'">
  深色模式
</button>
<button onclick="delete document.documentElement.dataset.theme">
  跟随系统
</button>
```

### 9.5 切换过渡

模式切换应有平滑过渡（150ms），但不是花哨的动画。

```css
* {
  transition:
    background-color 150ms var(--ease-standard),
    color 150ms var(--ease-standard),
    border-color 150ms var(--ease-standard);
}

/* 动效偏好：切换时仍保留过渡（不是装饰性动画） */
@media (prefers-reduced-motion: reduce) {
  * { transition-duration: 0.01ms !important; }
}
```

---

## 10. 组件变体与状态

### 10.1 状态定义

每个交互组件必须覆盖以下状态：

| 状态 | 说明 | 触发条件 | CSS 伪类 |
|------|------|---------|---------|
| **Default** | 默认态 | 初始渲染 | — |
| **Hover** | 悬停态 | 鼠标指针位于元素上方 | `:hover` |
| **Active/Pressed** | 激活/按下态 | 鼠标按下或键盘 `Enter`/`Space` 按住 | `:active` |
| **Focus** | 聚焦态 | 键盘 `Tab` 导航至此元素 | `:focus-visible` |
| **Selected** | 选中态 | 列表项/标签页当前选中 | `.active`、`[aria-selected="true"]` |
| **Disabled** | 禁用态 | `disabled` 属性或 `aria-disabled="true"` | `:disabled`、`[aria-disabled="true"]` |
| **Loading** | 加载态 | 异步操作进行中 | `.loading` |

### 10.2 光标样式规范

光标是交互可操作性的最直接信号，不同状态使用不同光标。

| 状态 | 光标 | CSS | 说明 |
|------|------|-----|------|
| 可点击元素 | `pointer` | `cursor: pointer` | 按钮、链接、可点击行 |
| 文本选择 | `text` | `cursor: text` | 输入框、可选择文本 |
| 文本选中 | `text` → 保持 | — | 选中时不改变光标 |
| 可移动元素 | `move` / `grab` | `cursor: grab` | 可拖拽区域 |
| 拖拽中 | `grabbing` | `cursor: grabbing` | 正在拖拽 |
| 禁用状态 | `not-allowed` | `cursor: not-allowed` | 禁用按钮、不可用列表项 |
| 不可交互 | `default` | `cursor: default` | 非交互文本、静态区域 |
| 等待/加载 | `wait` 或 `progress` | `cursor: wait` | 全局阻塞操作（极少使用） |
| 调整大小 | 对应方向 resize | `cursor: col-resize` | 可拖拽调整列宽/面板大小 |

### 10.3 状态视觉映射表

| 组件 | Default | Hover | Active | Focus | Selected | Disabled | Loading |
|------|---------|-------|--------|-------|----------|----------|---------|
| **填充按钮** | accent 背景 + 黑字 | 略浅背景 | 略深背景 | 2px accent 内描边 | — | `rgba(255,255,255,0.08)` 背景 + tertiary 文本 | accent 背景 + spinner |
| **轮廓按钮** | 透明 + default 边框 | accent 边框 + accent-bg | accent-bg-hover | 2px accent 内描边 | — | tertiary 文本 + subtle 边框 | spinner 替换文本 |
| **文本按钮** | 透明 + accent 文字 | accent-bg | accent-bg-hover | 2px accent 内描边 | — | tertiary 文本 | spinner 替换文本 |
| **列表项** | 透明 + primary 文字 | `rgba(255,255,255,0.04)` | `rgba(255,255,255,0.08)` | 2px accent 内描边 | accent-bg + accent 指示器 | tertiary 文本 | — |
| **输入框** | surface-2 + default 边框 | border-strong | accent 边框 | accent 边框 | — | surface-1 + tertiary 文本 | — |
| **标签页** | secondary 文字 | primary 文字 + 微背景 | — | 2px accent 内描边 | accent 文字 + accent 指示器 | tertiary 文字 | — |
| **开关** | surface-2 轨道 | — | — | 2px accent 外描边 | accent 轨道 | surface-1 轨道 | — |
| **复选框** | surface-2 + default 边框 | border-strong | — | 2px accent 外描边 | accent 填充 + 白色勾 | subtle 边框 + tertiary | — |

### 10.4 变体使用场景

选择组件变体时，根据操作的**重要性层级**和**潜在风险**判断：

| 变体类型 | 视觉权重 | 适用场景 | 不适用场景 |
|---------|---------|---------|-----------|
| **填充按钮（Primary）** | 高 | 主要 CTA、表单提交、确认对话框主操作 | 工具栏大量重复操作 |
| **填充按钮（Danger）** | 高 + 警示 | 删除确认、卸载软件、清空数据 | 可撤销的普通操作 |
| **轮廓按钮** | 中 | 卡片次操作、工具栏、下拉菜单触发 | 独立的 CTA |
| **文本按钮** | 低 | 取消、返回、了解更多、内联操作 | 表单中的主要提交 |
| **文本按钮（Danger）** | 低 + 警示 | 列表中删除单行、次要破坏性操作 | 需要二次确认的高风险操作 |
| **图标按钮** | 低 | 工具栏最常用操作（搜索、设置、关闭） | 含义不明确的抽象图标 |

**组合使用原则**：
- 同一操作区域最多**一个**填充按钮（最优先操作）
- 填充按钮 + 轮廓按钮（主要 + 次要）是最常见的组合
- 文本按钮用于与主要操作明显区分的最低优先级选项
- 危险操作应与其他按钮**物理分隔**（分组/间距），防止误触

### 10.5 加载状态规范

加载指示器使用**细线旋转环**，不是传统的粗圆环或点阵。

```css
.spinner {
  width: 16px;
  height: 16px;
  border: 1.5px solid rgba(255, 255, 255, 0.12);
  border-top-color: var(--accent);
  border-radius: 50%;
  animation: spin 600ms linear infinite;
}
@keyframes spin {
  to { transform: rotate(360deg); }
}
```

| 尺寸 | 用途 |
|------|------|
| 12px | 按钮内 |
| 16px | 行内/列表项 |
| 20px | 卡片/面板 |
| 24px | 全页加载（居中） |

---

## 11. 可访问性

### 11.1 对比度合规

NOTHING UI 深色模式满足 WCAG 2.1 标准：

**WCAG 2.1 对比度要求**：
| 级别 | 正文（<18px / <14pt bold） | 大文本（≥18px / ≥14pt bold） | UI 组件与图形 |
|------|---------------------------|------------------------------|-------------|
| **AA**（最低） | **4.5:1** | **3:1** | 3:1 |
| **AAA**（增强） | 7:1 | 4.5:1 | 3:1 |

**NOTHING UI 深色模式实际对比度**：

| 色值对 | 用途 | 对比度 | WCAG AA | WCAG AAA |
|--------|------|--------|---------|----------|
| `#F5F5F5` / `#0A0A0A` | 主要文本、正文（14px） | 19.2:1 | ✅ 远超 4.5:1 | ✅ 远超 7:1 |
| `#B0B0B0` / `#0A0A0A` | 次要文本、辅助信息 | 7.1:1 | ✅ | ✅ |
| `#707070` / `#0A0A0A` | 弱化文本、占位符（仅用于 ≥18px 大文本或无功能装饰） | 3.2:1 | ⚠️ 仅大文本/装饰 | ❌ |
| `#00BCD4` / `#0A0A0A` | 强调色（UI 组件） | 8.6:1 | ✅ | ✅ |
| `#00BCD4` / `#000000` | 按钮文字/背景 | 8.6:1 | ✅ | ✅ |
| `#4CAF50` / `#0A0A0A` | 成功色 | 5.7:1 | ✅ | ❌ |
| `#FF9800` / `#0A0A0A` | 警告色 | 6.8:1 | ✅ | ❌ |
| `#F44336` / `#0A0A0A` | 错误色 | 4.3:1 | ✅ | ❌ |

> **注意**：`#707070`（`--text-tertiary`）不满足正文 4.5:1 AA 要求。该色值**只能用于**：
> - 大文本（≥18px 或 ≥14px bold），满足 3:1 要求
> - 纯装饰性元素（无功能含义）
> - 占位符文本
> - 禁用状态文本（无对比度要求）

### 11.2 字体缩放

- 支持浏览器 **200% 缩放**无布局破坏、无内容丢失、无水平滚动
- 使用 `rem` 和相对单位做内边距和字号，固定容器宽度可用 `px`
- 字号最小 11px（`--text-overline`），缩放后仍可读
- 不使用 `vw` 做字号（会阻止用户缩放）

```css
html {
  font-size: 100%;                   /* 尊重用户浏览器默认字号（通常 16px） */
}

/* 容器使用 rem 保持可缩放 */
.panel {
  width: 300px;                      /* 固定布局宽度可用 px */
  padding: 1rem;                     /* 内边距使用 rem（16px × 缩放倍率） */
  font-size: 0.8125rem;              /* 13px ÷ 16px = 0.8125rem */
}
```

### 11.3 色盲友好方案

1. **不单独依赖颜色传达信息**：所有状态指示器同时使用**图标 + 颜色 + 文本**三重编码
2. **强调色可替换**：提供 Cyan / Green / Orange 三种预置，覆盖常见色觉障碍（红色盲、绿色盲、蓝黄色盲）
3. **状态色加形状区分**：
   - Success：绿色 + ✓（对号）
   - Error：红色 + ✗（叉号）
   - Warning：橙色 + ⚠ （三角警告）
   - Info：蓝色 + ⓘ （信息圆圈）

```html
<!-- 好：多重编码 (颜色 + 图标 + 文本) -->
<div class="status success">
  <svg class="icon-16" aria-hidden="true"><!-- ✓ --></svg>
  安装成功
</div>

<!-- 差：仅靠颜色 -->
<div class="status" style="color: green">安装成功</div>
```

### 11.4 键盘可访问性

- 所有交互元素可通过 `Tab` 键触达（`tabindex="0"` 或原生可聚焦元素）
- 焦点顺序遵循视觉布局（DOM 顺序 = 视觉顺序）
- 无"键盘陷阱"：焦点可进出任何区域（模态框除外，`Esc` 关闭）
- 拖拽操作提供键盘替代（如列表重排：`Ctrl+Shift+↑/↓`）
- 自定义快捷键不与系统/浏览器/屏幕阅读器冲突

### 11.5 ARIA 语义支持

对于 Web 组件实现，合理使用 ARIA 增强屏幕阅读器体验：

| 组件 | 推荐 ARIA | 示例 |
|------|----------|------|
| 导航 | `<nav aria-label="主导航">` | 语义化原生元素 + label |
| 侧边栏 | `<aside aria-label="侧边栏">` 或 `role="complementary"` | 地标 |
| 搜索 | `<input type="search" aria-label="搜索软件包">` | `aria-label` 补充隐藏 label |
| 按钮 | `<button aria-label="搜索">` | 图标按钮无文本时必须加 |
| 标签页 | `role="tablist"`, `role="tab"`, `role="tabpanel"`, `aria-selected` | 标签页模式 |
| 列表 | `role="listbox"`, `role="option"`, `aria-selected` | 单选列表 |
| 进度条 | `role="progressbar"`, `aria-valuenow`, `aria-valuemin`, `aria-valuemax` | 确定进度 |
| 动态区域 | `aria-live="polite"`, `aria-atomic="true"` | 异步更新不打断阅读 |
| 对话框 | `role="dialog"`, `aria-modal="true"`, `aria-labelledby` | 模态窗口 |
| 开关 | `role="switch"`, `aria-checked` | 开关组件 |
| 工具提示 | `aria-describedby="tooltip-id"` | 补充信息 |
| 隐藏文本 | `<span class="sr-only">` | 仅供阅读器，不可见 |

```html
<!-- 屏幕阅读器专用类 -->
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
```

### 11.6 减少动效

尊重用户系统级 `prefers-reduced-motion` 设置：

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 12. 实现指引

### 12.1 框架无关性声明

NOTHING UI 是一份**设计规范文档**，而非某个特定框架的组件库。它定义了视觉语言、交互范式和设计令牌，但不绑定任何技术栈。

任何开发者都可以在自己的技术栈中实现 NOTHING UI：

| 平台类别 | 可选框架/技术 |
|---------|-------------|
| **Web 前端** | React、Vue、Svelte、Angular、Solid.js、Lit、Qwik |
| **跨平台桌面** | Electron、Tauri、Flutter Desktop、Qt 6 (QML) |
| **原生桌面 (macOS)** | SwiftUI、AppKit |
| **原生桌面 (Windows)** | WinUI 3、WPF |
| **原生桌面 (Linux)** | GTK 4、libadwaita |
| **移动端 (iOS)** | SwiftUI、UIKit |
| **移动端 (Android)** | Jetpack Compose、XML Views |
| **跨平台移动** | Flutter、React Native |
| **终端/TUI** | Textual (Python)、Bubble Tea (Go)、Ratatui (Rust) |

### 12.2 设计令牌（Design Tokens）

所有设计值以**平台无关的 JSON 格式**导出，供各框架接入。以下为设计令牌的标准格式：

```json
{
  "nothing-ui": {
    "version": "1.0.0",
    "colors": {
      "surface": {
        "0": { "dark": "#0A0A0A", "light": "#FAFAFA" },
        "1": { "dark": "#111111", "light": "#F5F5F5" },
        "2": { "dark": "#181818", "light": "#EEEEEE" },
        "3": { "dark": "#1E1E1E", "light": "#E0E0E0" }
      },
      "text": {
        "primary":   { "dark": "#F5F5F5", "light": "#1A1A1A" },
        "secondary": { "dark": "#B0B0B0", "light": "#616161" },
        "tertiary":  { "dark": "#707070", "light": "#9E9E9E" }
      },
      "accent": {
        "cyan":   { "default": "#00BCD4", "hover": "#26C6DA", "active": "#0097A7", "bg": "rgba(0,188,212,0.12)" },
        "green":  { "default": "#4CAF50", "hover": "#66BB6A", "active": "#388E3C", "bg": "rgba(76,175,80,0.12)" },
        "orange": { "default": "#FF9800", "hover": "#FFA726", "active": "#F57C00", "bg": "rgba(255,152,0,0.12)" }
      },
      "status": {
        "success": { "color": "#4CAF50", "bg": "rgba(76,175,80,0.12)" },
        "warning": { "color": "#FF9800", "bg": "rgba(255,152,0,0.12)" },
        "error":   { "color": "#F44336", "bg": "rgba(244,67,54,0.12)" },
        "info":    { "color": "#2196F3", "bg": "rgba(33,150,243,0.12)" }
      },
      "border": {
        "subtle":  { "dark": "rgba(255,255,255,0.06)", "light": "rgba(0,0,0,0.06)" },
        "default": { "dark": "rgba(255,255,255,0.10)", "light": "rgba(0,0,0,0.10)" },
        "strong":  { "dark": "rgba(255,255,255,0.16)", "light": "rgba(0,0,0,0.16)" }
      }
    },
    "typography": {
      "fontFamily": {
        "ui":   ["Inter", "SF Pro Text", "Segoe UI", "Roboto", "Noto Sans SC", "Noto Sans JP", "Noto Sans KR", "sans-serif"],
        "mono": ["JetBrains Mono", "SF Mono", "Cascadia Code", "Fira Code", "Consolas", "monospace"]
      },
      "scale": {
        "h1":       { "size": "24px", "lineHeight": 1.333, "weight": 600 },
        "h2":       { "size": "18px", "lineHeight": 1.444, "weight": 600 },
        "h3":       { "size": "15px", "lineHeight": 1.467, "weight": 600 },
        "body":     { "size": "14px", "lineHeight": 1.429, "weight": 400 },
        "bodySm":   { "size": "13px", "lineHeight": 1.385, "weight": 400 },
        "code":     { "size": "13px", "lineHeight": 1.538, "weight": 400 },
        "caption":  { "size": "12px", "lineHeight": 1.333, "weight": 400 },
        "overline": { "size": "11px", "lineHeight": 1.455, "weight": 500 }
      }
    },
    "spacing": {
      "unit": 4,
      "scale": [4, 8, 12, 16, 20, 24, 32, 40]
    },
    "motion": {
      "maxDuration": "200ms",
      "easing": {
        "standard":   [0.4, 0.0, 0.2, 1.0],
        "emphasized": [0.05, 0.0, 0.0, 1.0],
        "decelerate": [0.0, 0.0, 0.2, 1.0],
        "accelerate": [0.4, 0.0, 1.0, 1.0]
      }
    },
    "shape": {
      "cornerRadius": "0px",
      "iconStrokeWidth": 2
    },
    "components": {
      "button": {
        "sizes": {
          "small":  { "height": 24, "paddingH": 8,  "fontSize": 12 },
          "medium": { "height": 32, "paddingH": 16, "fontSize": 13 },
          "large":  { "height": 40, "paddingH": 24, "fontSize": 14 }
        }
      },
      "listItem": {
        "standard": { "height": 32, "paddingLeft": 12 },
        "compact":  { "height": 28, "paddingLeft": 8 }
      },
      "tab": {
        "height": 36,
        "paddingH": 16,
        "indicatorHeight": 2
      },
      "progressBar": {
        "height": 4
      },
      "scrollbar": {
        "width": 6
      },
      "searchBar": {
        "height": 32,
        "paddingH": 8
      },
      "statusBar": {
        "height": 28,
        "paddingH": 12
      }
    }
  }
}
```

### 12.3 各框架实现策略

| 框架 | 实现方式 | 关键 API |
|------|---------|---------|
| **Web (React/Vue/Svelte)** | CSS Variables + CSS Modules / Styled Components / Tailwind | `:root` 变量定义，`.module.css` 或 Tailwind theme 扩展 |
| **Web (Web Components)** | Lit + CSS Variables + Shadow DOM | 构建框架无关的可复用组件 |
| **Flutter** | `ThemeData` + `ThemeExtension` | `colorScheme`、`textTheme`、自定义 `NothingTheme` 扩展 |
| **Qt 6 (QML)** | Qt Quick Controls 2 样式覆盖 | `qtquickcontrols2.conf`、QML `Palette`、`.qss` |
| **SwiftUI** | `@Environment(\.colorScheme)` + 自定义 `ViewModifier` | `Color`、`Font` 扩展 |
| **Jetpack Compose** | `MaterialTheme` 覆盖 | `Colors`、`Typography`、`Shapes` |
| **TUI (Textual/Ratatui)** | 终端颜色主题映射 | 16/256 色映射表 |

### 12.4 与 MD3 叠层的对接方式

NOTHING UI 使用 MD3 的叠层概念（Surface 0-3、Elevation），但视觉完全独立。对接步骤：

1. **保留叠层逻辑**：高度越高 → Surface 层级越高 → 背景色越亮（深色）/ 越暗（浅色）
2. **替换视觉样式**：将所有视觉令牌替换为 NOTHING UI 的值
3. **覆盖 MD3 默认值**：圆角 → 0、阴影 → 硬阴影、动效 → ≤200ms

**Flutter 对接示例**（详见第 12.5 节）

**Web（Material Web Components）对接示例**：

```css
/* 复用 MD3 的 CSS 变量名，填入 NOTHING UI 色值 */
:root {
  --md-sys-color-surface: var(--surface-1);
  --md-sys-color-surface-container: var(--surface-2);
  --md-sys-color-surface-container-high: var(--surface-3);
  --md-sys-color-primary: var(--accent);
  --md-sys-color-on-primary: #000000;
  --md-sys-color-on-surface: var(--text-primary);
  --md-sys-color-outline: var(--border-default);

  /* 形状覆写：零圆角 */
  --md-sys-shape-corner-none: 0px;
  --md-sys-shape-corner-extra-small: 0px;
  --md-sys-shape-corner-small: 0px;
  --md-sys-shape-corner-medium: 0px;
  --md-sys-shape-corner-large: 0px;
  --md-sys-shape-corner-extra-large: 0px;
  --md-sys-shape-corner-full: 0px;
}
```

### 12.5 框架适配示例

#### 示例 1：Web — CSS Variables + React

```tsx
// tokens.css —— 设计令牌
:root {
  --surface-0: #0A0A0A;
  --surface-1: #111111;
  --surface-2: #181818;
  --surface-3: #1E1E1E;
  --accent: #00BCD4;
  --accent-bg: rgba(0, 188, 212, 0.12);
  --text-primary: #F5F5F5;
  --text-secondary: #B0B0B0;
  --text-tertiary: #707070;
  --border-subtle: rgba(255, 255, 255, 0.06);
  --border-default: rgba(255, 255, 255, 0.10);
  --space-2: 8px;
  --space-4: 16px;
  /* ... 其余令牌 */
}

// components/List.tsx
interface ListItem {
  id: string;
  label: string;
  meta?: string;
  icon?: React.ReactNode;
}

interface ListProps {
  items: ListItem[];
  selectedId?: string;
  onSelect: (id: string) => void;
}

function List({ items, selectedId, onSelect }: ListProps) {
  return (
    <div className="list" role="listbox">
      {items.map((item) => (
        <div
          key={item.id}
          className={classNames('list-item', {
            'list-item--active': item.id === selectedId,
          })}
          role="option"
          aria-selected={item.id === selectedId}
          tabIndex={0}
          onClick={() => onSelect(item.id)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') onSelect(item.id);
          }}
        >
          {item.icon && <span className="list-item__icon">{item.icon}</span>}
          <span className="list-item__label">{item.label}</span>
          {item.meta && <span className="list-item__meta">{item.meta}</span>}
        </div>
      ))}
    </div>
  );
}
```

```css
/* components/List.module.css */
.list {
  display: flex;
  flex-direction: column;
}

.list-item {
  display: flex;
  align-items: center;
  height: 32px;
  padding: 0 var(--space-2) 0 12px;
  font: var(--font-ui) 13px/18px;
  color: var(--text-primary);
  border-left: 2px solid transparent;
  cursor: pointer;
  transition: background 100ms var(--ease-standard);
  user-select: none;
}
.list-item:hover { background: rgba(255, 255, 255, 0.04); }

.list-item--active {
  background: var(--accent-bg);
  border-left-color: var(--accent);
  color: var(--accent);
}

.list-item__meta {
  margin-left: auto;
  font-size: 12px;
  color: var(--text-tertiary);
}

.list-item__icon {
  width: 16px;
  height: 16px;
  margin-right: var(--space-2);
  color: inherit;
}
```

#### 示例 2：Flutter — ThemeData + ThemeExtension

```dart
import 'package:flutter/material.dart';

/// NOTHING UI 自定义主题扩展
class NothingTheme extends ThemeExtension<NothingTheme> {
  final Color surface0;
  final Color surface1;
  final Color surface2;
  final Color surface3;
  final Color accentBg;

  const NothingTheme({
    required this.surface0,
    required this.surface1,
    required this.surface2,
    required this.surface3,
    required this.accentBg,
  });

  @override
  NothingTheme copyWith({ /* ... */ }) { /* ... */ }

  @override
  NothingTheme lerp(ThemeExtension<NothingTheme>? other, double t) { /* ... */ }

  /// 深色主题工厂
  factory NothingTheme.dark() => const NothingTheme(
    surface0: Color(0xFF0A0A0A),
    surface1: Color(0xFF111111),
    surface2: Color(0xFF181818),
    surface3: Color(0xFF1E1E1E),
    accentBg: Color(0x1F00BCD4),
  );
}

/// 创建完整的 NOTHING UI ThemeData
ThemeData createNothingTheme({Brightness brightness = Brightness.dark}) {
  final isDark = brightness == Brightness.dark;

  return ThemeData(
    brightness: brightness,
    useMaterial3: true,

    // ── 颜色方案 ──
    colorScheme: ColorScheme(
      brightness: brightness,
      primary: const Color(0xFF00BCD4),
      onPrimary: isDark ? const Color(0xFF000000) : Colors.white,
      surface: isDark ? const Color(0xFF111111) : const Color(0xFFF5F5F5),
      onSurface: isDark ? const Color(0xFFF5F5F5) : const Color(0xFF1A1A1A),
      outline: isDark
          ? Colors.white.withOpacity(0.10)
          : Colors.black.withOpacity(0.10),
      // ... 其余颜色
    ),

    // ── 字体 ──
    textTheme: const TextTheme(
      headlineLarge: TextStyle(fontSize: 24, height: 1.333, fontWeight: FontWeight.w600),
      headlineMedium: TextStyle(fontSize: 18, height: 1.444, fontWeight: FontWeight.w600),
      headlineSmall: TextStyle(fontSize: 15, height: 1.467, fontWeight: FontWeight.w600),
      bodyLarge: TextStyle(fontSize: 14, height: 1.429),
      bodyMedium: TextStyle(fontSize: 13, height: 1.385),
      bodySmall: TextStyle(fontSize: 12, height: 1.333),
      labelSmall: TextStyle(fontSize: 11, height: 1.455, fontWeight: FontWeight.w500, letterSpacing: 0.5),
    ),

    // ── 组件主题 ──
    cardTheme: CardThemeData(
      color: isDark ? const Color(0xFF181818) : const Color(0xFFEEEEEE),
      elevation: 0,
      margin: const EdgeInsets.only(bottom: 16),
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.zero,
      ),
    ),
    listTileTheme: const ListTileThemeData(
      dense: true,
      visualDensity: VisualDensity.compact,
      contentPadding: EdgeInsets.symmetric(horizontal: 12),
      minVerticalPadding: 0,
    ),
    filledButtonTheme: FilledButtonThemeData(
      style: FilledButton.styleFrom(
        minimumSize: const Size(0, 32),
        padding: const EdgeInsets.symmetric(horizontal: 16),
        shape: const RoundedRectangleBorder(borderRadius: BorderRadius.zero),
        textStyle: const TextStyle(fontSize: 13, fontWeight: FontWeight.w500),
      ),
    ),
    tabBarTheme: const TabBarThemeData(
      indicatorSize: TabBarIndicatorSize.tab,
      indicator: UnderlineTabIndicator(
        borderSide: BorderSide(width: 2, color: Color(0xFF00BCD4)),
      ),
    ),

    // ── NOTHING UI 扩展 ──
    extensions: [NothingTheme.dark()],
  );
}
```

### 12.6 最小实现清单

无论使用哪个框架，以下 **5 项**是 NOTHING UI 的"最小可识别实现"。缺少任何一项都不应称为 NOTHING UI：

| # | 必需项 | 具体要求 | 验证方式 |
|---|--------|---------|---------|
| **1** | **颜色系统** | Surface 0-3 四个层级 + 1 套强调色 + 3 级文本色 | 视觉检查：深色默认，Surface 层级分明 |
| **2** | **字体系统** | 系统 UI 字体栈 + 等宽字体栈 + 8 级字号层级（11-24px） | 跨平台渲染一致，CJK 字体正确回退 |
| **3** | **间距系统** | 基于 4px 单位的间距体系（4/8/12/16/20/24/32/40），所有可交互组件高度 ≤ 40px | 量尺寸：列表项 32px，按钮 32px，标签页 36px |
| **4** | **核心组件样式** | 按钮（填充/轮廓/文本/危险）、列表项（32px + 2px 左侧指示器）、卡片（零圆角 + 硬阴影）、进度条（4px）、搜索栏（32px）、标签页（底部指示器） | 每个组件覆盖全部状态（默认/悬停/选中/禁用） |
| **5** | **交互反馈** | 悬停（4% 白色叠加）、选中（12% accent 背景 + 2px 指示器）、焦点（2px accent 内描边 × `:focus-visible`）、禁用（tertiary 文本 + not-allowed 光标） | 键盘 Tab 导航可见焦点环，鼠标点击不可见 |


---

## 13. 设计示例

### OPT — 包管理界面

以下模拟 OPEN OS 上的 `opt` 包管理工具界面，完整展示 NOTHING UI 设计规范的应用。这是设计规范付诸实践的参考范例。

```
┌──────────────────────────────────────────────────────────────────────────────┐
│  OPT · Package Manager                              [⚙️] [🌙] [─] [□] [×]  │  ← 顶栏 36px
├──────────────────┬───────────────────────────────────────────────────────────┤
│                  │                                                           │
│  🔍 搜索软件包... │  ▸ curl v8.12.1                             [ ✓ 已安装 ]  │
│                  │                                                           │────────────── H1: 24px
│  ── 已安装 (23)  │  命令行 URL 传输工具及库。支持 HTTP/2、HTTP/3、           │
│  │               │  WebSocket、TLS 1.3 等现代网络协议。                      │  ← 描述文字
│  │               │                                                           │
│  ├─ curl    ▸────│  ┌──────────────────────────────────────────────────┐    │
│  │  git          │  │  版本    v8.12.1                                  │    │
│  │  python       │  │  许可证  MIT                                     │    │  ← 信息卡片
│  │  ├─ pip       │  │  大小    1.2 MB                                  │    │     (Surface-2)
│  │  └─ venv      │  │  依赖    ▸ libcurl, ▸ openssl, ▸ zlib           │    │
│  ├─ vim          │  └──────────────────────────────────────────────────┘    │
│  ├─ zsh          │                                                           │
│  └─ ...          │                                                           │
│                  │  ── 文件清单 ──                                           │
│  ── 可更新 (3)   │  /usr/bin/curl                    256 KB                  │
│  │  eslint       │  /usr/lib/libcurl.so.4            512 KB                  │  ← 表格式布局
│  │  prettier     │  /usr/share/man/man1/curl.1.gz     48 KB                  │     (tabular-nums)
│  └─ vite         │                                                           │
│                  │  ┌──────────────────────────────────────────────────┐    │
│  ── 未安装 (158) │  │  $ opt install curl                              │    │  ← 终端式
│  │  rustc        │  │  $ opt upgrade curl                              │    │    命令卡片
│  │  golang       │  └──────────────────────────────────────────────────┘    │
│  │  docker       │                                                           │
│  └─ ...          │  ┌──────────────────────────────────────────────────┐    │
│                  │  │  ⚠ 注意: curl 是系统核心组件，卸载可能导致        │    │  ← 警告卡片
│                  │  │     部分网络功能不可用                            │    │
│                  │  └──────────────────────────────────────────────────┘    │
│                  │                                                           │
│                  │  [  卸载  ]    [  重新安装  ]    [  更新到 v8.13.0  ]     │  ← 操作按钮
│                  │   ↑轮廓(危险)    ↑文本按钮           ↑填充按钮(主要)     │
│                  │                                                           │
├──────────────────┴───────────────────────────────────────────────────────────┤
│  OPT v2.4.1  │  共 203 个包可用  │  上次更新: 2026-07-01  │  Ctrl+K 命令面板  │  ← 状态栏 28px
└──────────────────────────────────────────────────────────────────────────────┘
```

### 界面分层解析

#### 第 1 层：窗口框架
- **顶栏（36px）**：`surface-1` 背景，`border-subtle` 底边分割线
  - 左：应用名称 + 副标题（`text-primary` + `text-secondary`）
  - 右：系统操作按钮（设置⚙️、主题🌙、最小化、最大化、关闭），`text-secondary` 色
- **状态栏（28px）**：`surface-1` 背景，`border-subtle` 顶边分割线
  - 左侧：版本号、统计信息（包数量、更新时间）
  - 右侧：快捷键提示（`Ctrl+K 命令面板`），`text-tertiary` 色

#### 第 2 层：左面板（300px）
| 区域 | 规格 | 说明 |
|------|------|------|
| 搜索栏 | 32px 高，`surface-2` 背景，`border-default` 边框 | 聚焦时边框变 `accent` |
| 分组表头 | 28px 高，`--text-overline` 字体（11px/全大写/letter-spacing），`text-tertiary` | 可折叠（点击展开/折叠） |
| 已选列表项 | `accent-bg` 背景 + 左侧 2px `accent` 指示器 + `accent` 文字 | `▸` 前缀表示已展开查看 |
| 未选列表项 | 32px 高，透明背景，`text-primary` 文字 | 悬停: `rgba(255,255,255,0.04)` |
| 嵌套项 | 第二级缩进 16px（`◆ pip`），第三级 32px | 树形缩进而非扁平 |
| 徽标 | 列表项右侧的 `version-badge`：`text-caption` 字体，`text-tertiary` | 如 "7.88.1-1" |

#### 第 3 层：右面板（弹性宽度，padding: 24px 32px）
| 区域 | 规格 | 说明 |
|------|------|------|
| 标题区 | H1（24px）+ 版本号（`text-secondary`）+ 状态徽标（`color-success` 背景） | flex 水平排列，baseline 对齐 |
| 描述文字 | `text-body-sm`，`text-secondary`，max-width: 70ch | 超过 2 行截断 + "展开"链接 |
| 信息卡片 | `surface-2` 背景，`border-subtle` 边框，16px 内边距 | 4 行：版本/许可证/大小/依赖 |
| 文件清单 | 表格式：路径 + 大小。数字右对齐 `tabular-nums` | 行高 28px，font: `--text-code` |
| 命令卡片 | `surface-2` 背景，等宽字体，`$` 提示符为 accent 色 | 模拟终端外观 |
| 警告卡片 | `color-warning-bg` 背景 + 左侧 2px `color-warning` 指示线 | ⚠ 图标 + 警告文字 |
| 操作按钮 | flex 排列，gap: 8px。卸载(轮廓+危险色) / 重新安装(文本) / 更新(填充+主色) | 销毁性操作与普通操作物理分隔 |


### 对应 CSS 关键片段

```css
/* ── 整体布局 ── */
.opt-layout {
  display: grid;
  grid-template-columns: 300px 1fr;
  height: 100vh;
  background: var(--surface-0);
}

/* ── 左面板 ── */
.opt-sidebar {
  background: var(--surface-1);
  border-right: 1px solid var(--border-subtle);
  display: flex;
  flex-direction: column;
}

.opt-sidebar .section-header {
  height: 28px;
  padding: 0 12px;
  display: flex;
  align-items: center;
  font: var(--text-overline);
  color: var(--text-tertiary);
  letter-spacing: 0.5px;
  text-transform: uppercase;
}

.opt-sidebar .package-item {
  height: 32px;
  padding: 0 8px 0 12px;
  display: flex;
  align-items: center;
  gap: 8px;
  font: var(--text-body-sm);
  color: var(--text-primary);
  border-left: 2px solid transparent;
  cursor: pointer;
  transition: background 100ms ease;
}

.opt-sidebar .package-item.active {
  background: var(--accent-bg);
  border-left-color: var(--accent);
  color: var(--accent);
}

.opt-sidebar .package-item .version-badge {
  margin-left: auto;
  font: var(--text-caption);
  color: var(--text-tertiary);
}

/* ── 右面板 ── */
.opt-detail {
  padding: 24px 32px;
  overflow-y: auto;
}

.opt-detail .header {
  display: flex;
  align-items: baseline;
  gap: 12px;
  margin-bottom: 8px;
}

.opt-detail .package-name {
  font: var(--text-h1);
  color: var(--text-primary);
}

.opt-detail .package-version {
  font: var(--text-body);
  color: var(--text-secondary);
}

.opt-detail .status-badge {
  height: 22px;
  padding: 0 8px;
  font: var(--text-caption);
  font-weight: 500;
  color: var(--color-success);
  background: var(--color-success-bg);
  display: inline-flex;
  align-items: center;
}

.opt-detail .description {
  font: var(--text-body-sm);
  color: var(--text-secondary);
  max-width: 70ch;
  margin-bottom: 20px;
}

/* ── 信息卡片 ── */
.opt-detail .info-card {
  background: var(--surface-2);
  border: 1px solid var(--border-subtle);
  padding: 16px;
  margin-bottom: 16px;
}

.opt-detail .info-card .info-row {
  display: flex;
  height: 28px;
  align-items: center;
  font: var(--text-body-sm);
}

.opt-detail .info-card .info-label {
  width: 80px;
  color: var(--text-tertiary);
  flex-shrink: 0;
}

.opt-detail .info-card .info-value {
  color: var(--text-primary);
}

/* ── 文件清单表格 ── */
.opt-detail .file-table {
  width: 100%;
  border-collapse: collapse;
  font: var(--text-code);
}

.opt-detail .file-table th {
  height: 28px;
  text-align: left;
  color: var(--text-tertiary);
  font-weight: 500;
  font: var(--text-overline);
  border-bottom: 1px solid var(--border-subtle);
}

.opt-detail .file-table td {
  height: 28px;
  color: var(--text-primary);
  border-bottom: 1px solid var(--border-subtle);
}

.opt-detail .file-table td.size {
  text-align: right;
  font-variant-numeric: tabular-nums;
  color: var(--text-secondary);
}

/* ── 命令提示 ── */
.opt-detail .cmd-card {
  background: var(--surface-2);
  border: 1px solid var(--border-subtle);
  padding: 12px 16px;
  font: var(--text-code);
  color: var(--text-secondary);
}

.opt-detail .cmd-card .prompt {
  color: var(--accent);
}

/* ── 操作按钮栏 ── */
.opt-detail .actions {
  display: flex;
  gap: 8px;
  margin-top: 20px;
}

/* ── 底部状态栏 ── */
.opt-statusbar {
  grid-column: 1 / -1;
  height: 28px;
  padding: 0 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--surface-1);
  border-top: 1px solid var(--border-subtle);
  font: var(--text-caption);
  color: var(--text-tertiary);
}
```

---

## 附录 A：设计令牌速查表

### 颜色

| Token | Dark Value | Light Value |
|-------|-----------|-------------|
| `--surface-0` | `#0A0A0A` | `#FAFAFA` |
| `--surface-1` | `#111111` | `#F5F5F5` |
| `--surface-2` | `#181818` | `#EEEEEE` |
| `--surface-3` | `#1E1E1E` | `#E0E0E0` |
| `--text-primary` | `#F5F5F5` | `#1A1A1A` |
| `--text-secondary` | `#B0B0B0` | `#616161` |
| `--text-tertiary` | `#707070` | `#9E9E9E` |
| `--accent` (Cyan) | `#00BCD4` | `#00838F` |
| `--accent` (Green) | `#4CAF50` | `#2E7D32` |
| `--accent` (Orange) | `#FF9800` | `#E65100` |
| `--color-success` | `#4CAF50` | `#2E7D32` |
| `--color-warning` | `#FF9800` | `#E65100` |
| `--color-error` | `#F44336` | `#C62828` |
| `--color-info` | `#2196F3` | `#1565C0` |

### 字体

| Token | Font Size | Line Height | Weight |
|-------|-----------|-------------|--------|
| `--text-h1` | 24px | 32px | 600 |
| `--text-h2` | 18px | 26px | 600 |
| `--text-h3` | 15px | 22px | 600 |
| `--text-body` | 14px | 20px | 400 |
| `--text-body-sm` | 13px | 18px | 400 |
| `--text-code` | 13px | 20px | 400 |
| `--text-caption` | 12px | 16px | 400 |
| `--text-overline` | 11px | 16px | 500 |

### 间距

| Token | Value |
|-------|-------|
| `--space-1` | 4px |
| `--space-2` | 8px |
| `--space-3` | 12px |
| `--space-4` | 16px |
| `--space-5` | 20px |
| `--space-6` | 24px |
| `--space-8` | 32px |
| `--space-10` | 40px |

### 动效

| Token | Value |
|-------|-------|
| `--ease-standard` | `cubic-bezier(0.2, 0, 0, 1)` |
| `--ease-emphasized` | `cubic-bezier(0.05, 0, 0, 1)` |
| `--ease-decelerate` | `cubic-bezier(0, 0, 0, 1)` |
| `--ease-accelerate` | `cubic-bezier(0.3, 0, 1, 1)` |
| 动效最大时长 | 200ms |

---

## 附录 B：组件尺寸速查

| 组件 | 高度 | 水平内边距 | 字号 |
|------|------|-----------|------|
| 填充按钮 (S) | 24px | 8px | 12px |
| 填充按钮 (M) | 32px | 16px | 13px |
| 填充按钮 (L) | 40px | 24px | 14px |
| 轮廓按钮 (M) | 32px | 16px | 13px |
| 文本按钮 (M) | 32px | 8px | 13px |
| 列表项（标准） | 32px | 12px（左） | 13px |
| 列表项（紧凑） | 28px | 8px（左） | 13px |
| 标签页 | 36px | 16px | 13px |
| 搜索栏 | 32px | 8px | 13px |
| 输入框 | 32px | 12px | 13px |
| 进度条 | 4px | — | — |
| 状态栏 | 28px | 12px | 12px |
| 表格行 | 28px | 12px | 13px |
| 滚动条 | 6px | — | — |

---

> **NOTHING UI v1.0** — 不为装饰而存在。  
> Open-sourced under MIT License. Contribute at [NOTHING-UI-1](https://github.com).
