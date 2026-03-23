# Welcome to our 🧠 Stress Level Predictor (ML-Powered)

A machine learning–based web application that predicts a student's stress level based on daily habits such as study hours, sleep duration, and GPA. The app provides actionable recommendations to help users improve their well-being.

---

## 🚀 Features

- 📊 Predict stress level using ML model
- 🧾 Simple and intuitive user interface
- ⚡ Real-time prediction via API
- 📉 Visual stress meter (Low → High)
- 💡 Personalized habit improvement suggestions

---

## 🏗️ Project Structure

```
StudentStress/
│── app.py                 # Flask backend (API)
│── model.pkl             # Trained ML model
│── requirements.txt      # Dependencies
│── templates/
│     └── index.html      # Frontend UI
│── static/
│     ├── css/
│     └── js/
│── assets/
│     └── screenshot.png
```

---

## ⚙️ Tech Stack

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Flask
- **Machine Learning:** Scikit-learn
- **Model Type:** (e.g., Regression / Classification)
- **API:** REST (Flask)

---

## 🧪 How It Works

1. User inputs:
   - Study hours per day
   - Sleep hours per night
   - GPA

2. Data is sent to Flask API (`/predict`)

3. The ML model processes the input and predicts stress level

4. Result is displayed:
   - Stress category (Low / Medium / High)
   - Visual gauge
   - Suggestions for improvement

---

## 🛠️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/stress-level-predictor.git
cd stress-level-predictor
```

### 2. Create Virtual Environment

```bash
python -m venv venv
source venv/bin/activate   # Mac/Linux
venv\Scripts\activate      # Windows
```

### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

### 4. Run the Application

```bash
python app.py
```

---

## 🌐 API Endpoint

### POST `/predict`

#### Request (JSON):

```json
{
  "study_hours": 6,
  "sleep_hours": 4,
  "gpa": 3.5
}
```

#### Response:

```json
{
  "stress_level": "High"
}
```

--- 

Future Improvements

- Add more features (e.g., screen time, exercise)
- Improve model accuracy with larger dataset
- Deploy using Docker / AWS
- Add user authentication
- Track stress trends over time

---
