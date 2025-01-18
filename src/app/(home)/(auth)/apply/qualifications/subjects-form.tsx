'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { findAllQualifications } from '@/server/qualifications/actions';
import { saveStudentQualification } from '@/server/students/actions';
import { useQuery } from '@tanstack/react-query';
import {
  AlertCircle,
  BookOpen,
  CheckCircle2,
  GraduationCap,
  Loader2,
  Medal,
  Trash2,
} from 'lucide-react';
import { useState } from 'react';
import SubjectsDialog from './subjects-dialog';

type SubjectEntry = {
  subjectId: number;
  gradeId: number;
};

type Props = {
  studentId: number;
};

export default function SubjectsForm({ studentId }: Props) {
  const [selectedQualification, setSelectedQualification] = useState<number>();
  const [subjects, setSubjects] = useState<SubjectEntry[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  const { data: qualifications } = useQuery({
    queryKey: ['qualifications'],
    queryFn: () => findAllQualifications(),
    select: (it) => it.data,
  });

  const selectedQualificationData = qualifications?.find(
    (q) => q.id === selectedQualification,
  );

  const qualificationSubjects = selectedQualificationData?.subjects ?? [];
  const qualificationGrades = selectedQualificationData?.grades ?? [];

  function addSubject(subjectId: number, gradeId: number) {
    setSubjects([...subjects, { subjectId, gradeId }]);
  }

  function removeSubject(index: number) {
    setSubjects(subjects.filter((_, i) => i !== index));
  }

  async function handleSave() {
    if (!selectedQualification) return;

    const invalidSubjects = subjects.some(
      (subject) => subject.subjectId === 0 || subject.gradeId === 0,
    );

    if (invalidSubjects) {
      toast({
        variant: 'destructive',
        title: 'Invalid subjects',
        description: 'Please select both subject and grade for all entries',
      });
      return;
    }

    if (subjects.length === 0) {
      toast({
        variant: 'destructive',
        title: 'No subjects',
        description: 'Please add at least one subject',
      });
      return;
    }

    setIsSaving(true);
    try {
      await saveStudentQualification({
        studentId,
        qualificationId: selectedQualification,
        studentSubjects: subjects.map((subject) => ({
          subjectId: subject.subjectId,
          gradeId: subject.gradeId,
        })),
      });

      toast({
        title: 'Success',
        description: 'Qualification saved successfully',
      });

      setSubjects([]);
      setSelectedQualification(undefined);
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description:
          error instanceof Error
            ? error.message
            : 'Failed to save qualification',
      });
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className='space-y-6'>
      <Card className='relative overflow-hidden border bg-card p-6 shadow-sm sm:p-8'>
        <div className='absolute right-0 top-0 h-32 w-32 -translate-y-8 translate-x-8 opacity-5'>
          <GraduationCap className='h-full w-full' />
        </div>
        <div className='space-y-6'>
          <div className='flex items-start space-x-4'>
            <div className='rounded-lg bg-muted p-2'>
              <GraduationCap className='h-6 w-6 text-muted-foreground' />
            </div>
            <div>
              <h3 className='text-xl font-semibold tracking-tight'>
                Qualification Type
              </h3>
              <p className='text-sm text-muted-foreground'>
                Select your qualification to proceed with subject entry
              </p>
            </div>
          </div>

          <div className='relative'>
            <Select
              value={selectedQualification?.toString()}
              onValueChange={(value) => setSelectedQualification(Number(value))}
            >
              <SelectTrigger className='h-11 w-full bg-background pr-12 transition-colors duration-200'>
                <SelectValue placeholder='Choose your qualification type' />
              </SelectTrigger>
              <SelectContent>
                {qualifications?.map((qualification) => (
                  <SelectItem
                    key={qualification.id}
                    value={qualification.id.toString()}
                    className='transition-colors duration-200'
                  >
                    {qualification.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <BookOpen className='absolute right-12 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground' />
          </div>
        </div>
      </Card>

      {/* Subjects Card */}
      {selectedQualification && (
        <Card className='relative overflow-hidden border bg-card p-6 shadow-sm sm:p-8'>
          <div className='space-y-6'>
            <div className='flex flex-col space-y-6 sm:flex-row sm:items-center sm:justify-between sm:space-y-0'>
              <div className='flex items-start space-x-4'>
                <div className='rounded-lg bg-muted p-2'>
                  <Medal className='h-6 w-6 text-muted-foreground' />
                </div>
                <div>
                  <h3 className='text-xl font-semibold tracking-tight'>
                    Subject Details
                  </h3>
                  <p className='text-sm text-muted-foreground'>
                    Add your subjects and corresponding grades
                  </p>
                </div>
              </div>
              <SubjectsDialog
                subjects={qualificationSubjects}
                grades={qualificationGrades}
                onAdd={addSubject}
                open={dialogOpen}
                onOpenChange={setDialogOpen}
              />
            </div>

            {subjects.length > 0 ? (
              <div className='overflow-hidden rounded-lg border bg-background/50'>
                <Table className='w-full'>
                  <TableHeader>
                    <TableRow className='hover:bg-transparent'>
                      <TableHead className='w-[45%] text-base font-medium'>
                        Subject
                      </TableHead>
                      <TableHead className='w-[45%] text-base font-medium'>
                        Grade
                      </TableHead>
                      <TableHead className='w-[10%]'></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {subjects.map((subject, index) => {
                      const selectedSubject = qualificationSubjects.find(
                        (s) => s.id === subject.subjectId,
                      );
                      const selectedGrade = qualificationGrades.find(
                        (g) => g.id === subject.gradeId,
                      );

                      if (!selectedSubject || !selectedGrade) return null;

                      return (
                        <TableRow
                          key={index}
                          className='group transition-colors duration-200 hover:bg-muted/50'
                        >
                          <TableCell className='font-medium'>
                            {selectedSubject.name}
                          </TableCell>
                          <TableCell>{selectedGrade.name}</TableCell>
                          <TableCell className='text-right'>
                            <Button
                              variant='ghost'
                              size='icon'
                              onClick={() => removeSubject(index)}
                              className='h-8 w-8'
                            >
                              <Trash2 className='h-4 w-4 text-destructive' />
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className='flex min-h-[200px] items-center justify-center rounded-lg border border-dashed bg-background/50'>
                <div className='text-center'>
                  <AlertCircle className='mx-auto h-8 w-8 text-muted-foreground' />
                  <p className='mt-3 text-sm font-medium text-muted-foreground'>
                    No subjects added yet
                  </p>
                  <p className='mt-1 text-xs text-muted-foreground/70'>
                    Click the {'"Add Subject"'} button above to get started
                  </p>
                </div>
              </div>
            )}

            <div className='flex justify-end pt-4'>
              <Button
                onClick={handleSave}
                disabled={isSaving || subjects.length === 0}
                className='min-w-[140px]'
              >
                {isSaving ? (
                  <>
                    <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                    Saving...
                  </>
                ) : (
                  <>
                    <CheckCircle2 className='mr-2 h-4 w-4' />
                    Save Details
                  </>
                )}
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
