// API Base URLs from environment variables
const ROOM_API_BASE_URL = process.env.NEXT_PUBLIC_ROOM_API_BASE_URL;
const TEXT_API_BASE_URL = process.env.NEXT_PUBLIC_TEXT_API_BASE_URL;

// API Endpoints
export const API_ENDPOINTS = {
  // Room Analysis API
  ROOM_ANALYZE: `${ROOM_API_BASE_URL}/room/analyze`,
  
  // Text Analysis API
  TEXT_ANALYZE: `${TEXT_API_BASE_URL}/api/analyze-text`,
  
  // Internal Next.js API Routes
  CONTACT: "/api/contact",
  ROOM_ANALYZE_INTERNAL: "/api/room/analyze",
} as const;

// API Configuration
export const API_CONFIG = {
  TIMEOUT: 30000, // 30 seconds
  RETRY_ATTEMPTS: 3,
} as const;

