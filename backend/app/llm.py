from app.gemini import generate_with_gemini
from app.groq import generate_with_groq


def generate_response(prompt: str):

    try:
        print("Trying Gemini...")

        answer = generate_with_gemini(prompt)

        print("Gemini Success!")

        return {
            "provider": "Gemini",
            "model": "gemini-3.5-flash",
            "response": answer
        }

    except  Exception as e:

     print("=" * 60)
     print("Gemini FAILED")
     print(type(e))
     print(e)
     print("Calling Groq now...")
     print("=" * 60)

     answer = generate_with_groq(prompt)

     print("=" * 60)
     print("Groq returned successfully!")
     print("=" * 60)

     return {
        "provider": "Groq",
        "model": "llama-3.3-70b-versatile",
        "response": answer
     }