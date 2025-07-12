from flask import Flask, request, jsonify
from flask_cors import CORS
from groq import Groq  # pip install groq
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

GROQ_API_KEY = os.getenv("GROQ_API_KEY", "your-groq-api-key")
client = Groq(api_key=GROQ_API_KEY)

def get_groq_response(system_prompt, user_prompt):
    try:
        completion = client.chat.completions.create(
            model="compound-beta",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_prompt},
            ],
            temperature=0.7
        )

        output = completion.choices[0].message.content if completion.choices else "❌ Could not generate a response."
        output = output.replace("content", "<b>content</b>")
        output = ' '.join(word for word in output.split() if word != 'undefined')
        return output
    except Exception as e:
        print(f"Groq error: {e}")
        return "❌ Error while generating response."

@app.route('/api/ai-stylist', methods=['POST'])
def ai_stylist():
    data = request.get_json()
    user_message = data.get("message", "")

    prompt = f"""You are an AI fashion stylist. Help the user based on their input: "{user_message}"
Be creative, friendly, and concise. Do not refer to yourself as an assistant or AI."""

    reply = get_groq_response("You are a stylish and creative fashion assistant.", prompt)
    return jsonify({"reply": reply})

@app.route('/api/auto-assist', methods=['POST'])
def auto_assist():
    data = request.get_json()
    purchase_history = data.get("purchase_history", [])

    prompt = f"""Based on the following purchase history: {purchase_history},
suggest 2–3 outfit recommendations that align with the user's style.
Include clothing items, styles, and color suggestions. Avoid saying you're an assistant.
Give the recommendations as concise as possible."""

    reply = get_groq_response("You are a smart wardrobe recommendation engine.", prompt)
    return jsonify({"suggestion": reply})

@app.route('/api/image-style', methods=['POST'])
def image_style():
    data = request.get_json()
    description = data.get("image_description", "")

    prompt = f"""Analyze the following visual description and provide a fashion suggestion based on it:
"{description}"
Give style insights and recommend suitable outfits or accessories based on this description."""

    reply = get_groq_response("You are a fashion stylist analyzing visual cues from descriptions.", prompt)
    return jsonify({"suggestion": reply})

if __name__ == '__main__':
    app.run(debug=True, port=5001)
