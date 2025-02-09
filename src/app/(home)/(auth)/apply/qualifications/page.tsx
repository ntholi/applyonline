import { auth } from '@/auth';
import { getQualificationByUserId } from '@/server/qualifications/actions';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import QualificationForm from './QualificationForm';

export const metadata: Metadata = {
  title: 'Academic Qualifications | Apply',
  description: 'Enter your academic qualifications',
};

export default async function QualificationsPage() {
  const session = await auth();
  const qualification = await getQualificationByUserId(session?.user?.id);

  if (!session?.user?.id) {
    return redirect('/login');
  }

  return (
    <QualificationForm userId={session.user.id} qualification={qualification} />
  );
}
