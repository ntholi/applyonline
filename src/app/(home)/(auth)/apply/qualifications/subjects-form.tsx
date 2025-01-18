'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
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
import { GraduationCap, Loader2, Trash2 } from 'lucide-react';
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
    const exists = subjects.some((subject) => subject.subjectId === subjectId);

    if (exists) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'This subject has already been added',
      });
      return;
    }

    setSubjects([...subjects, { subjectId, gradeId }]);
  }

  function removeSubject(index: number) {
    setSubjects(subjects.filter((_, i) => i !== index));
  }

  async function handleSave() {
    if (!selectedQualification) return;
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
      <Card className='relative overflow-hidden'>
        <div className='absolute right-0 top-0 h-32 w-32 -translate-y-8 translate-x-8 opacity-5'>
          <GraduationCap className='h-full w-full' />
        </div>
        <CardHeader className='flex flex-row items-start gap-4'>
          <div className='rounded-lg bg-muted p-2'>
            <GraduationCap className='h-6 w-6 text-muted-foreground' />
          </div>
          <div>
            <CardTitle>Qualification Type</CardTitle>
            <CardDescription>
              Select your qualification to proceed with subject entry
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <Select
            value={selectedQualification?.toString()}
            onValueChange={(value) => setSelectedQualification(Number(value))}
          >
            <SelectTrigger className='w-full'>
              <SelectValue placeholder='Select your qualification' />
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
        </CardContent>
      </Card>

      {selectedQualification && (
        <Card className='relative overflow-hidden'>
          <CardHeader className='flex flex-col items-stretch justify-between gap-2 md:flex-row md:items-center'>
            <div className='flex flex-row items-start gap-4'>
              <div className='rounded-lg bg-muted p-2'>
                <GraduationCap className='h-6 w-6 text-muted-foreground' />
              </div>
              <div>
                <CardTitle>Subjects</CardTitle>
                <CardDescription>
                  Add your subjects and their respective grades below.
                </CardDescription>
              </div>
            </div>
            <SubjectsDialog
              open={dialogOpen}
              onOpenChange={setDialogOpen}
              subjects={qualificationSubjects}
              grades={qualificationGrades}
              onAdd={addSubject}
            />
          </CardHeader>
          <CardContent className='space-y-6'>
            <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Subject</TableHead>
                    <TableHead>Grade</TableHead>
                    <TableHead className='w-[100px]'>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {subjects.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={3}
                        className='h-24 text-center text-muted-foreground'
                      >
                        No subjects added. Click the {'"Add Subject"'} button to
                        add your subjects.
                      </TableCell>
                    </TableRow>
                  ) : (
                    subjects.map((subject, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          {
                            qualificationSubjects.find(
                              (s) => s.id === subject.subjectId,
                            )?.name
                          }
                        </TableCell>
                        <TableCell>
                          {
                            qualificationGrades.find(
                              (g) => g.id === subject.gradeId,
                            )?.name
                          }
                        </TableCell>
                        <TableCell>
                          <Button
                            variant='ghost'
                            size='icon'
                            onClick={() => removeSubject(index)}
                          >
                            <Trash2 className='h-4 w-4 text-destructive' />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </Card>

            <div className='flex justify-end'>
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
                  'Save & Continue'
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
