'use client';

import { getFacultyByCode } from '@/app/admin/programs/data/faculties';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { programs } from '@/db/schema';
import { getApplicationByStudentId } from '@/server/applications/actions';
import { Trash2Icon } from 'lucide-react';
import { useState } from 'react';
import ProgramPicker from './ProgramPicker';

type Program = typeof programs.$inferSelect;

type Props = {
  studentId: number;
  application: Awaited<ReturnType<typeof getApplicationByStudentId>>;
};

export default function ProgramsForm({ studentId, application }: Props) {
  const [firstChoice, setFirstChoice] = useState<Program | null>(null);
  const [secondChoice, setSecondChoice] = useState<Program | null>(null);

  return (
    <div className='container mx-auto mt-14 px-4'>
      <h2 className='mb-8 text-center text-2xl font-bold'>
        Choose Your Programs
      </h2>
      <div className='grid gap-8 md:grid-cols-2'>
        {firstChoice ? (
          <SelectedProgram
            program={firstChoice}
            label='First Choice'
            onDelete={() => setFirstChoice(null)}
          />
        ) : (
          <ProgramPicker label='First Choice' onSelect={setFirstChoice} />
        )}

        {secondChoice ? (
          <SelectedProgram
            program={secondChoice}
            label='Second Choice'
            onDelete={() => setSecondChoice(null)}
          />
        ) : (
          <ProgramPicker label='Second Choice' onSelect={setSecondChoice} />
        )}
      </div>
      <div className='mt-10 flex justify-end'>
        <Button type='submit'>Save & Continue</Button>
      </div>
    </div>
  );
}

function SelectedProgram({
  program,
  label,
  onDelete,
}: {
  program: Program;
  label: string;
  onDelete: () => void;
}) {
  return (
    <Card className='w-full max-w-md'>
      <CardHeader className='relative'>
        <CardTitle className='font-semibold'>{label}</CardTitle>
        <Button
          variant='ghost'
          size='icon'
          className='absolute right-2 top-2 h-8 w-8 hover:bg-destructive/10 hover:text-destructive'
          onClick={onDelete}
        >
          <Trash2Icon className='h-4 w-4 text-destructive' />
        </Button>
      </CardHeader>
      <CardContent>
        <h4 className='text-xl font-medium'>{program.name}</h4>
        <p className='mt-2 text-sm text-muted-foreground'>
          {getFacultyByCode(program.faculty)?.name}
        </p>
      </CardContent>
    </Card>
  );
}
