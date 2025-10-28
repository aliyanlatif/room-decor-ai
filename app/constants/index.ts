/**
 * Application constants and configuration
 */

import { SuggestionItem } from "@/app/types";

// Dummy suggestions data
export const DUMMY_SUGGESTIONS: SuggestionItem[] = [
  {
    id: 1,
    name: "Modern Canvas Art",
    price: "$129.99",
    location: "Living Room",
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e35ca?w=500",
    link: "#",
  },
  {
    id: 2,
    name: "Abstract Wall Sculpture",
    price: "$89.99",
    location: "Bedroom",
    image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=500",
    link: "#",
  },
  {
    id: 3,
    name: "Minimalist Frame Set",
    price: "$149.99",
    location: "Office",
    image: "https://images.unsplash.com/photo-1551732998-9e7ceb8a8a8e?w=500",
    link: "#",
  },
  {
    id: 4,
    name: "Vintage Wall Clock",
    price: "$79.99",
    location: "Kitchen",
    image: "https://images.unsplash.com/photo-1533073526757-2c8ca1df9f1c?w=500",
    link: "#",
  },
  {
    id: 5,
    name: "Botanical Print Collection",
    price: "$199.99",
    location: "Hallway",
    image: "https://images.unsplash.com/photo-1582737746853-ffd067622cd0?w=500",
    link: "#",
  },
  {
    id: 6,
    name: "Contemporary Mirror",
    price: "$159.99",
    location: "Entryway",
    image: "https://images.unsplash.com/photo-1618220179428-22790b461013?w=500",
    link: "#",
  },
];

// Reasoning text for AI analysis
export const REASONING_TEXT = `Based on the analysis of your room, we've identified key design elements that complement your space. The color palette detected suggests a modern aesthetic with neutral tones. The brightness level indicates good natural lighting, making it ideal for vibrant artwork. Our AI recommendation engine has curated these suggestions specifically tailored to enhance your room's ambiance.`;

// About page content
export const ABOUT_CONTENT = {
  title: "About Us",
  sections: [
    {
      text: 'Welcome to <span class="font-semibold">Art.Decor.AI</span> — where the power of Artificial Intelligence meets your personal sense of style to transform the way you decorate your home.',
    },
    {
      heading: "Our Vision: Perfect Décor, Effortlessly",
      text: "We believe decorating your space should be simple, inspiring, and fun. No more endless scrolling, second-guessing, or mismatched designs. Art.Decor.AI acts as your personal AI home stylist, helping you find décor and wall art that truly fits your space, your taste, and your lifestyle.",
    },
    {
      heading: "How It Works",
      text: "Our smart AI understands your space and preferences through three easy inputs:",
      inputs: [
        {
          icon: "📸",
          title: "Photo Upload",
          description:
            "Share a picture of your room, and our AI analyzes its colors, lighting, and layout to get a feel for your environment.",
        },
        {
          icon: "✍️",
          title: "Text Description",
          description:
            'Describe your vision in your own words, like "a cozy Scandinavian living room with beige tones" or "modern art for my office wall."',
        },
        {
          icon: "🎤",
          title: "Voice Query",
          description:
            'Prefer to talk it out? Simply speak your request, such as "Show me minimalist art for my bedroom."',
        },
      ],
      conclusion:
        "From there, Art.Decor.AI instantly interprets your input, studies the details of your room, and curates personalized décor suggestions that complement your style perfectly.",
    },
    {
      text: "Whether you're refreshing a single wall or redesigning an entire room, we make the process smarter, faster, and more effortless — so you can focus on what truly matters: loving the space you live in.",
    },
  ],
};

// Animation durations (in milliseconds)
export const ANIMATION_DURATION = {
  SCROLL: 1200,
  SCROLL_FAST: 1000,
  RESULTS_DELAY: 300,
  SUGGESTIONS_LOADER_DELAY: 1500,
  SUGGESTIONS_DISPLAY_DELAY: 2000,
  REASONING_DELAY: 4500,
  TYPEWRITER_SPEED: 30,
  TYPEWRITER_SCROLL_DELAY: 300,
};

// API endpoints
export const API_ENDPOINTS = {
  ANALYZE_ROOM: "/api/room/analyze",
  ANALYZE_TEXT: "http://localhost:5001/api/analyze-text",
  CONTACT: "/api/contact",
};

