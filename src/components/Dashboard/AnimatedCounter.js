import React, { useState, useEffect } from 'react';

const AnimatedCounter = ({ value, label, color = "cyan", icon: Icon, suffix = "" }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        const duration = 2000; // 2 seconds
        const steps = 60;
        const increment = value / steps;
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= value) {
                setCount(value);
                clearInterval(timer);
            } else {
                setCount(Math.floor(current));
            }
        }, duration / steps);

        return () => clearInterval(timer);
    }, [value]);

    return (
        <div className="bg-[#1E293B]/50 border border-slate-700 rounded-2xl p-6 hover:border-cyan-500/30 transition-all group relative overflow-hidden">
            {/* Animated background gradient */}
            <div className={`absolute inset-0 bg-gradient-to-br from-${color}-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>

            <div className="relative flex items-center justify-between">
                <div>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">
                        {label}
                    </p>
                    <div className="flex items-baseline gap-1">
                        <h3 className={`text-4xl font-black text-white font-mono tracking-tighter group-hover:text-${color}-400 transition-colors`}>
                            {count.toLocaleString()}
                        </h3>
                        {suffix && (
                            <span className="text-lg font-bold text-slate-500">{suffix}</span>
                        )}
                    </div>

                    {/* Progress bar */}
                    <div className="mt-3 h-1 bg-slate-800 rounded-full overflow-hidden">
                        <div
                            className={`h-full bg-gradient-to-r from-${color}-500 to-${color}-400 transition-all duration-2000 ease-out`}
                            style={{ width: `${(count / value) * 100}%` }}
                        ></div>
                    </div>
                </div>

                {Icon && (
                    <div className={`p-4 rounded-xl bg-${color}-500/10 text-${color}-500 group-hover:scale-110 transition-transform duration-300`}>
                        <Icon size={28} />
                    </div>
                )}
            </div>

            {/* Pulse effect on hover */}
            <div className={`absolute -inset-1 bg-gradient-to-r from-${color}-500/20 to-transparent rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
        </div>
    );
};

export default AnimatedCounter;
