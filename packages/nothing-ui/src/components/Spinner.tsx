import './Spinner.css';

type SpinnerSize = 12 | 16 | 20 | 24;

interface SpinnerProps {
  size?: SpinnerSize;
  className?: string;
}

export function Spinner({ size = 16, className = '' }: SpinnerProps) {
  return (
    <div
      className={`nothing-spinner nothing-spinner--${size} ${className}`}
      role="status"
      aria-label="加载中"
    />
  );
}
