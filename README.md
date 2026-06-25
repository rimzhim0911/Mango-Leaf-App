# 🌿 Mango Leaf Disease Detection System

An AI-powered web application that detects diseases in mango leaves using Deep Learning. The system helps farmers and agriculture enthusiasts identify common mango leaf diseases by uploading or capturing a leaf image. It provides disease predictions along with confidence score, symptoms, treatment, and prevention recommendations.

---

## 📌 Features

* 🍃 Detects **8 different classes** of mango leaf conditions
* 📷 Upload image from device
* 📸 Capture image using device camera
* 🤖 AI-powered disease prediction
* 📊 Displays prediction confidence score
* 📖 Detailed disease description
* 💊 Treatment recommendations
* 🛡️ Prevention guidelines
* 📚 Knowledge section about common mango diseases
* 📱 Fully responsive modern UI
* ⚡ Fast prediction using TensorFlow model

---

## 🦠 Disease Classes

* Anthracnose
* Bacterial Canker
* Cutting Weevil
* Die Back
* Gall Midge
* Healthy
* Powdery Mildew
* Sooty Mould

Additionally, the model detects **Not_Mango** images and warns users if the uploaded image is not a mango leaf.

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Vite
* React Router DOM
* Tailwind CSS

### Backend

* Python
* Flask
* TensorFlow / Keras
* NumPy
* Pillow

---

## 📂 Project Structure

```text
Mango App/
│
├── Backend/
│   ├── app.py
│   ├── saved_model_tf/
│   ├── class_indices.json
│
└── mango-leaf-app/
    ├── public/
    ├── src/
    │   ├── assets/
    │   ├── components/
    │   ├── pages/
    │   │   ├── Home.jsx
    │   │   ├── Camera.jsx
    │   │   └── Result.jsx
    │   ├── App.jsx
    │   └── main.jsx
    ├── package.json
```

---

## ⚙️ Installation

### Clone the Repository

```bash
git clone https://github.com/your-username/mango-leaf-disease-detector.git
```

---

### Backend Setup

```bash
cd Backend

pip install -r requirements.txt

python app.py
```

Backend runs at:

```
http://127.0.0.1:5000
```

---

### Frontend Setup

```bash
cd mango-leaf-app

npm install

npm run dev
```

Frontend runs at:

```
http://localhost:5173
```

---

## 🚀 How It Works

1. Upload a mango leaf image or capture one using the camera.
2. The image is sent to the Flask backend.
3. The trained TensorFlow model analyzes the image.
4. The predicted disease and confidence score are returned.
5. The application displays:

   * Disease Name
   * Confidence Score
   * Description
   * Symptoms
   * Treatment
   * Prevention

---

## 🧠 Model

The application uses a Convolutional Neural Network (CNN) built with TensorFlow/Keras and trained on a mango leaf disease dataset.

The model can classify:

* Healthy leaves
* Fungal diseases
* Bacterial diseases
* Insect pest damage
* Non-mango leaves

---

## 🔮 Future Improvements

* Multi-language support
* Real-time camera detection
* Offline prediction
* Disease severity estimation
* Nearby agriculture support centers
* Fertilizer recommendations
* Weather-based disease alerts
* Voice assistance for farmers

---

## 👩‍💻 Author

**Rimzhim**

M.Sc. Data Science Student

---

## 📄 License

This project is developed for educational and research purposes.
