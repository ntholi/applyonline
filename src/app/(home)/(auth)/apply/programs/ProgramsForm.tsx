'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { findAllPrograms } from '@/server/programs/actions';
import { useQuery } from '@tanstack/react-query';
import {
  createApplication,
  getApplicationByStudentId,
} from '@/server/applications/actions';
import { useToast } from '@/hooks/use-toast';
import { programs } from '@/db/schema';
import ProgramSelector, { ProgramList } from './ProgramSelector';

type Program = typeof programs.$inferSelect;

type Props = {
  application: Awaited<ReturnType<typeof getApplicationByStudentId>>;
  studentId: number;
};

export default function ProgramsForm({ application, studentId }: Props) {
  const [showFirstChoice, setShowFirstChoice] = useState(false);
  const [showSecondChoice, setShowSecondChoice] = useState(false);
  const [firstChoice, setFirstChoice] = useState<Program | null>(null);
  const [secondChoice, setSecondChoice] = useState<Program | null>(null);
  const { toast } = useToast();

  const { data: programsData } = useQuery({
    queryKey: ['programs'],
    queryFn: () => findAllPrograms(1),
  });

  useEffect(() => {
    if (application) {
      setFirstChoice(application.firstChoice);
      setSecondChoice(application.secondChoice);
    }
  }, [application]);

  async function handleSave() {
    if (!firstChoice || !secondChoice) {
      toast({
        title: 'Error',
        description: 'Please select both first and second choice programs',
        variant: 'destructive',
      });
      return;
    }

    try {
      await createApplication({
        studentId,
        firstChoiceId: firstChoice.id,
        secondChoiceId: secondChoice.id,
      });

      toast({
        title: 'Success',
        description: 'Your program choices have been saved',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description:
          error instanceof Error
            ? error.message
            : 'Failed to save your program choices',
        variant: 'destructive',
      });
    }
  }

  return (
    <div className='space-y-6'>
      <Card>
        <CardHeader>
          <CardTitle>Program Selection</CardTitle>
          <CardDescription>
            Please select your first and second choice programs
          </CardDescription>
        </CardHeader>
        <CardContent className='grid gap-6'>
          <div className='grid gap-6 md:grid-cols-2'>
            <ProgramSelector
              selectedProgram={firstChoice}
              label='Select First Choice Program'
              onSelect={() => setShowFirstChoice(true)}
              onClear={() => setFirstChoice(null)}
            />
            <ProgramSelector
              selectedProgram={secondChoice}
              label='Select Second Choice Program'
              onSelect={() => setShowSecondChoice(true)}
              onClear={() => setSecondChoice(null)}
            />
          </div>

          <Button
            size='lg'
            onClick={handleSave}
            disabled={!firstChoice || !secondChoice}
            className='w-full md:w-auto md:self-end'
          >
            Save Program Choices
          </Button>
        </CardContent>
      </Card>

      <Dialog open={showFirstChoice} onOpenChange={setShowFirstChoice}>
        <DialogContent className='max-w-3xl'>
          <DialogHeader>
            <DialogTitle>Select First Choice Program</DialogTitle>
          </DialogHeader>
          {programsData?.data && (
            <ProgramList
              programs={programsData.data}
              onSelect={(program) => {
                setFirstChoice(program);
                setShowFirstChoice(false);
              }}
              selectedProgram={firstChoice}
            />
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={showSecondChoice} onOpenChange={setShowSecondChoice}>
        <DialogContent className='max-w-3xl'>
          <DialogHeader>
            <DialogTitle>Select Second Choice Program</DialogTitle>
          </DialogHeader>
          {programsData?.data && (
            <ProgramList
              programs={programsData.data}
              onSelect={(program) => {
                setSecondChoice(program);
                setShowSecondChoice(false);
              }}
              selectedProgram={secondChoice}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
