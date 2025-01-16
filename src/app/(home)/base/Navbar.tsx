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
            <Logo />
          </div>
          <div className='hidden md:flex'>
            <Link href='/' passHref>
              <Button variant='ghost'>Home</Button>
            </Link>
            <Link href='/apply' passHref>
              <Button variant='ghost'>Apply</Button>
            </Link>
            <Link href='/courses' passHref>
              <Button variant='ghost'>Courses</Button>
            </Link>
          </div>
        </div>
        <AccountButton />
      </Container>
    </header>
  );
}
