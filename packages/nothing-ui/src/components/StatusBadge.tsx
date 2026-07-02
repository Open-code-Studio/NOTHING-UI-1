import type { ReactNode } from 'react';
import './StatusBadge.css';

type StatusType = 'success' | 'warning' | 'error' | 'info' | 'neutral';

interface StatusBadgeProps {
  type?: StatusType;
  icon?: ReactNode;
  children: ReactNode;
}

const colorMap: Record<StatusType, { color: string; bg: string }> = {
  success: { color: 'var(--color-success)', bg: 'var(--color-success-bg)' },
  warning: { color: 'var(--color-warning)', bg: 'var(--color-warning-bg)' },
  error:   { color: 'var(--color-error)', bg: 'var(--color-error-bg)' },
  info:    { color: 'var(--color-info)', bg: 'var(--color-info-bg)' },
  neutral: { color: 'var(--text-secondary)', bg: 'rgba(255,255,255,0.06)' },
};

export function StatusBadge({ type = 'neutral', icon, children }: StatusBadgeProps) {
  const c = colorMap[type];
  return (
    <span
      className={`nothing-badge nothing-badge--${type}`}
      style={{ color: c.color, background: c.bg }}
    >
      {icon && <span className="nothing-badge__icon">{icon}</span>}
      {children}
    </span>
  );
}
