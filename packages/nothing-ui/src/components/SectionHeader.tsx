import type { ReactNode } from 'react';
import './SectionHeader.css';

interface SectionHeaderProps {
  children: ReactNode;
  right?: ReactNode;
  collapsible?: boolean;
  collapsed?: boolean;
  onToggle?: () => void;
  className?: string;
}

export function SectionHeader({
  children,
  right,
  collapsible = false,
  collapsed = false,
  onToggle,
  className = '',
}: SectionHeaderProps) {
  return (
    <div
      className={`nothing-section-header ${collapsible ? 'nothing-section-header--collapsible' : ''} ${className}`}
      onClick={collapsible ? onToggle : undefined}
      role={collapsible ? 'button' : undefined}
      tabIndex={collapsible ? 0 : undefined}
    >
      <span className="nothing-section-header__label">
        {collapsible && (
          <span className="nothing-section-header__chevron">
            {collapsed ? '▸' : '▾'}
          </span>
        )}
        {children}
      </span>
      {right && <span className="nothing-section-header__right">{right}</span>}
    </div>
  );
}
