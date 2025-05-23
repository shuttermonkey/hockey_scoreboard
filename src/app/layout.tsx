
import type {Metadata} from 'next';
import { Inter, Orbitron } from 'next/font/google'; // Re-import Inter and Orbitron
import './globals.css';
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ // Re-instantiate Inter
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

const orbitron = Orbitron({ // Re-instantiate Orbitron
  weight: '700',
  subsets: ['latin'],
  variable: '--font-orbitron',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Streamline Scoreboard',
  description: 'A real-time scoreboard for OBS streaming.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${orbitron.variable} antialiased bg-background text-foreground`}> {/* Apply font variables */}
        {children}
        <Toaster />
      </body>
    </html>
  );
}
