/**
 * Input Section Component - Handles user input selection and submission
 */

"use client";

import React, { forwardRef } from "react";
import { InputType } from "@/app/types";
import { Button } from "@/app/components/ui/Button";
import PhotoUpload from "@/app/components/PhotoUpload";
import VoiceRecorder from "@/app/components/VoiceRecorder";
import TextInput from "@/app/components/TextInput";

interface InputSectionProps {
  selectedInput: InputType;
  onInputTypeChange: (type: InputType) => void;
  onSubmit: () => void;
  isLoading: boolean;
  error: string | null;
}

export const InputSection = forwardRef<HTMLElement, InputSectionProps>(
  ({ selectedInput, onInputTypeChange, onSubmit, isLoading, error }, ref) => {
    const inputTypes: Array<{ type: InputType; icon: string; label: string }> =
      [
        { type: "photo", icon: "📸", label: "Photo" },
        { type: "voice", icon: "🎤", label: "Voice" },
        { type: "text", icon: "✏️", label: "Text" },
      ];

    return (
      <section
        ref={ref}
        className="min-h-screen flex items-center justify-center px-4 py-16"
      >
        <div className="container mx-auto max-w-7xl">
          {/* Input Method Selection */}
          <div className="mb-8">
            <div className="max-w-3xl mx-auto space-y-6">
              {/* Input Type Buttons */}
              <div className="flex gap-3 justify-center">
                {inputTypes.map(({ type, icon, label }) => (
                  <button
                    key={type}
                    onClick={() => onInputTypeChange(type)}
                    className={`flex items-center justify-center px-18 py-4 backdrop-blur-sm rounded-full shadow-md border-2 transition-all duration-300 ${
                      selectedInput === type
                        ? "bg-white/90 border-transparent text-gray-700"
                        : "bg-transparent border-white text-white hover:bg-white/90 hover:border-transparent hover:text-gray-700"
                    }`}
                  >
                    <span className="font-medium text-base">
                      {icon} {label}
                    </span>
                  </button>
                ))}
              </div>

              {/* Input Component */}
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
            <Button
              variant="primary"
              onClick={onSubmit}
              disabled={isLoading}
              loading={isLoading}
              className="px-12 py-4 text-lg"
            >
              {!isLoading && "Analyze"}
            </Button>

            {/* Error Message */}
            {error && (
              <div className="mt-6 max-w-md mx-auto bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg">
                <p className="text-red-800">{error}</p>
              </div>
            )}
          </div>
        </div>
      </section>
    );
  }
);

InputSection.displayName = "InputSection";
