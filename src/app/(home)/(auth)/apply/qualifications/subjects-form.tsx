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
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { useToast } from '@/hooks/use-toast';
import { findAllQualifications } from '@/server/qualifications/actions';
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
  const [drawerOpen, setDrawerOpen] = useState(false);
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

  function addSubject() {
    if (currentSubject.subjectId === 0 || currentSubject.gradeId === 0) return;
    setSubjects([...subjects, currentSubject]);
    setCurrentSubject({ subjectId: 0, gradeId: 0 });
    setDrawerOpen(false);
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
    <Card className='p-6 md:p-8 space-y-6 md:space-y-8 bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <div className='space-y-4'>
        <div className='space-y-2'>
          <label className='text-sm font-medium leading-none text-muted-foreground'>Qualification Type</label>
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
                <h3 className='text-lg font-semibold tracking-tight'>Subjects and Grades</h3>
                <p className='text-sm text-muted-foreground'>Add and manage your subjects below</p>
              </div>
              <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
                <DrawerTrigger asChild>
                  <Button
                    variant='secondary'
                    className='flex items-center gap-2 text-sm hover:shadow-md transition-shadow'
                  >
                    <Plus className='w-4 h-4' />
                    Add Subject
                  </Button>
                </DrawerTrigger>
                <DrawerContent>
                  <div className="mx-auto w-full max-w-sm">
                    <DrawerHeader>
                      <DrawerTitle>Add New Subject</DrawerTitle>
                      <DrawerDescription>Add a subject and its corresponding grade</DrawerDescription>
                    </DrawerHeader>
                    <div className='p-4 space-y-6'>
                      <div className='space-y-2'>
                        <label className='text-sm font-medium leading-none text-muted-foreground'>Subject</label>
                        <Select
                          value={currentSubject.subjectId.toString()}
                          onValueChange={(value) =>
                            updateCurrentSubject('subjectId', Number(value))
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder='Select a subject' />
                          </SelectTrigger>
                          <SelectContent>
                            {qualificationSubjects.map((subject) => (
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
                        <label className='text-sm font-medium leading-none text-muted-foreground'>Grade</label>
                        <Select
                          value={currentSubject.gradeId.toString()}
                          onValueChange={(value) =>
                            updateCurrentSubject('gradeId', Number(value))
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder='Select your grade' />
                          </SelectTrigger>
                          <SelectContent>
                            {qualificationGrades.map((grade) => (
                              <SelectItem key={grade.id} value={grade.id.toString()}>
                                {grade.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <DrawerFooter>
                      <Button
                        onClick={addSubject}
                        disabled={currentSubject.subjectId === 0 || currentSubject.gradeId === 0}
                      >
                        Add Subject
                      </Button>
                      <DrawerClose asChild>
                        <Button variant="outline">Cancel</Button>
                      </DrawerClose>
                    </DrawerFooter>
                  </div>
                </DrawerContent>
              </Drawer>
            </div>

            {subjects.length > 0 && (
              <div className='rounded-lg border bg-card'>
                <Table className='min-w-[300px] overflow-x-auto block md:table [&_tr:last-child]:border-0'>
                  <TableHeader>
                    <TableRow className='hover:bg-transparent'>
                      <TableHead className='w-full md:w-auto font-medium'>Subject</TableHead>
                      <TableHead className='w-full md:w-auto font-medium'>Grade</TableHead>
                      <TableHead className='w-[100px] text-right md:text-left'>Actions</TableHead>
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
    </Card>
  );
}
