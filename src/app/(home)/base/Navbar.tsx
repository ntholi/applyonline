import { Container } from '@/components/ui/container';
import React from 'react';
import Logo from './Logo';

export default function Navbar() {
  return (
    <Container as='nav' className='flex items-center justify-between'>
      <Logo />
    </Container>
  );
}
