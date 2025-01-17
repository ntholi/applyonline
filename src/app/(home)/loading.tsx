import { Loader2 } from 'lucide-react';
import React from 'react';

export default function LoadingState() {
  return (
    <div className='flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center p-4'>
      <Loader2 className='h-6 w-6 animate-spin text-primary' />
      <p className='mt-2 text-sm text-muted-foreground'>Loading...</p>
    </div>
  );
}
