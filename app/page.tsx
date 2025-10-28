/**
 * Home Page - Room Decor AI
 * Main landing page with input selection, analysis, and suggestions
 */

"use client";

import { useState, useRef, useEffect } from "react";
import { InputType } from "@/app/types";
import { smoothScrollTo } from "@/app/lib/utils";
import { useRoomAnalysis } from "@/app/hooks/useRoomAnalysis";
import { DUMMY_SUGGESTIONS, ANIMATION_DURATION } from "@/app/constants";

// Layout Components
import { Header } from "@/app/components/layout/Header";
import { Footer } from "@/app/components/layout/Footer";

// Feature Components
import { HeroSection } from "@/app/components/features/HeroSection";
import { InputSection } from "@/app/components/features/InputSection";
import { ResultsSection } from "@/app/components/features/ResultsSection";
import { SuggestionsSection } from "@/app/components/features/SuggestionsSection";
import { ReasoningSection } from "@/app/components/features/ReasoningSection";

export default function Home() {
  // State
  const [selectedInput, setSelectedInput] = useState<InputType>("photo");

  // Custom hook for analysis management
  const {
    analysisResult,
    isLoading,
    error,
    showSuggestions,
    isLoadingSuggestions,
    showReasoning,
    handleAnalyze,
    setShowSuggestions,
    setIsLoadingSuggestions,
    setShowReasoning,
  } = useRoomAnalysis();

  // Refs for scrolling
  const inputSectionRef = useRef<HTMLElement>(null);
  const resultsSectionRef = useRef<HTMLElement>(null);
  const suggestionsLoaderRef = useRef<HTMLElement>(null);
  const reasoningRef = useRef<HTMLElement>(null);

  // Scroll handlers
  const scrollToInputSection = () => {
    smoothScrollTo(inputSectionRef.current, ANIMATION_DURATION.SCROLL);
  };

  const scrollToResults = () => {
    smoothScrollTo(resultsSectionRef.current, ANIMATION_DURATION.SCROLL);
  };

  // Handle analysis submission
  const handleSubmit = async () => {
    await handleAnalyze(selectedInput);

    // Scroll to results after getting the response
    setTimeout(() => {
      scrollToResults();
    }, ANIMATION_DURATION.RESULTS_DELAY);

    // Show suggestions loader after delay
    setTimeout(() => {
      setIsLoadingSuggestions(true);
      // Scroll to loader section
      setTimeout(() => {
        smoothScrollTo(
          suggestionsLoaderRef.current,
          ANIMATION_DURATION.SCROLL_FAST
        );
      }, 100);
      // Show suggestions after delay
      setTimeout(() => {
        setIsLoadingSuggestions(false);
        setShowSuggestions(true);
      }, ANIMATION_DURATION.SUGGESTIONS_DISPLAY_DELAY);
    }, ANIMATION_DURATION.SUGGESTIONS_LOADER_DELAY);

    // Show reasoning section after suggestions are displayed
    setTimeout(() => {
      setShowReasoning(true);
    }, ANIMATION_DURATION.REASONING_DELAY);
  };

  return (
    <div className="min-h-screen relative">
      {/* Background Image */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat -z-20"
        style={{
          backgroundImage: "url('/background.jpeg')",
        }}
      />

      {/* Semi-transparent overlay */}
      <div className="fixed inset-0 bg-black/40 backdrop-blur-[2px] -z-10" />

      {/* Content */}
      <div className="relative z-0">
        {/* Header Navigation */}
        <Header />

        {/* Hero Section */}
        <HeroSection onStartClick={scrollToInputSection} />

        {/* Input Section */}
        <InputSection
          ref={inputSectionRef}
          selectedInput={selectedInput}
          onInputTypeChange={setSelectedInput}
          onSubmit={handleSubmit}
          isLoading={isLoading}
          error={error}
        />

        {/* Results Section */}
        {analysisResult && (
          <ResultsSection
            ref={resultsSectionRef}
            analysisResult={analysisResult}
          />
        )}

        {/* Suggestions Section with Loader */}
        {analysisResult && (isLoadingSuggestions || showSuggestions) && (
          <SuggestionsSection
            ref={suggestionsLoaderRef}
            suggestions={DUMMY_SUGGESTIONS}
            isLoading={isLoadingSuggestions}
          />
        )}

        {/* Reasoning Section with Typewriter Effect */}
        {analysisResult && (
          <ReasoningSection ref={reasoningRef} enabled={showReasoning} />
        )}

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}
