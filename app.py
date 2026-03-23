from flask import Flask, request, jsonify, send_from_directory
import pickle
from flask_cors import CORS
import os

app = Flask(__name__, static_folder="frontend/dist", static_url_path="/")
CORS(app)

model = pickle.load(open("model.pkl", "rb"))

@app.route("/")
def serve():
    return send_from_directory(app.static_folder, "index.html")

@app.route("/predict", methods=["POST"])
def predict():
    data = request.json

    features = [[
        data['study_hours'],
        data['sleep_hours'],
        data['gpa']
    ]]

    prediction = model.predict(features)[0]

    labels = {
        0: "Low",
        1: "Moderate",
        2: "High"
    }

    return jsonify({
        "prediction": labels[prediction]
    })

# for React routing
@app.route("/<path:path>")
def static_proxy(path):
    return send_from_directory(app.static_folder, path)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)