import { auth } from '@/auth';
import { getQualificationByStudentId } from '@/server/qualifications/actions';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import QualificationForm from './QualificationForm';

export const metadata: Metadata = {
  title: 'Academic Qualifications | Apply',
  description: 'Enter your academic qualifications',
};

export default async function QualificationsPage() {
  const session = await auth();
  const qualification = await getQualificationByStudentId(
    session?.user?.studentId,
  );

  if (!session?.user?.studentId) {
    return redirect('/apply/student-details');
  }

  return (
    <QualificationForm
      studentId={session.user.studentId}
      qualification={qualification}
    />
  );
}
