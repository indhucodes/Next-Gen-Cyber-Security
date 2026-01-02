# ☁️ Cloud Deployment Guide (Vercel & Render)

This guide explains how to deploy your "Cloud Version" of SHIELD.AI while keeping your local version safe.

---

## 📦 Step 1: Create a Cloud Version (Backup First)
Since you want to keep your Localhost version as a backup:
1.  **Copy** the entire `phishing-detector` folder.
2.  **Paste** it and rename it to `phishing-detector-cloud`.
3.  Open the NEW `phishing-detector-cloud` folder in VS Code.

*(Note: I have already updated the code in your current folder to support Cloud URLs via Environment Variables, so it works for both Local and Cloud).*

---

## 🚀 Step 2: Deploy Backend (Render.com)
The backend (brain) needs to run on a server. We will use Render.

1.  **Push to GitHub**:
    *   Create a generic repository on GitHub.
    *   Upload your project code.
2.  **Go to Render.com**:
    *   Create a generic **Web Service**.
    *   Connect your GitHub repo.
3.  **Configure Render**:
    *   **Root Directory**: `backend` (Important!)
    *   **Runtime**: Python 3
    *   **Build Command**: `pip install -r requirements.txt`
    *   **Start Command**: `gunicorn app:app`
4.  **Environment Variables** (in Render Dashboard):
    *   Key: `VT_API_KEY`
    *   Value: `(Paste your VirusTotal Key)`
5.  **Deploy**: Click Create.
    *   Once live, copy your backend URL (e.g., `https://shield-brain.onrender.com`).

---

## 🌐 Step 3: Deploy Frontend (Vercel)
The frontend (interface) acts as the bridge.

1.  **Go to Vercel.com**:
    *   Add New Project -> Import from GitHub.
2.  **Configure Vercel**:
    *   **Root Directory**: `phishing-detector` (or leave empty if it's the root).
    *   **Framework Preset**: Create React App (Auto-detected).
3.  **Environment Variables** (Crucial Step):
    *   In Vercel settings, add a new variable:
    *   **Name**: `REACT_APP_API_URL`
    *   **Value**: `https://shield-brain.onrender.com` (The URL you got from Render).
    *   *Why*: This tells the React app to talk to the Cloud Backend instead of Localhost.
4.  **Deploy**: Click Deploy.

---

## ✅ Testing Cloud System
1.  Open your Vercel URL (e.g., `https://shield-ai.vercel.app`).
2.  Go to **Settings**.
3.  Check "System Health". It should say **"System Online"** and backend status **"Operational"**.
4.  Perform a scan. It should work without any terminal open on your laptop!

**Congratulations! Your Local Project is now a Global SaaS Product.** 🌍
