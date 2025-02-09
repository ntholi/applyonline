'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { FcGoogle } from 'react-icons/fc';
import { googleLogin } from './actions';

export default function LoginForm() {
  return (
    <Card className='w-full max-w-md p-6'>
      <CardHeader className='space-y-1'>
        <CardTitle className='text-center text-3xl'>Login</CardTitle>
        <CardDescription className='text-center'>
          Sign in to access your account
        </CardDescription>
      </CardHeader>
      <CardContent className='space-y-4'>
        <Button
          onClick={googleLogin}
          className='flex w-full items-center justify-center space-x-2'
        >
          <FcGoogle className='size-5' />
          <span>Continue with Google</span>
        </Button>
      </CardContent>
      <CardFooter className='flex flex-col space-y-2'>
        <div className='text-center text-sm'>
          Your application progress will be associated with this account.
        </div>
      </CardFooter>
    </Card>
  );
}
