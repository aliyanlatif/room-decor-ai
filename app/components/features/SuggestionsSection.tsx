/**
 * Suggestions Section Component - Displays artwork suggestions
 */

"use client";

import React, { forwardRef } from "react";
import { SuggestionItem } from "@/app/types";
import { Loader } from "@/app/components/ui/Loader";

interface SuggestionsSectionProps {
  suggestions: SuggestionItem[];
  isLoading: boolean;
}

export const SuggestionsSection = forwardRef<
  HTMLElement,
  SuggestionsSectionProps
>(({ suggestions, isLoading }, ref) => {
  if (isLoading) {
    return (
      <section
        ref={ref}
        className="min-h-[300px] flex items-center justify-center py-16"
      >
        <Loader size="lg" message="Loading Artwork Suggestions..." />
      </section>
    );
  }

  return (
    <section className="min-h-screen flex items-start justify-center py-12">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="rounded-xl shadow-2xl p-6 md:p-8 ">
          <h3 className="text-3xl font-bold mb-8 text-white drop-shadow-lg">
            Suggested Artwork
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {suggestions.map((item, index) => (
              <a
                key={item.id}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group block bg-white rounded-2xl overflow-hidden shadow-lg transform transition-all duration-500 hover:scale-105 hover:shadow-2xl animate-fadeInUp"
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                <div
                  className="relative h-80 bg-cover bg-center rounded-2xl"
                  style={{
                    backgroundImage: `url(${item.image})`,
                  }}
                >
                  {/* Semi-transparent overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-black/30 backdrop-blur-sm p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="text-white font-semibold text-lg mb-1">
                          {item.name}
                        </h4>
                        <p className="text-gray-300 text-sm">{item.location}</p>
                      </div>
                      <div className="text-white font-bold text-lg ml-2">
                        {item.price}
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});

SuggestionsSection.displayName = "SuggestionsSection";
