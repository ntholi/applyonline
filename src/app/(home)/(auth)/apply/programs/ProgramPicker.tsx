import { Button } from '@/components/ui/button';
import { PlusIcon } from 'lucide-react';
import React from 'react';
import { programs } from '@/db/schema';

type Program = typeof programs.$inferSelect;

type Props = {
  label: string;
  onSelect: (program: Program) => void;
};

export default function ProgramPicker({ label, onSelect }: Props) {
  return (
    <Button variant='outline' className='flex flex-col p-24'>
      <PlusIcon />
      <span>{label}</span>
    </Button>
  );
}
