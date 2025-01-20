'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { PlusIcon } from 'lucide-react';
import { useState } from 'react';
import { programs } from '@/db/schema';
import { faculties } from '@/app/admin/programs/data/faculties';
import { cn } from '@/lib/utils';
import { findAllPrograms } from '@/server/programs/actions';
import { useQuery } from '@tanstack/react-query';

type Program = typeof programs.$inferSelect;

type Props = {
  label: string;
  onSelect: (program: Program) => void;
};

export default function ProgramPicker({ label, onSelect }: Props) {
  const [open, setOpen] = useState(false);
  const [selectedFaculty, setSelectedFaculty] = useState<string | null>(null);

  const { data } = useQuery({
    queryKey: ['programs'],
    queryFn: () => findAllPrograms(),
  });

  const allPrograms = data?.data ?? [];
  const filteredPrograms = selectedFaculty
    ? allPrograms.filter((program) => program.faculty === selectedFaculty)
    : allPrograms;

  return (
    <>
      <Button
        variant='outline'
        className='group relative flex min-h-[180px] min-w-[200px] flex-col items-center justify-center gap-3 border-2 border-dashed p-8 transition-all hover:border-solid hover:border-primary hover:bg-primary/5'
        onClick={() => setOpen(true)}
      >
        <div className='rounded-full bg-primary/10 p-3 transition-colors group-hover:bg-primary/20'>
          <PlusIcon className='h-6 w-6 text-primary' />
        </div>
        <span className='text-lg font-medium text-muted-foreground transition-colors group-hover:text-primary'>
          {label}
        </span>
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className='h-[80vh] max-w-4xl overflow-y-auto'>
          <DialogHeader>
            <DialogTitle>Select a Program</DialogTitle>
          </DialogHeader>

          <div className='mb-6 flex flex-wrap gap-2'>
            <Button
              variant={selectedFaculty === null ? 'default' : 'outline'}
              onClick={() => setSelectedFaculty(null)}
              className='text-sm'
            >
              All Faculties
            </Button>
            {faculties.map((faculty) => (
              <Button
                key={faculty.code}
                variant={
                  selectedFaculty === faculty.code ? 'default' : 'outline'
                }
                onClick={() => setSelectedFaculty(faculty.code)}
                className='text-sm'
              >
                {faculty.shortName}
              </Button>
            ))}
          </div>

          <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
            {filteredPrograms.map((program) => (
              <button
                key={program.id}
                className={cn(
                  'flex h-auto flex-col items-start p-4 text-start hover:bg-muted/40',
                  'rounded-md border shadow-sm',
                )}
                onClick={() => {
                  onSelect(program);
                  setOpen(false);
                }}
              >
                <span className='font-semibold'>{program.name}</span>
                <span className='text-sm text-muted-foreground'>
                  {faculties.find((f) => f.code === program.faculty)?.shortName}
                </span>
              </button>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
