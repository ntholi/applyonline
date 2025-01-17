'use server';

import { signIn } from '@/auth';

export async function facebookLogin() {
  await signIn('facebook', { redirectTo: '/apply' });
}

export async function googleLogin() {
  await signIn('google', { redirectTo: '/apply' });
}
