import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://lorena-20.vercel.app"),
  title: "Felices 20, Lorena — Un regalo especial",
  description: "Un regalo digital creado con todo el cariño del mundo para celebrar tus 20 años. Una experiencia única, solo para ti.",
  openGraph: {
    title: "Felices 20, Lorena — Un regalo especial",
    description: "Un regalo digital creado con todo el cariño del mundo para celebrar tus 20 años. Una experiencia única, solo para ti.",
    images: [
      {
        url: "/og-preview.jpg",
        width: 1200,
        height: 630,
        alt: "Felices 20 Años, Lorena",
      },
    ],
    type: "website",
    locale: "es_CO",
  },
  twitter: {
    card: "summary_large_image",
    title: "Felices 20, Lorena — Un regalo especial",
    description: "Un regalo digital creado con todo el cariño del mundo para celebrar tus 20 años.",
    images: ["/og-preview.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
