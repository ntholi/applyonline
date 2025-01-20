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
import { Check } from 'lucide-react';
import {
  createApplication,
  getApplicationByStudentId,
} from '@/server/applications/actions';
import { useToast } from '@/hooks/use-toast';
import { programs } from '@/db/schema';

type Program = typeof programs.$inferSelect;

type Props = {
  studentId: number;
};

export default function ProgramsForm({ studentId }: Props) {
  const [showFirstChoice, setShowFirstChoice] = useState(false);
  const [showSecondChoice, setShowSecondChoice] = useState(false);
  const [firstChoice, setFirstChoice] = useState<Program | null>(null);
  const [secondChoice, setSecondChoice] = useState<Program | null>(null);
  const { toast } = useToast();

  const { data: programs } = useQuery({
    queryKey: ['programs'],
    queryFn: () => findAllPrograms(1),
  });

  const { data: existingApplication } = useQuery({
    queryKey: ['application', studentId],
    queryFn: () => getApplicationByStudentId(studentId),
  });

  useEffect(() => {
    if (existingApplication) {
      setFirstChoice(existingApplication.firstChoice);
      setSecondChoice(existingApplication.secondChoice);
    }
  }, [existingApplication]);

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

  function ProgramList({
    onSelect,
    selectedProgram,
  }: {
    onSelect: (program: Program) => void;
    selectedProgram?: Program | null;
  }) {
    if (!programs?.data) return null;

    return (
      <div className='grid gap-4'>
        {programs.data.map((program) => (
          <Card
            key={program.id}
            className={`cursor-pointer hover:bg-accent ${selectedProgram?.id === program.id ? 'border-primary' : ''}`}
            onClick={() => onSelect(program)}
          >
            <CardHeader className='flex flex-row items-center justify-between'>
              <div>
                <CardTitle className='text-lg'>{program.name}</CardTitle>
                <CardDescription>{program.faculty}</CardDescription>
              </div>
              {selectedProgram?.id === program.id && (
                <Check className='h-5 w-5 text-primary' />
              )}
            </CardHeader>
            {program.description && (
              <CardContent>
                <p className='text-sm text-muted-foreground'>
                  {program.description}
                </p>
              </CardContent>
            )}
          </Card>
        ))}
      </div>
    );
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
        <CardContent className='grid gap-4'>
          <div className='grid gap-4 md:grid-cols-2'>
            <div className='space-y-4'>
              <Button
                size='lg'
                className='h-24 w-full text-lg'
                variant={firstChoice ? 'default' : 'outline'}
                onClick={() => setShowFirstChoice(true)}
              >
                {firstChoice ? (
                  <div className='text-left'>
                    <p className='font-semibold'>{firstChoice.name}</p>
                    <p className='text-sm opacity-90'>{firstChoice.faculty}</p>
                  </div>
                ) : (
                  'Select First Choice Program'
                )}
              </Button>
              {firstChoice && (
                <Button
                  variant='ghost'
                  className='w-full'
                  onClick={() => setFirstChoice(null)}
                >
                  Clear Selection
                </Button>
              )}
            </div>

            <div className='space-y-4'>
              <Button
                size='lg'
                className='h-24 w-full text-lg'
                variant={secondChoice ? 'default' : 'outline'}
                onClick={() => setShowSecondChoice(true)}
              >
                {secondChoice ? (
                  <div className='text-left'>
                    <p className='font-semibold'>{secondChoice.name}</p>
                    <p className='text-sm opacity-90'>{secondChoice.faculty}</p>
                  </div>
                ) : (
                  'Select Second Choice Program'
                )}
              </Button>
              {secondChoice && (
                <Button
                  variant='ghost'
                  className='w-full'
                  onClick={() => setSecondChoice(null)}
                >
                  Clear Selection
                </Button>
              )}
            </div>
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
          <ProgramList
            onSelect={(program) => {
              setFirstChoice(program);
              setShowFirstChoice(false);
            }}
            selectedProgram={firstChoice}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={showSecondChoice} onOpenChange={setShowSecondChoice}>
        <DialogContent className='max-w-3xl'>
          <DialogHeader>
            <DialogTitle>Select Second Choice Program</DialogTitle>
          </DialogHeader>
          <ProgramList
            onSelect={(program) => {
              setSecondChoice(program);
              setShowSecondChoice(false);
            }}
            selectedProgram={secondChoice}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
