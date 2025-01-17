import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import React from 'react';
import Logo from './Logo';
import Link from 'next/link';
import AccountButton from './AccountButton';

export default function Navbar() {
  return (
    <header className='border-b'>
      <Container as='nav' className='flex items-center justify-between py-1.5'>
        <div className='flex items-center'>
          <div className='mr-6'>
            <Link href='/'>
              <Logo />
            </Link>
          </div>
          <div className='hidden md:flex'>
            <Button variant='ghost' asChild>
              <Link href='/'>Home</Link>
            </Button>
            <Button variant='ghost' asChild>
              <Link href='/apply'>Apply</Link>
            </Button>
            <Button variant='ghost' asChild>
              <Link href='/courses'>Courses</Link>
            </Button>
          </div>
        </div>
        <AccountButton />
      </Container>
    </header>
  );
}
