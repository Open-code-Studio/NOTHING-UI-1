import './ProgressBar.css';

interface ProgressBarProps {
  value?: number;        // 0-100, undefined = indeterminate
  className?: string;
}

export function ProgressBar({ value, className = '' }: ProgressBarProps) {
  const isIndeterminate = value === undefined;
  const clamped = isIndeterminate ? 0 : Math.max(0, Math.min(100, value));

  return (
    <div
      className={`nothing-progress ${className}`}
      role="progressbar"
      aria-valuenow={isIndeterminate ? undefined : clamped}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className={`nothing-progress__fill ${isIndeterminate ? 'nothing-progress__fill--indeterminate' : ''}`}
        style={isIndeterminate ? undefined : { width: `${clamped}%` }}
      />
    </div>
  );
}
