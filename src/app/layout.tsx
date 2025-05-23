
import type {Metadata} from 'next';
import { Inter, Orbitron } from 'next/font/google'; // Import Inter instead of Geist_Sans
import './globals.css';
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ // Instantiate Inter
  variable: '--font-inter',
  subsets: ['latin'],
});

const orbitron = Orbitron({
  weight: ['400', '500', '600', '700', '800', '900'],
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
      <body className={`${inter.variable} ${orbitron.variable} antialiased bg-background text-foreground`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
