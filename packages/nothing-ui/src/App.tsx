import { useState, useMemo } from 'react';
import {
  Button,
  Card,
  ListItem,
  ProgressBar,
  Tabs,
  SearchBar,
  StatusBadge,
  SectionHeader,
} from './components';
import './App.css';

/* ── Mock Data ── */

interface Package {
  name: string;
  version: string;
  status: 'installed' | 'updatable' | 'available';
  description: string;
  license: string;
  size: string;
  dependencies: string[];
  files: { path: string; size: string }[];
}

const packages: Package[] = [
  {
    name: 'curl', version: '8.12.1', status: 'installed',
    description: '命令行 URL 传输工具及库。支持 HTTP/2、HTTP/3、WebSocket、TLS 1.3 等现代网络协议。',
    license: 'MIT', size: '1.2 MB',
    dependencies: ['libcurl', 'openssl', 'zlib'],
    files: [
      { path: '/usr/bin/curl', size: '256 KB' },
      { path: '/usr/lib/libcurl.so.4', size: '512 KB' },
      { path: '/usr/share/man/man1/curl.1.gz', size: '48 KB' },
    ],
  },
  {
    name: 'git', version: '2.47.0', status: 'updatable',
    description: '分布式版本控制系统，用于追踪文件变更和协同开发。',
    license: 'GPL-2.0', size: '28.4 MB',
    dependencies: ['curl', 'openssl', 'zlib', 'perl'],
    files: [
      { path: '/usr/bin/git', size: '4.2 MB' },
      { path: '/usr/libexec/git-core', size: '22.1 MB' },
      { path: '/usr/share/git-core', size: '2.1 MB' },
    ],
  },
  {
    name: 'python3', version: '3.13.0', status: 'installed',
    description: 'Python 是一种解释型、面向对象的高级编程语言，具有动态语义。',
    license: 'PSF', size: '85.3 MB',
    dependencies: ['openssl', 'sqlite', 'bzip2', 'libffi'],
    files: [
      { path: '/usr/bin/python3', size: '16 KB' },
      { path: '/usr/lib/python3.13', size: '78.2 MB' },
      { path: '/usr/share/doc/python3', size: '7.1 MB' },
    ],
  },
  {
    name: 'vim', version: '9.1.0', status: 'installed',
    description: '高度可配置的文本编辑器，为高效编辑而构建。',
    license: 'Vim', size: '32.1 MB',
    dependencies: ['ncurses', 'acl'],
    files: [
      { path: '/usr/bin/vim', size: '3.6 MB' },
      { path: '/usr/share/vim/vim91', size: '28.5 MB' },
    ],
  },
  {
    name: 'eslint', version: '8.57.0', status: 'updatable',
    description: '可插拔的 JavaScript/TypeScript 代码检查工具。',
    license: 'MIT', size: '12.8 MB',
    dependencies: ['nodejs', 'npm'],
    files: [{ path: '/usr/lib/node_modules/eslint', size: '12.8 MB' }],
  },
  {
    name: 'rustc', version: '1.82.0', status: 'available',
    description: 'Rust 编程语言的编译器，注重安全性和性能。',
    license: 'MIT/Apache-2.0', size: '185.6 MB',
    dependencies: ['llvm', 'cmake', 'pkg-config'],
    files: [],
  },
  {
    name: 'docker', version: '27.3.1', status: 'available',
    description: '容器化平台，用于构建、共享和运行容器应用。',
    license: 'Apache-2.0', size: '95.2 MB',
    dependencies: ['containerd', 'runc'],
    files: [],
  },
  {
    name: 'nodejs', version: '22.14.0', status: 'installed',
    description: '基于 Chrome V8 引擎的 JavaScript 运行时。',
    license: 'MIT', size: '85.3 MB',
    dependencies: ['openssl', 'zlib', 'icu'],
    files: [
      { path: '/usr/bin/node', size: '2.1 MB' },
      { path: '/usr/lib/node_modules', size: '78.4 MB' },
      { path: '/usr/share/doc/node', size: '4.8 MB' },
    ],
  },
];

/* ── Icon SVGs ── */

const SearchIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter">
    <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
  </svg>
);

const PackageIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter">
    <path d="m16 16 2-2-2-2"/><path d="M12 18h5"/><rect width="20" height="14" x="2" y="5" rx="2"/>
  </svg>
);

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

const AlertIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter">
    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" x2="12" y1="9" y2="13"/><line x1="12" x2="12.01" y1="17" y2="17"/>
  </svg>
);

const SettingsIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter">
    <circle cx="12" cy="12" r="3"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
  </svg>
);

/* ── App ── */

export default function App() {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<string>('curl');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [installProgress, setInstallProgress] = useState<number | undefined>(undefined);
  const [loading, setLoading] = useState<string | null>(null);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.dataset.theme = next;
  };

  const installed = packages.filter(p => p.status === 'installed');
  const updatable = packages.filter(p => p.status === 'updatable');
  const available = packages.filter(p => p.status === 'available');

  const filteredInstalled = installed.filter(p => p.name.includes(search.toLowerCase()));
  const filteredUpdatable = updatable.filter(p => p.name.includes(search.toLowerCase()));
  const filteredAvailable = available.filter(p => p.name.includes(search.toLowerCase()));

  const pkg = packages.find(p => p.name === selected)!;

  const handleInstall = () => {
    setLoading(selected);
    setInstallProgress(0);
    const iv = setInterval(() => {
      setInstallProgress(prev => {
        const n = (prev ?? 0) + Math.random() * 15;
        if (n >= 100) {
          clearInterval(iv);
          setLoading(null);
          setInstallProgress(undefined);
          return undefined;
        }
        return Math.min(n, 100);
      });
    }, 200);
  };

  return (
    <div className="app-layout">
      {/* ══ Title Bar ══ */}
      <header className="titlebar">
        <span className="titlebar__title">
          OPT<span className="titlebar__subtitle"> · Package Manager</span>
        </span>
        <div className="titlebar__actions">
          <button className="titlebar__btn" onClick={toggleTheme} title="切换主题">
            {theme === 'dark' ? '☀' : '☾'}
          </button>
          <button className="titlebar__btn" title="设置">
            <SettingsIcon />
          </button>
          <span className="titlebar__separator" />
          <button className="titlebar__btn titlebar__btn--close" title="关闭">×</button>
        </div>
      </header>

      {/* ══ Sidebar ══ */}
      <aside className="sidebar">
        <div className="sidebar__search">
          <SearchBar
            icon={<SearchIcon />}
            placeholder="搜索软件包..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        <div className="sidebar__list">
          <SectionHeader>已安装 ({filteredInstalled.length})</SectionHeader>
          {filteredInstalled.map(p => (
            <ListItem
              key={p.name}
              active={selected === p.name}
              prefix={selected === p.name ? '▸' : '·'}
              icon={<PackageIcon />}
              meta={`v${p.version}`}
              onClick={() => { setSelected(p.name); }}
            >
              {p.name}
            </ListItem>
          ))}

          {filteredUpdatable.length > 0 && (
            <>
              <SectionHeader>可更新 ({filteredUpdatable.length})</SectionHeader>
              {filteredUpdatable.map(p => (
                <ListItem
                  key={p.name}
                  active={selected === p.name}
                  prefix={selected === p.name ? '▸' : '·'}
                  icon={<PackageIcon />}
                  meta={`${p.version} → new`}
                  onClick={() => { setSelected(p.name); }}
                >
                  {p.name}
                </ListItem>
              ))}
            </>
          )}

          {filteredAvailable.length > 0 && (
            <>
              <SectionHeader>未安装 ({filteredAvailable.length})</SectionHeader>
              {filteredAvailable.map(p => (
                <ListItem
                  key={p.name}
                  active={selected === p.name}
                  prefix={selected === p.name ? '▸' : '·'}
                  icon={<PackageIcon />}
                  meta={`v${p.version}`}
                  onClick={() => setSelected(p.name)}
                >
                  {p.name}
                </ListItem>
              ))}
            </>
          )}
        </div>
      </aside>

      {/* ══ Main Content ══ */}
      <main className="detail">
        {/* Header */}
        <div className="detail__header">
          <span className="detail__name">{pkg.name}</span>
          <span className="detail__version">v{pkg.version}</span>
          <StatusBadge
            type={pkg.status === 'installed' ? 'success' : pkg.status === 'updatable' ? 'warning' : 'info'}
            icon={<CheckIcon />}
          >
            {pkg.status === 'installed' ? '已安装' : pkg.status === 'updatable' ? '可更新' : '未安装'}
          </StatusBadge>
        </div>

        {/* Description */}
        <p className="detail__desc">{pkg.description}</p>

        {/* Tabs */}
        <Tabs
          tabs={[
            { id: 'info', label: '信息' },
            { id: 'files', label: '文件清单' },
            { id: 'cmd', label: '命令行' },
          ]}
          activeId="info"
          onChange={() => {}}
        />

        {/* Info Card */}
        <Card elevation="raised" style={{ marginTop: 'var(--space-4)' }}>
          <div className="info-grid">
            <div className="info-row"><span className="info-label">版本</span><span className="info-value">{pkg.version}</span></div>
            <div className="info-row"><span className="info-label">许可证</span><span className="info-value">{pkg.license}</span></div>
            <div className="info-row"><span className="info-label">大小</span><span className="info-value">{pkg.size}</span></div>
            <div className="info-row">
              <span className="info-label">依赖</span>
              <span className="info-value">
                {pkg.dependencies.map((d, i) => (
                  <span key={d}>
                    <span className="info-link">{d}</span>
                    {i < pkg.dependencies.length - 1 ? ', ' : ''}
                  </span>
                ))}
              </span>
            </div>
          </div>
        </Card>

        {/* File List */}
        {pkg.files.length > 0 && (
          <Card elevation="flat" style={{ marginTop: 'var(--space-4)' }}>
            <table className="file-table">
              <thead>
                <tr>
                  <th>路径</th>
                  <th className="file-table__size">大小</th>
                </tr>
              </thead>
              <tbody>
                {pkg.files.map(f => (
                  <tr key={f.path}>
                    <td className="file-table__path">{f.path}</td>
                    <td className="file-table__size">{f.size}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        )}

        {/* Command Card */}
        <Card elevation="flat" style={{ marginTop: 'var(--space-4)' }}>
          <pre className="cmd-block">
            <span className="cmd-prompt">$</span> opt install {pkg.name}
          </pre>
          <pre className="cmd-block">
            <span className="cmd-prompt">$</span> opt upgrade {pkg.name}
          </pre>
        </Card>

        {/* Warning (uninstall) */}
        {pkg.status === 'installed' && (
          <Card elevation="flat" style={{ marginTop: 'var(--space-4)' }}>
            <div className="warning-row">
              <span className="warning-icon"><AlertIcon /></span>
              <span className="warning-text">
                注意: {pkg.name} 是已安装的软件包，卸载可能影响依赖它的其他程序
              </span>
            </div>
          </Card>
        )}

        {/* Progress */}
        {loading === selected && installProgress !== undefined && (
          <div style={{ marginTop: 'var(--space-4)' }}>
            <ProgressBar value={installProgress} />
            <div style={{ marginTop: 8, font: 'var(--text-caption)', color: 'var(--text-secondary)' }}>
              正在安装 {selected}... {Math.round(installProgress)}%
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="detail__actions">
          {pkg.status === 'installed' && (
            <>
              <Button variant="outline" color="danger" onClick={() => {}}>卸载</Button>
              <Button variant="text" color="primary" onClick={() => {}}>重新安装</Button>
              <Button variant="filled" color="primary" onClick={() => alert(`升级 ${pkg.name}`)}>更新到最新版</Button>
            </>
          )}
          {pkg.status === 'updatable' && (
            <>
              <Button variant="outline" color="danger" onClick={() => {}}>卸载</Button>
              <Button variant="filled" color="primary" loading={loading === selected} onClick={handleInstall}>
                更新到最新版
              </Button>
            </>
          )}
          {pkg.status === 'available' && (
            <Button variant="filled" color="primary" loading={loading === selected} onClick={handleInstall}>
              安装 {pkg.name}
            </Button>
          )}
        </div>
      </main>

      {/* ══ Status Bar ══ */}
      <footer className="statusbar">
        <span>OPT v2.4.1</span>
        <span>共 {packages.length} 个包可用</span>
        <span>上次更新: 2026-07-02</span>
        <span className="statusbar__hint">Ctrl+K 命令面板</span>
      </footer>
    </div>
  );
}
