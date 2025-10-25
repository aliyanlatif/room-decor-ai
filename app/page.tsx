"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import PhotoUpload from "./components/PhotoUpload";
import VoiceRecorder from "./components/VoiceRecorder";
import TextInput from "./components/TextInput";

type InputType = "photo" | "voice" | "text";

interface AnalysisResponse {
  id: number;
  url: string;
  analysis: {
    wall_colors: string[];
    brightness: number;
    style_tags: string[];
  };
}

export default function Home() {
  const [selectedInput, setSelectedInput] = useState<InputType>("photo");
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResponse | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);

  const inputSectionRef = useRef<HTMLDivElement>(null);
  const resultsSectionRef = useRef<HTMLDivElement>(null);

  const smoothScrollTo = (
    element: HTMLElement | null,
    duration: number = 1500
  ) => {
    if (!element) return;

    const targetPosition =
      element.getBoundingClientRect().top + window.pageYOffset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime: number | null = null;

    const animation = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);

      // Easing function for smooth animation
      const easeInOutCubic =
        progress < 0.5
          ? 4 * progress * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 3) / 2;

      window.scrollTo(0, startPosition + distance * easeInOutCubic);

      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    };

    requestAnimationFrame(animation);
  };

  const scrollToInputSection = () => {
    smoothScrollTo(inputSectionRef.current, 1200);
  };

  const scrollToResults = () => {
    smoothScrollTo(resultsSectionRef.current, 1200);
  };

  const handleGenerateIdeas = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/room/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputType: selectedInput,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to analyze room");
      }

      const data: AnalysisResponse = await response.json();
      setAnalysisResult(data);
      console.log("Analysis result:", data);

      // Scroll to results after getting the response
      setTimeout(() => {
        scrollToResults();
      }, 300);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      console.error("Error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative">
      {/* Background Image */}
      <div
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/background.jpeg')",
        }}
      ></div>

      {/* Semi-transparent Overlay */}
      <div className="fixed inset-0 z-10 bg-black/60 dark:bg-black/70"></div>

      {/* Content */}
      <div className="relative z-20">
        {/* Header */}
        <header className="container mx-auto px-4 py-6 pt-8 max-w-7xl">
          <nav className="flex justify-between items-center">
            <Link
              href="/"
              className="text-2xl font-bold text-white hover:text-gray-200 transition-colors"
            >
              AI Room Decor
            </Link>
            <div className="flex gap-8 items-center">
              <Link
                href="/"
                className="text-white hover:text-gray-200 transition-colors font-medium"
              >
                Home
              </Link>
              <Link
                href="/about"
                className="text-white hover:text-gray-200 transition-colors font-medium"
              >
                About
              </Link>
              <Link
                href="/contact"
                className="text-white hover:text-gray-200 transition-colors font-medium"
              >
                Contact
              </Link>
            </div>
          </nav>
        </header>

        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-4">
          <div className="text-center max-w-4xl">
            <h1 className="text-6xl md:text-7xl font-bold mb-6 text-white drop-shadow-2xl">
              AI Room Decor
            </h1>
            <p className="text-xl md:text-2xl text-gray-100 mb-12 drop-shadow-lg max-w-3xl mx-auto">
              Transform and elevate your space with AI-powered designs.
            </p>
            <button
              onClick={scrollToInputSection}
              className="px-12 py-4 bg-white/90 text-gray-800 rounded-full font-medium text-lg shadow-lg transition-all duration-300 border-2 border-transparent hover:bg-transparent hover:text-white hover:border-white backdrop-blur-sm "
            >
              Start Now
            </button>
          </div>
        </section>

        {/* Input Section */}
        <section
          ref={inputSectionRef}
          className="min-h-screen flex items-center justify-center px-4 py-16"
        >
          <div className="container mx-auto max-w-7xl">
            {/* Input Method Selection & Input Component */}
            <div className="mb-8">
              <div className="max-w-3xl mx-auto space-y-6">
                {/* Horizontal Buttons on Top */}
                <div className="flex gap-3 justify-center">
                  <button
                    onClick={() => setSelectedInput("photo")}
                    className={`flex items-center justify-center px-18 py-4 backdrop-blur-sm rounded-full shadow-md border-2 transition-all duration-300 ${
                      selectedInput === "photo"
                        ? "bg-white/90 border-transparent text-gray-700"
                        : "bg-transparent border-white text-white hover:bg-white/90 hover:border-transparent hover:text-gray-700"
                    }`}
                  >
                    <span className="font-medium text-base">📸 Photo</span>
                  </button>
                  <button
                    onClick={() => setSelectedInput("voice")}
                    className={`flex items-center justify-center px-18 py-4 backdrop-blur-sm rounded-full shadow-md border-2 transition-all duration-300 ${
                      selectedInput === "voice"
                        ? "bg-white/90 border-transparent text-gray-700"
                        : "bg-transparent border-white text-white hover:bg-white/90 hover:border-transparent hover:text-gray-700"
                    }`}
                  >
                    <span className="font-medium text-base">🎤 Voice</span>
                  </button>
                  <button
                    onClick={() => setSelectedInput("text")}
                    className={`flex items-center justify-center px-18 py-4 backdrop-blur-sm rounded-full shadow-md border-2 transition-all duration-300 ${
                      selectedInput === "text"
                        ? "bg-white/90 border-transparent text-gray-700"
                        : "bg-transparent border-white text-white hover:bg-white/90 hover:border-transparent hover:text-gray-700"
                    }`}
                  >
                    <span className="font-medium text-base">✏️ Text</span>
                  </button>
                </div>

                {/* Input Component Below */}
                <div>
                  <div className="bg-white/95 backdrop-blur-md rounded-xl shadow-2xl p-6 md:p-8 border border-gray-200 overflow-hidden">
                    <div key={selectedInput} className="animate-fadeIn">
                      {selectedInput === "photo" && <PhotoUpload />}
                      {selectedInput === "voice" && <VoiceRecorder />}
                      {selectedInput === "text" && <TextInput />}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-12 text-center">
              <button
                onClick={handleGenerateIdeas}
                disabled={isLoading}
                className="px-12 py-4 bg-white/90 border-2 border-transparent text-gray-800 rounded-full font-medium text-lg shadow-lg transition-all duration-300 hover:bg-transparent hover:text-white hover:border-white backdrop-blur-sm disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white/90 disabled:hover:text-gray-800 disabled:hover:border-transparent"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg
                      className="animate-spin h-5 w-5 text-gray-800"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Analyzing...
                  </span>
                ) : (
                  "Analyze"
                )}
              </button>

              {/* Error Message */}
              {error && (
                <div className="mt-4 p-4 bg-red-50/95 backdrop-blur-md rounded-lg border border-red-200 max-w-2xl mx-auto">
                  <p className="text-red-800">{error}</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Results Section */}
        {analysisResult && (
          <section
            ref={resultsSectionRef}
            className="min-h-screen flex items-center justify-center px-4 py-16"
          >
            <div className="container mx-auto max-w-7xl">
              <div className="max-w-5xl mx-auto">
                <div className="bg-white/20 backdrop-blur-lg rounded-xl shadow-2xl p-6 md:p-8 border border-white/30">
                  <h3 className="text-3xl font-bold mb-8 text-white drop-shadow-lg">
                    Analysis Results
                  </h3>

                  <div className="space-y-6">
                    {/* Wall Colors and Detected Styles Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Wall Colors */}
                      <div
                        className="rounded-xl p-6 shadow-lg"
                        style={{
                          backgroundImage:
                            "linear-gradient(89.2deg, rgba(255,255,255,1) -1.3%, rgba(253,109,38,1) 281.6%)",
                        }}
                      >
                        <h4 className="text-lg font-semibold mb-4 text-gray-800">
                          Wall Colors
                        </h4>
                        <div className="flex flex-wrap gap-3">
                          {analysisResult.analysis.wall_colors.map(
                            (color, index) => (
                              <div
                                key={index}
                                className="flex items-center gap-2"
                              >
                                <div
                                  className="w-10 h-10 rounded-lg border-2 border-white shadow-md"
                                  style={{ backgroundColor: color }}
                                ></div>
                                <span className="text-xs text-gray-800 font-mono font-medium">
                                  {color}
                                </span>
                              </div>
                            )
                          )}
                        </div>
                      </div>

                      {/* Style Tags */}
                      <div
                        className="rounded-xl p-6 shadow-lg"
                        style={{
                          backgroundImage:
                            "linear-gradient(89.2deg, rgba(255,255,255,1) -1.3%, rgba(253,109,38,1) 281.6%)",
                        }}
                      >
                        <h4 className="text-lg font-semibold mb-4 text-gray-800">
                          Detected Styles
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {analysisResult.analysis.style_tags.map(
                            (tag, index) => (
                              <span
                                key={index}
                                className="px-4 py-2 bg-white/80 text-gray-800 rounded-full text-sm font-medium shadow-sm"
                              >
                                {tag}
                              </span>
                            )
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Brightness Section */}
                    <div
                      className="rounded-xl p-6 shadow-lg"
                      style={{
                        backgroundImage:
                          "linear-gradient(89.2deg, rgba(255,255,255,1) -1.3%, rgba(253,109,38,1) 281.6%)",
                      }}
                    >
                      <h4 className="text-lg font-semibold mb-4 text-gray-800">
                        Brightness Level
                      </h4>
                      <div className="flex items-center gap-4">
                        <div className="flex-1 bg-white/50 rounded-full h-5 shadow-inner">
                          <div
                            className="bg-gradient-to-r from-yellow-400 to-orange-500 h-5 rounded-full transition-all shadow-md"
                            style={{
                              width: `${analysisResult.analysis.brightness}%`,
                            }}
                          ></div>
                        </div>
                        <span className="text-gray-800 font-bold text-lg min-w-[60px]">
                          {analysisResult.analysis.brightness.toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Footer */}
        <div className="py-8 text-center text-gray-200 text-sm drop-shadow-md">
          <p>Powered by AI • Designed for your dream space</p>
        </div>
      </div>
    </div>
  );
}
