from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import DistilBertTokenizerFast, DistilBertForSequenceClassification
import torch

app = Flask(__name__)
CORS(app)

# Load fine-tuned DistilBERT model
MODEL_PATH = "./fake_news_model"
tokenizer = DistilBertTokenizerFast.from_pretrained(MODEL_PATH)
model = DistilBertForSequenceClassification.from_pretrained(MODEL_PATH)
model.eval()  # set model to inference mode

@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json()
        content = data.get("content", "")

        if not content:
            return jsonify({"error": "No content provided"}), 400

        # Tokenize input
        inputs = tokenizer(content, return_tensors="pt", truncation=True, padding=True, max_length=256)

        # Run model
        with torch.no_grad():
            outputs = model(**inputs)
            probs = torch.softmax(outputs.logits, dim=1)
            pred_label = torch.argmax(probs, dim=1).item()
            confidence = probs[0][pred_label].item()

        # Convert label back to string
        result = "Real" if pred_label == 1 else "Fake"

        return jsonify({"result": result, "confidence": round(confidence, 4)})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True, port=5000)
