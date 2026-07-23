import type { Metadata } from "next";
import { Inter_Tight, Space_Grotesk, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { Navbar, Footer } from "@/components/Navigation";
import { ThemeProvider } from "@/components/theme-provider";
import { BackgroundDots } from "@/components/BackgroundDots";

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter-tight",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

const ibmPlexMono = IBM_Plex_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Aaron Shyjan | Portfolio",
  description: "Systems development, machine learning frameworks, and technical infrastructure.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${interTight.variable} ${spaceGrotesk.variable} ${ibmPlexMono.variable} font-sans antialiased bg-background text-foreground min-h-screen flex flex-col`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <BackgroundDots />
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
