import React, { useState, useEffect, useRef } from 'react';
import { Bell, User, Search, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Header = ({ title, onSearch, searchHistory = [] }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [suggestions, setSuggestions] = useState([]);
    const searchRef = useRef(null);
    const navigate = useNavigate();

    // Close suggestions when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setShowSuggestions(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Generate suggestions based on search query
    useEffect(() => {
        if (searchQuery.trim() && searchHistory.length > 0) {
            const query = searchQuery.toLowerCase();
            const matches = searchHistory
                .filter(item => {
                    const url = (item.url || '').toLowerCase();
                    const status = (item.status || '').toLowerCase();
                    return url.includes(query) || status.includes(query);
                })
                .slice(0, 5); // Show max 5 suggestions

            setSuggestions(matches);
            setShowSuggestions(matches.length > 0);
        } else {
            setSuggestions([]);
            setShowSuggestions(false);
        }
    }, [searchQuery, searchHistory]);

    const handleSearch = (e) => {
        const query = e.target.value;
        setSearchQuery(query);

        // If there's a search handler passed from parent, use it
        if (onSearch) {
            onSearch(query);
        }
    };

    const handleKeyPress = (e) => {
        // Only navigate when user presses Enter
        if (e.key === 'Enter' && searchQuery.trim()) {
            setShowSuggestions(false);
            if (window.location.pathname !== '/history') {
                navigate('/history?search=' + encodeURIComponent(searchQuery));
            }
        }
    };

    const handleSuggestionClick = (suggestion) => {
        setSearchQuery(suggestion.url);
        setShowSuggestions(false);
        if (onSearch) {
            onSearch(suggestion.url);
        }
        if (window.location.pathname !== '/history') {
            navigate('/history?search=' + encodeURIComponent(suggestion.url));
        }
    };

    const clearSearch = () => {
        setSearchQuery('');
        setShowSuggestions(false);
        if (onSearch) {
            onSearch('');
        }
    };

    return (
        <header className="h-20 bg-[#0F172A]/80 backdrop-blur-md border-b border-slate-800/50 flex items-center justify-between px-8 sticky top-0 z-40">
            <div>
                <h2 className="text-xl font-bold text-white tracking-tight">{title}</h2>
                <p className="text-[10px] text-slate-500 uppercase tracking-widest font-mono mt-0.5">Secure Environment</p>
            </div>

            <div className="flex items-center gap-6">
                <div className="relative hidden md:block group" ref={searchRef}>
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4 group-focus-within:text-cyan-400 transition-colors z-10" />
                    <input
                        type="text"
                        placeholder="Search scan history..."
                        value={searchQuery}
                        onChange={handleSearch}
                        onKeyPress={handleKeyPress}
                        onFocus={() => searchQuery && suggestions.length > 0 && setShowSuggestions(true)}
                        className="bg-[#1E293B] border border-slate-700 rounded-lg pl-10 pr-10 py-2 text-xs text-white focus:outline-none focus:border-cyan-500/50 w-64 transition-all focus:w-80"
                    />
                    {searchQuery && (
                        <button
                            onClick={clearSearch}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors z-10"
                        >
                            <X size={14} />
                        </button>
                    )}

                    {/* Autocomplete Dropdown */}
                    {showSuggestions && suggestions.length > 0 && (
                        <div className="absolute top-full left-0 right-0 mt-2 bg-[#1E293B] border border-slate-700 rounded-lg shadow-2xl overflow-hidden z-50 max-h-64 overflow-y-auto">
                            {suggestions.map((suggestion, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleSuggestionClick(suggestion)}
                                    className="w-full px-4 py-3 text-left hover:bg-slate-700/50 transition-colors border-b border-slate-800 last:border-b-0 focus:outline-none focus:bg-slate-700/50"
                                >
                                    <div className="flex items-center justify-between gap-3">
                                        <div className="flex-1 min-w-0">
                                            <p className="text-xs text-white font-mono truncate">{suggestion.url}</p>
                                            <p className="text-[10px] text-slate-500 mt-0.5">{suggestion.time}</p>
                                        </div>
                                        <div className="flex items-center gap-2 flex-shrink-0">
                                            <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${suggestion.status.includes('Phishing') || suggestion.score > 50
                                                ? 'bg-red-500/10 text-red-500'
                                                : 'bg-emerald-500/10 text-emerald-500'
                                                }`}>
                                                {suggestion.status}
                                            </span>
                                            <span className="text-xs text-slate-400 font-mono">{suggestion.score}%</span>
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    )}
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
