'use client';

import { ArrowLeft, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { updateApplicationStep } from './actions';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { applicationSteps } from './steps';

interface FormNavigationProps {
  onSave?: () => Promise<boolean | void>;
  backUrl?: string;
  saveLabel?: string;
  loading?: boolean;
}

export function FormNavigation({
  onSave,
  backUrl,
  saveLabel = 'Save',
  loading: externalLoading = false,
}: FormNavigationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  const currentStepIndex =
    applicationSteps.findIndex((step) => step.path === pathname) || 0;
  const nextStep = applicationSteps[currentStepIndex + 1];

  const handleBack = () => {
    if (backUrl) {
      router.push(backUrl);
    } else {
      router.back();
    }
  };

  async function handleSave() {
    try {
      setLoading(true);

      if (onSave) {
        const result = await onSave();
        if (result === false) return;
      }

      await updateApplicationStep(currentStepIndex + 2);

      if (nextStep) {
        router.push(nextStep.path);
      }
    } catch (error) {
      console.error('Error saving:', error);
    } finally {
      setLoading(false);
    }
  }

  const isLoading = loading || externalLoading;

  return (
    <div className='mt-8 flex items-center justify-between'>
      <Button
        variant='outline'
        onClick={handleBack}
        type='button'
        disabled={isLoading}
      >
        <ArrowLeft className='mr-2 h-4 w-4' />
        Back
      </Button>

      {onSave && (
        <Button onClick={handleSave} disabled={isLoading} type='submit'>
          <Save className='mr-2 h-4 w-4' />
          {saveLabel}
        </Button>
      )}
    </div>
  );
}
