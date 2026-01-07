import React from 'react';
import Sidebar from './Sidebar';
import MobileNav from './MobileNav';

const MainLayout = ({ children, isBackendOnline, history = [] }) => {
    return (
        <div className="min-h-screen bg-[#0F172A] text-slate-100">
            <Sidebar isBackendOnline={isBackendOnline} />
            <div className="md:ml-64">
                {/* Pass history to all child components through cloneElement */}
                {React.Children.map(children, child =>
                    React.cloneElement(child, { searchHistory: history })
                )}
            </div>
            <MobileNav isBackendOnline={isBackendOnline} />
        </div>
    );
};

export default MainLayout;
