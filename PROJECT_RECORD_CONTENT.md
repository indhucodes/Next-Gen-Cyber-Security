# FINAL YEAR PROJECT REPORT CONTENT
**Project Title**: NEXT-GEN PHISHING DETECTION SYSTEM USING HYBRID AI
**Degree**: M.Sc Computer Science
**College**: AVP COLLEGE OF ARTS AND SCIENCE

---

## CHAPTER 1: INTRODUCTION

### 1.1 ABOUT THE PROJECT
The rapid digitalization of the modern world has brought with it an exponential increase in cyber threats, with **Phishing** remaining one of the most prevalent and damaging attack vectors. Phishing attacks deceive users into revealing sensitive information—such as login credentials and financial details—by impersonating legitimate entities. Traditional defense mechanisms, such as static blacklists and signature-based detection, behave reactively and often fail to detect zero-day or targeted spear-phishing attacks.

This project, **SHIELD.AI**, introduces a **Next-General Phishing Detection System** that employs a **Hybrid Intelligence Architecture**. Unlike conventional systems that rely on a single source of truth, SHIELD.AI integrates two distinct proactive engines:
1.  **Global Threat Grid (Cloud Intelligence)**: Leveraging the VirusTotal v3 API to cross-reference URLs against over 70 global security vendors in real-time.
2.  **Local Heuristic Cortex (Offline AI)**: A custom-built Python logic engine that analyzes URL semantics, suspicious keyword patterns, and obfuscation techniques locally, ensuring protection even without internet connectivity.

The system features a separate frontend and backend architecture (React.js and Flask), ensuring scalability and responsiveness. Key features include real-time forensic analysis, automated PDF report generation, and a "Live Attack Terminal" for visualizing threat vectors. This solution aims to provide a robust, user-friendly, and highly accurate defense mechanism against modern web-based social engineering attacks.

