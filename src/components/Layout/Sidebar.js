import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { LayoutDashboard, Scan, History, Settings, ShieldCheck, Search, FileText, Shield } from 'lucide-react';

const Sidebar = ({ isBackendOnline }) => {
  const location = useLocation();

  const navItems = [
    { icon: LayoutDashboard, label: 'Overview', path: '/' },
    { icon: Search, label: 'URL Scanner', path: '/scanner' },
    { icon: FileText, label: 'Scan History', path: '/history' },
    { icon: Settings, label: 'System Config', path: '/settings' },
    { icon: Shield, label: 'Project Hub', path: '/admin' },
  ];

  return (
    <aside className="hidden md:flex w-64 bg-[#0B1120] border-r border-slate-800 flex-col h-screen fixed left-0 top-0 z-50">
      <div className="h-20 flex items-center px-8 border-b border-slate-800/50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-cyan-600 flex items-center justify-center text-white shadow-lg shadow-cyan-500/20">
            <ShieldCheck size={20} />
          </div>
          <div>
            <h1 className="text-lg font-bold text-white tracking-tight leading-none">SHIELD<span className="text-cyan-400">.AI</span></h1>
          </div>
        </div>
      </div>

      <nav className="flex-1 py-8 px-4 space-y-2">
        {navItems.map((item, index) => (
          <React.Fragment key={item.path}>
            {/* Add separator before Project Hub */}
            {item.path === '/admin' && <div className="pt-4 border-t border-slate-700/50 my-2"></div>}

            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${isActive
                  ? 'bg-cyan-900/20 text-cyan-400 border border-cyan-500/20 shadow-lg shadow-cyan-900/10'
                  : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'
                }`
              }
            >
              <item.icon size={20} className="w-5 h-5" />
              <span className="text-sm font-medium tracking-wide">{item.label}</span>
              {item.path === '/' && (
                <span className="ml-auto w-2 h-2 rounded-full bg-cyan-500 animate-pulse"></span>
              )}
            </NavLink>
          </React.Fragment>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-800/50">
        <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-800">
          <div className="flex items-center gap-3 mb-2">
            <div className={`w-2 h-2 rounded-full animate-pulse ${isBackendOnline ? 'bg-emerald-500' : 'bg-red-500'}`}></div>
            <span className={`text-[10px] font-bold uppercase tracking-widest ${isBackendOnline ? 'text-emerald-500' : 'text-red-500'}`}>
              {isBackendOnline ? 'System Online' : 'System Offline'}
            </span>
          </div>
          <p className="text-[10px] text-slate-500 font-mono">v13.0.4 - Enterprise</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
