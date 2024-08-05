import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Analytics } from "@vercel/analytics/react"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SlashPixl - Add Watermark to Your Images and Videos Easily",
  description: "SlashPixl is your go-to online tool for adding watermarks to your images and videos. Protect your content with customized text, rotation, opacity, font, and color options. Upload, edit, and save your watermarked media effortlessly.",
  keywords: "watermark images, watermark videos, add watermark online, image watermark tool, video watermark tool, watermark generator, watermarking software, online watermark tool, customize watermark, protect content, watermark text options, SlashPixl"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <div>
          {children}
        </div>
        <Analytics />
        <Footer />
      </body>
    </html>
  );
}
