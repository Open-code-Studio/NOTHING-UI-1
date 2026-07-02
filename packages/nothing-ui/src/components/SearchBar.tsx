import { type InputHTMLAttributes, type ReactNode } from 'react';
import './SearchBar.css';

interface SearchBarProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  icon?: ReactNode;
}

export function SearchBar({ icon, className = '', ...props }: SearchBarProps) {
  return (
    <div className={`nothing-search ${className}`}>
      {icon && <span className="nothing-search__icon">{icon}</span>}
      <input type="text" className="nothing-search__input" {...props} />
    </div>
  );
}
