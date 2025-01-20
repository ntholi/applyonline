'use client';

import { Button } from '@/components/ui/button';
import { programs } from '@/db/schema';
import { getApplicationByStudentId } from '@/server/applications/actions';
import { PlusIcon } from 'lucide-react';

type Program = typeof programs.$inferSelect;

type Props = {
  studentId: number;
  application: Awaited<ReturnType<typeof getApplicationByStudentId>>;
};

export default function ProgramsForm({ studentId, application }: Props) {
  return (
    <div className='mt-14 flex justify-center gap-10'>
      <Button variant='outline' className='flex flex-col p-24'>
        <PlusIcon />
        <span>First Choice</span>
      </Button>
      <Button variant='outline' className='flex flex-col p-24'>
        <div>
          <PlusIcon className='size-10' />
        </div>
        <span>Second Choice</span>
      </Button>
    </div>
  );
}
