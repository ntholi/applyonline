import React, { PropsWithChildren } from 'react';
import { cn } from '@/lib/utils';

type Props = {
  className?: string;
} & PropsWithChildren;

export function Gradient({ children, className }: Props) {
  return (
    <div
      className={cn(
        'bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] via-20% to-50% dark:from-slate-950 dark:via-slate-950 dark:to-black',
        className,
      )}
    >
      {children}
    </div>
  );
}
