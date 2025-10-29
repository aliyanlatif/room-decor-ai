"use client";

import { useState } from "react";
import { LIMITS } from "@/constants";

export default function TextInput() {
  const [text, setText] = useState("");

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    if (newText.length <= LIMITS.TEXT_CHARACTER_LIMIT) {
      setText(newText);
    }
  };

  const handleClear = () => {
    setText("");
  };

  return (
    <div className="w-full">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">
        Text Description
      </h3>
      <div className="border-2 border-gray-400 rounded-lg p-6 space-y-4 bg-gray-50/50">
        <textarea
          value={text}
          onChange={handleTextChange}
          placeholder="Describe your room decor preferences... (e.g., 'I want a modern minimalist bedroom with neutral colors and plants')"
          className="w-full h-31 p-4 border-2 border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none bg-white text-gray-800 placeholder-gray-500"
        />
        <div className="flex justify-between items-center">
          <span
            className={`text-sm font-medium ${
              text.length >= LIMITS.TEXT_CHARACTER_LIMIT
                ? "text-red-600"
                : "text-gray-600"
            }`}
          >
            {text.length} / {LIMITS.TEXT_CHARACTER_LIMIT} characters
          </span>
          {text.length > 0 && (
            <button
              onClick={handleClear}
              className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors text-sm font-medium"
            >
              Clear
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
