import React, { useState, useEffect } from 'react';
import Header from '../components/Layout/Header';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Search, Loader2, AlertTriangle, CheckCircle, FileText, ArrowRight, RefreshCw, Shield, Globe, Server } from 'lucide-react';


const Scanner = ({ onScanComplete, backendUrl, isBackendOnline }) => {
    const [url, setUrl] = useState('');
    const [isScanning, setIsScanning] = useState(false);
    const [logs, setLogs] = useState([]);
    const [result, setResult] = useState(null);

    // --- Terminal Logs ---
    useEffect(() => {
        if (isScanning) {
            setLogs([]);
            const messages = [
                "Initializing Secure Handshake...",
                "Querying SHIELD.AI Defense Cloud...",
                "Extracting HTTP Headers & Meta Tags...",
                "Analyzing Global Threat Vectors...",
                "Compiling Forensic PDF Report..."
            ];
            let i = 0;
            const interval = setInterval(() => {
                if (i < messages.length) {
                    setLogs(prev => [`[${new Date().toLocaleTimeString()}] SYS: ${messages[i]}`, ...prev]);
                    i++;
                } else { clearInterval(interval); }
            }, 700);
            return () => clearInterval(interval);
        }
    }, [isScanning]);

    const handleScan = async () => {
        if (!url) return;
        setIsScanning(true);
        setResult(null);

        const executeScan = async () => {
            const mode = localStorage.getItem('engineMode') || 'online';
            const response = await fetch(`${backendUrl}/predict`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url, mode }),
            });
            if (!response.ok) throw new Error("Network response was not ok");
            return await response.json();
        };

        try {
            try {
                const data = await executeScan();
                setResult(data);
                // If we asked for Online but got Offline engine (Fallback triggered)
                const currentMode = localStorage.getItem('engineMode') || 'online';
                if (currentMode === 'online' && data.engine && data.engine.includes('Offline')) {
                    alert("⚠️ Network Unavailable: Switched to Local Brain for this scan.");
                }
                onScanComplete({ url, ...data, time: new Date().toLocaleTimeString() });
            } catch (firstError) {
                await new Promise(resolve => setTimeout(resolve, 500));
                const data = await executeScan();
                setResult(data);
                onScanComplete({ url, ...data, time: new Date().toLocaleTimeString() });
            }
        } catch (finalError) {
            alert("Connection Error. Ensure Backend is running.");
        } finally {
            setIsScanning(false);
        }
    };

    const downloadReport = () => {
        if (!result) return;
        const doc = new jsPDF();

        // Colors
        const deepBlue = [15, 23, 42];
        const cyan = [6, 182, 212];
        const red = [239, 68, 68];
        const green = [34, 197, 94];
        const slate = [100, 116, 139];

        // --- HEADER ---
        doc.setFillColor(...deepBlue);
        doc.rect(0, 0, 210, 40, 'F');

        doc.setFont("helvetica", "bold");
        doc.setFontSize(22);
        doc.setTextColor(255, 255, 255);
        doc.text("SHIELD.AI", 15, 20);

        doc.setFontSize(10);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(...cyan);
        doc.text("CYBER DEFENSE INTELLIGENCE REPORT", 15, 28);

        // Meta Info (Right)
        doc.setFontSize(8);
        doc.setTextColor(150, 150, 150);
        doc.text(`RID: ${Math.random().toString(36).substr(2, 9).toUpperCase()}`, 195, 18, { align: 'right' });
        doc.text(`Generated: ${new Date().toLocaleString()}`, 195, 23, { align: 'right' });
        doc.text("Classification: CONFIDENTIAL", 195, 28, { align: 'right' });

        // --- VERDICT HERO SECTION ---
        const isMalicious = result.score > 50;
        const verdictColor = isMalicious ? red : green;

        // Verdict Box
        doc.setDrawColor(...verdictColor);
        doc.setLineWidth(1);
        doc.setFillColor(248, 250, 252);
        doc.roundedRect(15, 50, 180, 40, 3, 3, 'FD');

        // Verdict Icon
        doc.setFillColor(...verdictColor);
        doc.circle(30, 70, 8, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(14);
        doc.setFont("zapfdingbats");
        doc.text(isMalicious ? "8" : "4", 30, 73, { align: 'center' }); // 8=X, 4=Check in ZapfDingbats (or use char code)
        // Reset Font
        doc.setFont("helvetica", "bold");

        // Verdict Text
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(16);
        doc.text(result.status ? result.status.toUpperCase() : "UNKNOWN", 45, 65);

        doc.setFontSize(10);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(...slate);
        doc.text("Automated Heuristic & Threat Intelligence Analysis", 45, 72);

        // Score Badge
        doc.setFontSize(24);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(...verdictColor);
        doc.text(`${result.score}`, 175, 68, { align: 'right' });
        doc.setFontSize(8);
        doc.text("/ 100 RISK SCORE", 175, 75, { align: 'right' });

        // Target URL
        doc.setFontSize(9);
        doc.setTextColor(0, 0, 0);
        doc.text(`TARGET: ${url}`, 15, 100);

        // --- TABLES ---
        let finalY = 110;

        // 1. Network Intel
        if (result.vt_stats) {
            doc.setFontSize(11);
            doc.setTextColor(...deepBlue);
            doc.setFont("helvetica", "bold");
            doc.text("Target Intelligence", 15, finalY);
            doc.setDrawColor(...cyan);
            doc.line(15, finalY + 2, 60, finalY + 2);

            autoTable(doc, {
                startY: finalY + 8,
                head: [['Parameter', 'Extracted Value']],
                body: [
                    ['Final Resolution', result.vt_stats.final_url || 'N/A'],
                    ['Serving IP', result.vt_stats.serving_ip || 'Hidden'],
                    ['HTTP Status', result.vt_stats.http_code || 'N/A'],
                    ['Web Server', (result.vt_stats.headers && result.vt_stats.headers.server) ? result.vt_stats.headers.server : 'Unknown'],
                    ['Domain Reputation', `${result.vt_stats.reputation || '0'} / 100`]
                ],
                theme: 'grid',
                headStyles: {
                    fillColor: deepBlue,
                    textColor: 255,
                    fontStyle: 'bold',
                    lineWidth: 0
                },
                columnStyles: { 0: { fontStyle: 'bold', cellWidth: 50 } },
                styles: { fontSize: 9, cellPadding: 3 }
            });
            finalY = doc.lastAutoTable.finalY + 15;
        }

        // 2. Vendor Analysis
        if (result.vt_stats && result.vt_stats.vendors) {
            doc.setFontSize(11);
            doc.setTextColor(...deepBlue);
            doc.text("Global Vendor Consensus", 15, finalY);
            doc.setDrawColor(...cyan);
            doc.line(15, finalY + 2, 70, finalY + 2);

            const vendorRows = result.vt_stats.vendors.map(v => [
                v.name,
                v.status || 'Unknown',
                v.result || 'Clean'
            ]);

            autoTable(doc, {
                startY: finalY + 8,
                head: [['Security Vendor', 'Classification', 'Result']],
                body: vendorRows,
                theme: 'grid',
                headStyles: {
                    fillColor: deepBlue,
                    textColor: 255,
                    fontStyle: 'bold'
                },
                didParseCell: function (data) {
                    if (data.section === 'body' && data.column.index === 2) {
                        const text = data.cell.raw;
                        if (['malicious', 'phishing', 'malware'].includes(text.toLowerCase())) {
                            data.cell.styles.textColor = red;
                            data.cell.styles.fontStyle = 'bold';
                        } else if (['clean', 'harmless'].includes(text.toLowerCase())) {
                            data.cell.styles.textColor = green;
                        }
                    }
                },
                styles: { fontSize: 8 }
            });
        } else {
            // Local Fallback
            autoTable(doc, {
                startY: finalY + 8,
                head: [['Analysis Engine', 'Result']],
                body: [['SHIELD.AI Local Cortex', result.details || 'Pattern Match']],
                theme: 'grid',
                headStyles: { fillColor: deepBlue }
            });
        }

        // Footer
        const pageCount = doc.internal.getNumberOfPages();
        for (let i = 1; i <= pageCount; i++) {
            doc.setPage(i);
            doc.setFontSize(8);
            doc.setTextColor(200, 200, 200);
            doc.text(`SHIELD.AI | Generated by Local Neural Engine | Page ${i} of ${pageCount}`, 105, 290, { align: 'center' });
        }

        doc.save(`SHIELD_Forensic_Report_${Date.now()}.pdf`);
    };

    return (
        <div className="pb-20 min-h-screen bg-[#0F172A] text-slate-100 font-sans">
            <Header title="Cyber Threat Scanner" />

            <div className="max-w-5xl mx-auto px-6 py-12 space-y-10">

                {/* --- 1. SEARCH INTERFACE --- */}
                {!result && !isScanning && (
                    <div
                        className="text-center space-y-8 py-10 animate-fade-in-up"
                    >
                        <div className="space-y-4">
                            <h2 className="text-5xl font-black text-white tracking-tighter">
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-600">
                                    Search & Destroy.
                                </span>
                            </h2>
                            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                                Deploy advanced heuristics and global threat intelligence to neutralize digital threats in real-time.
                            </p>
                        </div>

                        <div className="relative max-w-3xl mx-auto group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                            <div className="relative flex items-center bg-[#1E293B] rounded-xl p-2 shadow-2xl border border-slate-700/50">
                                <Search className="ml-4 text-slate-500" size={20} />
                                <input
                                    className="w-full bg-transparent p-4 outline-none text-white font-mono text-base placeholder:text-slate-500"
                                    placeholder="Enter suspicious URL for deep scan..."
                                    value={url}
                                    onChange={(e) => setUrl(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleScan()}
                                />
                                <button
                                    disabled={!isBackendOnline}
                                    onClick={handleScan}
                                    className={`px-8 py-3 rounded-lg font-bold text-sm uppercase tracking-wider transition-all flex items-center gap-2 ${isBackendOnline ? 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-lg shadow-cyan-900/20' : 'bg-slate-700 text-slate-500 cursor-not-allowed'}`}
                                >
                                    Analyze <ArrowRight size={16} />
                                </button>
                            </div>
                        </div>

                        {/* Quick Stats or Tips */}
                        <div className="grid grid-cols-3 gap-6 max-w-3xl mx-auto text-left opacity-60">
                            <div className="flex items-center gap-3 p-4 rounded bg-slate-800/50 border border-slate-700">
                                <Shield className="text-emerald-400" />
                                <div>
                                    <h4 className="font-bold text-white text-sm">Local Heuristics</h4>
                                    <p className="text-xs text-slate-400">Offline Analysis Pattern</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-4 rounded bg-slate-800/50 border border-slate-700">
                                <Globe className="text-blue-400" />
                                <div>
                                    <h4 className="font-bold text-white text-sm">Global Grid</h4>
                                    <p className="text-xs text-slate-400">Cloud Intelligence API</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-4 rounded bg-slate-800/50 border border-slate-700">
                                <Server className="text-purple-400" />
                                <div>
                                    <h4 className="font-bold text-white text-sm">Forensic Logs</h4>
                                    <p className="text-xs text-slate-400">Deep Packet Inspection</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* --- 2. SCANNING TERMINAL --- */}
                {isScanning && (
                    <div className="w-full max-w-3xl mx-auto bg-[#0B1120] rounded-xl border border-slate-800 p-8 font-mono text-sm text-cyan-400 h-64 overflow-hidden flex flex-col-reverse shadow-2xl relative">
                        {logs.map((log, i) => (
                            <div key={i} className="opacity-90 border-l-2 border-cyan-800 pl-3 mb-2 animate-fade-in text-xs md:text-sm">
                                <span className="text-slate-500 mr-2">{'>'}</span> {log}
                            </div>
                        ))}
                        <div className="absolute top-4 right-4 text-[10px] text-slate-500 uppercase font-bold tracking-widest animate-pulse">
                            ystem Analysis In Progress...
                        </div>
                        <Loader2 className="absolute bottom-4 right-4 text-cyan-600 animate-spin opacity-50" size={24} />
                    </div>
                )}

                {/* --- 3. RESULT DASHBOARD (The Redesign) --- */}
                {result && !isScanning && (
                    <div
                        className="bg-[#1E293B] border border-slate-700 rounded-3xl overflow-hidden shadow-2xl animate-fade-in-up"
                    >
                        {/* Header Banner */}
                        <div className={`p-8 md:p-12 flex flex-col md:flex-row items-center justify-between border-b border-slate-700/50 ${result.score > 50 ? 'bg-gradient-to-r from-red-950/50 to-slate-900' : 'bg-gradient-to-r from-emerald-950/50 to-slate-900'}`}>
                            <div className="flex items-center gap-6">
                                <div className={`p-4 rounded-2xl ${result.score > 50 ? 'bg-red-500/10 text-red-500' : 'bg-emerald-500/10 text-emerald-500'}`}>
                                    {result.score > 50 ? <AlertTriangle size={40} /> : <CheckCircle size={40} />}
                                </div>
                                <div>
                                    <h2 className={`text-4xl md:text-5xl font-black tracking-tight ${result.score > 50 ? 'text-red-500' : 'text-emerald-400'}`}>
                                        {result.status || 'UNKNOWN'}
                                    </h2>
                                    <p className="text-slate-400 font-mono text-sm mt-1 uppercase tracking-widest">Target: {url}</p>
                                </div>
                            </div>

                            <div className="mt-8 md:mt-0 text-center md:text-right">
                                <div className={`text-6xl font-black ${result.score > 50 ? 'text-white' : 'text-white'}`}>{result.score}%</div>
                                <div className={`text-xs font-bold uppercase tracking-widest mt-2 px-3 py-1 rounded-full inline-block ${result.score > 50 ? 'bg-red-600 text-white' : 'bg-emerald-600 text-white'}`}>
                                    Risk Probability
                                </div>
                            </div>
                        </div>

                        {/* Analysis Grid */}
                        <div className="p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-12">

                            {/* Left: Intelligence */}
                            <div className="space-y-6">
                                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest border-b border-slate-700 pb-3 mb-4">Threat Intelligence</h4>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center p-4 bg-slate-800/50 rounded-xl border border-slate-700">
                                        <span className="text-slate-400 text-sm">Origin</span>
                                        <span className="font-mono text-cyan-400 font-bold">{result.geo?.origin || 'Unknown'}</span>
                                    </div>
                                    <div className="flex justify-between items-center p-4 bg-slate-800/50 rounded-xl border border-slate-700">
                                        <span className="text-slate-400 text-sm">Engine</span>
                                        <span className="font-mono text-white text-xs">{result.engine || 'Standard'}</span>
                                    </div>
                                </div>

                                <div className="mt-6">
                                    <p className="text-slate-300 italic leading-relaxed text-sm bg-slate-800/30 p-4 rounded-lg border-l-2 border-cyan-500">
                                        "{result.details}"
                                    </p>
                                </div>
                            </div>

                            {/* Right: Forensic Markers */}
                            <div className="space-y-6">
                                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest border-b border-slate-700 pb-3 mb-4">Forensic Markers</h4>
                                {result.reasons && result.reasons.length > 0 ? (
                                    <ul className="space-y-3">
                                        {result.reasons.map((r, i) => (
                                            <li key={i} className="flex items-start gap-3 text-sm text-slate-300">
                                                <div className={`mt-1.5 min-w-[6px] h-1.5 rounded-full ${result.score > 50 ? 'bg-red-500' : 'bg-emerald-500'}`} />
                                                <span>{r}</span>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <div className="text-slate-500 text-sm italic">No specific threat patterns detected.</div>
                                )}
                            </div>
                        </div>

                        {/* UNIFIED ACTION BAR (Footer) */}
                        <div className="bg-[#0B1120] p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-slate-800">
                            <div className="flex items-center gap-2 text-slate-500 text-xs uppercase tracking-widest hidden md:flex">
                                <Shield size={14} /> Shield.AI Protected Session
                            </div>

                            <div className="flex items-center gap-4 w-full md:w-auto">
                                <button
                                    onClick={() => { setResult(null); setUrl(''); }}
                                    className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-4 border border-slate-700 text-slate-300 font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-slate-800 hover:text-white transition group"
                                >
                                    <RefreshCw size={16} className="group-hover:rotate-180 transition duration-500" /> New Scan
                                </button>

                                <button
                                    onClick={downloadReport}
                                    className="flex-1 md:flex-none flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold text-xs uppercase tracking-widest rounded-xl hover:shadow-lg hover:shadow-cyan-500/25 transition transform hover:-translate-y-0.5"
                                >
                                    <FileText size={16} /> Download Report
                                </button>
                            </div>
                        </div>

                    </div>
                )}

            </div>
        </div>
    );
};

export default Scanner;
