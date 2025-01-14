import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Apply Limkokwing',
  description:
    'Limkokwing University of Creative Technology Online Application',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body>{children}</body>
    </html>
  );
}
