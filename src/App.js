import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './components/Layout/MainLayout';
import Overview from './pages/Overview';
import Scanner from './pages/Scanner';
import History from './pages/History';
import Settings from './pages/Settings';
import Admin from './pages/Admin';

function App() {
  const [history, setHistory] = useState([]);
  const [isBackendOnline, setIsBackendOnline] = useState(false);

  const BACKEND_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:5000";

  // --- Backend Handshake & Data Load ---
  useEffect(() => {
    const checkBackend = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/health`);
        setIsBackendOnline(response.ok);

        // Load History if Online
        if (response.ok) {
          const histRes = await fetch(`${BACKEND_URL}/history`);
          const histData = await histRes.json();
          setHistory(histData);
        }
      } catch { setIsBackendOnline(false); }
    };
    checkBackend();
    const interval = setInterval(checkBackend, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleScanComplete = (newRecord) => {
    setHistory(prev => [newRecord, ...prev]);
  };

  return (
    <Router>
      <MainLayout isBackendOnline={isBackendOnline}>
        <Routes>
          <Route path="/" element={<Overview history={history} isBackendOnline={isBackendOnline} />} />
          <Route path="/scanner" element={<Scanner onScanComplete={handleScanComplete} backendUrl={BACKEND_URL} isBackendOnline={isBackendOnline} />} />
          <Route path="/history" element={<History history={history} />} />
          <Route path="/settings" element={<Settings isBackendOnline={isBackendOnline} backendUrl={BACKEND_URL} />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;