import React, { useState, useEffect } from 'react';
import { Terminal } from 'lucide-react';

const LiveTerminal = () => {
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        const events = [
            "Analyzing inbound packet: 192.168.1.105 via TCP/80",
            "Heuristic scan initialized: No threats detected",
            "BLOCKING malicious IP: 45.33.22.11 [Generic.Phish]",
            "Updating Threat Definitions DB v2.0.5...",
            "SSL Certificate validation passed for domain: secure.com",
            "WARNING: Suspicious payload detected in /login.php",
            "Sanitizing input parameters...",
            "Global Threat Grid synchronized.",
            "Handshake verified: 200 OK",
            "Firewall rule applied: DROP 10.0.0.55"
        ];

        const interval = setInterval(() => {
            const randomEvent = events[Math.floor(Math.random() * events.length)];
            const time = new Date().toLocaleTimeString('en-US', { hour12: false });
            setLogs(prev => [`[${time}] ${randomEvent}`, ...prev].slice(0, 8)); // Keep last 8 logs
        }, 1500);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="bg-[#0B1120] border border-slate-800 rounded-xl p-4 font-mono text-xs h-full flex flex-col shadow-2xl overflow-hidden relative group">
            <div className="flex items-center justify-between mb-3 border-b border-slate-800 pb-2">
                <div className="flex items-center gap-2 text-slate-400">
                    <Terminal size={14} />
                    <span className="font-bold uppercase tracking-widest text-[10px]">Live Threat Feed</span>
                </div>
                <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-red-500/50"></div>
                    <div className="w-2 h-2 rounded-full bg-yellow-500/50"></div>
                    <div className="w-2 h-2 rounded-full bg-green-500/50"></div>
                </div>
            </div>

            <div className="flex-1 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0B1120]/80 pointer-events-none z-10"></div>
                <div className="space-y-2">
                    {logs.map((log, i) => (
                        <div key={i} className={`truncate transition-all duration-500 ${i === 0 ? 'text-emerald-400 text-shadow-glow' : 'text-slate-500 opacity-60'}`}>
                            {i === 0 && <span className="inline-block w-2 h-4 bg-emerald-500 mr-2 animate-pulse align-middle"></span>}
                            {log}
                        </div>
                    ))}
                </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent opacity-20"></div>
        </div>
    );
};

export default LiveTerminal;
