import React, { useEffect, useState } from 'react';
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";

const geoUrl = "https://raw.githubusercontent.com/lotusms/world-map-data/main/world.json";

const ThreatMap = () => {
    const [mapMarkers, setMapMarkers] = useState([]);

    // --- Map Animation ---
    useEffect(() => {
        const interval = setInterval(() => {
            const newMarker = { id: Date.now(), coordinates: [Math.random() * 360 - 180, Math.random() * 180 - 90] };
            setMapMarkers(prev => [...prev.slice(-8), newMarker]);
        }, 2000); // Faster checks
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="h-full w-full bg-[#1E293B]/50 rounded-2xl overflow-hidden relative backdrop-blur-sm">
            <div className="absolute top-6 left-6 z-10 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse"></span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Live Attack Feed</span>
            </div>
            <ComposableMap projectionConfig={{ scale: 160 }} className="w-full h-full opacity-80 hover:opacity-100 transition-opacity duration-700">
                <Geographies geography={geoUrl}>
                    {({ geographies }) => geographies.map((geo) => (
                        <Geography key={geo.rsmKey} geography={geo} fill="#334155" stroke="#1E293B" strokeWidth={0.5} style={{ default: { outline: "none" }, hover: { fill: "#475569", outline: "none" } }} />
                    ))}
                </Geographies>
                {mapMarkers.map(({ id, coordinates }) => (
                    <Marker key={id} coordinates={coordinates}>
                        <circle r={8} fill="#22d3ee" className="animate-ping" opacity={0.6} />
                        <circle r={4} fill="#06b6d4" />
                    </Marker>
                ))}
            </ComposableMap>
        </div>
    );
};

export default ThreatMap;
