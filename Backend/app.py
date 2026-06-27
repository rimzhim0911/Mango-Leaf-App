from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
import numpy as np
from PIL import Image
import json
import os
import traceback

app = Flask(__name__)

# Allow local React app + deployed frontend
CORS(app, resources={
    r"/*": {
        "origins": [
            "http://localhost:5173",
            "https://mango-leaf-app.vercel.app"
        ]
    }
})

# ---------------- LOAD MODEL ---------------- #

model = tf.keras.models.load_model(
    "mango_leaf_disease_model.keras",
    compile=False
)

# Load class names automatically
with open("class_indices.json", "r") as f:
    class_indices = json.load(f)

classes = {v: k for k, v in class_indices.items()}

print("✅ Model Loaded Successfully")
print(classes)

# ---------------- HOME ---------------- #

@app.route("/")
def home():
    return jsonify({
        "message": "Mango Disease Backend Running Successfully"
    })

# ---------------- PREDICT ---------------- #

@app.route("/predict", methods=["POST"])
def predict():
    try:

        if "image" not in request.files:
            return jsonify({"error": "No image uploaded"}), 400

        file = request.files["image"]

        img = Image.open(file).convert("RGB")
        img = img.resize((224, 224))

        img = np.array(img).astype("float32") / 255.0
        img = np.expand_dims(img, axis=0)

        prediction = model.predict(img, verbose=0)

        predicted_index = int(np.argmax(prediction))
        confidence = float(np.max(prediction) * 100)

        disease = classes[predicted_index]

        print("=" * 60)
        print("Disease:", disease)
        print("Confidence:", confidence)
        print("=" * 60)

        return jsonify({
            "success": True,
            "disease": disease,
            "confidence": round(confidence, 2)
        })

    except Exception as e:
        traceback.print_exc()
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500


# ---------------- RUN ---------------- #

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=True)