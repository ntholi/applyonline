'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
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
        className='flex flex-col p-24'
        onClick={() => setOpen(true)}
      >
        <PlusIcon />
        <span>{label}</span>
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Select a Program</DialogTitle>
          </DialogHeader>

          <div className="flex flex-wrap gap-2 mb-6">
            <Button
              variant={selectedFaculty === null ? "default" : "outline"}
              onClick={() => setSelectedFaculty(null)}
              className="text-sm"
            >
              All Faculties
            </Button>
            {faculties.map((faculty) => (
              <Button
                key={faculty.code}
                variant={selectedFaculty === faculty.code ? "default" : "outline"}
                onClick={() => setSelectedFaculty(faculty.code)}
                className="text-sm"
              >
                {faculty.shortName}
              </Button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredPrograms.map((program) => (
              <Button
                key={program.id}
                variant="outline"
                className={cn(
                  "h-auto p-4 flex flex-col items-start text-left",
                  "hover:bg-muted/50 transition-colors"
                )}
                onClick={() => {
                  onSelect(program);
                  setOpen(false);
                }}
              >
                <span className="font-semibold">{program.name}</span>
                <span className="text-sm text-muted-foreground">
                  {faculties.find(f => f.code === program.faculty)?.shortName}
                </span>
              </Button>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
