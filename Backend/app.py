from flask import Flask, request, jsonify
import cv2
import numpy as np
from ultralytics import YOLO
from PIL import Image
from io import BytesIO

app = Flask(__name__)

# Load YOLOv8 Model (.pt instead of .onnx)
model = YOLO("best.pt")

# Class Names for Cattle Breed Identification
CLASS_NAMES = {
    0: "Alambadi", 1: "Amrit Mahal", 2: "Banni", 3: "Bargur", 4: "Brown Swiss",
    5: "Dangi", 6: "Deoni", 7: "Gir", 8: "Guernsey", 9: "Hallikar",
    10: "Hariana", 11: "Holstein Friesian", 12: "Jaffarabadi", 13: "Jersey", 14: "Kangayam",
    15: "Kankrej", 16: "Kasaragod", 17: "Khillari", 18: "Malnad Gidda", 19: "Nagori",
    20: "Nagpuri", 21: "Nili-Ravi", 22: "Nimari", 23: "Ongole", 24: "Pulikulam",
    25: "Red Dane", 26: "Red Sindhi", 27: "Sahiwal", 28: "Tharparkar", 29: "Toda",
    30: "Umblachery", 31: "Vechur"
}

@app.route("/")
def home():
    return "🚀 AquaBov API is Running!"

@app.route("/predict", methods=["POST"])
def predict():
    if "image" not in request.files:
        return jsonify({"error": "No image uploaded"}), 400

    file = request.files["image"]

    if file.filename == "":
        return jsonify({"error": "No selected file"}), 400

    if not file.filename.lower().endswith((".png", ".jpg", ".jpeg")):
        return jsonify({"error": "Invalid file format. Only PNG, JPG, JPEG allowed."}), 400

    # Load and preprocess the image
    image = Image.open(BytesIO(file.read())).convert("RGB")
    
    # Run YOLO model on the image
    results = model.predict(image, conf=0.5)

    if len(results[0].boxes) == 0:
        return jsonify({
            "message": "⚠️ Could not confidently identify the breed. Try a clearer image or different angle.",
            "confidence": 0
        })

    # Get the top prediction
    box = results[0].boxes[0]  # First detected object
    class_id = int(box.cls[0])  # Predicted class
    confidence = float(box.conf[0])  # Confidence score
    x1, y1, x2, y2 = map(int, box.xyxy[0])  # Bounding box

    # Calculate height and width of detected cow
    cow_width = x2 - x1
    cow_height = y2 - y1

    # Convert pixels to real-world units (Assuming 1 pixel ≈ 1 cm)
    cow_height_cm = cow_height  
    cow_width_cm = cow_width  

    # Get breed name & estimated weight range
    breed_name = CLASS_NAMES.get(class_id, "Unknown Breed")
    
    return jsonify({
        "breed": breed_name,
        "confidence": round(confidence, 2),
        "height_cm": round(cow_height_cm, 2),
        "width_cm": round(cow_width_cm, 2),
        "message": "✅ Prediction successful! Ensure a clear image for better accuracy."
    })

if __name__ == "__main__":
    app.run(debug=True)
