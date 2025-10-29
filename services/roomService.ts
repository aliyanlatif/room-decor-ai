import { AnalysisResponse } from "@/types";
import { API_ENDPOINTS } from "@/constants/api";

/**
 * Analyzes a room image and returns decoration suggestions
 * @param file - The image file to analyze (could be File or string depending on input type)
 * @returns Promise with analysis results
 * @throws Error if the API request fails
 */
export async function analyzeRoom(file: string | File): Promise<AnalysisResponse> {
  try {
    const formData = new FormData();
    
    // Handle different input types
    if (typeof file === "string") {
      formData.append("file", file);
    } else {
      formData.append("file", file);
    }

    const response = await fetch(API_ENDPOINTS.ROOM_ANALYZE, {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || `Failed to analyze room: ${response.statusText}`
      );
    }

    const data: AnalysisResponse = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("An unexpected error occurred while analyzing the room");
  }
}

/**
 * Analyzes text description for room decor suggestions
 * @param text - The text description of the room
 * @returns Promise with analysis results
 * @throws Error if the API request fails
 */
export async function analyzeText(text: string): Promise<AnalysisResponse> {
  try {
    const response = await fetch(API_ENDPOINTS.TEXT_ANALYZE, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || `Failed to analyze text: ${response.statusText}`
      );
    }

    const data: AnalysisResponse = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("An unexpected error occurred while analyzing the text");
  }
}

