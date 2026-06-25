from flask import Flask, request, jsonify
from flask_cors import CORS

import tensorflow as tf
import numpy as np
from PIL import Image

app = Flask(__name__)
CORS(app)


@app.route("/")
def home():
    return "Mango Disease Backend Running Successfully"

# Load model
model = tf.saved_model.load("saved_model_tf")

predict_fn = model.signatures["serving_default"]


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

    print("Prediction API Hit")

    file = request.files["image"]

    img = Image.open(file).convert("RGB")
    img = img.resize((224, 224))

    img_array = np.array(img) / 255.0
    img_array = np.expand_dims(img_array.astype(np.float32), axis=0)

    prediction = predict_fn(tf.constant(img_array))

    output = list(prediction.values())[0].numpy()

    predicted_index = np.argmax(output)
    confidence = float(np.max(output) * 100)

    return jsonify({
        "disease": classes[predicted_index],
        "confidence": round(confidence, 2)
    })


if __name__ == "__main__":
    app.run(debug=True)