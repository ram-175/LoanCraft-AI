from flask import Flask, render_template, request, jsonify
import pandas as pd
import joblib

# Create Flask application
app = Flask(__name__)

# Load the trained machine learning model
model = joblib.load("credit_risk_model.pkl")


# ---------------------------------------------
# Home Page
# ---------------------------------------------
@app.route("/")
def home():
    return render_template("index.html")


# ---------------------------------------------
# Prediction API
# ---------------------------------------------
@app.route("/predict", methods=["POST"])
def predict():

    try:
        # Receive data from JavaScript
        data = request.get_json()

        # Create a DataFrame with the SAME column names
        # used when training the ML model
        applicant = pd.DataFrame([{
            "Age": int(data["age"]),
            "Sex": data["sex"],
            "Job": int(data["job"]),
            "Housing": data["housing"],
            "Saving accounts": data["saving"],
            "Checking account": data["checking"],
            "Credit amount": float(data["credit"]),
            "Duration": int(data["duration"]),
            "Purpose": data["purpose"]
        }])

        # Make prediction
        prediction = model.predict(applicant)[0]

        # Get prediction probability
        probabilities = model.predict_proba(applicant)[0]

        # Highest probability = model confidence
        confidence = max(probabilities) * 100

        # Convert model result into UI-friendly result
        if prediction == "good":
            result = "GOOD"
            decision = "Loan Application Approved"

        else:
            result = "BAD"
            decision = "Loan Application Rejected"

        # Get actual classifier name
        classifier_name = type(
            model.named_steps["classifier"]
        ).__name__

        # Send result back to JavaScript
        return jsonify({
            "success": True,
            "prediction": result,
            "decision": decision,
            "confidence": round(confidence, 2),
            "model": classifier_name
        })

    except Exception as e:

        print("Prediction Error:", e)

        return jsonify({
            "success": False,
            "error": str(e)
        }), 400


# ---------------------------------------------
# Run Flask Application
# ---------------------------------------------
if __name__ == "__main__":
    app.run(debug=True)