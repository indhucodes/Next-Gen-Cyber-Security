import React from 'react';
import Header from '../components/Layout/Header';
import ThreatMap from '../components/Dashboard/ThreatMap';
import LiveTerminal from '../components/Dashboard/LiveTerminal';
import { Activity, ShieldAlert, ShieldCheck, Globe } from 'lucide-react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const StatCard = ({ title, value, icon: Icon, color }) => (
    <div className="bg-[#1E293B]/50 border border-slate-700 rounded-2xl p-6 flex items-center justify-between hover:border-cyan-500/30 transition-all group">
        <div>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">{title}</p>
            <h3 className="text-3xl font-black text-white font-mono tracking-tighter group-hover:text-cyan-400 transition-colors">{value}</h3>
        </div>
        <div className={`p-3 rounded-lg bg-${color}-500/10 text-${color}-500`}>
            <Icon size={24} />
        </div>
    </div>
);

const Overview = ({ history = [], isBackendOnline }) => {
    const totalScans = 1205 + history.length;
    const threats = history.filter(h => h.score > 50).length;
    const safe = history.filter(h => h.score <= 50).length;

    const pieData = [
        { name: 'Threats', value: threats, color: '#EF4444' }, // Red
        { name: 'Safe', value: safe, color: '#10B981' }      // Emerald
    ];

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-[#0F172A] border border-slate-700 p-2 rounded shadow-xl">
                    <p className="text-xs font-bold text-white">{`${payload[0].name} : ${payload[0].value}`}</p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="pb-20">
            <Header title="Mission Control" />

            <div className="px-8 py-8 space-y-6 animate-fade-in">

                {/* STATS ROW */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatCard title="Total Scans" value={totalScans.toLocaleString()} icon={Activity} color="cyan" />
                    <StatCard title="Threats Neutralized" value={threats} icon={ShieldAlert} color="red" />
                    <StatCard title="Safe Entities" value={safe} icon={ShieldCheck} color="emerald" />
                    <StatCard title="Global Sensors" value="842" icon={Globe} color="blue" />
                </div>

                {/* MAIN VISUALIZATION ROW */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:h-[500px] h-auto">

                    {/* COL 1: THREAT DISTRIBUTION (DONUT) */}
                    <div className="bg-[#1E293B]/50 border border-slate-700 rounded-2xl p-6 flex flex-col items-center justify-center relative shadow-xl overflow-hidden h-80 lg:h-full">
                        <h3 className="absolute top-6 left-6 text-xs font-bold text-slate-400 uppercase tracking-widest">Threat Ratio</h3>
                        <div className="w-full h-full p-4">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={pieData}
                                        innerRadius={60}
                                        outerRadius={80}
                                        paddingAngle={5}
                                        dataKey="value"
                                        stroke="none"
                                    >
                                        {pieData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip content={<CustomTooltip />} />
                                </PieChart>
                            </ResponsiveContainer>
                            {/* Center Text Overlay */}
                            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none mt-4">
                                <span className="text-3xl lg:text-4xl font-black text-white">{totalScans.toLocaleString()}</span>
                                <span className="text-[10px] uppercase tracking-widest text-slate-500">Total Scans</span>
                            </div>
                        </div>
                    </div>

                    {/* COL 2: THREAT MAP */}
                    <div className="bg-[#1E293B]/50 border border-slate-700 rounded-2xl p-4 overflow-hidden shadow-xl relative h-80 lg:h-full">
                        <h3 className="absolute top-6 left-6 text-xs font-bold text-slate-400 uppercase tracking-widest z-10">Live Global Map</h3>
                        <ThreatMap />
                    </div>

                    {/* COL 3: RIGHT SIDEBAR */}
                    <div className="flex flex-col gap-6 h-full min-h-[500px] lg:min-h-0">
                        {/* LIVE TERMINAL */}
                        <div className="h-48 lg:h-auto lg:flex-1">
                            {isBackendOnline ? (
                                <LiveTerminal />
                            ) : (
                                <div className="bg-[#0B1120] border border-slate-800 rounded-xl p-4 font-mono text-xs h-full flex flex-col items-center justify-center shadow-2xl relative opacity-50">
                                    <div className="flex flex-col items-center gap-2 text-red-500">
                                        <ShieldAlert size={24} />
                                        <span className="font-bold uppercase tracking-widest text-center">Feed Offline</span>
                                        <span className="text-[10px] text-slate-500">System Disconnected</span>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* CRITICAL ALERTS FEED */}
                        <div className="flex-1 bg-[#1E293B]/50 border border-slate-700 rounded-2xl p-0 flex flex-col shadow-xl overflow-hidden">
                            <div className="p-4 border-b border-slate-700 bg-red-950/20">
                                <h3 className="text-xs font-bold text-red-400 uppercase tracking-widest flex items-center gap-2">
                                    <ShieldAlert size={14} /> Critical Interceptions
                                </h3>
                            </div>
                            <div className="space-y-0 overflow-y-auto custom-scrollbar flex-1 bg-[#0F172A]/30">
                                {history.filter(h => h.score > 50).length === 0 ? (
                                    <div className="flex flex-col items-center justify-center h-full text-slate-500 gap-2">
                                        <ShieldCheck size={24} className="text-emerald-500/50" />
                                        <p className="text-xs italic">No active threats detected.</p>
                                    </div>
                                ) : (
                                    history.filter(h => h.score > 50).slice(0, 10).map((item, i) => (
                                        <div key={i} className="flex items-center justify-between p-3 border-b border-slate-800 hover:bg-slate-800/50 transition border-l-4 border-l-red-500 bg-red-500/5">
                                            <div className="flex flex-col truncate pr-2">
                                                <span className="text-[11px] font-bold text-red-200 truncate w-40">{item.url}</span>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <span className="text-[9px] font-mono text-slate-500">{item.time}</span>
                                                    <span className="text-[8px] font-bold bg-red-500 text-white px-1 rounded">CRITICAL</span>
                                                </div>
                                            </div>
                                            <span className="text-xs font-black px-2 py-1 rounded text-red-400">
                                                {item.score}%
                                            </span>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Overview;
