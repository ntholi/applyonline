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
import {
  findAllQualifications,
  getQualificationByStudentId,
} from '@/server/qualifications/actions';
import { saveStudentQualification } from '@/server/students/actions';
import { useMutation, useQuery } from '@tanstack/react-query';
import { GraduationCap, Loader2, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import SubjectsDialog from './subjects-dialog';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';

const formSchema = z.object({
  qualificationId: z.string().min(1, 'Please select a qualification'),
  subjects: z
    .array(
      z.object({
        subjectId: z.number(),
        gradeId: z.number(),
      }),
    )
    .min(1, 'Please add at least one subject'),
});

type FormValues = z.infer<typeof formSchema>;

type Props = {
  studentId: number;
  qualification: Awaited<ReturnType<typeof getQualificationByStudentId>>;
};

export default function SubjectsForm({ studentId }: Props) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      qualificationId: '',
      subjects: [],
    },
  });

  const { data: qualifications } = useQuery({
    queryKey: ['qualifications'],
    queryFn: () => findAllQualifications(),
    select: (it) => it.data,
  });

  const selectedQualificationData = qualifications?.find(
    (q) => q.id === Number(form.watch('qualificationId')),
  );

  const qualificationSubjects = selectedQualificationData?.subjects ?? [];
  const qualificationGrades = selectedQualificationData?.grades ?? [];

  const saveMutation = useMutation({
    mutationFn: saveStudentQualification,
    onSuccess: () => {
      toast({
        title: 'Success',
        description: 'Qualification saved successfully',
      });
      form.reset();
      router.push('/apply/programs');
    },
    onError: (error) => {
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

  function addSubject(subjectId: number, gradeId: number) {
    const subjects = form.getValues('subjects');
    const exists = subjects.some((subject) => subject.subjectId === subjectId);

    if (exists) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'This subject has already been added',
      });
      return;
    }

    form.setValue('subjects', [...subjects, { subjectId, gradeId }], {
      shouldValidate: true,
    });
  }

  function removeSubject(index: number) {
    const subjects = form.getValues('subjects');
    form.setValue(
      'subjects',
      subjects.filter((_, i) => i !== index),
      { shouldValidate: true },
    );
  }

  function onSubmit(data: FormValues) {
    saveMutation.mutate({
      studentId,
      qualificationId: Number(data.qualificationId),
      studentSubjects: data.subjects,
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
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
            <FormField
              control={form.control}
              name='qualificationId'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
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
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {form.watch('qualificationId') && (
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
              <FormField
                control={form.control}
                name='subjects'
                render={() => (
                  <FormItem>
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
                          {form.watch('subjects').length === 0 ? (
                            <TableRow>
                              <TableCell
                                colSpan={3}
                                className='h-24 text-center text-muted-foreground'
                              >
                                No subjects added. Click the {'"Add Subject"'}{' '}
                                button to add your subjects.
                              </TableCell>
                            </TableRow>
                          ) : (
                            form.watch('subjects').map((subject, index) => {
                              const subjectData = qualificationSubjects.find(
                                (s) => s.id === subject.subjectId,
                              );
                              const gradeData = qualificationGrades.find(
                                (g) => g.id === subject.gradeId,
                              );

                              return (
                                <TableRow key={index}>
                                  <TableCell>{subjectData?.name}</TableCell>
                                  <TableCell>{gradeData?.name}</TableCell>
                                  <TableCell>
                                    <Button
                                      variant='ghost'
                                      size='icon'
                                      onClick={() => removeSubject(index)}
                                    >
                                      <Trash2 className='h-4 w-4' />
                                    </Button>
                                  </TableCell>
                                </TableRow>
                              );
                            })
                          )}
                        </TableBody>
                      </Table>
                    </Card>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type='submit'
                className='w-full'
                disabled={saveMutation.isPending}
              >
                {saveMutation.isPending && (
                  <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                )}
                Save Qualification
              </Button>
            </CardContent>
          </Card>
        )}
      </form>
    </Form>
  );
}
