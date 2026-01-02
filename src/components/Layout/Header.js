import React from 'react';
import { Bell, User, Search } from 'lucide-react';

const Header = ({ title }) => {
    return (
        <header className="h-20 bg-[#0F172A]/80 backdrop-blur-md border-b border-slate-800/50 flex items-center justify-between px-8 sticky top-0 z-40">
            <div>
                <h2 className="text-xl font-bold text-white tracking-tight">{title}</h2>
                <p className="text-[10px] text-slate-500 uppercase tracking-widest font-mono mt-0.5">Secure Environment</p>
            </div>

            <div className="flex items-center gap-6">
                <div className="relative hidden md:block group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4 group-focus-within:text-cyan-400 transition-colors" />
                    <input
                        type="text"
                        placeholder="Search intelligence database..."
                        className="bg-[#1E293B] border border-slate-700 rounded-lg pl-10 pr-4 py-2 text-xs text-white focus:outline-none focus:border-cyan-500/50 w-64 transition-all focus:w-80"
                    />
                </div>

                <div className="h-6 w-px bg-slate-800"></div>

                <button className="relative text-slate-400 hover:text-white transition-colors">
                    <Bell size={20} />
                    <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border border-[#0F172A]"></span>
                </button>

                <div className="flex items-center gap-3 pl-2 border-l border-slate-800 border-none">
                    <div className="text-right hidden sm:block">
                        <a href="/admin" className="text-xs font-bold text-white block hover:text-cyan-400 transition">Admin Console</a>
                        <p className="text-[10px] text-slate-500">Security Analyst</p>
                    </div>
                    <a href="/admin" className="w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 p-[1px] hover:scale-105 transition-transform">
                        <div className="w-full h-full rounded-lg bg-[#0F172A] flex items-center justify-center">
                            <User size={18} className="text-cyan-400" />
                        </div>
                    </a>
                </div>
            </div>
        </header>
    );
};

export default Header;
