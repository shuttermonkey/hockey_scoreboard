
import type {Metadata} from 'next';
// Removed Inter and Orbitron imports from next/font/google
import './globals.css';
import { Toaster } from "@/components/ui/toaster";

// Removed Inter and Orbitron instantiations

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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&family=Pixelify+Sans:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      {/* Removed font variables from body className */}
      <body className="antialiased bg-background text-foreground">
        {children}
        <Toaster />
      </body>
    </html>
  );
}

