// Re-export API constants
export { API_ENDPOINTS, API_CONFIG } from "./api";

export const LIMITS = {
  TEXT_CHARACTER_LIMIT: 500,
  IMAGE_SIZE_MB: 10,
} as const;

export const ANIMATION = {
  SCROLL_DURATION: 1200,
  SCROLL_DURATION_SHORT: 1000,
  SUGGESTIONS_DELAY: 150,
} as const;

export const BRIGHTNESS = {
  MAX_VALUE: 255,
} as const;

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export const INPUT_TYPES = [
  { type: "photo" as const, label: "Photo", icon: "📸" },
  { type: "voice" as const, label: "Voice", icon: "🎤" },
  { type: "text" as const, label: "Text", icon: "✏️" },
] as const;

