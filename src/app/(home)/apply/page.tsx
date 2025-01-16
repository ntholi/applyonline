import { Metadata } from 'next';
import StudentApplicationForm from './student-form';
import { Container } from '@/components/ui/container';

export const metadata: Metadata = {
  title: 'Apply | Limkokwing University',
  description: 'Apply to study at Limkokwing University',
};

export default function ApplyPage() {
  return (
    <Container>
      <div className='my-8'>
        <h1 className='text-3xl font-bold tracking-tight'>Apply Now</h1>
        <p className='text-muted-foreground mt-2'>
          Fill in your details to start your application process
        </p>
      </div>
      <StudentApplicationForm />
    </Container>
  );
}
