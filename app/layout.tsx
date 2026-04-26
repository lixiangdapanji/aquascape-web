import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './globals.css';

export const metadata: Metadata = {
  title: 'Aquascape Studio',
  description:
    'Design, simulate, and share planted-aquarium scapes. Quiet, dense, mostly dark greens.',
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased" style={{ backgroundColor: '#0A1F18', color: '#EDE7D9' }}>
        {children}
      </body>
    </html>
  );
}
