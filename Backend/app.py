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
    return jsonify({
        "disease": "Healthy",
        "confidence": 99.9
    })

import os

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)