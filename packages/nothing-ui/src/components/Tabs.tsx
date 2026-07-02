import { type ReactNode } from 'react';
import './Tabs.css';

interface Tab {
  id: string;
  label: string;
  icon?: ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  activeId: string;
  onChange: (id: string) => void;
  className?: string;
}

export function Tabs({ tabs, activeId, onChange, className = '' }: TabsProps) {
  return (
    <div className={`nothing-tabs ${className}`} role="tablist">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`nothing-tab ${tab.id === activeId ? 'nothing-tab--active' : ''}`}
          role="tab"
          aria-selected={tab.id === activeId}
          onClick={() => onChange(tab.id)}
        >
          {tab.icon && <span className="nothing-tab__icon">{tab.icon}</span>}
          <span>{tab.label}</span>
        </button>
      ))}
    </div>
  );
}
