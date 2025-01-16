'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import Link from 'next/link';
import { LogOut, User } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';

export default function AccountButton() {
  const { data: session } = useSession();
  const router = useRouter();

  async function handleLogout() {
    await signOut();
    router.push('/');
  }

  if (!session) {
    return (
      <Button variant='outline' asChild>
        <Link href='/login'>Login</Link>
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className='size-8'>
          <AvatarImage
            className='size-8 object-cover'
            src={session?.user?.image ?? ''}
          />
          <AvatarFallback>
            {session?.user?.name?.[0].toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56'>
        <DropdownMenuLabel>{session?.user?.name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className='cursor-pointer'>
          <User className='mr-2 h-4 w-4' />
          <Link href='/profile'>My Profile</Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleLogout} className='cursor-pointer'>
          <LogOut className='mr-2 h-4 w-4' />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
