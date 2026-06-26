from flask import Flask, request, jsonify
from flask_cors import CORS
import traceback

import tensorflow as tf
import numpy as np
from PIL import Image

app = Flask(__name__)

CORS(
    app,
    resources={
        r"/*": {
            "origins": [
                "https://mango-leaf-app.vercel.app"
            ]
        }
    }
)

@app.route("/")
def home():
    return "Mango Disease Backend Running Successfully"

from tensorflow.keras.models import load_model

model = load_model("mango_leaf_disease_model.keras")


# Classes
classes = {
    0: "Anthracnose",
    1: "Bacterial Canker",
    2: "Cutting Weevil",
    3: "Die Back",
    4: "Gall Midge",
    5: "Healthy",
    6: "Not_Mango",
    7: "Powdery Mildew",
    8: "Sooty Mould"
}


@app.route("/predict", methods=["POST"])
def predict():
    if "image" not in request.files:
        return jsonify({"error": "No image uploaded"}), 400

    file = request.files["image"]

    img = Image.open(file).convert("RGB")
    img = img.resize((224, 224))

    img_array = np.array(img, dtype=np.float32) / 255.0
    img_array = np.expand_dims(img_array, axis=0)

    prediction = model.predict(img_array, verbose=0)

    print("=" * 60)
    print("Prediction Array:", prediction.tolist())

    predicted_index = int(np.argmax(prediction))
    confidence = float(np.max(prediction) * 100)

    print("Predicted Index:", predicted_index)
    print("Disease:", classes[predicted_index])
    print("Confidence:", confidence)
    print("=" * 60)

    return jsonify({
        "disease": classes[predicted_index],
        "confidence": round(confidence, 2)
    })

import os

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)