import os
import requests

OLLAMA_API_URL = os.getenv("OLLAMA_API_URL", "http://localhost:11434")
LLM_MODEL = os.getenv("LLM_MODEL_NAME", "llama3")

def interpret_query(natural_query: str) -> str:
    prompt = f"""
You are a helpful AI movie assistant. A user said:
"{natural_query}"

Based on this, suggest a movie title or genre they might enjoy. Respond with just one recommended title or genre.
"""

    response = requests.post(
        f"{OLLAMA_API_URL}/api/generate",
        json={
            "model": LLM_MODEL,
            "prompt": prompt,
            "stream": False
        }
    )

    if response.status_code != 200:
        raise Exception(f"LLM error: {response.text}")
    
    result = response.json()
    return result.get("response", "").strip()
