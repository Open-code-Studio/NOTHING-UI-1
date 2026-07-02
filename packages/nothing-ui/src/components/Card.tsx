import { type HTMLAttributes, type ReactNode } from 'react';
import './Card.css';

type CardElevation = 'flat' | 'raised' | 'elevated' | 'modal';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  elevation?: CardElevation;
  children: ReactNode;
}

const elevationMap: Record<CardElevation, { surface: string; shadow: string; radius: string }> = {
  flat:     { surface: 'var(--surface-2)', shadow: 'var(--shadow-0)', radius: 'var(--radius-sm)' },
  raised:   { surface: 'var(--surface-2)', shadow: 'var(--shadow-2)', radius: 'var(--radius-sm)' },
  elevated: { surface: 'var(--surface-3)', shadow: 'var(--shadow-3)', radius: 'var(--radius-sm)' },
  modal:    { surface: 'var(--surface-4)', shadow: 'var(--shadow-4)', radius: 'var(--radius-md)' },
};

export function Card({
  elevation = 'raised',
  children,
  className = '',
  style,
  ...props
}: CardProps) {
  const spec = elevationMap[elevation];

  return (
    <div
      className={`nothing-card nothing-card--${elevation} ${className}`}
      style={{
        background: spec.surface,
        boxShadow: spec.shadow,
        borderRadius: spec.radius,
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
}
