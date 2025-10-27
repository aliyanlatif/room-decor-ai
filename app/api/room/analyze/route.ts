import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    // Parse the request body (for future use when we need to send data)
    const body = await request.json();
    console.log("Received request:", body);

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Return dummy response
    const dummyResponse = {
      "id": 1,
      "url": "http://localhost:8000/assets/uploads/1761289467-c15ae7af.jpg",
      "analysis": {
          "status": "success",
          "wall_extraction_method": "manual",
          "wall_colors": ["#272728", "#818183", "#4e4e50", "#b6b6b7", "#09090b"],
          "brightness": 61.68698162729659,
          "style_tags": ["contemporary", "mid-century modern", "minimalist", "modern", "scandinavian"],
      },
      "artworks": {
          "matching": [
            {
              "id": 1,
              "title": "Artwork 1",
              "brand": "Brand 1",
              "price": "90",
              "image_url": "http://localhost:8000/assets/uploads/1761289467-c15ae7af.jpg",
              "brightness": 61.68698162729659,
              "height": 100,
              "width": 100,
              "style_tags": ["contemporary", "mid-century modern", "minimalist", "modern", "scandinavian"],
              "dominant_palette": ["#272728", "#818183", "#4e4e50", "#b6b6b7", "#09090b"]
            }
          ],
          "contrast": [
            {
              "id": 2,
              "title": "Artwork 2",
              "brand": "Brand 1",
              "price": "50",
              "image_url": "http://localhost:8000/assets/uploads/1761289467-c15ae7af.jpg",
              "brightness": 61.68698162729659,
              "height": 100,
              "width": 100,
              "style_tags": ["contemporary", "mid-century modern", "minimalist", "modern", "scandinavian"],
              "dominant_palette": ["#272728", "#818183", "#4e4e50", "#b6b6b7", "#09090b"]
            }
          ],
      },
      "reasoning": "The room is a modern, minimalist space with a mix of colors and textures. The wall colors are a mix of gray and white, with a pop of color from the art. The brightness is 61.68, which is a good balance of light and dark. The style tags are a mix of contemporary, mid-century modern, minimalist, modern, and Scandinavian.",
  };

    return NextResponse.json(dummyResponse);
  } catch (error) {
    console.error("Error in /api/room/analyze:", error);
    return NextResponse.json(
      { error: "Failed to analyze room" },
      { status: 500 }
    );
  }
}

