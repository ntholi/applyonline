import { cn } from '@/lib/utils';
import React from 'react';
import { ModeToggle } from '../theme/mode-toggle';

type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function Body({ children, className }: Props) {
  return (
    <>
      <div className={cn('relative min-h-screen p-4', className)}>
        {children}
        <div className='fixed inset-0 pointer-events-none'>
          <div className='absolute inset-0 bg-gradient-to-bl from-transparent via-blue-900/10 to-blue-900/15' />
        </div>
      </div>
      <div className='fixed bottom-0 right-0 p-4'>
        <ModeToggle />
      </div>
    </>
  );
}