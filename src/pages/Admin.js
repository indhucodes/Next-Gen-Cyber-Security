import React from 'react';
import Header from '../components/Layout/Header';
import { User, MapPin, GraduationCap, Award, Shield, RefreshCw, FileCode, BookOpen, Download } from 'lucide-react';

const Admin = () => {

    const IDCard = ({ role, name, regNo, dept, college, icon: Icon, color }) => (
        <div className="relative group perspective">
            <div className={`absolute -inset-0.5 bg-gradient-to-r from-${color}-500 to-cyan-500 rounded-2xl blur opacity-20 group-hover:opacity-75 transition duration-500`}></div>
            <div className="relative bg-[#0F172A] border border-slate-700/50 rounded-2xl p-8 flex flex-col items-center text-center shadow-2xl h-full hover:transform hover:-translate-y-1 transition duration-300">
                <div className={`w-20 h-20 rounded-full bg-${color}-500/10 flex items-center justify-center mb-6 ring-2 ring-${color}-500/50 ring-offset-4 ring-offset-[#0F172A]`}>
                    <Icon size={32} className={`text-${color}-400`} />
                </div>

                <div className={`px-3 py-1 bg-${color}-500/10 rounded-full mb-4`}>
                    <span className={`text-[10px] font-black uppercase tracking-[0.2em] text-${color}-400`}>{role}</span>
                </div>

                <h3 className="text-2xl font-bold text-white mb-1 tracking-tight">{name}</h3>
                {regNo && <p className="text-sm font-mono text-slate-400 mb-2">Reg No: <span className="text-white">{regNo}</span></p>}

                <div className="space-y-1 w-full border-t border-slate-800 pt-4 mt-2">
                    <div className="flex items-center justify-center gap-2 text-slate-400">
                        <GraduationCap size={14} />
                        <span className="text-xs font-bold uppercase tracking-wider text-cyan-500">{dept}</span>
                    </div>
                    {college && (
                        <div className="flex items-center justify-center gap-2 text-slate-500 mt-2">
                            <MapPin size={12} />
                            <span className="text-[10px] font-bold uppercase tracking-widest">{college}</span>
                        </div>
                    )}
                </div>

                {/* Holographic Element */}
                <div className="absolute top-4 right-4 animate-pulse">
                    <Shield size={16} className={`text-${color}-500/20`} />
                </div>
            </div>
        </div>
    );

    return (
        <div className="pb-20">
            <Header title="Project Hub" />

            <div className="px-8 py-8 space-y-12 animate-fade-in max-w-7xl mx-auto">

                {/* PROJECT RECORD */}
                <div className="text-center space-y-4">
                    <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 tracking-tighter">
                        PROJECT CREDITS
                    </h2>
                    <p className="text-slate-500 text-sm font-mono uppercase tracking-widest">
                        AVP COLLEGE OF ARTS AND SCIENCE, 2025-26 academic year
                    </p>
                </div>

                {/* ID CARDS GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {/* STUDENT CARD */}
                    <IDCard
                        role="Project Develop"
                        name="INDUMATHI J"
                        regNo="2432K0488"
                        dept="MSC Computer Science"
                        college="AVP College of Arts And Science"
                        icon={User}
                        color="cyan"
                    />

                    {/* GUIDE CARD */}
                    <IDCard
                        role="Faculty Guide"
                        name="Dhana Priya N.P"
                        dept="Department of CSE"
                        college="AVP College of Arts And Science"
                        icon={Award}
                        color="purple"
                    />
                </div>

                {/* TECH SPECIFICATIONS & ASSETS */}
                <div className="border-t border-slate-800 pt-10 space-y-8">
                    <h3 className="text-center text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Technical Specifications & Assets</h3>

                    {/* FRONTEND ROW */}
                    <div className="bg-[#1E293B]/50 border border-slate-700/50 rounded-2xl p-6 flex flex-col md:flex-row items-center gap-6 hover:border-cyan-500/30 transition shadow-lg group">
                        <div className="p-4 bg-cyan-500/10 rounded-full text-cyan-400 group-hover:scale-110 transition shrink-0">
                            <RefreshCw size={32} />
                        </div>
                        <div className="flex-1 text-center md:text-left">
                            <h4 className="text-lg font-black text-white uppercase tracking-tight mb-2">Frontend Architecture</h4>
                            <p className="text-sm text-slate-400 mb-4 max-w-2xl">
                                Built with a high-performance React 18 engine, utilizing Tailwind CSS for a utility-first design system. Features real-time data visualization via Recharts and a responsive, glassmorphic UI.
                            </p>
                            <div className="flex flex-wrap justify-center md:justify-start gap-2">
                                <span className="px-3 py-1 bg-cyan-900/20 text-cyan-400 rounded-full text-[10px] font-bold border border-cyan-500/20">React 18</span>
                                <span className="px-3 py-1 bg-cyan-900/20 text-cyan-400 rounded-full text-[10px] font-bold border border-cyan-500/20">Tailwind CSS v3</span>
                                <span className="px-3 py-1 bg-cyan-900/20 text-cyan-400 rounded-full text-[10px] font-bold border border-cyan-500/20">Recharts v2</span>
                                <span className="px-3 py-1 bg-cyan-900/20 text-cyan-400 rounded-full text-[10px] font-bold border border-cyan-500/20">Lucide React</span>

                            </div>
                        </div>
                    </div>

                    {/* BACKEND ROW */}
                    <div className="bg-[#1E293B]/50 border border-slate-700/50 rounded-2xl p-6 flex flex-col md:flex-row items-center gap-6 hover:border-purple-500/30 transition shadow-lg group">
                        <div className="p-4 bg-purple-500/10 rounded-full text-purple-400 group-hover:scale-110 transition shrink-0">
                            <Shield size={32} />
                        </div>
                        <div className="flex-1 text-center md:text-left">
                            <h4 className="text-lg font-black text-white uppercase tracking-tight mb-2">Backend Infrastructure</h4>
                            <p className="text-sm text-slate-400 mb-4 max-w-2xl">
                                Powered by a robust Python Flask REST API with SQLite persistence. Integrates a local neural heuristic engine alongside VirusTotal's Threat Grid for hybrid detection capabilities.
                            </p>
                            <div className="flex flex-wrap justify-center md:justify-start gap-2">
                                <span className="px-3 py-1 bg-purple-900/20 text-purple-400 rounded-full text-[10px] font-bold border border-purple-500/20">Python 3.9+</span>
                                <span className="px-3 py-1 bg-purple-900/20 text-purple-400 rounded-full text-[10px] font-bold border border-purple-500/20">Flask API</span>
                                <span className="px-3 py-1 bg-purple-900/20 text-purple-400 rounded-full text-[10px] font-bold border border-purple-500/20">SQLite 3</span>
                                <span className="px-3 py-1 bg-purple-900/20 text-purple-400 rounded-full text-[10px] font-bold border border-purple-500/20">TensorFlow Lite</span>
                                <span className="px-3 py-1 bg-purple-900/20 text-purple-400 rounded-full text-[10px] font-bold border border-purple-500/20">Requests</span>
                            </div>
                        </div>
                    </div>

                    {/* DOWNLOADS ROW */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                        {/* SOURCE CODE */}
                        <a
                            href="/project_source_code.zip"
                            download="Phishing_Detector_Source_Code.zip"
                            className="bg-[#1E293B]/50 border border-slate-700/50 rounded-xl p-6 flex flex-col items-center text-center hover:bg-emerald-500/5 hover:border-emerald-500/50 transition group cursor-pointer group"
                        >
                            <div className="flex items-center justify-between w-full mb-2">
                                <FileCode size={24} className="text-emerald-500" />
                                <Download size={16} className="text-emerald-500/50 group-hover:text-emerald-500 transition" />
                            </div>
                            <div className="w-full text-left">
                                <h4 className="text-lg font-bold text-white uppercase tracking-tight">Source Code</h4>
                                <p className="text-xs text-slate-400 mt-1">Full Project Repository (ZIP)</p>
                            </div>
                        </a>

                        {/* DOCS */}
                        <a
                            href="/project_report.pdf"
                            download="Final_Project_Report_Symposys.pdf"
                            className="bg-[#1E293B]/50 border border-slate-700/50 rounded-xl p-6 flex flex-col items-center text-center hover:bg-blue-500/5 hover:border-blue-500/50 transition group cursor-pointer group"
                        >
                            <div className="flex items-center justify-between w-full mb-2">
                                <BookOpen size={24} className="text-blue-500" />
                                <Download size={16} className="text-blue-500/50 group-hover:text-blue-500 transition" />
                            </div>
                            <div className="w-full text-left">
                                <h4 className="text-lg font-bold text-white uppercase tracking-tight">Documentation</h4>
                                <p className="text-xs text-slate-400 mt-1">IEEE Project Synopsis & Report (PDF)</p>
                            </div>
                        </a>
                    </div>

                </div>

            </div>

        </div>
    );
};

export default Admin;
