import type {Metadata} from 'next';
import { Geist, VT323 } from 'next/font/google'; // Import VT323, remove Geist_Mono
import './globals.css';
import { Toaster } from "@/components/ui/toaster"; // Import Toaster

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const vt323 = VT323({ // Configure VT323
  weight: ['400'], // VT323 typically only has a 400 weight
  subsets: ['latin'],
  variable: '--font-vt323', // CSS variable for VT323
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
      <body className={`${geistSans.variable} ${vt323.variable} antialiased bg-background text-foreground`}> {/* Add vt323.variable */}
        {children}
        <Toaster /> {/* Add Toaster for notifications */}
      </body>
    </html>
  );
}
