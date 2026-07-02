import { type ButtonHTMLAttributes, type ReactNode } from 'react';
import './Button.css';

type ButtonVariant = 'filled' | 'outline' | 'text';
type ButtonColor = 'primary' | 'neutral' | 'danger';
type ButtonSize = 'small' | 'medium' | 'large';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  color?: ButtonColor;
  size?: ButtonSize;
  loading?: boolean;
  icon?: ReactNode;
  children: ReactNode;
}

export function Button({
  variant = 'filled',
  color = 'primary',
  size = 'medium',
  loading = false,
  icon,
  children,
  disabled,
  className = '',
  ...props
}: ButtonProps) {
  const classes = [
    'nothing-btn',
    `nothing-btn--${variant}`,
    `nothing-btn--${color}`,
    `nothing-btn--${size}`,
    loading ? 'nothing-btn--loading' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <button
      className={classes}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <span className="nothing-btn__spinner" />}
      {!loading && icon && <span className="nothing-btn__icon">{icon}</span>}
      <span className="nothing-btn__label">{children}</span>
    </button>
  );
}
