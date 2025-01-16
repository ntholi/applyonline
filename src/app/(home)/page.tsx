import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  return (
    <main className='flex flex-col items-center px-4'>
      <div className='mt-32 w-full sm:w-1/2 text-center flex flex-col items-center gap-10'>
        <h1 className='border p-2.5 border-foreground/30 rounded text-xs sm:text-sm bg-foreground/5'>
          Apply to Study at Limkokwing University Lesotho
        </h1>
        <p className='text-5xl sm:text-7xl md:text-8xl font-bold uppercase'>
          Be The Most Successful
        </p>
        <Button className='sm:mt-8 w-48 rounded-full' asChild>
          <Link href='/apply'>Apply Now</Link>
        </Button>
      </div>
    </main>
  );
}
