/**
 * API service functions
 */

import { AnalysisResponse, ContactFormData, InputType } from "@/app/types";
import { API_ENDPOINTS } from "@/app/constants";

/**
 * Analyze room based on input type
 * @param inputType - Type of input (photo, voice, text)
 * @returns Analysis response
 */
export const analyzeRoom = async (
  inputType: InputType
): Promise<AnalysisResponse> => {
  const response = await fetch(API_ENDPOINTS.ANALYZE_ROOM, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ inputType }),
  });

  if (!response.ok) {
    throw new Error("Failed to analyze room");
  }

  return response.json();
};

/**
 * Analyze text using Python API
 * @param text - Text to analyze
 * @returns Analysis result
 */
export const analyzeText = async (text: string): Promise<any> => {
  const response = await fetch(API_ENDPOINTS.ANALYZE_TEXT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });

  if (!response.ok) {
    throw new Error("Failed to analyze text");
  }

  return response.json();
};

/**
 * Send contact form
 * @param formData - Contact form data
 */
export const sendContactForm = async (
  formData: ContactFormData
): Promise<void> => {
  const response = await fetch(API_ENDPOINTS.CONTACT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    throw new Error("Failed to send message");
  }
};

