'use client';

import { getFacultyByCode } from '@/app/admin/programs/data/faculties';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { programs } from '@/db/schema';
import {
  createApplication,
  getApplicationByStudentId,
} from '@/server/applications/actions';
import { Trash2Icon } from 'lucide-react';
import { useEffect, useState } from 'react';
import ProgramPicker from './ProgramPicker';
import { useMutation } from '@tanstack/react-query';
import { FormNavigation } from '@/app/(home)/(auth)/apply/core/form-navigation';

type Program = typeof programs.$inferSelect;

type Props = {
  studentId: number;
  application: Awaited<ReturnType<typeof getApplicationByStudentId>>;
};

export default function ProgramsForm({ studentId, application }: Props) {
  const [firstChoice, setFirstChoice] = useState<Program | null>(null);
  const [secondChoice, setSecondChoice] = useState<Program | null>(null);

  useEffect(() => {
    if (application) {
      setFirstChoice(application.firstChoice);
      setSecondChoice(application.secondChoice);
    }
  }, [application]);

  const { mutate: handleSubmit, isPending } = useMutation({
    mutationFn: async () => {
      if (!firstChoice) throw new Error('First choice program is required');

      return createApplication({
        studentId,
        firstChoiceId: firstChoice.id,
        secondChoiceId: secondChoice?.id,
      });
    },
    onSuccess: () => {
      setFirstChoice(null);
      setSecondChoice(null);
      window.location.href = '/apply/documents';
    },
    onError: (error: Error) => {
      console.error('Failed to create application:', error);
      // You might want to add toast notification here
    },
  });

  return (
    <div className='space-y-8'>
      <h2 className='mb-8 text-center text-2xl font-bold'>
        What do you want to study?
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
      <FormNavigation
        onSave={() => handleSubmit()}
        backUrl='/apply/qualifications'
        loading={isPending}
        saveLabel='Save & Proceed to Documents'
      />
    </div>
  );
}

type SelectedProgramProps = {
  program: Program;
  label: string;
  onDelete: () => void;
};

function SelectedProgram({ program, label, onDelete }: SelectedProgramProps) {
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
