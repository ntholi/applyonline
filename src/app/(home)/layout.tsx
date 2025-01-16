import { ThemeProvider } from '@/components/theme/provider';
import { PropsWithChildren } from 'react';
import Navbar from './base/Navbar';
import { Toaster } from '@/components/ui/toaster';

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <ThemeProvider
      attribute='class'
      defaultTheme='dark'
      enableSystem
      disableTransitionOnChange
    >
      <Navbar />
      {children}
      <Toaster />
    </ThemeProvider>
  );
}
