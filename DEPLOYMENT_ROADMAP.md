# 🚀 Project Deployment Roadmap
**Guide for setting up SHIELD.AI on a new machine.**

Follow these steps exactly to get the system running on your new laptop.

---

## 📋 Phase 1: Prerequisites
Before starting, ensure you have the following installed on your new laptop:
1.  **Node.js (v16 or higher)**: [Download Here](https://nodejs.org/)
2.  **Python (v3.9 or higher)**: [Download Here](https://www.python.org/)
    *   *Important*: During installation, check the box **"Add Python to PATH"**.

---

## 🛠️ Phase 2: Setup Backend (The Brain)
The backend runs the Python Flask server and the AI Engine.

1.  **Open Terminal / Command Prompt**.
2.  Navigate to the `backend` folder inside the project.
    ```cmd
    cd "path/to/project/backend"
    ```
3.  **Install Dependencies**:
    Run this command to install Flask and AI libraries:
    ```cmd
    pip install flask flask-cors requests python-dotenv
    ```
4.  **Configure API Key (Critical)**:
    *   Create a new file named `.env` inside the `backend` folder (if it's missing).
    *   Open it with Notepad.
    *   Add your VirusTotal API Key:
        ```text
        VT_API_KEY=your_actual_api_key_here
        ```
    *   *Note*: Without this, "Online Mode" will fail (but "Offline Mode" will still work).

5.  **Start the Server**:
    ```cmd
    python app.py
    ```
    *Success Message*: `Running on http://127.0.0.1:5000`

---

## 💻 Phase 3: Setup Frontend (The Interface)
The frontend is the React website you interact with.

1.  **Open a NEW Terminal window** (Keep the backend one running).
2.  Navigate to the main project folder.
    ```cmd
    cd "path/to/project"
    ```
3.  **Install Modules (First Time Only)**:
    This downloads all the React libraries. It may take 5-10 minutes.
    ```cmd
    npm install
    ```
4.  **Start the App**:
    ```cmd
    npm start
    ```
    *Success*: It should automatically open `http://localhost:3000` in your browser.

---

## 🧪 Phase 4: Testing Guide
Use these links to verify the system is working correctly.

### ✅ Safe Links (Should show "Clean" / "Safe")
*   `https://www.google.com`
*   `https://www.amazon.com`
*   `https://www.microsoft.com`
*   `https://avpcas.org` (Your College Website)

### ⚠️ Phishing / Suspicious Test Links
**WARNING**: These are for testing logic. Do not enter real credentials on these sites.

**1. Simulated Phishing (Google Safe Browsing Test)**:
*   `http://testsafebrowsing.appspot.com/s/phishing.html`
    *   *Expected Result*: **Phishing Detected** (Online Mode)

**2. Offline Logic Test (Force Offline Mode)**:
Turn on "Force Offline Mode" in Settings, then try:
*   `http://secure-login-update-account.com`
    *   *Why*: Contains keywords "secure", "login", "update", "account".
    *   *Expected Result*: **Suspicious / Malicious** (Local Brain).
*   `http://192.168.1.1/wallet/confirm`
    *   *Why*: Uses IP address instead of domain + "wallet" keyword.
    *   *Expected Result*: **Malicious**.

---

## ❓ Troubleshooting
*   **"System Offline" Red Indicator**:
    *   Did you close the Python terminal? The backend must stay running.
    *   Did you run `pip install`?
*   **"Network Unavailable" Popup**:
    *   Your internet is off, or the `.env` API Key is invalid. The system has automatically switched to Local Brain.
*   **Report Download Crash**:
    *   This is fixed in the latest version. Ensure you copied the latest `src/pages/Scanner.js`.

---
*Good luck with your Project Demo!* 
