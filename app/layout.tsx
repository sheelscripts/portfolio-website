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
  title: "Sheelendra — Full-Stack Engineer for Physical Systems",
  description:
    "Robotics, embedded firmware, and the full-stack software that runs them. Portfolio of Sheelendra — B.Tech Automation & Robotics, GGSIPU-USAR. DRDO intern, ACM Vice Chair, TEDx licensee.",
  metadataBase: new URL("https://sheelendra.dev"),
  openGraph: {
    title: "Sheelendra — Full-Stack Engineer for Physical Systems",
    description:
      "I ship robotics, embedded firmware, and the software that runs them.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sheelendra",
    description: "Full-stack engineer for physical systems.",
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
