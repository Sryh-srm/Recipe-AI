from google import genai
from app.config import GEMINI_API_KEY
import time

client = genai.Client(api_key=GEMINI_API_KEY)


def generate_with_gemini(prompt):

    for i in range(3):

        try:

            response = client.models.generate_content(
                model="gemini-3.5-flash",
                contents=prompt
            )

            return response.text

        except Exception as e:

            print(e)

            if i == 2:
                raise   # <-- THIS IS THE FIX

            time.sleep(2 ** i)