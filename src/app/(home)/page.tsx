import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  return (
    <main className='flex flex-col items-center px-4'>
      <div className='mt-32 flex w-full flex-col items-center gap-10 text-center sm:w-1/2'>
        <h1 className='rounded border border-foreground/10 bg-foreground/5 p-2.5 text-xs sm:text-sm'>
          Apply to Study at Limkokwing University Lesotho
        </h1>
        <p className='text-5xl font-bold uppercase sm:text-7xl md:text-8xl'>
          Be The Most Successful
        </p>
        <Button className='w-48 rounded-full sm:mt-8' asChild>
          <Link href='/apply'>Apply Now</Link>
        </Button>
      </div>
    </main>
  );
}
