import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.kinetixautomations.online"),
  title: "kinetix | Enterprise AI & Workflow Automation",
  description:
    "Custom end-to-end AI automation engines, custom web systems, and automated booking & lead pipelines for scaling businesses.",
  keywords: [
    "AI automation agency Philippines",
    "workflow automation",
    "custom web systems",
    "booking system automation",
    "Kinetix Automations",
  ],
  alternates: {
    canonical: "https://www.kinetixautomations.online",
  },
  openGraph: {
    title: "kinetix | Enterprise AI & Workflow Automation",
    description:
      "Custom end-to-end AI automation engines and web systems built to eliminate manual bottlenecks.",
    url: "https://www.kinetixautomations.online",
    siteName: "Kinetix Automations",
    images: [
      {
        url: "/kinetix_glass_card.png",
        width: 1200,
        height: 630,
        alt: "Kinetix Automations",
      },
    ],
    locale: "en_PH",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "kinetix | Enterprise AI & Workflow Automation",
    description:
      "Custom end-to-end AI automation engines and web systems built to eliminate manual bottlenecks.",
    images: ["/kinetix_glass_card.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${montserrat.className} antialiased bg-slate-50 text-slate-900`}>
        {children}
      </body>
    </html>
  );
}