"use client";

import { useState, useRef } from "react";
import { InputType, AnalysisResponse } from "@/types";
import { ANIMATION } from "@/constants";
import { smoothScrollTo } from "@/lib/utils";
import { analyzeRoom } from "@/services/roomService";
import BackgroundLayout from "@/components/layout/BackgroundLayout";
import HeroSection from "@/components/home/HeroSection";
import InputSection from "@/components/home/InputSection";
import ResultsSection from "@/components/home/ResultsSection";
import LoadingSpinner from "@/components/home/LoadingSpinner";
import SuggestionsSection from "@/components/home/SuggestionsSection";

export default function Home() {
  const [selectedInput, setSelectedInput] = useState<InputType>("photo");
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResponse | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);

  const inputSectionRef = useRef<HTMLDivElement>(null);
  const resultsSectionRef = useRef<HTMLDivElement>(null);
  const suggestionsLoaderRef = useRef<HTMLDivElement>(null);

  const scrollToInputSection = () => {
    smoothScrollTo(inputSectionRef.current, ANIMATION.SCROLL_DURATION);
  };

  const scrollToResults = () => {
    smoothScrollTo(resultsSectionRef.current, ANIMATION.SCROLL_DURATION);
  };

  const handleGenerateIdeas = async () => {
    setIsLoading(true);
    setError(null);
    setShowSuggestions(false);
    setIsLoadingSuggestions(false);

    try {
      // Call the room analysis service
      const data = await analyzeRoom(selectedInput);

      setAnalysisResult(data);

      console.log("Analysis result:", data);

      // Scroll to results after getting the response
      setTimeout(() => {
        scrollToResults();
        smoothScrollTo(
          suggestionsLoaderRef.current,
          ANIMATION.SCROLL_DURATION_SHORT
        );
        setShowSuggestions(true);
      }, ANIMATION.SUGGESTIONS_DELAY);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      console.error("Error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <BackgroundLayout>
      <HeroSection onStartClick={scrollToInputSection} />

      <InputSection
        ref={inputSectionRef}
        selectedInput={selectedInput}
        onSelectInput={setSelectedInput}
        isLoading={isLoading}
        error={error}
        onAnalyze={handleGenerateIdeas}
      />

      {analysisResult && (
        <ResultsSection
          ref={resultsSectionRef}
          analysisResult={analysisResult}
        />
      )}

      {analysisResult && isLoadingSuggestions && (
        <LoadingSpinner ref={suggestionsLoaderRef} />
      )}

      {analysisResult && showSuggestions && (
        <SuggestionsSection analysisResult={analysisResult} />
      )}
    </BackgroundLayout>
  );
}
