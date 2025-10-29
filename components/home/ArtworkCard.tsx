"use client";

import { useState } from "react";
import { ArtworkSuggestionResponse } from "@/types";

interface ArtworkCardProps {
  artwork: ArtworkSuggestionResponse;
  index: number;
}

export default function ArtworkCard({ artwork, index }: ArtworkCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Estimate if text needs truncation (4-5 lines at text-sm with leading-relaxed)
  // Roughly 50-60 characters per line, so 200-250 chars = 4-5 lines
  const shouldTruncate = artwork.answer.length > 220;

  return (
    <div
      className="group bg-white rounded-2xl overflow-hidden shadow-lg transform transition-all duration-500 hover:scale-105 hover:shadow-2xl animate-fadeInUp flex flex-col h-full"
      style={{
        animationDelay: `${index * 100}ms`,
      }}
    >
      <a
        href={artwork.image_url}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        <div
          className="relative h-80 bg-cover bg-center"
          style={{
            backgroundImage: `url(${artwork.image_url})`,
          }}
        />
      </a>

      {/* Title section with fixed height */}
      <div className="px-4 py-3 bg-white border-b border-gray-200 min-h-[80px] max-h-[80px] flex items-center">
        <h4 className="text-gray-800 font-semibold text-lg line-clamp-3">
          {artwork.title}
        </h4>
      </div>

      {/* Reasoning section with fixed height and see more/less */}
      <div className="p-4 bg-white flex-1 flex flex-col min-h-[100px]">
        <div 
          className={`text-gray-700 text-sm leading-relaxed ${
            shouldTruncate && !isExpanded ? 'line-clamp-5' : ''
          }`}
        >
          {artwork.answer}
        </div>
        {shouldTruncate && (
          <button
            onClick={(e) => {
              e.preventDefault();
              setIsExpanded(!isExpanded);
            }}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium mt-2 self-start transition-colors"
          >
            {isExpanded ? "See less" : "See more"}
          </button>
        )}
      </div>
    </div>
  );
}
