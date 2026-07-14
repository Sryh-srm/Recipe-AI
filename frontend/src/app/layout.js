import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Recipe AI — AI-Powered Semantic Recipe Search",
  description:
    "Discover the perfect recipe with Recipe AI. Use AI-powered semantic search, an intelligent recipe assistant, and personalized recommendations to find meals you'll love.",
  keywords: ["recipe AI", "semantic search", "AI recipes", "cooking assistant", "meal finder"],
  openGraph: {
    title: "Recipe AI — AI-Powered Semantic Recipe Search",
    description: "Find recipes using AI-powered semantic search.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col relative">{children}</body>
    </html>
  );
}
