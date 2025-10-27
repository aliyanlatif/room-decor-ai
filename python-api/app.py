import os
import json
from flask import Flask, request, jsonify
from flask_cors import CORS
from openai import OpenAI
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for Next.js frontend

# Initialize OpenAI client
client = OpenAI(
    api_key=os.getenv("OPENAI_API_KEY"),
    base_url=os.getenv("OPENAI_BASE_URL", "https://api.openai.com/v1")
)

def extract_details_from_text(user_text: str):
    """
    Extract colors, style, and mentioned items from the input text using OpenAI model.
    If no explicit color is mentioned but tone words like 'light', 'dim', 'dark', or 'bright'
    appear, automatically infer matching color shades.
    Returns a Python dictionary with keys: Colors, Style, itemsMentioned.
    """

    prompt = f"""
    You are a smart text analyzer for a room decor AI assistant.
    Your job is to read user text and extract structured information.

    The user text might mention:
    - Color names (e.g., beige, navy blue, pastel pink, etc.)
    - Tone or brightness words (e.g., light, bright, dim, dark, etc.)
    - Styles or themes (e.g., minimal, bohemian, modern, vintage)
    - Items related to room decor (e.g., paintings, lamps, rugs, vases, furniture)

    **IMPORTANT COLOR RULES:**
    1. Convert ALL color names to HEX codes (e.g., beige → #F5F5DC, navy blue → #000080).
    2. If NO explicit color names are found but tone words like "light", "bright", "dim", or "dark" are present:
        - For "light" → suggest soft/pastel hex colors like ["#F5F5DC", "#FAFAD2", "#E6E6FA"]
        - For "bright" → suggest vibrant colors like ["#FFD700", "#FF6347", "#00BFFF"]
        - For "dark" → suggest deeper tones like ["#1A1A1A", "#2F4F4F", "#191970"]
        - For "dim" → suggest muted colors like ["#696969", "#708090", "#778899"]
    3. Only add inferred colors if no explicit color is detected.
    4. Always return valid JSON with arrays of strings.

    Output a JSON object in this exact format:
    {{
      "Colors": [list of hex codes ONLY],
      "Style": [list of styles],
      "itemsMentioned": [list of items]
    }}

    Be accurate and concise. If something isn't mentioned, return an empty array.

    Examples:
    Input: "I want you to suggest Beige color, minimal paintings"
    Output:
    {{
      "Colors": ["#F5F5DC"],
      "Style": ["minimal"],
      "itemsMentioned": ["paintings"]
    }}

    Input: "show me some dark colour paintings"
    Output:
    {{
      "Colors": ["#1A1A1A"],
      "Style": [],
      "itemsMentioned": ["paintings"]
    }}

    Input: "show me some bright furniture"
    Output:
    {{
      "Colors": ["#FFD700", "#FF6347", "#00BFFF"],
      "Style": [],
      "itemsMentioned": ["furniture"]
    }}

    Input: "I want navy blue and white furniture with modern style"
    Output:
    {{
      "Colors": ["#000080", "#FFFFFF"],
      "Style": ["modern"],
      "itemsMentioned": ["furniture"]
    }}

    Now analyze this user input and remember to convert ALL colors to hex codes:
    "{user_text}"
    """

    try:
        response = client.chat.completions.create(
            model="gpt-4o-mini",  # Better structured output and accuracy
            messages=[
                {"role": "system", "content": "You are a helpful assistant that extracts structured information from text and outputs strict JSON."},
                {"role": "user", "content": prompt}
            ],
            response_format={"type": "json_object"},
            max_tokens=1500
        )

        data = json.loads(response.choices[0].message.content)

        # If no color found, apply post-fallback logic
        if not data.get("Colors"):
            user_lower = user_text.lower()
            if "light" in user_lower:
                data["Colors"] = ["#F5F5DC", "#FAFAD2", "#E6E6FA"]
            elif "bright" in user_lower:
                data["Colors"] = ["#FFD700", "#FF6347", "#00BFFF"]
            elif "dark" in user_lower:
                data["Colors"] = ["#1A1A1A", "#2F4F4F", "#191970"]
            elif "dim" in user_lower:
                data["Colors"] = ["#696969", "#708090", "#778899"]

    except Exception as e:
        print(f"Error processing with OpenAI: {e}")
        data = {"Colors": [], "Style": [], "itemsMentioned": [], "error": str(e)}

    return data



@app.route('/api/analyze-text', methods=['POST'])
def analyze_text():
    """
    Endpoint to receive transcription and return extracted details
    """
    try:
        data = request.get_json()
        user_text = data.get('text', '')

        if not user_text:
            return jsonify({"error": "No text provided"}), 400

        # Extract details using OpenAI
        result = extract_details_from_text(user_text)
        print(f"Result: ", result)
        
        return jsonify({
            "success": True,
            "input": user_text,
            "result": result
        })

    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500


@app.route('/health', methods=['GET'])
def health():
    """Health check endpoint"""
    return jsonify({"status": "healthy", "message": "Flask API is running"})


if __name__ == "__main__":
    # Check if API key is set
    if not os.getenv("OPENAI_API_KEY"):
        print("WARNING: OPENAI_API_KEY not set in environment variables")
    
    print("Starting Flask server on http://localhost:5001")
    app.run(debug=True, port=5001, host='0.0.0.0')

