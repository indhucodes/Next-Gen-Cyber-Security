import React from 'react';
import Sidebar from './Sidebar';
import MobileNav from './MobileNav';

const MainLayout = ({ children, isBackendOnline }) => {
    return (
        <div className="min-h-screen bg-[#0F172A] text-slate-300 font-sans selection:bg-cyan-500/30 flex">
            <div className="fixed inset-0 pointer-events-none opacity-[0.05] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:40px_40px] z-0"></div>

            <Sidebar isBackendOnline={isBackendOnline} />

            <div className="flex-1 md:ml-64 relative z-10 w-full p-4 pb-24 md:p-0 md:pb-0">
                {children}
            </div>

            <MobileNav />
        </div>
    );
};

export default MainLayout;
