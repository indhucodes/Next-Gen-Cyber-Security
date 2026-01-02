# How to Run SHIELD.AI Phishing Detector

## Prerequisites
- **Node.js**: Installed
- **Python**: Installed

## Step 1: Start the Backend (Flask API)
1. Open a **new terminal**.
2. Navigate to the backend folder:
   ```powershell
   cd "d:\Ganesh\Documents\Indhu\MSC\Final Year Project\Next-Gen Cyber Security -Local\phishing-detector\backend"
   ```
3. Install Python dependencies:
   ```powershell
   pip install flask flask-cors requests scikit-learn
   ```
4. Run the server:
   ```powershell
   python app.py
   ```
   *You should see "Running on http://0.0.0.0:5000"*

## Step 2: Start the Frontend (React Dashboard)
1. Open a **second terminal**.
2. Navigate to the project root:
   ```powershell
   cd "d:\Ganesh\Documents\Indhu\MSC\Final Year Project\Next-Gen Cyber Security -Local\phishing-detector"
   ```
3. Install Node dependencies:
   ```powershell
   npm install --legacy-peer-deps
   ```
   *(This flag is required because some libraries are not yet updated for React 19)*
4. Start the dashboard:
   ```powershell
   npm start
   ```
   *This will open http://localhost:3000 in your browser.*

## Notes
- Ensure both terminals stay open.
- The dashboard communicates with the backend on port 5000.
