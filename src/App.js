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
        const response = await fetch(`${BACKEND_URL}/health`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          // Add timeout to prevent hanging
          signal: AbortSignal.timeout(3000)
        });

        if (response.ok) {
          setIsBackendOnline(true);
          // Load History if Online
          try {
            const histRes = await fetch(`${BACKEND_URL}/history`);
            if (histRes.ok) {
              const histData = await histRes.json();
              setHistory(histData);
            }
          } catch (histError) {
            console.log('Failed to load history:', histError);
          }
        } else {
          setIsBackendOnline(false);
        }
      } catch (error) {
        // Network error, timeout, or backend is down
        setIsBackendOnline(false);
      }
    };
    checkBackend();
    const interval = setInterval(checkBackend, 5000);
    return () => clearInterval(interval);
  }, [BACKEND_URL]);

  const handleScanComplete = (newRecord) => {
    setHistory(prev => [newRecord, ...prev]);
  };

  return (
    <Router>
      <MainLayout isBackendOnline={isBackendOnline} history={history}>
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
