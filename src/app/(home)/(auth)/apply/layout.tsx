'use client';

import { Container } from '@/components/ui/container';
import { Progress } from '@/components/ui/progress';
import { usePathname } from 'next/navigation';
import { PropsWithChildren } from 'react';
import { applicationSteps } from './core/steps';

export default function ApplyLayout({ children }: PropsWithChildren) {
  const pathname = usePathname();

  const step = applicationSteps.findIndex((step) => step.path === pathname) + 1;
  const progress = (step / applicationSteps.length) * 100;

  if (step === 0) {
    return <>{children}</>;
  }

  return (
    <Container>
      <div className='my-8'>
        <h1 className='text-2xl font-bold tracking-tight'>Apply Now</h1>
        <p className='mt-2 text-sm text-muted-foreground'>
          Fill in your details and complete your application
        </p>
      </div>

      <div className='space-y-2'>
        <div className='flex justify-between text-sm'>
          <span>
            Step {step} of {applicationSteps.length}:{' '}
            {applicationSteps[step - 1].name}
          </span>
          <span>{Math.round(progress)}%</span>
        </div>
        <Progress value={progress} className='h-2' />
      </div>

      <div className='mt-8'>{children}</div>
    </Container>
  );
}
