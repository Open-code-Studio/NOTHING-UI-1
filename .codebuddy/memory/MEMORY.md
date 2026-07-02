# NOTHING UI — 项目记忆

## 项目概述
NOTHING UI 是 OPEN OS 操作系统的默认界面设计语言，基于 Material Design 3 叠层架构但视觉完全独立。

## 设计核心理念
- 深色、高信息密度、数据优先、无装饰
- 目标用户：开发者、系统管理员、极客用户
- 原则：数据优先、深度即层级、零干扰、键盘即王道、高密度但不拥挤
- "NOTHING": 不被定义、不模仿、不妥协

## 技术决策
- 设计规范文档：`DESIGN_SPEC.md`
- 默认深色模式，浅色模式作为辅助方案
- 圆角：2px 极微圆角（`--radius-sm`），浮层 4px（`--radius-md`）
- 阴影：6 级层叠硬阴影（`--shadow-0` ~ `--shadow-5`），低层锐利，高层微模糊
- Surface：6 层细粒度递进（`--surface-0` ~ `--surface-5`，色差 ΔL 1.0-2.5）
- 动效 ≤200ms
- 基础网格单位：4px
- 强调色：Cyan (#00BCD4) 为默认，Green (#4AA26F) 和 Orange (#FF9800) 为预置选项
- 字体栈：Inter > SF Pro Text > Segoe UI > Roboto > CJK fallback
- 等宽字体：JetBrains Mono > SF Mono > Cascadia Code > Fira Code

## 推荐技术栈
- Desktop: Qt 6 (QML) 或 Flutter
- Web: React + CSS Variables
