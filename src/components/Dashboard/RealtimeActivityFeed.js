import React, { useState, useEffect } from 'react';
import { Clock, AlertTriangle, CheckCircle, Shield, TrendingUp } from 'lucide-react';

const RealtimeActivityFeed = ({ history = [] }) => {
    const [displayHistory, setDisplayHistory] = useState([]);

    useEffect(() => {
        // Show last 8 scans
        setDisplayHistory(history.slice(0, 8));
    }, [history]);

    // Generate demo data if history is empty
    const demoData = [
        { url: 'example.com/login', status: 'Clean', score: 12, time: '2 min ago', source: 'Local AI' },
        { url: 'suspicious-site.net', status: 'Phishing Detected', score: 87, time: '5 min ago', source: 'Cloud Intelligence' },
        { url: 'trusted-bank.com', status: 'Clean', score: 5, time: '8 min ago', source: 'Local AI' },
        { url: 'malware-test.org', status: 'Malicious', score: 95, time: '12 min ago', source: 'Cloud Intelligence' },
        { url: 'safe-shopping.com', status: 'Clean', score: 8, time: '15 min ago', source: 'Local AI' },
        { url: 'phishing-attempt.xyz', status: 'Phishing Detected', score: 78, time: '18 min ago', source: 'Cloud Intelligence' },
        { url: 'corporate-portal.io', status: 'Clean', score: 3, time: '22 min ago', source: 'Local AI' },
        { url: 'news-website.com', status: 'Clean', score: 15, time: '25 min ago', source: 'Local AI' },
    ];

    const items = displayHistory.length > 0 ? displayHistory : demoData;

    const getStatusColor = (score) => {
        if (score > 70) return 'red';
        if (score > 40) return 'yellow';
        return 'green';
    };

    const getStatusIcon = (score) => {
        if (score > 70) return AlertTriangle;
        if (score > 40) return Shield;
        return CheckCircle;
    };

    return (
        <div className="h-full flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <TrendingUp className="text-cyan-400" size={20} />
                    <h3 className="text-sm font-bold text-white uppercase tracking-widest">Live Activity</h3>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse"></div>
                    <span className="text-xs text-slate-400">{items.length} Recent</span>
                </div>
            </div>

            {/* Activity Feed */}
            <div className="flex-1 space-y-2 overflow-y-auto custom-scrollbar pr-2">
                {items.map((item, index) => {
                    const color = getStatusColor(item.score);
                    const StatusIcon = getStatusIcon(item.score);

                    return (
                        <div
                            key={index}
                            className={`group relative bg-slate-900/50 border border-slate-700 rounded-lg p-3 hover:bg-slate-800/50 transition-all duration-200 hover:border-${color}-500/30`}
                        >
                            {/* Left color indicator */}
                            <div className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-${color}-500 to-${color}-600 rounded-l-lg`}></div>

                            <div className="flex items-start gap-3 ml-2">
                                {/* Icon */}
                                <div className={`p-2 rounded-lg bg-${color}-500/10 flex-shrink-0 mt-0.5`}>
                                    <StatusIcon className={`text-${color}-500`} size={16} />
                                </div>

                                {/* Content */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between gap-2 mb-1">
                                        <p className="text-xs font-mono text-white truncate flex-1">
                                            {item.url}
                                        </p>
                                        <span className={`text-xs font-bold px-2 py-0.5 rounded bg-${color}-500/10 text-${color}-500 flex-shrink-0`}>
                                            {item.score}%
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-3 text-[10px] text-slate-500">
                                        <div className="flex items-center gap-1">
                                            <Clock size={10} />
                                            <span>{item.time}</span>
                                        </div>
                                        <span>•</span>
                                        <span className={color === 'red' ? 'text-red-400' : color === 'yellow' ? 'text-yellow-400' : 'text-emerald-400'}>
                                            {item.status}
                                        </span>
                                        <span>•</span>
                                        <span className="text-slate-600">{item.source}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Footer Stats */}
            <div className="mt-4 pt-4 border-t border-slate-700 grid grid-cols-3 gap-2">
                <div className="text-center">
                    <p className="text-lg font-black text-emerald-500">{items.filter(i => i.score <= 40).length}</p>
                    <p className="text-[9px] text-slate-500 uppercase tracking-wider">Clean</p>
                </div>
                <div className="text-center">
                    <p className="text-lg font-black text-yellow-500">{items.filter(i => i.score > 40 && i.score <= 70).length}</p>
                    <p className="text-[9px] text-slate-500 uppercase tracking-wider">Suspicious</p>
                </div>
                <div className="text-center">
                    <p className="text-lg font-black text-red-500">{items.filter(i => i.score > 70).length}</p>
                    <p className="text-[9px] text-slate-500 uppercase tracking-wider">Threats</p>
                </div>
            </div>
        </div>
    );
};

export default RealtimeActivityFeed;
