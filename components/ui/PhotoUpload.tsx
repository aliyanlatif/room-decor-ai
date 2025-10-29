"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { LIMITS } from "@/constants";

export default function PhotoUpload() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setFileName("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="w-full">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">
        Upload Room Photo
      </h3>
      <div className="border-2 border-dashed border-gray-400 rounded-lg p-6 text-center hover:border-gray-500 transition-colors bg-gray-50/50">
        {!selectedImage ? (
          <div className="space-y-4">
            <div className="flex justify-center">
              <svg
                className="w-16 h-16 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <div>
              <label
                htmlFor="photo-upload"
                className="cursor-pointer inline-flex items-center px-8 py-3 bg-transparent border-2 border-gray-700 text-gray-800 rounded-full transition-all duration-300 font-medium hover:bg-gray-800 hover:text-white hover:border-gray-800"
              >
                Choose Photo
              </label>
              <input
                ref={fileInputRef}
                id="photo-upload"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>
            <p className="text-sm text-gray-600">
              PNG, JPG, GIF up to {LIMITS.IMAGE_SIZE_MB}MB
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="relative w-full h-64 rounded-lg overflow-hidden">
              <Image
                src={selectedImage}
                alt="Selected room"
                fill
                className="object-contain"
              />
            </div>
            <p className="text-sm text-gray-700 truncate font-medium">
              {fileName}
            </p>
            <button
              onClick={handleRemoveImage}
              className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
            >
              Remove Photo
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
