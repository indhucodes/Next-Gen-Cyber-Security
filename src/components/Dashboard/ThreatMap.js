import React, { useEffect, useState } from 'react';
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";

const geoUrl = "https://raw.githubusercontent.com/lotusms/world-map-data/main/world.json";

const Enhanced3DMap = () => {
    const [mapMarkers, setMapMarkers] = useState([]);
    const [pulseMarkers, setPulseMarkers] = useState([]);

    // Generate random threat locations
    useEffect(() => {
        const interval = setInterval(() => {
            const newMarker = {
                id: Date.now(),
                coordinates: [Math.random() * 360 - 180, Math.random() * 140 - 70],
                intensity: Math.random()
            };
            setMapMarkers(prev => [...prev.slice(-12), newMarker]);

            // Add pulse effect
            setPulseMarkers(prev => [...prev, newMarker.id]);
            setTimeout(() => {
                setPulseMarkers(prev => prev.filter(id => id !== newMarker.id));
            }, 2000);
        }, 1500);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="h-full w-full relative overflow-hidden rounded-xl">
            {/* Animated grid background */}
            <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 to-slate-800/50"></div>
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:40px_40px] opacity-20"></div>

            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/5 via-transparent to-transparent"></div>

            <ComposableMap
                projectionConfig={{ scale: 180, center: [0, 20] }}
                className="w-full h-full"
                style={{ filter: 'drop-shadow(0 0 20px rgba(6, 182, 212, 0.1))' }}
            >
                <Geographies geography={geoUrl}>
                    {({ geographies }) => geographies.map((geo) => (
                        <Geography
                            key={geo.rsmKey}
                            geography={geo}
                            fill="#1e293b"
                            stroke="#334155"
                            strokeWidth={0.5}
                            style={{
                                default: { outline: "none" },
                                hover: { fill: "#334155", outline: "none", transition: "all 0.3s" },
                                pressed: { outline: "none" }
                            }}
                        />
                    ))}
                </Geographies>

                {/* Threat markers with enhanced effects */}
                {mapMarkers.map(({ id, coordinates, intensity }) => (
                    <Marker key={id} coordinates={coordinates}>
                        {/* Outer pulse ring */}
                        {pulseMarkers.includes(id) && (
                            <>
                                <circle
                                    r={20}
                                    fill="none"
                                    stroke={intensity > 0.7 ? "#ef4444" : "#06b6d4"}
                                    strokeWidth={2}
                                    opacity={0.6}
                                    className="animate-ping"
                                />
                                <circle
                                    r={15}
                                    fill="none"
                                    stroke={intensity > 0.7 ? "#ef4444" : "#06b6d4"}
                                    strokeWidth={1.5}
                                    opacity={0.4}
                                    style={{ animation: 'ping 1.5s cubic-bezier(0, 0, 0.2, 1) 0.3s infinite' }}
                                />
                            </>
                        )}

                        {/* Main marker */}
                        <circle
                            r={intensity > 0.7 ? 5 : 3}
                            fill={intensity > 0.7 ? "#ef4444" : "#06b6d4"}
                            className="animate-pulse"
                        />

                        {/* Inner glow */}
                        <circle
                            r={intensity > 0.7 ? 8 : 6}
                            fill={intensity > 0.7 ? "#ef4444" : "#06b6d4"}
                            opacity={0.3}
                        />
                    </Marker>
                ))}
            </ComposableMap>

            {/* Threat counter overlay */}
            <div className="absolute bottom-4 right-4 bg-slate-900/80 backdrop-blur-sm border border-slate-700 rounded-lg px-4 py-2">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse"></div>
                    <span className="text-xs font-mono text-cyan-400">{mapMarkers.length} Active Threats</span>
                </div>
            </div>
        </div>
    );
};

export default Enhanced3DMap;
