export type InputType = "photo" | "voice" | "text";

export interface ArtworkSuggestionResponse {
  id: number;
  title: string;
  image_url: string;
  style_tags: string;
  dominant_palette: string;
  answer: string;
}

export interface ObjectDetection {
  label: string;
  confidence: number;
  bbox: [number, number, number, number];
}

export interface RoomAnalysis {
  status: string;
  wall_extraction_method: string;
  wall_colors: string[];
  brightness: number;
  embedding: number;
  style_tags: string[];
}

export interface AnalysisResponse {
  id: number;
  url: string;
  analysis: RoomAnalysis;
  objects_found: ObjectDetection[];
  reasoning: {
    artworks: {
      matching: ArtworkSuggestionResponse[];
      contrast: ArtworkSuggestionResponse[];
    };
  };
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


