import type { Metadata } from "next";
import { Inter, Roboto_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import SplashCursor from "@/components/SplashCursor";
import Navigation from "@/components/Navigation";
import FilmGrain from "@/components/FilmGrain";
import Preloader from "@/components/Preloader";
import SmoothScroll from "@/components/SmoothScroll";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import WebGLTransitionOverlay from "@/components/WebGLTransitionOverlay";
import ServiceWorkerRegister from "@/components/ServiceWorkerRegister";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "AURA | Engineered for the Future",
  description: "Precision. Performance. Control. Explore the ultimate futuristic sci-fi mechanical keyboard.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${robotoMono.variable} ${spaceGrotesk.variable} antialiased`}
    >
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
      </head>
      <body className="min-h-screen flex flex-col font-sans bg-black">
        <ServiceWorkerRegister />
        <Preloader />
        <FilmGrain />
        <SplashCursor />
        <WebGLTransitionOverlay />
        <SmoothScroll>
          <Navigation />
          <div className="relative z-10 bg-black mb-[60vh] min-h-screen">
            <PageTransition>
              {children}
            </PageTransition>
          </div>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
