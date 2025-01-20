'use client';

import { Button } from '@/components/ui/button';
import { programs } from '@/db/schema';
import { getApplicationByStudentId } from '@/server/applications/actions';
import { PlusIcon } from 'lucide-react';
import ProgramPicker from './ProgramPicker';

type Program = typeof programs.$inferSelect;

type Props = {
  studentId: number;
  application: Awaited<ReturnType<typeof getApplicationByStudentId>>;
};

export default function ProgramsForm({ studentId, application }: Props) {
  return (
    <div className='mt-14 flex justify-center gap-10'>
      <ProgramPicker
        label='First Choice'
        onSelect={(program) => {
          console.log(program);
        }}
      />
      <ProgramPicker
        label='Second Choice'
        onSelect={(program) => {
          console.log(program);
        }}
      />
    </div>
  );
}
