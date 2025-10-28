/**
 * Hero Section Component
 */

"use client";

import React from "react";
import { Button } from "@/app/components/ui/Button";

interface HeroSectionProps {
  onStartClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onStartClick }) => {
  return (
    <section className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 drop-shadow-2xl">
          AI Room Decor
        </h1>
        <p className="text-xl md:text-2xl text-white mb-12 drop-shadow-lg">
          Transform your space with AI-powered design suggestions
        </p>
        <Button
          variant="primary"
          onClick={onStartClick}
          className="animate-pulse-light"
        >
          Start Now
        </Button>
      </div>
    </section>
  );
};
