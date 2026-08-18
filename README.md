# Automated Financial Credit & Loan Decision Engine

## Project Overview

The Automated Financial Credit & Loan Decision Engine is a machine learning based web application that predicts the credit risk of a loan applicant.

The system analyzes financial and personal information such as age, job, housing, savings, checking account status, credit amount, loan duration, and loan purpose.

Based on these features, the trained machine learning model predicts whether the applicant represents a Good or Bad credit risk.

## Objectives

- Automate the initial credit risk assessment process.
- Reduce manual effort in loan application screening.
- Apply machine learning classification techniques.
- Compare multiple classification algorithms.
- Provide predictions through an interactive web interface.

## Dataset

German Credit Risk Dataset obtained from Kaggle.

### Features

- Age
- Sex
- Job
- Housing
- Saving accounts
- Checking account
- Credit amount
- Duration
- Purpose

### Target

Risk

- Good
- Bad

## Machine Learning Workflow

1. Data collection
2. Data understanding
3. Missing value detection
4. Missing value treatment
5. Duplicate removal
6. Exploratory Data Analysis
7. Feature preprocessing
8. Train-test split
9. Model training
10. Model evaluation
11. Best model selection
12. Flask deployment

## Machine Learning Models

The following classification algorithms were implemented:

- Logistic Regression
- Decision Tree
- Random Forest

The models were compared using:

- Accuracy
- Precision
- Recall
- F1 Score

## Technologies Used

- Python
- Pandas
- NumPy
- Scikit-learn
- Flask
- HTML
- CSS
- JavaScript
- Google Colab
- GitHub

## Application Architecture

User Interface → Flask Backend → Machine Learning Model → Credit Risk Prediction

## Prediction Output

The application provides:

- Credit risk prediction
- Prediction confidence
- Model used for prediction

## Future Enhancements

- Integration with a database
- User authentication
- Loan approval recommendation system
- Improved model tuning
- Cloud deployment
- Model monitoring