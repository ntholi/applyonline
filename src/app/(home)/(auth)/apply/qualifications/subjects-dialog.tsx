'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
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
import { Plus } from 'lucide-react';
import { useState } from 'react';

type Props = {
  subjects: { id: number; name: string }[];
  grades: { id: number; name: string }[];
  onAdd: (subjectId: number, gradeId: number) => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function SubjectsDialog({
  subjects,
  grades,
  onAdd,
  open,
  onOpenChange,
}: Props) {
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const [selectedSubject, setSelectedSubject] = useState(0);
  const [selectedGrade, setSelectedGrade] = useState(0);

  function handleAdd() {
    onAdd(selectedSubject, selectedGrade);
    setSelectedSubject(0);
    setSelectedGrade(0);
    onOpenChange(false);
  }

  const SubjectsButton = (
    <Button variant='outline' className='text-sm'>
      <Plus className='h-4 w-4 mr-2' />
      Add Subject
    </Button>
  );

  function SubjectForm({ className }: { className?: string }) {
    return (
      <div className={cn('grid gap-4', className)}>
        <div className='grid gap-2'>
          <Select
            value={selectedSubject.toString()}
            onValueChange={(value) => setSelectedSubject(Number(value))}
          >
            <SelectTrigger>
              <SelectValue placeholder='Select subject' />
            </SelectTrigger>
            <SelectContent>
              {subjects.map((subject) => (
                <SelectItem key={subject.id} value={subject.id.toString()}>
                  {subject.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className='grid gap-2'>
          <Select
            value={selectedGrade.toString()}
            onValueChange={(value) => setSelectedGrade(Number(value))}
          >
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
        </div>
        <Button
          onClick={handleAdd}
          disabled={!selectedSubject || !selectedGrade}
          className='w-full'
        >
          Add Subject
        </Button>
      </div>
    );
  }

  if (!isDesktop) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerTrigger asChild>{SubjectsButton}</DrawerTrigger>
        <DrawerContent>
          <DrawerHeader className='text-left'>
            <DrawerTitle>Add Subject</DrawerTitle>
            <DrawerDescription>
              Add a new subject and grade to your qualifications
            </DrawerDescription>
          </DrawerHeader>
          <div className='px-4 py-2'>
            <SubjectForm />
          </div>
          <DrawerFooter className='pt-2'>
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
        <DialogFooter>
          <Button variant='outline' onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
