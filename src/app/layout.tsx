import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import siteData from "@/data/site.json";

export const metadata: Metadata = {
  title: {
    default: siteData.title,
    template: `%s | ${siteData.name}`,
  },
  description: siteData.description,
  keywords: siteData.seo.keywords,
  openGraph: {
    title: siteData.title,
    description: siteData.description,
    url: siteData.url,
    siteName: siteData.name,
    images: [{ url: siteData.seo.ogImage, width: 1200, height: 630 }],
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-background text-text-primary">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
