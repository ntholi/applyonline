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
import { Loader2, Plus, Trash2 } from 'lucide-react';
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
    (q) => q.id === selectedQualification
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
      (subject) => subject.subjectId === 0 || subject.gradeId === 0
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
    <Card
      className={`p-6 md:p-8 space-y-6 md:space-y-8 bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-background/60`}
    >
      <div className='space-y-4'>
        <div className='space-y-2'>
          <label className='text-sm font-medium leading-none text-muted-foreground'>
            Qualification Type
          </label>
          <Select
            value={selectedQualification?.toString()}
            onValueChange={(value) => setSelectedQualification(Number(value))}
          >
            <SelectTrigger className='w-full'>
              <SelectValue placeholder='Choose your qualification type' />
            </SelectTrigger>
            <SelectContent>
              {qualifications?.map((qualification) => (
                <SelectItem
                  key={qualification.id}
                  value={qualification.id.toString()}
                >
                  {qualification.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {selectedQualification && (
        <div className='space-y-8'>
          <div className='space-y-6'>
            <div className='flex items-center justify-between border-b pb-4'>
              <div>
                <h3 className='text-lg font-semibold tracking-tight'>
                  Subjects and Grades
                </h3>
                <p className='text-sm text-muted-foreground'>
                  Add and manage your subjects below
                </p>
              </div>
              <Button
                variant='secondary'
                className='flex items-center gap-2 text-sm hover:shadow-md transition-shadow'
                onClick={() => setDialogOpen(true)}
              >
                <Plus className='w-4 h-4' />
                Add Subject
              </Button>
            </div>

            {subjects.length > 0 && (
              <div className='rounded-lg border bg-card'>
                <Table className='min-w-[300px] overflow-x-auto block md:table [&_tr:last-child]:border-0'>
                  <TableHeader>
                    <TableRow className='hover:bg-transparent'>
                      <TableHead className='w-full md:w-auto font-medium'>
                        Subject
                      </TableHead>
                      <TableHead className='w-full md:w-auto font-medium'>
                        Grade
                      </TableHead>
                      <TableHead className='w-[100px] text-right md:text-left'>
                        Actions
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {subjects.map((subject, index) => {
                      const selectedSubject = qualificationSubjects.find(
                        (s) => s.id === subject.subjectId
                      );
                      const selectedGrade = qualificationGrades.find(
                        (g) => g.id === subject.gradeId
                      );

                      if (!selectedSubject || !selectedGrade) return null;

                      return (
                        <TableRow
                          key={index}
                          className='flex flex-col md:table-row'
                        >
                          <TableCell className='flex-1 font-medium'>
                            {selectedSubject.name}
                          </TableCell>
                          <TableCell className='flex-1'>
                            {selectedGrade.name}
                          </TableCell>
                          <TableCell className='flex justify-end md:table-cell'>
                            <Button
                              variant='ghost'
                              size='icon'
                              className='hover:bg-destructive/10 hover:text-destructive'
                              onClick={() => removeSubject(index)}
                            >
                              <Trash2 className='w-4 h-4' />
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            )}
          </div>

          <Button
            onClick={handleSave}
            disabled={isSaving || subjects.length === 0}
            className='w-full font-medium shadow-sm hover:shadow-md transition-shadow'
          >
            {isSaving ? (
              <>
                <Loader2 className='w-4 h-4 mr-2 animate-spin' />
                Saving...
              </>
            ) : (
              'Save Qualification'
            )}
          </Button>
        </div>
      )}
      {selectedQualification && (
        <SubjectsDialog
          subjects={qualificationSubjects}
          grades={qualificationGrades}
          onAdd={addSubject}
          open={dialogOpen}
          onOpenChange={setDialogOpen}
        />
      )}
    </Card>
  );
}
