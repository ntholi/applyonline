import { auth } from '@/auth';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { createApplication } from '../actions';

export default async function ApplyPage() {
  const session = await auth();
  if (!session?.user) {
    return (
      <div className='flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center p-4'>
        <div className='space-y-4 text-center'>
          <h1 className='text-2xl font-semibold'>Access Restricted</h1>
          <p>Please sign in to access the application form.</p>
        </div>
      </div>
    );
  }

  return (
    <Container className='py-8'>
      <div className='mx-auto max-w-2xl space-y-6 text-center'>
        <div className='space-y-2'>
          <h1 className='text-3xl font-bold'>Apply Now</h1>
          <p className='text-muted-foreground'>
            Start your journey with Limkokwing University by creating a new
            application
          </p>
        </div>

        <form action={createApplication}>
          <Button type='submit' size='lg'>
            Create New Application
          </Button>
        </form>
      </div>
    </Container>
  );
}
