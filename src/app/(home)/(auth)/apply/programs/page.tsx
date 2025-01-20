import React from 'react';
import { auth } from '@/auth';
import { getStudentByUserId } from '@/server/students/actions';
import { redirect } from 'next/navigation';
import ProgramsForm from './ProgramsForm';

export default async function ProgramsPage() {
  const session = await auth();
  const student = await getStudentByUserId(session?.user?.id);

  if (!student) {
    return redirect('/apply/student-details');
  }

  return <ProgramsForm studentId={student.id} />;
}