### 1.2 ORGANIZATION PROFILE
**AVP COLLEGE OF ARTS AND SCIENCE** is a premier institution dedicated to higher education and research.
*(Note: You can add 1-2 pages here about the college history, vision, mission, and the Computer Science department's achievements to fill pages)*.

### 1.3 SYSTEM SPECIFICATION

#### 1.3.1 HARDWARE REQUIREMENTS
To ensure optimal performance of the Hybrid AI Engine and the React Frontend, the following hardware specifications are recommended:
*   **Processor**: Intel Core i5 (8th Gen) or higher / AMD Ryzen 5.
*   **RAM**: 8 GB DDR4 (Minimum) / 16 GB (Recommended for smooth virtualization).
*   **Storage**: 256 GB SSD (Solid State Drive) for faster I/O operations.
*   **Display**: 15.6-inch HD Monitor (1366x768 resolution or higher).
*   **Peripheral Devices**: Standard Keyboard and Optical Mouse.
*   **Network**: Active Internet Connection (Wi-Fi/LAN) for Cloud Intelligence features.

#### 1.3.2 SOFTWARE REQUIREMENTS
The system is built using open-source technologies and requires the following environment:
*   **Operating System**: Windows 10 / 11 (64-bit Architecture).
*   **Coding Language**: Python 3.9 (Backend Logic), JavaScript (ES6+ for Frontend).
*   **Web Framework**: React.js (v18.2) for User Interface.
*   **Backend Framework**: Flask (Python Microframework).
*   **Database**: SQLite3 (Embedded Relational Database).
*   **IDE**: Visual Studio Code (VS Code) with Extensions for Python and ES7+ React.
*   **External APIs**: VirusTotal v3 API (Global Threat Intelligence).

### 1.4 SOFTWARE DESCRIPTION

#### 1.4.1 INTRODUCTION TO PYTHON
Python is a high-level, interpreted programming language known for its simplicity and readability. In this project, Python serves as the backbone of the server-side logic (`app.py`).
*   **Role in Project**: Python handles the API requests, runs the `LocalBrain` heuristic class, manages the SQLite database, and serves the REST API endpoints consumed by the frontend.
*   **Libraries Used**: `flask` (web server), `requests` (HTTP calls), `re` (Regular Expressions for URL analysis), `sqlite3` (database).

#### 1.4.2 REACT.JS (FRONTEND TECHNOLOGY)
React is a JavaScript library for building user interfaces.
*   **Role in Project**: It renders the Dynamic Dashboard, the Scanner Interface, and manages the state (e.g., Online/Offline toggle, Scan History).
*   **Component Structure**: The app is broken down into modular components like `Scanner.js` (Analysis Logic), `Overview.js` (Dashboard), and `LiveTerminal.js` (Visuals).

#### 1.4.3 ALGORITHMS (HEURISTIC & HYBRID ANALYSIS)
The core innovation of this project is the **Hybrid Scanning Algorithm**:
1.  **Input Parsing**: The URL is normalized and validated.
2.  **Mode Check**: The system checks user preference ("Online" or "Offline").
3.  **Branch 1 (Online - Cloud First)**:
    *   Query Global Threat Grid (VirusTotal).
    *   If Malicious Vote > 0: Flag as Phishing (High Confidence).
    *   If Suspicious > 1: Flag as Warning.
    *   **Fail-Safe**: If the Cloud is unreachable, *automatically fall back* to Branch 2.
4.  **Branch 2 (Local Heuristic Cortex)**:
    *   **Keyword Matching**: Scans for "login", "verify", "update" in suspicious contexts.
    *   **Obfuscation Detection**: Checks for IP usage (e.g., `192.168.x.x`), excessive subdomains, or "@" symbol redirection.
    *   **Scoring**: Assigns a risk score (0-100) based on cumulative weight of detected patterns.

---

## CHAPTER 2: SYSTEM STUDY

### 2.1 EXISTING SYSTEM
Current phishing detection mostly relies on **Blacklists** (e.g., Google Safe Browsing).
*   **Method**: The browser checks if the URL is in a known database of "bad sites".
*   **2.1.1 DRAWBACKS**:
    *   **Latency**: It takes hours or days for a new phishing site to be added to a blacklist.
    *   **Zero-Day Vulnerability**: Brand new phishing links (created seconds ago) are completely bypassed because they are "unknown".
    *   **Privacy**: Some systems send every visited URL to a central server.

### 2.2 PROPOSED SYSTEM
SHIELD.AI proposes a **Real-Time, Hybrid Analysis** approach.
*   **Method**: Instead of just checking a list, it *analyzes* the URL structure itself (Local Brain) AND checks the global reputation.
*   **2.2.1 FEATURES**:
    *   **Zero-Day Detection**: Can detect a phishing site created 1 minute ago if it uses suspicious patterns (like "secure-login-update.com").
    *   **Privacy Mode**: Users can force "Offline Mode" to scan sensitive links without sending them to the cloud.
    *   **Detailed Forensics**: Provides a PDF audit report explaining *why* a site was flagged.

---

## CHAPTER 3: SYSTEM DESIGN

### 3.1 SYSTEM ARCHITECTURE
*(Insert the Architecture Diagram here: User -> React App -> Flask API -> [Router] -> (VirusTotal API OR Local Brain) -> SQLite DB)*.

The system follows a **Microservices-style Architecture**:
1.  **Client Layer**: React.js Single Page Application (SPA).
2.  **API Gateway**: `app.py` receiving JSON payloads.
3.  **Logic Layer**: `local_brain.py` (The cortex).
4.  **Data Layer**: `phishing.db` (SQLite).

### 3.2 DATASET DESCRIPTION
While the system implements a rule-based Heuristic Engine, the "Online Mode" leverages the **VirusTotal Dataset**, which acts as a global consensus dataset aggregated from 70+ security vendors (Kaspersky, Sophos, BitDefender, etc.).
*   **Local Ruleset**: The `LocalBrain` class contains a proprietary "Bag of Words" list (e.g., 'wallet', 'auth', 'confirm') derived from analyzing common phishing kits.

### 3.3 DESCRIPTION OF MODULES
1.  **Scanner Module**: The core interface. Accepts URLs, triggers animations, and displays the "Risk Score" gauge.
2.  **Dashboard Module**: Displays live statistics, threat maps, and recent activity logs.
3.  **Settings Module**: Controls the "Engine Configuration" (Online/Offline Toggle) and System Health monitoring.
4.  **Live Terminal Module**: A visual component simulating the backend's thought process (`LiveTerminal.js`).

---

## CHAPTER 4: SYSTEM TESTING AND IMPLEMENTATION

### 4.1 SYSTEM TESTING
Testing ensures the application meets the requirements and is bug-free.

### 4.2 TYPES OF TESTING

#### 4.2.1 UNIT TESTING
*   **Objective**: Verify individual components.
*   **Test Case**: Testing the `LocalBrain.analyze()` function with a known bad URL (`http://192.168.1.1/login`).
    *   *Result*: Component correctly returned Score 80 and Verdict "Malicious".

#### 4.2.2 INTEGRATION TESTING
*   **Objective**: Verify Frontend-Backend communication.
*   **Test Case**: Clicking "Analyze" on React triggers the `/predict` endpoint on Flask.
    *   *Result*: JSON data flowed correctly, and the UI updated without refresh.

#### 4.2.3 FUNCTIONAL TESTING
*   Verified that the "Force Offline" toggle correctly disables internet calls in the backend.
*   Verified that PDF generation includes accurate timestamps and verdicts.

#### 4.2.4 SYSTEM TESTING
*   Tested the entire flow from "Launch" to "Scan" to "Report Download".

#### 4.2.5 ACCEPTANCE TESTING
*   Project was demonstrated to users who verified the "Simplicity" and "Speed" of the scan.

### 4.3 SYSTEM IMPLEMENTATION
The project is implemented using the **Create-React-App** boilerplate for the frontend and a virtual environment for Python.
*(Copy content from DEPLOYMENT_ROADMAP.md Phase 1, 2, 3 here for detailed Implementation Steps)*.

---

## CHAPTER 5: CONCLUSION AND FUTURE ENHANCEMENT

### 5.1 CONCLUSION
The **NEXT-GEN PHISHING DETECTOR (SHIELD.AI)** successfully demonstrates that a Hybrid approach is superior to single-method detection. by combining the speed and privacy of local heuristics with the vast knowledge of cloud intelligence, the system offers robust protection. The modular design allows for easy scalability, and the forensic reporting feature adds significant value for security analysts.

### 5.2 FUTURE ENHANCEMENT
1.  **Browser Extension**: Developing a Chrome/Edge plugin for automatic, in-browser blocking.
2.  **Machine Learning Model**: Training a Supervised Learning model (CNN/LSTM) on a large dataset to replace the heuristic logic.
3.  **Email Header Analysis**: Checking SPF/DKIM records to prevent email spoofing.
4.  **Docker Support**: Containerizing the application for cloud deployment (AWS/Azure).

---

## APPENDICES

### A. DATA FLOW DIAGRAM
*(Draw a diagram showing flow of data from User Input -> Request -> Analysis -> Response -> Report)*.

### B. SAMPLE CODING
*(Copy paste the full content of `backend/app.py` and `src/pages/Scanner.js` here)*.

### C. SCREEN SHOTS
*(Take screenshots of)*:
1.  **Dashboard** (Overview page).
2.  **Scanner - Safe Site** (Clean result).
3.  **Scanner - Phishing Site** (Red warning).
4.  **Scanner - Offline Mode** (The yellow popup).
5.  **Settings Page** (Showing System Offline/Online).
6.  **Generated PDF Report**.

---
**BIBLIOGRAPHY**
1.  VirusTotal API Documentation (v3).
2.  React.js Official Docs.
3.  "Phishing and Countermeasures" - Academic Research Papers (IEEE).
4.  Flask Microframework Documentation.
