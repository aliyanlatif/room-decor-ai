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

    if (typeof file === "string") {
      // Handle data URLs (base64 encoded images)
      if (file.startsWith("data:")) {
        // Convert data URL to blob
        const response = await fetch(file);
        const blob = await response.blob();
        formData.append("file", new File([blob], "room.jpg", { type: blob.type }));
      } else {
        // Fetch image from the URL before sending
        const res = await fetch(file);
        if (!res.ok) throw new Error(`Failed to fetch image from ${file}`);
        const blob = await res.blob();
        formData.append("file", new File([blob], "room.jpg", { type: blob.type }));
      }
    } else {
      // File already valid from <input type="file">
      formData.append("file", file);
    }

    const response = await fetch(API_ENDPOINTS.ROOM_ANALYZE, {
      method: "POST",
      body: formData, // don't set Content-Type manually
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || `Failed to analyze room: ${response.statusText}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error("❌ analyzeRoom error:", error);
    throw error instanceof Error
      ? error
      : new Error("Unexpected error while analyzing the room");
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

