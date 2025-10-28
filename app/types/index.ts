/**
 * Core type definitions for the Room Decor AI application
 */

export type InputType = "photo" | "voice" | "text";

export interface AnalysisResult {
  wall_colors: string[];
  brightness: number;
  style_tags: string[];
}

export interface AnalysisResponse {
  id: number;
  url: string;
  analysis: AnalysisResult;
}

export interface SuggestionItem {
  id: number;
  name: string;
  price: string;
  location: string;
  image: string;
  link: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

