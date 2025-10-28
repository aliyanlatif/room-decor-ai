/**
 * Custom hook for typewriter effect
 */

import { useState, useEffect, useRef } from "react";
import { smoothScrollTo } from "@/app/lib/utils";

interface UseTypewriterOptions {
  text: string;
  speed?: number;
  enabled: boolean;
  scrollTarget?: React.RefObject<HTMLElement>;
  scrollDelay?: number;
  scrollDuration?: number;
}

interface UseTypewriterReturn {
  displayedText: string;
  isComplete: boolean;
}

/**
 * Hook for creating typewriter effect
 * @param options - Configuration options
 * @returns Displayed text and completion status
 */
export const useTypewriter = ({
  text,
  speed = 30,
  enabled,
  scrollTarget,
  scrollDelay = 300,
  scrollDuration = 1000,
}: UseTypewriterOptions): UseTypewriterReturn => {
  const [displayedText, setDisplayedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (enabled) {
      setDisplayedText("");
      setIsComplete(false);
      let currentIndex = 0;

      // Scroll to target element if provided
      if (scrollTarget?.current) {
        setTimeout(() => {
          smoothScrollTo(scrollTarget.current, scrollDuration);
        }, scrollDelay);
      }

      // Typewriter animation
      const typewriterInterval = setInterval(() => {
        if (currentIndex < text.length) {
          setDisplayedText(text.substring(0, currentIndex + 1));
          currentIndex++;
        } else {
          setIsComplete(true);
          clearInterval(typewriterInterval);
        }
      }, speed);

      return () => clearInterval(typewriterInterval);
    }
  }, [enabled, text, speed, scrollTarget, scrollDelay, scrollDuration]);

  return { displayedText, isComplete };
};

