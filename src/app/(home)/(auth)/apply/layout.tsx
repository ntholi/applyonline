'use client';

import { Container } from '@/components/ui/container';
import { Progress } from '@/components/ui/progress';
import { usePathname } from 'next/navigation';
import { PropsWithChildren } from 'react';

const steps = [
  { id: 1, name: 'Personal Details', path: '/apply/student-details' },
  { id: 2, name: 'Academic Qualifications', path: '/apply/qualifications' },
  { id: 3, name: 'Program Selection', path: '/apply/programs' },
  { id: 4, name: 'Documents Upload', path: '/apply/documents' },
  { id: 5, name: 'Review & Submit', path: '/apply/review' },
];

export default function ApplyLayout({ children }: PropsWithChildren) {
  const pathname = usePathname();

  const currentStep = steps.findIndex((step) => step.path === pathname) + 1;
  const progress = (currentStep / steps.length) * 100;

  if (currentStep === 0) {
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
            Step {currentStep} of {steps.length}: {steps[currentStep - 1].name}
          </span>
          <span>{Math.round(progress)}%</span>
        </div>
        <Progress value={progress} className='h-2' />
      </div>

      <div className='mt-8'>{children}</div>
    </Container>
  );
}
