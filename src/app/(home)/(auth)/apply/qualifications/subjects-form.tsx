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
import {
  findAllQualifications,
  getQualificationGrades,
  getQualificationSubjects,
} from '@/server/qualifications/actions';
import { saveStudentQualification } from '@/server/students/actions';
import { useQuery } from '@tanstack/react-query';
import { Loader2, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';

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
  const [currentSubject, setCurrentSubject] = useState<SubjectEntry>({
    subjectId: 0,
    gradeId: 0,
  });
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  const { data: qualifications } = useQuery({
    queryKey: ['qualifications'],
    queryFn: () => findAllQualifications(),
  });

  const { data: qualificationSubjects } = useQuery({
    queryKey: ['qualification-subjects', selectedQualification],
    queryFn: () =>
      selectedQualification
        ? getQualificationSubjects(selectedQualification)
        : Promise.resolve([]),
    enabled: !!selectedQualification,
  });

  const { data: qualificationGrades } = useQuery({
    queryKey: ['qualification-grades', selectedQualification],
    queryFn: () =>
      selectedQualification
        ? getQualificationGrades(selectedQualification)
        : Promise.resolve([]),
    enabled: !!selectedQualification,
  });

  function addSubject() {
    if (currentSubject.subjectId === 0 || currentSubject.gradeId === 0) return;
    setSubjects([...subjects, currentSubject]);
    setCurrentSubject({ subjectId: 0, gradeId: 0 });
  }

  function removeSubject(index: number) {
    setSubjects(subjects.filter((_, i) => i !== index));
  }

  function updateCurrentSubject(field: keyof SubjectEntry, value: number) {
    setCurrentSubject((prev) => ({ ...prev, [field]: value }));
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
      setCurrentSubject({ subjectId: 0, gradeId: 0 });
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
    <Card className='p-6 space-y-6'>
      <div className='space-y-4'>
        <label className='text-sm font-medium'>Select Qualification</label>
        <Select
          value={selectedQualification?.toString()}
          onValueChange={(value) => setSelectedQualification(Number(value))}
        >
          <SelectTrigger className='w-full'>
            <SelectValue placeholder='Choose a qualification' />
          </SelectTrigger>
          <SelectContent>
            {qualifications?.items.map((qualification) => (
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

      {selectedQualification && (
        <div className='space-y-6'>
          <div className='space-y-4'>
            <h3 className='text-lg font-semibold'>Add Subjects and Grades</h3>

            <div className='grid grid-cols-[1fr,1fr,auto] gap-4 items-start'>
              <div className='space-y-2'>
                <label className='text-sm font-medium'>Subject</label>
                <Select
                  value={currentSubject.subjectId.toString()}
                  onValueChange={(value) =>
                    updateCurrentSubject('subjectId', Number(value))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder='Select subject' />
                  </SelectTrigger>
                  <SelectContent>
                    {qualificationSubjects?.map((subject) => (
                      <SelectItem
                        key={subject.id}
                        value={subject.id.toString()}
                      >
                        {subject.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className='space-y-2'>
                <label className='text-sm font-medium'>Grade</label>
                <Select
                  value={currentSubject.gradeId.toString()}
                  onValueChange={(value) =>
                    updateCurrentSubject('gradeId', Number(value))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder='Select grade' />
                  </SelectTrigger>
                  <SelectContent>
                    {qualificationGrades?.map((grade) => (
                      <SelectItem key={grade.id} value={grade.id.toString()}>
                        {grade.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button
                variant='outline'
                size='icon'
                className='mt-8'
                onClick={addSubject}
                disabled={
                  currentSubject.subjectId === 0 || currentSubject.gradeId === 0
                }
              >
                <Plus className='w-4 h-4' />
              </Button>
            </div>
          </div>

          {subjects.length > 0 && (
            <div className='space-y-4'>
              <h3 className='text-lg font-semibold'>Selected Subjects</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Subject</TableHead>
                    <TableHead>Grade</TableHead>
                    <TableHead className='w-[100px]'>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {subjects.map((subject, index) => {
                    const selectedSubject = qualificationSubjects?.find(
                      (s) => s.id === subject.subjectId
                    );
                    const selectedGrade = qualificationGrades?.find(
                      (g) => g.id === subject.gradeId
                    );

                    if (!selectedSubject || !selectedGrade) return null;

                    return (
                      <TableRow key={index}>
                        <TableCell>{selectedSubject.name}</TableCell>
                        <TableCell>{selectedGrade.name}</TableCell>
                        <TableCell>
                          <Button
                            variant='ghost'
                            size='icon'
                            className='hover:bg-destructive hover:text-destructive-foreground'
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

          <Button
            onClick={handleSave}
            disabled={isSaving || subjects.length === 0}
            className='w-full'
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
    </Card>
  );
}
