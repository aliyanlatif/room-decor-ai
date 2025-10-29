"use client";

import { ForwardedRef, forwardRef } from "react";
import { InputType } from "@/types";
import PhotoUpload from "@/components/ui/PhotoUpload";
import VoiceRecorder from "@/components/ui/VoiceRecorder";
import TextInput from "@/components/ui/TextInput";
import InputTypeSelector from "./InputTypeSelector";

interface InputSectionProps {
  selectedInput: InputType;
  onSelectInput: (type: InputType) => void;
  isLoading: boolean;
  error: string | null;
  onAnalyze: () => void;
  onFileChange?: (file: File | null) => void;
}

const InputSection = forwardRef(
  (
    {
      selectedInput,
      onSelectInput,
      isLoading,
      error,
      onAnalyze,
      onFileChange,
    }: InputSectionProps,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    return (
      <section
        ref={ref}
        className="min-h-screen flex items-center justify-center px-5"
      >
        <div className="container mx-auto max-w-7xl">
          <div className="mb-8">
            <div className="max-w-3xl mx-auto space-y-6">
              <InputTypeSelector
                selectedInput={selectedInput}
                onSelectInput={onSelectInput}
              />

              <div>
                <div className="bg-white/95 backdrop-blur-md rounded-xl shadow-2xl p-6 md:p-8 border border-gray-200 overflow-hidden">
                  <div key={selectedInput} className="animate-fadeIn">
                    {selectedInput === "photo" && <PhotoUpload onFileChange={onFileChange} />}
                    {selectedInput === "voice" && <VoiceRecorder />}
                    {selectedInput === "text" && <TextInput />}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <button
              onClick={onAnalyze}
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
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Analyzing...
                </span>
              ) : (
                "Analyze"
              )}
            </button>

            {error && (
              <div className="mt-4 p-4 bg-red-50/95 backdrop-blur-md rounded-lg border border-red-200 max-w-2xl mx-auto">
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

export default InputSection;
