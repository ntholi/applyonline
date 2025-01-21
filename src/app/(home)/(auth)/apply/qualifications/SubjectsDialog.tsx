'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useMediaQuery } from '@/hooks/use-media-query';
import { cn } from '@/lib/utils';
import { PlusCircle } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

type Props = {
  subjects: { id: number; name: string }[];
  grades: { id: number; name: string }[];
  onAdd: (subjectId: number, gradeId: number) => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const formSchema = z.object({
  subject: z.string().min(1, 'Please select a subject'),
  grade: z.string().min(1, 'Please select a grade'),
});

type FormValues = z.infer<typeof formSchema>;

export default function SubjectsDialog({
  subjects,
  grades,
  onAdd,
  open,
  onOpenChange,
}: Props) {
  const isDesktop = useMediaQuery('(min-width: 768px)');

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      subject: '',
      grade: '',
    },
  });

  function onSubmit(data: FormValues) {
    onAdd(Number(data.subject), Number(data.grade));
    form.reset();
    onOpenChange(false);
  }

  const SubjectsButton = (
    <Button variant='outline' className='text-sm'>
      <PlusCircle className='mr-2 h-4 w-4' />
      Add Subject
    </Button>
  );

  function SubjectForm({ className }: { className?: string }) {
    return (
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className={cn('grid gap-4', className)}
        >
          <FormField
            control={form.control}
            name='subject'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Subject</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder='Select subject' />
                    </SelectTrigger>
                    <SelectContent>
                      {subjects.map((subject) => (
                        <SelectItem
                          key={subject.id}
                          value={subject.id.toString()}
                        >
                          {subject.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='grade'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Grade</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder='Select grade' />
                    </SelectTrigger>
                    <SelectContent>
                      {grades.map((grade) => (
                        <SelectItem key={grade.id} value={grade.id.toString()}>
                          {grade.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type='submit' className='w-full'>
            Add Subject
          </Button>
        </form>
      </Form>
    );
  }

  if (!isDesktop) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerTrigger asChild>{SubjectsButton}</DrawerTrigger>
        <DrawerContent className='px-2'>
          <DrawerHeader className='text-left'>
            <DrawerTitle>Add Subject</DrawerTitle>
            <DrawerDescription>
              Add a new subject and grade to your qualifications
            </DrawerDescription>
          </DrawerHeader>
          <div className='px-4 py-1'>
            <SubjectForm />
          </div>
          <DrawerFooter className='pt-1'>
            <DrawerClose asChild>
              <Button variant='outline'>Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{SubjectsButton}</DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Add Subject</DialogTitle>
          <DialogDescription>
            Add a new subject and grade to your qualifications
          </DialogDescription>
        </DialogHeader>
        <SubjectForm className='py-4' />
      </DialogContent>
    </Dialog>
  );
}
