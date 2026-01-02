import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Scan, History, Settings } from 'lucide-react';

const MobileNav = () => {
    const navItems = [
        { icon: LayoutDashboard, label: 'Overview', path: '/' },
        { icon: Scan, label: 'Scanner', path: '/scanner' },
        { icon: History, label: 'History', path: '/history' },
        { icon: Settings, label: 'Settings', path: '/settings' },
    ];

    return (
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-[#0B1120] border-t border-slate-800 z-50 px-6 py-3 flex justify-between items-center safe-area-bottom shadow-[0_-4px_20px_rgba(0,0,0,0.5)]">
            {navItems.map((item) => (
                <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) =>
                        `flex flex-col items-center gap-1 transition-all duration-200 ${isActive
                            ? 'text-cyan-400 scale-110'
                            : 'text-slate-500 hover:text-slate-300'
                        }`
                    }
                >
                    <item.icon size={24} />
                    <span className="text-[10px] font-medium tracking-wide">{item.label}</span>
                </NavLink>
            ))}
        </div>
    );
};

export default MobileNav;
