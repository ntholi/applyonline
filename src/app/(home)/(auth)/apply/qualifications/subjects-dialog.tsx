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
import { useDeviceDetect } from '@/hooks/useDeviceDetect';
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
  const { isMobile } = useDeviceDetect();
  const [selectedSubject, setSelectedSubject] = useState(0);
  const [selectedGrade, setSelectedGrade] = useState(0);

  function handleAdd() {
    onAdd(selectedSubject, selectedGrade);
    setSelectedSubject(0);
    setSelectedGrade(0);
  }

  const Content = (
    <>
      <div className='grid gap-4 py-4'>
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
      </div>
      <Button onClick={handleAdd} disabled={!selectedSubject || !selectedGrade}>
        Add Subject
      </Button>
    </>
  );

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerTrigger asChild>
          <Button variant='outline' size='sm'>
            <Plus className='h-4 w-4 mr-2' />
            Add Subject
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Add Subject</DrawerTitle>
            <DrawerDescription>Add a new subject and grade</DrawerDescription>
          </DrawerHeader>
          {Content}
          <DrawerFooter>
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
      <DialogTrigger asChild>
        <Button variant='outline' size='sm'>
          <Plus className='h-4 w-4 mr-2' />
          Add Subject
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Subject</DialogTitle>
          <DialogDescription>Add a new subject and grade</DialogDescription>
        </DialogHeader>
        {Content}
        <DialogFooter>
          <Button variant='outline' onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
