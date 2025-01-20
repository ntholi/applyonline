'use client';

import { programs } from '@/db/schema';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Check, X } from 'lucide-react';

type Program = typeof programs.$inferSelect;

export default function ProgramSelector({
  selectedProgram,
  label,
  onSelect,
  onClear,
}: {
  selectedProgram: Program | null;
  label: string;
  onSelect: () => void;
  onClear: () => void;
}) {
  return (
    <Card className='group relative'>
      <Button
        size='lg'
        className='h-24 w-full text-lg'
        variant={selectedProgram ? 'default' : 'outline'}
        onClick={onSelect}
      >
        {selectedProgram ? (
          <div className='text-left'>
            <p className='font-semibold'>{selectedProgram.name}</p>
            <p className='text-sm opacity-90'>{selectedProgram.faculty}</p>
          </div>
        ) : (
          label
        )}
      </Button>
      {selectedProgram && (
        <Button
          size='icon'
          variant='ghost'
          className='absolute -right-2 -top-2 h-8 w-8 rounded-full opacity-0 transition-opacity group-hover:opacity-100'
          onClick={onClear}
        >
          <X className='h-4 w-4' />
        </Button>
      )}
    </Card>
  );
}

export function ProgramList({
  onSelect,
  selectedProgram,
  programs,
}: {
  onSelect: (program: Program) => void;
  selectedProgram?: Program | null;
  programs: Program[];
}) {
  if (!programs?.length) return null;

  return (
    <div className='grid gap-4'>
      {programs.map((program) => (
        <Card
          key={program.id}
          className={`cursor-pointer transition-colors hover:bg-accent ${
            selectedProgram?.id === program.id ? 'border-primary' : ''
          }`}
          onClick={() => onSelect(program)}
        >
          <CardHeader className='flex flex-row items-center justify-between'>
            <div>
              <CardTitle className='text-lg'>{program.name}</CardTitle>
              <CardDescription>{program.faculty}</CardDescription>
            </div>
            {selectedProgram?.id === program.id && (
              <Check className='h-5 w-5 text-primary' />
            )}
          </CardHeader>
          {program.description && (
            <CardContent>
              <p className='text-sm text-muted-foreground'>
                {program.description}
              </p>
            </CardContent>
          )}
        </Card>
      ))}
    </div>
  );
}
