import React from 'react';
import Header from '../components/Layout/Header';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Filter, Download } from 'lucide-react';

const History = ({ history }) => {
    // Mock trend data + real history mapping
    const data = [
        { name: 'Mon', scans: 400, threats: 240 },
        { name: 'Tue', scans: 300, threats: 139 },
        { name: 'Wed', scans: 200, threats: 98 },
        { name: 'Thu', scans: 278, threats: 39 },
        { name: 'Fri', scans: 189, threats: 48 },
        { name: 'Sat', scans: 239, threats: 38 },
        { name: 'Sun', scans: 349, threats: 43 },
    ];

    const handleExportExcel = () => {
        if (!history || history.length === 0) {
            alert("No data to export.");
            return;
        }

        const tableContent = `
            <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
            <head>
                <meta http-equiv="content-type" content="application/vnd.ms-excel; charset=UTF-8">
                <!--[if gte mso 9]>
                <xml>
                <x:ExcelWorkbook>
                <x:ExcelWorksheets>
                    <x:ExcelWorksheet>
                    <x:Name>Shield Threat Logs</x:Name>
                    <x:WorksheetOptions>
                    <x:DisplayGridlines/>
                    </x:WorksheetOptions>
                    </x:ExcelWorksheet>
                </x:ExcelWorksheets>
                </x:ExcelWorkbook>
                </xml>
                <![endif]-->
                <style>
                    body { font-family: 'Arial', sans-serif; }
                    .header { background-color: #1e3a8a; color: #ffffff; font-weight: bold; font-size: 16px; text-align: center; padding: 15px; border-bottom: 2px solid #fbbf24; }
                    .sub-header { background-color: #f8fafc; color: #475569; font-size: 14px; font-weight: bold; text-align: right; padding: 5px; }
                    .col-head { background-color: #0f766e; color: #ffffff; font-weight: bold; border: 1px solid #cbd5e1; padding: 10px; text-transform: uppercase; }
                    .row-even { background-color: #f1f5f9; color: #334155; border: 1px solid #e2e8f0; }
                    .row-odd { background-color: #ffffff; color: #334155; border: 1px solid #e2e8f0; }
                    .row-threat { background-color: #fee2e2; color: #991b1b; border: 1px solid #fca5a5; font-weight: bold; }
                    .verdict-malicious { color: #dc2626; font-weight: bold; }
                    .verdict-safe { color: #16a34a; font-weight: bold; }
                </style>
            </head>
            <body>
                <table border="1">
                    <tr><td colspan="5" class="header">SHIELD.AI THREAT INTELLIGENCE LOGS</td></tr>
                    <tr><td colspan="5" class="sub-header">Generated On: ${new Date().toLocaleString()}</td></tr>
                    <tr>
                        <th class="col-head" style="width: 180px;">Timestamp</th>
                        <th class="col-head" style="width: 400px;">Target Entity (URL)</th>
                        <th class="col-head" style="width: 200px;">Detection Engine</th>
                        <th class="col-head" style="width: 120px;">Verdict</th>
                        <th class="col-head" style="width: 100px;">Risk Score</th>
                    </tr>
                    ${history.map((h, i) => {
            const isThreat = h.status.includes('Phishing') || h.score > 50;
            const rowClass = isThreat ? 'row-threat' : (i % 2 === 0 ? 'row-even' : 'row-odd');
            return `
                        <tr>
                            <td class="${rowClass}">${h.time}</td>
                            <td class="${rowClass}">${h.url}</td>
                            <td class="${rowClass}">${h.vt_stats ? "Global Threat Grid" : "Local Brain"}</td>
                            <td class="${rowClass}">${h.status}</td>
                            <td class="${rowClass}">${h.score}%</td>
                        </tr>
                    `}).join('')}
                </table>
            </body>
            </html>
        `;

        const blob = new Blob([tableContent], { type: 'application/vnd.ms-excel' });
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", `shield_history_report_${Date.now()}.xls`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="pb-20">
            <Header title="Analysis Log" />

            <div className="px-8 py-8 space-y-8 animate-fade-in">

                {/* CHART SECTION */}
                <div className="bg-[#1E293B]/50 border border-slate-700 rounded-2xl p-6 shadow-xl relative overflow-hidden">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xs font-bold text-white uppercase tracking-widest">Threat Velocity</h3>
                        <div className="flex gap-2">
                            <button className="p-2 hover:bg-slate-700 rounded text-slate-400"><Filter size={16} /></button>
                        </div>
                    </div>
                    <div className="h-[250px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={data}>
                                <defs>
                                    <linearGradient id="colorThreats" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#f43f5e" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="colorScans" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
                                <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', color: '#fff' }}
                                    itemStyle={{ fontSize: '12px' }}
                                />
                                <Area type="monotone" dataKey="scans" stroke="#06b6d4" fillOpacity={1} fill="url(#colorScans)" />
                                <Area type="monotone" dataKey="threats" stroke="#f43f5e" fillOpacity={1} fill="url(#colorThreats)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* TABLE SECTION */}
                <div className="bg-[#1E293B]/50 border border-slate-700 rounded-2xl overflow-hidden shadow-xl">
                    <div className="px-6 py-4 border-b border-slate-700 flex justify-between items-center flex-wrap gap-4">
                        <h3 className="text-xs font-bold text-white uppercase tracking-widest">Detailed Logs</h3>
                        <button onClick={handleExportExcel} className="text-xs font-bold text-cyan-400 uppercase tracking-widest flex items-center gap-2 hover:text-white transition">
                            <Download size={14} /> Export Excel
                        </button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm text-slate-400 min-w-[800px]">
                            <thead className="bg-[#0F172A] text-xs uppercase font-bold text-slate-500">
                                <tr>
                                    <th className="px-6 py-4 whitespace-nowrap">Timestamp</th>
                                    <th className="px-6 py-4 whitespace-nowrap">Target Entity</th>
                                    <th className="px-6 py-4 whitespace-nowrap">Source</th>
                                    <th className="px-6 py-4 whitespace-nowrap">Verdict</th>
                                    <th className="px-6 py-4 text-right whitespace-nowrap">Risk Score</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800 bg-[#1E293B]/50">
                                {history.length === 0 ? (
                                    <tr><td colSpan="5" className="px-6 py-8 text-center text-slate-600 italic">No logs available.</td></tr>
                                ) : (
                                    history.map((h, i) => (
                                        <tr key={i} className="hover:bg-slate-700/50 transition duration-150 group">
                                            <td className="px-6 py-4 font-mono text-xs text-slate-500 group-hover:text-slate-300 whitespace-nowrap">{h.time}</td>
                                            <td className="px-6 py-4 font-mono text-xs text-white truncate max-w-[200px] sm:max-w-[300px]">{h.url}</td>
                                            <td className="px-6 py-4 font-bold text-[10px] uppercase text-cyan-400 whitespace-nowrap">{h.vt_stats ? "Global Threat Grid" : "Local Brain"}</td>
                                            <td className={`px-6 py-4 font-bold text-xs uppercase whitespace-nowrap ${h.status.includes('Phishing') || h.score > 50 ? 'text-red-500' : 'text-emerald-400'}`}>{h.status}</td>
                                            <td className="px-6 py-4 text-right font-mono text-white whitespace-nowrap">{h.score}%</td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                    <div className="px-6 py-4 bg-[#0F172A]/50 border-t border-slate-800 text-xs text-slate-500 text-center">
                        Displaying last {history.length} events
                    </div>
                </div>

            </div>
        </div>
    );
};

export default History;
