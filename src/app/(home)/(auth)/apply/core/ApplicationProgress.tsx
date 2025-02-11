'use client';

import { Progress } from '@/components/ui/progress';
import { applicationSteps } from '@/db/schema';

interface ApplicationProgressProps {
  currentStep: number;
}

export function ApplicationProgress({ currentStep }: ApplicationProgressProps) {
  const progress = (currentStep / applicationSteps.length) * 100;

  if (currentStep === 0) {
    return null;
  }

  return (
    <div className='space-y-2'>
      <div className='flex justify-between text-sm'>
        <span>
          Step {currentStep} of {applicationSteps.length}:{' '}
          {applicationSteps[currentStep - 1].name}
        </span>
        <span>{Math.round(progress)}%</span>
      </div>
      <Progress value={progress} className='h-2' />
    </div>
  );
}
