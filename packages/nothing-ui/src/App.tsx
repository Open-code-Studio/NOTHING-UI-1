import { useState, useEffect, useRef } from 'react';
import { Button, Card, ListItem, ProgressBar, Tabs, SearchBar, Spinner, StatusBadge } from './components';
import './App.css';

/* ── Icons ── */
const Svg = ({ d, children }: { d?: string; children?: any }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter">
    {d ? <path d={d} /> : children}
  </svg>
);
const SearchIcon = () => <Svg d="M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM21 21l-4.3-4.3" />;
const PkgIcon = () => <Svg><rect x="2" y="4" width="20" height="16" rx="2" /><path d="M12 4v16M2 12h20" /></Svg>;
const CheckIcon = () => <Svg d="M20 6 9 17l-5-5" />;
const AlertIcon = () => <Svg><path d="M12 2 2 22h20Z" /><line x1="12" y1="9" x2="12" y2="13" /><circle cx="12" cy="17" r="0.5" fill="currentColor" /></Svg>;
const SettingsIcon = () => <Svg><circle cx="12" cy="12" r="3" /><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" /></Svg>;
const ChevronIcon = () => <Svg d="m9 18 6-6-6-6" />;

/* ── Sections ── */
type Section = 'buttons' | 'cards' | 'list-items' | 'tabs' | 'progress' | 'search' | 'spinner' | 'badges' | 'typography' | 'colors';

const NAV: { id: Section; label: string }[] = [
  { id: 'buttons', label: '按钮 Button' },
  { id: 'cards', label: '卡片 Card' },
  { id: 'list-items', label: '列表项 List Item' },
  { id: 'tabs', label: '标签页 Tabs' },
  { id: 'progress', label: '进度条 Progress' },
  { id: 'search', label: '搜索栏 Search' },
  { id: 'spinner', label: '加载 Spinner' },
  { id: 'badges', label: '状态徽标 Badge' },
  { id: 'typography', label: '排版 Typography' },
  { id: 'colors', label: '颜色 Colors' },
];

/* ── Helper ── */
function DocBlock({ title, desc, children }: { title: string; desc?: string; children: React.ReactNode }) {
  return (
    <section className="doc-block">
      <h2 className="doc-block__title">{title}</h2>
      {desc && <p className="doc-block__desc">{desc}</p>}
      {children}
    </section>
  );
}

function DemoRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="demo-row">
      <span className="demo-row__label">{label}</span>
      <div className="demo-row__content">{children}</div>
    </div>
  );
}

