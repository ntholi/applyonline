import { Metadata } from 'next';
import SubjectsForm from './subjects-form';

export const metadata: Metadata = {
  title: 'Academic Qualifications | Apply',
  description: 'Enter your academic qualifications',
};

export default function QualificationsPage() {
  return <SubjectsForm />;
}
