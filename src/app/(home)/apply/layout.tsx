'use client';

import { Container } from '@/components/ui/container';
import { Progress } from '@/components/ui/progress';
import { usePathname } from 'next/navigation';
import { PropsWithChildren } from 'react';

const steps = [
  { id: 1, name: 'Personal Details', path: '/apply/student-details' },
  { id: 2, name: 'Academic Qualifications', path: '/apply/qualifications' },
  { id: 3, name: 'Program Selection', path: '/apply/program' },
  { id: 4, name: 'Documents Upload', path: '/apply/documents' },
  { id: 5, name: 'Review & Submit', path: '/apply/review' },
];

export default function ApplyLayout({ children }: PropsWithChildren) {
  const pathname = usePathname();

  const currentStep = steps.findIndex((step) => step.path === pathname) + 1;
  const progress = (currentStep / steps.length) * 100;

  return (
    <Container>
      <div className='my-8'>
        <h1 className='text-3xl font-bold tracking-tight'>Apply Now</h1>
        <p className='text-muted-foreground mt-2'>
          Fill in your details to start your application process
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
