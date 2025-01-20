import { ThemeProvider } from '@/components/theme/provider';
import { PropsWithChildren } from 'react';
import Navbar from './base/Navbar';
import { Toaster } from '@/components/ui/toaster';
import { Gradient } from '@/components/ui/gradient';

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <ThemeProvider
      attribute='class'
      defaultTheme='dark'
      enableSystem
      disableTransitionOnChange
    >
      <Navbar />
      <Gradient className='min-h-[calc(100vh-4rem)]'>{children}</Gradient>
      <Toaster />
    </ThemeProvider>
  );
}
