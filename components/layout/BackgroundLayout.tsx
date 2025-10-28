import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";

interface BackgroundLayoutProps {
  children: ReactNode;
}

export default function BackgroundLayout({ children }: BackgroundLayoutProps) {
  return (
    <div className="min-h-screen relative">
      {/* Background Image */}
      <div
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/background.jpeg')",
        }}
      />

      {/* Semi-transparent Overlay */}
      <div className="fixed inset-0 z-10 bg-black/60 dark:bg-black/70" />

      {/* Content */}
      <div className="relative z-20">
        <Header />
        {children}
        <Footer />
      </div>
    </div>
  );
}