function Swatch({ color, label }: { color: string; label: string }) {
  return (
    <div className="swatch">
      <div className="swatch__color" style={{ background: color }} />
      <div className="swatch__info">
        <span className="swatch__hex">{color}</span>
        <span className="swatch__label">{label}</span>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════ */

export default function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    // 跟随系统
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: light)').matches) return 'light';
    return 'dark';
  });
  const [nav, setNav] = useState<Section>('buttons');
  const [progressVal, setProgressVal] = useState(68);

  // 应用主题到 <html>
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark');

  /* ── Section refs ── */
  const sectionRefs = useRef<Record<Section, HTMLElement | null>>({} as any);

  const scrollTo = (id: Section) => {
    setNav(id);
    sectionRefs.current[id]?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="app-layout">
      {/* ══ Title Bar ══ */}
      <header className="titlebar">
        <span className="titlebar__title">
          NOTHING UI <span className="titlebar__subtitle">Component Gallery v1.2</span>
        </span>
        <div className="titlebar__actions">
          <button className="titlebar__btn" onClick={toggleTheme} title={`切换到${theme === 'dark' ? '浅色' : '深色'}模式`}>
            {theme === 'dark' ? '☀' : '☾'}
          </button>
          <button className="titlebar__btn" title="设置"><SettingsIcon /></button>
        </div>
      </header>

      {/* ══ Sidebar ══ */}
      <aside className="sidebar">
        <div className="sidebar__nav">
          {NAV.map(item => (
            <ListItem
              key={item.id}
              active={nav === item.id}
              prefix={nav === item.id ? '▸' : undefined}
              onClick={() => scrollTo(item.id)}
            >
              {item.label}
            </ListItem>
          ))}
        </div>
      </aside>

      {/* ══ Content ══ */}
      <main className="content" onScroll={() => {}}>
        <div className="content__inner">

          {/* ══ 1. Buttons ══ */}
          <section ref={el => { sectionRefs.current.buttons = el; }}>
            <DocBlock title="按钮 Button" desc="三种变体（填充/轮廓/文本）× 三种颜色（Primary/Neutral/Danger）× 三种尺寸（24/32/40px）。按钮无加载态时支持图标前缀。">
              <Card elevation="flat" style={{ marginTop: 'var(--space-4)' }}>
                <h3 className="card-subtitle">Filled（填充按钮）</h3>
                <DemoRow label="Primary"><Button variant="filled" color="primary" size="small">小</Button><Button variant="filled" color="primary">中 安装</Button><Button variant="filled" color="primary" size="large">大 更新</Button></DemoRow>
                <DemoRow label="Neutral"><Button variant="filled" color="neutral">取消</Button></DemoRow>
                <DemoRow label="Danger"><Button variant="filled" color="danger">删除</Button></DemoRow>
                <DemoRow label="Disabled"><Button variant="filled" disabled>禁用</Button></DemoRow>
                <DemoRow label="Loading"><Button variant="filled" loading>加载中</Button></DemoRow>
                <DemoRow label="Icon"><Button variant="filled" icon={<PkgIcon />}>安装包</Button></DemoRow>
              </Card>

              <Card elevation="flat" style={{ marginTop: 'var(--space-4)' }}>
                <h3 className="card-subtitle">Outline（轮廓按钮）</h3>
                <DemoRow label="Primary"><Button variant="outline" color="primary">卸载</Button></DemoRow>
                <DemoRow label="Danger"><Button variant="outline" color="danger">强制删除</Button></DemoRow>
                <DemoRow label="Disabled"><Button variant="outline" disabled>禁用</Button></DemoRow>
              </Card>

              <Card elevation="flat" style={{ marginTop: 'var(--space-4)' }}>
                <h3 className="card-subtitle">Text（文本按钮）</h3>
                <DemoRow label="Primary"><Button variant="text" color="primary">了解更多</Button></DemoRow>
                <DemoRow label="Neutral"><Button variant="text" color="neutral">取消</Button></DemoRow>
                <DemoRow label="Danger"><Button variant="text" color="danger">移除</Button></DemoRow>
                <DemoRow label="Disabled"><Button variant="text" disabled>禁用</Button></DemoRow>
              </Card>
            </DocBlock>
          </section>

          {/* ══ 2. Cards ══ */}
          <section ref={el => { sectionRefs.current.cards = el; }}>
            <DocBlock title="卡片 Card" desc="五级 Elevation：Flat → Slightly Raised → Elevated → Modal → Top-Level。每级自动映射 surface 层级和层叠阴影。">
              <div className="card-grid">
                {(['flat', 'raised', 'elevated', 'modal'] as const).map(el => (
                  <Card key={el} elevation={el}>
                    <span className="card-label">{el}</span>
                    <p className="card-desc">Surface + Shadow 自动映射。通过 elevation 属性控制层级。</p>
                  </Card>
                ))}
              </div>
            </DocBlock>
          </section>

          {/* ══ 3. List Items ══ */}
          <section ref={el => { sectionRefs['list-items'].current = el; }}>
            <DocBlock title="列表项 List Item" desc="32px 标准高度。支持 active 选中态（2px 左侧指示器 + 12% accent 背景）、icon 左侧图标、meta 右侧元信息、prefix 展开前缀、indent 树形缩进。">
              <Card elevation="flat" style={{ padding: '8px 0' }}>
                <ul style={{ listStyle: 'none' }}>
                  <ListItem active prefix="▸" icon={<PkgIcon />} meta="v22.14">nodejs</ListItem>
                  <ListItem prefix="·" icon={<PkgIcon />} meta="v5.8">typescript</ListItem>
                  <ListItem prefix="·" meta="installed">eslint</ListItem>
                  <ListItem prefix="·">prettier</ListItem>
                  <ListItem prefix="·" indent={1} meta="19.8MB">pip</ListItem>
                  <ListItem prefix="·" indent={1} meta="2.1MB">venv</ListItem>
                  <ListItem prefix="·" indent={2} meta="deep">nested</ListItem>
                </ul>
              </Card>
            </DocBlock>
          </section>

          {/* ══ 4. Tabs ══ */}
          <section ref={el => { sectionRefs.current.tabs = el; }}>
            <DocBlock title="标签页 Tabs" desc="36px 高度，底部 2px accent 色下划线指示器。支持图标前缀。">
              <Card elevation="flat" style={{ padding: 0 }}>
                <Tabs
                  tabs={[
                    { id: 'info', label: '信息' },
                    { id: 'files', label: '文件清单', icon: <PkgIcon /> },
                    { id: 'deps', label: '依赖' },
                    { id: 'cmd', label: '命令行' },
                  ]}
                  activeId="info"
                  onChange={() => {}}
                />
                <div style={{ padding: 'var(--space-4)', color: 'var(--text-secondary)', font: 'var(--text-body-sm)' }}>
                  标签 "信息" 当前选中，底部 2px accent 色下划线指示器。
                </div>
              </Card>
            </DocBlock>
          </section>

          {/* ══ 5. Progress Bars ══ */}
          <section ref={el => { sectionRefs.current.progress = el; }}>
            <DocBlock title="进度条 Progress Bar" desc="4px 高度。确定态：平滑宽度过渡。不定态：1.5s 循环滑动动画。">
              <Card elevation="flat">
                <DemoRow label={`确定 ${progressVal}%`}>
                  <div style={{ flex: 1 }}><ProgressBar value={progressVal} /></div>
                  <Button variant="text" size="small" onClick={() => setProgressVal(p => Math.max(0, p - 10))}>-10</Button>
                  <Button variant="text" size="small" onClick={() => setProgressVal(p => Math.min(100, p + 10))}>+10</Button>
                </DemoRow>
                <DemoRow label="不定态"><div style={{ flex: 1 }}><ProgressBar /></div></DemoRow>
              </Card>
            </DocBlock>
          </section>

          {/* ══ 6. Search Bar ══ */}
          <section ref={el => { sectionRefs.current.search = el; }}>
            <DocBlock title="搜索栏 Search Bar" desc="32px 高度。聚焦时边框变 accent 色，背景升至 surface-3。默认状态边框 border-default。">
              <Card elevation="flat">
                <SearchBar icon={<SearchIcon />} placeholder="搜索软件包..." style={{ maxWidth: 400 }} />
                <p style={{ marginTop: 8, font: 'var(--text-caption)', color: 'var(--text-tertiary)' }}>
                  点击聚焦查看边框 + 背景色变化
                </p>
              </Card>
            </DocBlock>
          </section>

          {/* ══ 7. Spinners ══ */}
          <section ref={el => { sectionRefs.current.spinner = el; }}>
            <DocBlock title="加载指示器 Spinner" desc="1.5px 细线旋转环，accent 色顶部弧线。四种尺寸：12 / 16 / 20 / 24px。">
              <Card elevation="flat">
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-6)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Spinner size={12} /><span className="text-caption">12px</span></div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Spinner size={16} /><span className="text-caption">16px</span></div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Spinner size={20} /><span className="text-caption">20px</span></div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Spinner size={24} /><span className="text-caption">24px</span></div>
                </div>
              </Card>
            </DocBlock>
          </section>

          {/* ══ 8. Status Badges ══ */}
          <section ref={el => { sectionRefs.current.badges = el; }}>
            <DocBlock title="状态徽标 Status Badge" desc="22px 高度。5 种状态类型。图标 + 颜色 + 文本三重编码，色盲友好。">
              <Card elevation="flat">
                <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
                  <StatusBadge type="success" icon={<CheckIcon />}>已安装</StatusBadge>
                  <StatusBadge type="warning" icon={<AlertIcon />}>可更新</StatusBadge>
                  <StatusBadge type="error" icon={<AlertIcon />}>失败</StatusBadge>
                  <StatusBadge type="info" icon={<ChevronIcon />}>未安装</StatusBadge>
                  <StatusBadge type="neutral">v2.4.1</StatusBadge>
                </div>
              </Card>
            </DocBlock>
          </section>

          {/* ══ 9. Typography ══ */}
          <section ref={el => { sectionRefs.current.typography = el; }}>
            <DocBlock title="排版 Typography" desc="8 级字号体系（11–24px），高密度布局优化。UI 字体栈优先 Inter 再回退到系统字体，等宽字体使用 JetBrains Mono。">
              <Card elevation="flat">
                <div className="typo-show">
                  <div><span className="typo-label">H1 / 24px / 600</span><span style={{ font: 'var(--text-h1)' }}>页面主标题 Heading One</span></div>
                  <div><span className="typo-label">H2 / 18px / 600</span><span style={{ font: 'var(--text-h2)' }}>区块标题 Heading Two</span></div>
                  <div><span className="typo-label">H3 / 15px / 600</span><span style={{ font: 'var(--text-h3)' }}>子区块标题 Heading Three</span></div>
                  <div><span className="typo-label">Body / 14px / 400</span><span style={{ font: 'var(--text-body)' }}>正文段落内容，用于大段描述性文字。十四像素。</span></div>
                  <div><span className="typo-label">Body Sm / 13px / 400</span><span style={{ font: 'var(--text-body-sm)' }}>辅助正文，常用于列表项、卡片内文本、表格。</span></div>
                  <div><span className="typo-label">Code / 13px / 400</span><span style={{ font: 'var(--text-code)' }}>const foo = () =&gt; "monospace";</span></div>
                  <div><span className="typo-label">Caption / 12px / 400</span><span style={{ font: 'var(--text-caption)' }}>标签、状态文本、时间戳、辅助信息。</span></div>
                  <div><span className="typo-label">Overline / 11px / 500</span><span style={{ font: 'var(--text-overline)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>分类标签 · 表头</span></div>
                </div>
              </Card>
            </DocBlock>
          </section>

          {/* ══ 10. Colors ══ */}
          <section ref={el => { sectionRefs.current.colors = el; }}>
            <DocBlock title="颜色 Color Palette" desc="6 层 Surface + 3 套 Accent + 4 种 Status。默认深色模式色板，点击标题栏 ☀ 切换到浅色模式。">
              <Card elevation="flat">
                <h3 className="card-subtitle">Surfaces（6 层）</h3>
                <div className="swatch-grid">
                  {[0,1,2,3,4,5].map(n => (
                    <Swatch key={n} color={`var(--surface-${n})`} label={`Surface ${n}`} />
                  ))}
                </div>
              </Card>

              <Card elevation="flat" style={{ marginTop: 'var(--space-4)' }}>
                <h3 className="card-subtitle">Accent（强调色）</h3>
                <div className="swatch-grid">
                  <Swatch color="var(--accent)" label="Cyan / 默认" />
                  <Swatch color="var(--accent-green)" label="Green / #4AA26F" />
                  <Swatch color="var(--accent-orange)" label="Orange" />
                </div>
              </Card>

              <Card elevation="flat" style={{ marginTop: 'var(--space-4)' }}>
                <h3 className="card-subtitle">Status（状态色）</h3>
                <div className="swatch-grid">
                  <Swatch color="var(--color-success)" label="Success" />
                  <Swatch color="var(--color-warning)" label="Warning" />
                  <Swatch color="var(--color-error)" label="Error" />
                  <Swatch color="var(--color-info)" label="Info" />
                </div>
              </Card>

              <Card elevation="flat" style={{ marginTop: 'var(--space-4)' }}>
                <h3 className="card-subtitle">Text（文本层级）</h3>
                <div className="swatch-grid">
                  <Swatch color="var(--text-primary)" label="Primary" />
                  <Swatch color="var(--text-secondary)" label="Secondary" />
                  <Swatch color="var(--text-tertiary)" label="Tertiary" />
                </div>
              </Card>
            </DocBlock>
          </section>

          <div style={{ height: 80 }} />

        </div>
      </main>

      {/* ══ Status Bar ══ */}
      <footer className="statusbar">
        <span>NOTHING UI v1.2</span>
        <span>Open-sourced under MIT</span>
        <span className="statusbar__hint">Ctrl+K 命令面板</span>
      </footer>
    </div>
  );
}
