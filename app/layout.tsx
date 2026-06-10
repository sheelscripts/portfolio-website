import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import { Bricolage_Grotesque, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import { themeBootstrapScript } from "@/lib/theme";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  display: "swap",
  weight: ["400"],
  style: ["normal", "italic"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "sheelendra | scripts",
  description:
    "Robotics, embedded firmware, and the full-stack software that runs them. Portfolio of Sheelendra — B.Tech Automation & Robotics, GGSIPU-USAR. DRDO intern, ACM Vice Chair, TEDx licensee.",
  metadataBase: new URL("https://sheelendra.dev"),
  keywords: [
    "Sheelendra",
    "Portfolio",
    "Full-Stack Engineer",
    "Robotics",
    "Embedded Systems",
    "Firmware",
    "Software Engineer",
    "React",
    "Next.js"
  ],
  authors: [{ name: "Sheelendra", url: "https://sheelendra.dev" }],
  creator: "Sheelendra",
  publisher: "Sheelendra",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  openGraph: {
    title: "sheelendra | scripts",
    description:
      "I ship robotics, embedded firmware, and the software that runs them.",
    url: "https://sheelendra.dev",
    siteName: "Sheelendra Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "sheelendra | scripts",
    description: "Full-stack engineer for physical systems.",
    creator: "@sheelscripts",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#050505" },
    { media: "(prefers-color-scheme: light)", color: "#F5F2EC" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geist.variable} ${bricolage.variable} ${instrumentSerif.variable} ${jetbrains.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootstrapScript }} />
      </head>
      <body className="grain min-h-screen bg-background text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
