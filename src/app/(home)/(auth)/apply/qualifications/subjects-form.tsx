'use client';

import { Card } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useQuery } from '@tanstack/react-query';
import {
  findAllQualifications,
  getQualificationGrades,
  getQualificationSubjects,
} from '@/server/qualifications/actions';
import { saveStudentQualification } from '@/server/students/actions';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2, Plus, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

type SubjectEntry = {
  subjectId: number;
  gradeId: number;
};

export default function SubjectsForm() {
  const [selectedQualification, setSelectedQualification] = useState<number>();
  const [subjects, setSubjects] = useState<SubjectEntry[]>([]);
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
    setSubjects([...subjects, { subjectId: 0, gradeId: 0 }]);
  }

  function removeSubject(index: number) {
    setSubjects(subjects.filter((_, i) => i !== index));
  }

  function updateSubject(
    index: number,
    field: keyof SubjectEntry,
    value: number
  ) {
    setSubjects(
      subjects.map((subject, i) =>
        i === index ? { ...subject, [field]: value } : subject
      )
    );
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
    } catch (error: Error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message || 'Failed to save qualification',
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
        <div className='space-y-4'>
          <div className='flex items-center justify-between'>
            <h3 className='text-lg font-semibold'>Subjects and Grades</h3>
            <Button
              onClick={addSubject}
              variant='outline'
              size='sm'
              className='flex items-center gap-2'
            >
              <Plus className='w-4 h-4' />
              Add Subject
            </Button>
          </div>

          <div className='space-y-4'>
            {subjects.map((subject, index) => (
              <div
                key={index}
                className='grid grid-cols-[1fr,1fr,auto] gap-4 items-start'
              >
                <div className='space-y-2'>
                  <label className='text-sm font-medium'>Subject</label>
                  <Select
                    value={subject.subjectId.toString()}
                    onValueChange={(value) =>
                      updateSubject(index, 'subjectId', Number(value))
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
                    value={subject.gradeId.toString()}
                    onValueChange={(value) =>
                      updateSubject(index, 'gradeId', Number(value))
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
                  variant='ghost'
                  size='icon'
                  className={cn(
                    'mt-8 hover:bg-destructive hover:text-destructive-foreground'
                  )}
                  onClick={() => removeSubject(index)}
                >
                  <Trash2 className='w-4 h-4' />
                </Button>
              </div>
            ))}
          </div>

          <Button
            onClick={handleSave}
            disabled={isSaving || subjects.length === 0}
            className='w-full mt-6'
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
