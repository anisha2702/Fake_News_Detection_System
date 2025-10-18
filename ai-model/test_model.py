import torch
from transformers import DistilBertTokenizerFast, DistilBertForSequenceClassification

print("🔹 Loading model...")
MODEL_PATH = "./fake_news_model"

tokenizer = DistilBertTokenizerFast.from_pretrained(MODEL_PATH)
model = DistilBertForSequenceClassification.from_pretrained(MODEL_PATH)
model.eval()  # Inference mode

print("✅ Model loaded successfully!")

# Example texts
texts = [
    "Breaking: The government just announced a new healthcare policy.",  # real news style
    "Aliens have landed in New York and taken over the White House!"    # fake news style
]

print(f"Testing {len(texts)} texts...\n")

for text in texts:
    print(f"Processing: {text[:50]}...")  # show first 50 chars
    inputs = tokenizer(text, return_tensors="pt", truncation=True, padding=True, max_length=256)

    with torch.no_grad():
        outputs = model(**inputs)
        probs = torch.softmax(outputs.logits, dim=1)
        pred_label = torch.argmax(probs, dim=1).item()
        confidence = probs[0][pred_label].item()

    result = "Real" if pred_label == 1 else "Fake"
    print(f" → Prediction: {result} (confidence={confidence:.4f})\n")

print("🎉 Done!")
