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
      id: 43,
      url: "http://localhost:8000/assets/uploads/1761289467-c15ae7af.jpg",
      analysis: {
        wall_colors: [
          "#272728",
          "#818183",
          "#4e4e50",
          "#b6b6b7",
          "#09090b",
        ],
        brightness: 61.68698162729659,
        style_tags: [
          "contemporary",
          "mid-century modern",
          "minimalist",
          "modern",
          "scandinavian",
        ],
      },
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

