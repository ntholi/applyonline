import { ArrowLeft, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

interface FormNavigationProps {
  onSave?: () => void;
  backUrl?: string;
  saveLabel?: string;
  loading?: boolean;
}

export function FormNavigation({
  onSave,
  backUrl,
  saveLabel = 'Save',
  loading = false,
}: FormNavigationProps) {
  const router = useRouter();

  const handleBack = () => {
    if (backUrl) {
      router.push(backUrl);
    } else {
      router.back();
    }
  };

  return (
    <div className='mt-8 flex items-center justify-between'>
      <Button variant='outline' onClick={handleBack} type='button'>
        <ArrowLeft className='mr-2 h-4 w-4' />
        Back
      </Button>

      {onSave && (
        <Button onClick={onSave} disabled={loading} type='submit'>
          <Save className='mr-2 h-4 w-4' />
          {saveLabel}
        </Button>
      )}
    </div>
  );
}
