import { auth } from '@/auth';
import { Metadata } from 'next';
import StudentApplicationForm from './student-form';

export const metadata: Metadata = {
  title: 'Personal Details | Apply',
  description: 'Enter your personal details to start your application',
};

export default async function PersonalDetailsPage() {
  const session = await auth();
  return <StudentApplicationForm userId={session?.user?.id ?? ''} />;
}
