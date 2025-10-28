/**
 * Custom hook for managing room analysis state and flow
 */

import { useState } from "react";
import { AnalysisResponse, InputType } from "@/app/types";
import { analyzeRoom } from "@/app/lib/api";

interface UseRoomAnalysisReturn {
  analysisResult: AnalysisResponse | null;
  isLoading: boolean;
  error: string | null;
  showSuggestions: boolean;
  isLoadingSuggestions: boolean;
  showReasoning: boolean;
  handleAnalyze: (inputType: InputType) => Promise<void>;
  resetAnalysis: () => void;
  setShowSuggestions: (show: boolean) => void;
  setIsLoadingSuggestions: (loading: boolean) => void;
  setShowReasoning: (show: boolean) => void;
}

/**
 * Hook for managing room analysis workflow
 * @returns Analysis state and control functions
 */
export const useRoomAnalysis = (): UseRoomAnalysisReturn => {
  const [analysisResult, setAnalysisResult] = useState<AnalysisResponse | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
  const [showReasoning, setShowReasoning] = useState(false);

  const handleAnalyze = async (inputType: InputType) => {
    setIsLoading(true);
    setError(null);
    setShowSuggestions(false);
    setIsLoadingSuggestions(false);
    setShowReasoning(false);

    try {
      const data = await analyzeRoom(inputType);
      setAnalysisResult(data);
      console.log("Analysis result:", data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      console.error("Error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const resetAnalysis = () => {
    setAnalysisResult(null);
    setError(null);
    setShowSuggestions(false);
    setIsLoadingSuggestions(false);
    setShowReasoning(false);
  };

  return {
    analysisResult,
    isLoading,
    error,
    showSuggestions,
    isLoadingSuggestions,
    showReasoning,
    handleAnalyze,
    resetAnalysis,
    setShowSuggestions,
    setIsLoadingSuggestions,
    setShowReasoning,
  };
};

