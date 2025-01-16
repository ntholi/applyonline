'use client';

import { cn } from '@/lib/utils';
import { useColorScheme } from '@mantine/hooks';
import Image from 'next/image';

interface LogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  className?: string;
}

const sizesMap = {
  xs: { pixels: 40, tailwind: 'h-10 w-auto' },
  sm: { pixels: 60, tailwind: 'h-14 w-auto' },
  md: { pixels: 80, tailwind: 'h-20 w-auto' },
  lg: { pixels: 100, tailwind: 'h-24 w-auto' },
  xl: { pixels: 120, tailwind: 'h-28 w-auto' },
  '2xl': { pixels: 140, tailwind: 'h-32 w-auto' },
};

export default function Logo({ size = 'xs', className }: LogoProps) {
  const colorScheme = useColorScheme();
  const logoSrc =
    colorScheme === 'dark' ? '/images/logo-dark.png' : '/images/logo-light.png';

  const { pixels, tailwind } = sizesMap[size];

  return (
    <div className={cn(tailwind, className)}>
      <Image
        src={logoSrc}
        alt='Logo'
        width={pixels * 1.7}
        height={pixels * 1.7}
        className='w-full h-full'
        priority
      />
    </div>
  );
}
