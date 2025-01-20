'use client';

import { Container } from '@/components/ui/container';
import {
  createApplication,
  getApplicationByStudentId,
} from '@/server/applications/actions';
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
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { findAllPrograms } from '@/server/programs/actions';
import { programs } from '@/db/schema';
import { PlusIcon } from 'lucide-react';

type Program = typeof programs.$inferSelect;

type Props = {
  studentId: number;
  application: Awaited<ReturnType<typeof getApplicationByStudentId>>;
};

export default function ProgramsForm({ studentId, application }: Props) {
  return (
    <div>
      <Button variant='outline' className='flex flex-col p-24'>
        <PlusIcon />
        <span>First Choice</span>
      </Button>
    </div>
  );
}
