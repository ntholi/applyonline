'use client';

import { useState } from 'react';
import { PlusIcon } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { programs } from '@/db/schema';
import { faculties } from '@/app/admin/programs/data/faculties';
import { cn } from '@/lib/utils';
import { findAllPrograms } from '@/server/programs/actions';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';

type Program = typeof programs.$inferSelect;

type Props = {
  label: string;
  onSelect: (program: Program) => void;
};

export default function ProgramPicker({ label, onSelect }: Props) {
  const [open, setOpen] = useState(false);
  const [selectedFaculty, setSelectedFaculty] = useState<string | null>(null);

  const { data, isLoading } = useQuery({
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
        <DialogContent className='max-h-[80vh] max-w-4xl overflow-y-auto'>
          <DialogHeader>
            <DialogTitle>Select a Program</DialogTitle>
            <DialogDescription>
              Select a program from the list below
            </DialogDescription>
          </DialogHeader>
          <div className='flex flex-wrap gap-2'>
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
            <Separator />
          </div>

          <div className='min-h-[50vh]'>
            {isLoading ? (
              <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
                {[...Array(6)].map((_, index) => (
                  <Skeleton key={index} className='h-20 w-full' />
                ))}
              </div>
            ) : filteredPrograms.length === 0 ? (
              <div className='flex h-full items-center justify-center'>
                <p className='text-sm text-muted-foreground'>
                  You don&apos;t qualify for any program{' '}
                  {selectedFaculty && 'in this faculty'}
                </p>
              </div>
            ) : (
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
                      {
                        faculties.find((f) => f.code === program.faculty)
                          ?.shortName
                      }
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
