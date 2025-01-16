import type { Metadata } from 'next';
import './globals.css';
import Providers from './providers';

export const metadata: Metadata = {
  title: 'Online Application | Limkokwing University Lesotho',
  description:
    'Apply online to Limkokwing University of Creative Technology Lesotho. Start your journey in creative education today.',
  keywords:
    'Limkokwing University, Lesotho, online application, university admission, creative technology, higher education',
  openGraph: {
    title: 'Apply to Limkokwing University Lesotho',
    description:
      'Begin your creative journey at Limkokwing University of Creative Technology Lesotho. Apply online today.',
    type: 'website',
    locale: 'en_LS',
    siteName: 'Limkokwing University Lesotho',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
