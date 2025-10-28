/**
 * Results Section Component - Displays analysis results
 */

"use client";

import React, { forwardRef } from "react";
import { AnalysisResponse } from "@/app/types";
import { convertBrightnessToPercentage } from "@/app/lib/utils";

interface ResultsSectionProps {
  analysisResult: AnalysisResponse;
}

export const ResultsSection = forwardRef<HTMLElement, ResultsSectionProps>(
  ({ analysisResult }, ref) => {
    return (
      <section
        ref={ref}
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
                            className="w-10 h-10 rounded-lg border-2 border-white shadow-md"
                            style={{ backgroundColor: color }}
                          ></div>
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
                      {analysisResult.analysis.style_tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-4 py-2 bg-white/80 text-gray-800 rounded-full text-sm font-medium shadow-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Brightness */}
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
                    <div className="flex-1 bg-gray-200 rounded-full h-5 overflow-hidden shadow-inner">
                      <div
                        className="bg-gradient-to-r from-yellow-400 to-orange-500 h-5 rounded-full transition-all shadow-md"
                        style={{
                          width: `${convertBrightnessToPercentage(
                            analysisResult.analysis.brightness
                          )}%`,
                        }}
                      ></div>
                    </div>
                    <span className="text-gray-800 font-bold text-lg min-w-[60px]">
                      {convertBrightnessToPercentage(
                        analysisResult.analysis.brightness
                      ).toFixed(1)}
                      %
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
);

ResultsSection.displayName = "ResultsSection";
