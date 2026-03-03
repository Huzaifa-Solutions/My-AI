import { memo, type ButtonHTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'ghost';
  size?: 'sm' | 'md';
  active?: boolean;
}

export const IconButton = memo(function IconButton({
  className,
  variant = 'ghost',
  size = 'md',
  active,
  children,
  ...props
}: IconButtonProps) {
  return (
    <button
      className={cn(
        'rounded-lg transition-all flex items-center justify-center',
        variant === 'ghost' && 'hover:bg-slate-100 text-slate-400',
        variant === 'default' && 'bg-white border border-slate-200 hover:bg-slate-50',
        size === 'sm' && 'p-1',
        size === 'md' && 'p-2',
        active && 'text-emerald-500 bg-emerald-50',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
});
