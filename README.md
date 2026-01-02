# 🛡️ SHIELD.AI: Next-Gen Phishing Detection System
**M.Sc Computer Science Final Year Project (2025)**

**Project Scholar:** INDUMATHI J (Reg No: 2432K0488)  
**Institution:** AVP COLLEGE OF ARTS AND SCIENCE  
**Department:** Computer Science  

---

## 📌 Abstract
SHIELD.AI is an advanced cybersecurity platform designed to detect and neutralize phishing threats in real-time. Unlike traditional blacklist-based protections, SHIELD.AI utilizes a **Hybrid Neural Engine** that combines **Global Threat Grid (Cloud Intelligence)** with a **Local Heuristic Cortex (Offline AI)** to analyze URL patterns, SSL certificates, and forensic indicators.

## 🚀 Key Features
- **Hybrid Detection Engine**: Automatically switches between Cloud Intelligence (Online) and Local Heuristics (Offline).
- **Offline Privacy Mode**: Capable of detecting threats without internet access using valid local logic.
- **Forensic PDF Reports**: Generates detailed, downloadable security audit reports for any scanned URL.
- **Live Threat Visualization**: Real-time "Hacker-style" terminal feed displaying active threat interceptions.
- **Admin Console**: dedicated project administration and developer attribution page.
- **Data Persistence**: SQLite database tracks scan history and generates threat trends.

## 🛠️ Technology Stack
### Frontend (User Interface)
- **Framework**: React.js (v18)
- **Styling**: Tailwind CSS (Modern, Responsive Design)
- **Icons**: Lucide-React
- **Visualization**: CSS Animations & Glassmorphism

### Backend (Core Logic)
- **Server**: Python Flask (API)
- **Database**: SQLite3
- **Intelligence**: Global Threat Intelligence v3 API
- **Local Brain**: Custom Python Heuristic Class (`local_brain.py`)

## ⚙️ Installation & Run Guide

### Prerequisites
- Node.js (v16+)
- Python (v3.9+)

### 1. Backend Setup (API)
1. Navigate to the `backend` folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   pip install flask flask-cors requests python-dotenv pandas scikit-learn
   ```
3. **Train AI Model (Important):**
   ```bash
   python train_model.py
   ```
   *Trains the local engine with the latest phishing dataset.*

4. Start the server:
   ```bash
   python app.py
   ```
   *Server will start at `http://127.0.0.1:5000`*

### 2. Frontend Setup (UI)
1. Open a new terminal and navigate to the project root:
   ```bash
   cd ..
   ```
2. Install node modules (first time only):
   ```bash
   npm install
   ```
3. Start the application:
   ```bash
   npm start
   ```
   *Client will launch at `http://localhost:3000`*

## 📖 Usage Guide
1. **Dashboard**: Monitor global threat levels and live terminal activity.
2. **Scanner**: Enter any URL to scan. 
   - *Tip*: Go to **Settings** and toggle "Force Offline Mode" to test the Local Brain.
3. **History**: View past scans and check risk scores.
4. **Admin**: Click "Admin Console" in the header to view project details.

## 🛡️ License
This project is developed for educational and research purposes as part of the M.Sc Final Year Curriculum.

---
*© 2025 Indumathi J. All Rights Reserved.*
