/**
 * Reasoning Section Component - Displays AI reasoning with typewriter effect
 */

"use client";

import React, { forwardRef } from "react";
import { useTypewriter } from "@/app/hooks/useTypewriter";
import { REASONING_TEXT, ANIMATION_DURATION } from "@/app/constants";

interface ReasoningSectionProps {
  enabled: boolean;
}

export const ReasoningSection = forwardRef<HTMLElement, ReasoningSectionProps>(
  ({ enabled }, ref) => {
    const { displayedText, isComplete } = useTypewriter({
      text: REASONING_TEXT,
      speed: ANIMATION_DURATION.TYPEWRITER_SPEED,
      enabled,
      scrollTarget: ref as React.RefObject<HTMLElement>,
      scrollDelay: ANIMATION_DURATION.TYPEWRITER_SCROLL_DELAY,
      scrollDuration: ANIMATION_DURATION.SCROLL_FAST,
    });

    if (!enabled) return null;

    return (
      <section
        ref={ref}
        className="min-h-[400px] flex items-center justify-center py-12"
      >
        <div className="container mx-auto max-w-8xl px-12">
          <div className="bg-white/20 backdrop-blur-lg rounded-xl shadow-2xl p-8 md:p-10 border border-white/30">
            <h3 className="text-3xl font-bold mb-6 text-white drop-shadow-lg">
              AI Reasoning
            </h3>
            <p className="text-white text-lg leading-relaxed">
              {displayedText}
              {!isComplete && (
                <span className="inline-block w-0.5 h-5 animate-pulse"></span>
              )}
            </p>
          </div>
        </div>
      </section>
    );
  }
);

ReasoningSection.displayName = "ReasoningSection";
