import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL('https://careercatalyst.app'),
  title: {
    default: "CareerCatalyst | AI-Powered Career Assistant",
    template: "%s | CareerCatalyst"
  },
  description: "Transform your career with AI-powered tools. Optimize your resume, generate personalized cover letters, and practice interviews with our intelligent career assistant. Get hired faster with CareerCatalyst.",
  keywords: [
    "AI career assistant",
    "resume optimizer",
    "cover letter generator",
    "interview practice",
    "job search tools",
    "AI resume builder",
    "career development",
    "job application assistant",
    "professional resume",
    "interview preparation",
    "AI-powered recruitment",
    "career coaching"
  ],
  authors: [{ name: "CareerCatalyst Team" }],
  creator: "CareerCatalyst",
  publisher: "CareerCatalyst",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://careercatalyst.app",
    title: "CareerCatalyst | AI-Powered Career Assistant",
    description: "Transform your career with AI-powered tools. Optimize your resume, generate personalized cover letters, and practice interviews with our intelligent career assistant.",
    siteName: "CareerCatalyst",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "CareerCatalyst - AI Career Assistant",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CareerCatalyst | AI-Powered Career Assistant",
    description: "Transform your career with AI-powered tools. Optimize resumes, generate cover letters, and practice interviews.",
    images: ["/twitter-image.png"],
    creator: "@careercatalyst",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/icon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
  category: "career development",
  applicationName: "CareerCatalyst",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "CareerCatalyst",
  },
  alternates: {
    canonical: "https://careercatalyst.app",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={cn(inter.className, "min-h-screen bg-background antialiased")}>
        <ThemeProvider>
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
