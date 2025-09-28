from flask import Flask, request, jsonify
from flask_cors import CORS
import fasttext
import traceback

app = Flask(__name__)
CORS(app)
model = fasttext.load_model("sentiment_model.bin")

@app.route("/sentiment", methods=["POST"])
def sentiment():
    try:
        req_data = request.get_json()
        comments = req_data.get("comments", [])
        counts = {"positive": 0, "negative": 0, "neutral": 0}

        for comment in comments:
            # Remove newline characters and trim whitespace
            clean_comment = comment.replace('\n', ' ').strip()

            labels, _ = model.predict(clean_comment)
            label = labels[0].replace("__label__", "")
            if label in counts:
                counts[label] += 1
            else:
                counts["neutral"] += 1

        return jsonify(counts)
    except Exception:
        traceback.print_exc()
        return jsonify({"error": "Internal server error"}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
