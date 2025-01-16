import { SessionProvider } from 'next-auth/react';
import { PropsWithChildren } from 'react';

export default function AuthLayout({ children }: PropsWithChildren) {
  return <SessionProvider>{children}</SessionProvider>;
}
