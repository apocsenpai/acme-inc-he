import type { Metadata } from "next";
import { Barlow, Khand } from "next/font/google";

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["700", "400", "100"],
  variable: "--font-barlow",
});
const khand = Khand({
  subsets: ["latin"],
  weight: "700",
  variable: "--font-khand",
});

export const metadata: Metadata = {
  title: "Acme Inc. | A melhor solução ao seu alcance",
  description: "Acme Inc. - Inovação a qualquer custo",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${(barlow.variable, khand.variable)} font-sans`}>
        {children}
      </body>
    </html>
  );
}
