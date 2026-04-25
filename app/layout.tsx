import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { ThemeProvider } from '@aquascape-studio/ui/theme';
import './globals.css';

export const metadata: Metadata = {
  title: 'Aquascape Studio',
  description:
    'Design, simulate, and share planted-aquarium scapes. Quiet, dense, mostly dark greens.',
  themeColor: '#0A1F18',
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-background text-foreground min-h-screen antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
