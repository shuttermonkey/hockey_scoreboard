import type {Metadata} from 'next';
import { Geist, Orbitron } from 'next/font/google'; // Import Orbitron instead of VT323
import './globals.css';
import { Toaster } from "@/components/ui/toaster"; // Import Toaster

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const orbitron = Orbitron({ // Configure Orbitron
  weight: ['700'], // Use a bolder weight for a clearer digital look
  subsets: ['latin'],
  variable: '--font-orbitron', // CSS variable for Orbitron
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
      <body className={`${geistSans.variable} ${orbitron.variable} antialiased bg-background text-foreground`}> {/* Add orbitron.variable */}
        {children}
        <Toaster /> {/* Add Toaster for notifications */}
      </body>
    </html>
  );
}
