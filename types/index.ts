export type InputType = "photo" | "voice" | "text";

export interface ArtworkSuggestionResponse {
  id: number;
  title: string;
  brand: string;
  price: string;
  style_tags: string;
  dominant_palette: string;
  image_url: string;
  brightness: number;
  height: number;
  width: number;
}

export interface RoomAnalysis {
  wall_colors: string[];
  brightness: number;
  style_tags: string[];
}

export interface AnalysisResponse {
  id: number;
  url: string;
  analysis: RoomAnalysis;
  artworks: {
    matching: ArtworkSuggestionResponse[];
    contrast: ArtworkSuggestionResponse[];
  };
  reasoning: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface SubmitStatus {
  type: "success" | "error" | null;
  message: string;
}

