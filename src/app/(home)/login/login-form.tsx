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
import { BsFacebook } from 'react-icons/bs';
import { FcGoogle } from 'react-icons/fc';
import { facebookLogin, googleLogin } from './actions';

export default function LoginForm() {
  return (
    <Card className='w-full max-w-md p-6'>
      <CardHeader className='space-y-1'>
        <CardTitle className='text-3xl text-center'>Login</CardTitle>
        <CardDescription className='text-center'>
          Sign in to access your account
        </CardDescription>
      </CardHeader>
      <CardContent className='space-y-4'>
        <Button
          onClick={googleLogin}
          variant='outline'
          className='w-full flex items-center justify-center space-x-2'
        >
          <FcGoogle className='size-5' />
          <span>Continue with Google</span>
        </Button>
        <Button
          onClick={facebookLogin}
          className='w-full flex items-center justify-center space-x-2'
        >
          <BsFacebook className='size-5 text-[#1877F2]' />
          <span>Continue with Facebook</span>
        </Button>
      </CardContent>
      <CardFooter className='flex flex-col space-y-2'>
        <div className='text-sm text-center'>
          By continuing, you agree to our Terms of Service and Privacy Policy
        </div>
      </CardFooter>
    </Card>
  );
}
