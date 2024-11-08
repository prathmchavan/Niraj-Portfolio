import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AllProviders } from "@/components";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://ajinkyaportfolio.vercel.app"),
  title: "Niraj",
  description:
    "I am Niraj Chavan and this is my portfolio.",
  applicationName: "Niraj",
  authors: [
    {
      url: "https://www.linkedin.com/in/niraj-chavan-nemo/",
      name: "Niraj",
    },
  ],
  creator: "Niraj",
  robots: {
    googleBot: {
      index: true,
      follow: true,
      noarchive: false,
      nosnippet: false,
      noimageindex: true,
      nocache: false,
      notranslate: true,
      indexifembedded: false,
      nositelinkssearchbox: true,
      unavailable_after: "2025-01-01",
      "max-video-preview": 120,
      "max-image-preview": "standard",
      "max-snippet": 150,
    },
  },
  icons: ["/logo/192x192.png", "/logo/384x384.png", "/logo/500x500.png"],
  keywords: [
    "Niraj",
    "full stack",
    "web developer",
    "devops",
    "node js",
    "next js",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AllProviders>{children}</AllProviders>
      </body>
    </html>
  );
}
