import { type LiHTMLAttributes, type ReactNode } from 'react';
import './ListItem.css';

interface ListItemProps extends LiHTMLAttributes<HTMLLIElement> {
  active?: boolean;
  indent?: number;        // 0, 1, 2, 3
  icon?: ReactNode;
  meta?: string;
  prefix?: string;        // 如 "▸" 表示展开
  children: ReactNode;
}

export function ListItem({
  active = false,
  indent = 0,
  icon,
  meta,
  prefix,
  children,
  className = '',
  ...props
}: ListItemProps) {
  const classes = [
    'nothing-list-item',
    active ? 'nothing-list-item--active' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <li
      className={classes}
      role="option"
      aria-selected={active}
      tabIndex={0}
      style={{ paddingLeft: `${12 + indent * 16}px` }}
      {...props}
    >
      {prefix && <span className="nothing-list-item__prefix">{prefix}</span>}
      {icon && <span className="nothing-list-item__icon">{icon}</span>}
      <span className="nothing-list-item__label">{children}</span>
      {meta && <span className="nothing-list-item__meta">{meta}</span>}
    </li>
  );
}
