import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "20 Años de Magia — Para Lorena",
  description: "Una experiencia interactiva creada con dedicado cariño para celebrar los 20 años de alguien verdaderamente especial.",
  openGraph: {
    title: "20 Años de Magia — Para Lorena",
    description: "Una constelación de luz creada especialmente para celebrar 20 años alrededor del Sol.",
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
