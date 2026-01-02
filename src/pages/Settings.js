import React, { useState } from 'react';
import Header from '../components/Layout/Header';
import { Trash2, Database, Shield, Server, Info, Layers, RefreshCw, Cpu, Activity } from 'lucide-react';

const Settings = ({ isBackendOnline, backendUrl }) => {
    const [clearing, setClearing] = useState(false);
    const [rebooting, setRebooting] = useState(false);

    // Initialize from localStorage or default to 'online'
    const [engineMode, setEngineMode] = useState(localStorage.getItem('engineMode') || 'online');

    const BACKEND_URL = backendUrl || "http://127.0.0.1:5000";

    const toggleEngine = () => {
        const newMode = engineMode === 'online' ? 'offline' : 'online';
        setEngineMode(newMode);
        localStorage.setItem('engineMode', newMode);
    };

    const clearHistory = async () => {
        if (!window.confirm("WARNING: Are you sure you want to delete all scan history? This action is irreversible.")) return;

        setClearing(true);
        try {
            const response = await fetch(`${BACKEND_URL}/history`, { method: 'DELETE' });
            if (response.ok) {
                alert("Database successfully wiped.");
                window.location.reload();
            } else {
                alert("Failed to clear database.");
            }
        } catch (e) {
            alert("Connection Error");
        } finally {
            setClearing(false);
        }
    };

    const handleResetSystem = () => {
        if (!window.confirm("Reboot System Services? This will restart the frontend interface.")) return;
        setRebooting(true);
        setTimeout(() => {
            window.location.reload();
        }, 1500);
    };

    return (
        <div className="pb-20">
            <Header title="System Configuration" />

            <div className="max-w-6xl mx-auto px-6 py-8 space-y-6 animate-fade-in">

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                    {/* CARD 1: INTELLIGENCE ENGINE */}
                    <div className="bg-[#1E293B]/50 border border-slate-700/50 rounded-2xl p-6 shadow-xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition">
                            <Cpu size={100} className="text-cyan-400" />
                        </div>
                        <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2 relative z-10">
                            <Layers className="text-cyan-400" size={20} /> Intelligence Engine
                        </h3>

                        <div className="flex items-center justify-between p-4 bg-[#0F172A]/80 rounded-xl border border-slate-800 relative z-10 backdrop-blur-sm">
                            <div>
                                <h4 className="font-bold text-white flex items-center gap-2">
                                    Mode Selection
                                    <span className={`text-[10px] uppercase px-2 py-0.5 rounded ${engineMode === 'offline' ? 'bg-amber-500/20 text-amber-400' : 'bg-emerald-500/20 text-emerald-400'}`}>
                                        {engineMode === 'offline' ? 'Local Only' : 'Hybrid Cloud'}
                                    </span>
                                </h4>
                                <p className="text-xs text-slate-400 mt-1 max-w-xs">
                                    {engineMode === 'offline'
                                        ? "Strict Offline Mode. Using local neural heuristics only."
                                        : "Standard Mode. Leveraging VirusTotal API + Local Engine."}
                                </p>
                            </div>
                            <button
                                onClick={toggleEngine}
                                className={`relative w-14 h-7 rounded-full transition-colors duration-300 focus:outline-none ${engineMode === 'offline' ? 'bg-slate-600' : 'bg-cyan-600'}`}
                            >
                                <div className={`absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition-transform duration-300 ${engineMode === 'offline' ? 'translate-x-0' : 'translate-x-7'}`}></div>
                            </button>
                        </div>
                    </div>

                    {/* CARD 2: SYSTEM HEALTH */}
                    <div className="bg-[#1E293B]/50 border border-slate-700/50 rounded-2xl p-6 shadow-xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition">
                            <Activity size={100} className="text-emerald-400" />
                        </div>
                        <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2 relative z-10">
                            <Server className="text-emerald-400" size={20} /> System Health
                        </h3>
                        <div className="space-y-3 relative z-10">
                            <div className="flex justify-between items-center bg-[#0F172A]/50 p-3 rounded-lg border border-slate-800">
                                <span className="text-sm text-slate-400 font-mono">Backend API</span>
                                <span className={`text-xs font-bold px-2 py-1 rounded ${isBackendOnline ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-500'}`}>
                                    {isBackendOnline ? 'ONLINE' : 'OFFLINE'}
                                </span>
                            </div>
                            <div className="flex justify-between items-center bg-[#0F172A]/50 p-3 rounded-lg border border-slate-800">
                                <span className="text-sm text-slate-400 font-mono">Threat Grid</span>
                                <span className={`text-xs font-bold px-2 py-1 rounded ${isBackendOnline ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-500'}`}>
                                    {isBackendOnline ? 'CONNECTED' : 'UNREACHABLE'}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* CARD 3: MAINTENANCE (FULL WIDTH) */}
                <div className="bg-[#1E293B]/50 border border-slate-700/50 rounded-2xl p-6 shadow-xl">
                    <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                        <Database className="text-purple-400" size={20} /> System Maintenance
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Clear DB */}
                        <div className="flex items-center justify-between p-4 bg-red-950/10 border border-red-500/20 rounded-xl hover:border-red-500/40 transition group">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-red-500/10 rounded-full text-red-500 group-hover:scale-110 transition">
                                    <Trash2 size={20} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-white text-sm">Format Database</h4>
                                    <p className="text-xs text-slate-500">Wipe all local scan logs</p>
                                </div>
                            </div>
                            <button
                                onClick={clearHistory}
                                disabled={clearing}
                                className="px-4 py-2 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white border border-red-500/50 rounded-lg text-xs font-bold uppercase tracking-wider transition-all"
                            >
                                {clearing ? 'Wiping...' : 'Format'}
                            </button>
                        </div>

                        {/* System Reboot */}
                        <div className="flex items-center justify-between p-4 bg-blue-950/10 border border-blue-500/20 rounded-xl hover:border-blue-500/40 transition group">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-blue-500/10 rounded-full text-blue-500 group-hover:rotate-180 transition duration-700">
                                    <RefreshCw size={20} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-white text-sm">System Reboot</h4>
                                    <p className="text-xs text-slate-500">Restart interface services</p>
                                </div>
                            </div>
                            <button
                                onClick={handleResetSystem}
                                disabled={rebooting}
                                className="px-4 py-2 bg-blue-500/10 hover:bg-blue-500 text-blue-500 hover:text-white border border-blue-500/50 rounded-lg text-xs font-bold uppercase tracking-wider transition-all"
                            >
                                {rebooting ? 'Rebooting...' : 'Reboot'}
                            </button>
                        </div>
                    </div>
                </div>

                {/* APP INFO FOOTER */}
                <div className="text-center pt-8 border-t border-slate-800/50">
                    <p className="text-xs text-slate-600 font-mono">
                        SHIELD.AI CORE v2.4.0 <span className="mx-2">|</span> BUILD 2026.01.02
                    </p>
                </div>

            </div>
        </div>
    );
};

export default Settings;
