'use client';

import { FormNavigation } from '@/app/(home)/(auth)/apply/core/FormNavigation';
import { getFacultyByCode } from '@/app/admin/programs/data/faculties';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { applications, programChoices, programs } from '@/db/schema';
import { toast } from '@/hooks/use-toast';
import {
  createApplication,
  getApplicationByUserId,
} from '@/server/applications/actions';
import { useMutation } from '@tanstack/react-query';
import { Trash2Icon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import ProgramPicker from './ProgramPicker';

type Program = typeof programs.$inferSelect;
type Application = typeof applications.$inferSelect & {
  programChoice:
    | (typeof programChoices.$inferSelect & {
        firstChoice: typeof programs.$inferSelect;
        secondChoice: typeof programs.$inferSelect | null;
      })
    | null;
};

type Props = {
  userId: string;
  application: NonNullable<Application>;
};

export default function ProgramsForm({ userId, application }: Props) {
  const [firstChoice, setFirstChoice] = useState<Program | null>(null);
  const [secondChoice, setSecondChoice] = useState<Program | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (application) {
      setFirstChoice(application?.programChoice?.firstChoice ?? null);
      setSecondChoice(application?.programChoice?.secondChoice ?? null);
    }
  }, [application]);

  const { mutate: handleSubmit, isPending } = useMutation({
    mutationFn: async () => {
      if (!firstChoice) throw new Error('First choice program is required');

      return createApplication({
        userId,
      });
    },
    onSuccess: () => {
      setFirstChoice(null);
      setSecondChoice(null);
      router.push('/apply/documents');
    },
    onError: (error: Error) => {
      toast({
        variant: 'destructive',
        title: 'Error',
        description:
          error instanceof Error
            ? error.message
            : 'Failed to save qualification',
      });
    },
  });

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>What do you want to Study?</CardTitle>
        </CardHeader>
        <CardContent>
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
        </CardContent>
      </Card>
      <FormNavigation
        onSave={() => handleSubmit()}
        backUrl='/apply/qualifications'
        loading={isPending}
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
