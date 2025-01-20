import { cn } from '@/lib/utils';
import React from 'react';

type Props = {
  children: React.ReactNode;
  className?: string;
};

export function Gradient({ children, className }: Props) {
  return (
    <div className={cn('relative min-h-screen', className)}>
      {children}
      <div className='pointer-events-none fixed inset-0'>
        <div className='absolute inset-0 bg-gradient-to-bl from-transparent from-40% via-blue-900/10 via-75% to-blue-900/15 to-100%' />
      </div>
    </div>
  );
}
