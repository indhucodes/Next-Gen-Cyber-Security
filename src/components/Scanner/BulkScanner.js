import React, { useState } from 'react';
import { Upload, X, FileText, AlertCircle, CheckCircle, Loader2, Download } from 'lucide-react';

const BulkScanner = ({ backendUrl, isBackendOnline }) => {
    const [file, setFile] = useState(null);
    const [urls, setUrls] = useState([]);
    const [scanning, setScanning] = useState(false);
    const [progress, setProgress] = useState(0);
    const [results, setResults] = useState([]);
    const [dragActive, setDragActive] = useState(false);

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files[0]);
        }
    };

    const handleFileInput = (e) => {
        if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0]);
        }
    };

    const handleFile = (file) => {
        const validTypes = ['text/plain', 'text/csv', 'application/vnd.ms-excel'];
        if (!validTypes.includes(file.type) && !file.name.endsWith('.txt') && !file.name.endsWith('.csv')) {
            alert('Please upload a .txt or .csv file');
            return;
        }

        setFile(file);
        const reader = new FileReader();
        reader.onload = (e) => {
            const text = e.target.result;
            const lines = text.split('\n')
                .map(line => line.trim())
                .filter(line => line && (line.startsWith('http://') || line.startsWith('https://')));
            setUrls(lines);
        };
        reader.readAsText(file);
    };

    const removeFile = () => {
        setFile(null);
        setUrls([]);
        setResults([]);
        setProgress(0);
    };

    const scanUrls = async () => {
        if (!isBackendOnline) {
            alert('Backend is offline. Please start the backend server first.');
            return;
        }

        setScanning(true);
        setResults([]);
        setProgress(0);

        const scanResults = [];
        for (let i = 0; i < urls.length; i++) {
            try {
                const response = await fetch(`${backendUrl}/predict`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ url: urls[i] })
                });

                const data = await response.json();
                scanResults.push({
                    url: urls[i],
                    status: data.status || 'Error',
                    score: data.score || 0,
                    source: data.vt_stats ? 'Cloud Intelligence' : 'Local AI'
                });
            } catch (error) {
                scanResults.push({
                    url: urls[i],
                    status: 'Scan Failed',
                    score: 0,
                    source: 'Error'
                });
            }

            setProgress(Math.round(((i + 1) / urls.length) * 100));
            setResults([...scanResults]);
        }

        setScanning(false);
    };

    const exportResults = () => {
        const csv = [
            ['URL', 'Status', 'Risk Score', 'Detection Source'],
            ...results.map(r => [r.url, r.status, `${r.score}%`, r.source])
        ].map(row => row.join(',')).join('\n');

        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `bulk_scan_results_${Date.now()}.csv`;
        link.click();
    };

    return (
        <div className="space-y-6">
            {/* Upload Area */}
            {!file ? (
                <div
                    className={`border-2 border-dashed rounded-2xl p-12 text-center transition-all ${dragActive
                            ? 'border-cyan-500 bg-cyan-500/10'
                            : 'border-slate-700 hover:border-slate-600'
                        }`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                >
                    <Upload className="mx-auto mb-4 text-slate-500" size={48} />
                    <h3 className="text-lg font-bold text-white mb-2">Upload URL List</h3>
                    <p className="text-sm text-slate-400 mb-4">
                        Drag and drop a .txt or .csv file, or click to browse
                    </p>
                    <input
                        type="file"
                        accept=".txt,.csv"
                        onChange={handleFileInput}
                        className="hidden"
                        id="file-upload"
                    />
                    <label
                        htmlFor="file-upload"
                        className="inline-block px-6 py-3 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg cursor-pointer transition-colors font-medium"
                    >
                        Choose File
                    </label>
                    <p className="text-xs text-slate-500 mt-4">
                        Supported formats: .txt, .csv (one URL per line)
                    </p>
                </div>
            ) : (
                <div className="bg-[#1E293B] border border-slate-700 rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <FileText className="text-cyan-400" size={24} />
                            <div>
                                <h3 className="text-sm font-bold text-white">{file.name}</h3>
                                <p className="text-xs text-slate-400">{urls.length} URLs detected</p>
                            </div>
                        </div>
                        <button
                            onClick={removeFile}
                            className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
                        >
                            <X className="text-slate-400" size={20} />
                        </button>
                    </div>

                    {/* URL Preview */}
                    <div className="bg-[#0F172A] rounded-lg p-4 mb-4 max-h-40 overflow-y-auto">
                        {urls.slice(0, 5).map((url, i) => (
                            <p key={i} className="text-xs text-slate-400 font-mono truncate">
                                {i + 1}. {url}
                            </p>
                        ))}
                        {urls.length > 5 && (
                            <p className="text-xs text-slate-500 italic mt-2">
                                ... and {urls.length - 5} more
                            </p>
                        )}
                    </div>

                    {/* Scan Button */}
                    <button
                        onClick={scanUrls}
                        disabled={scanning || !isBackendOnline}
                        className="w-full py-3 bg-cyan-600 hover:bg-cyan-700 disabled:bg-slate-700 disabled:cursor-not-allowed text-white rounded-lg font-bold transition-colors flex items-center justify-center gap-2"
                    >
                        {scanning ? (
                            <>
                                <Loader2 className="animate-spin" size={20} />
                                Scanning... {progress}%
                            </>
                        ) : (
                            <>Start Bulk Scan</>
                        )}
                    </button>

                    {/* Progress Bar */}
                    {scanning && (
                        <div className="mt-4 bg-slate-800 rounded-full h-2 overflow-hidden">
                            <div
                                className="bg-cyan-500 h-full transition-all duration-300"
                                style={{ width: `${progress}%` }}
                            ></div>
                        </div>
                    )}
                </div>
            )}

            {/* Results */}
            {results.length > 0 && (
                <div className="bg-[#1E293B] border border-slate-700 rounded-2xl overflow-hidden">
                    <div className="p-4 border-b border-slate-700 flex items-center justify-between">
                        <h3 className="text-sm font-bold text-white uppercase tracking-widest">
                            Scan Results ({results.length})
                        </h3>
                        <button
                            onClick={exportResults}
                            className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition-colors"
                        >
                            <Download size={14} />
                            Export CSV
                        </button>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                        {results.map((result, i) => (
                            <div
                                key={i}
                                className="p-4 border-b border-slate-800 hover:bg-slate-700/30 transition-colors flex items-center justify-between"
                            >
                                <div className="flex-1 min-w-0 mr-4">
                                    <p className="text-xs text-white font-mono truncate">{result.url}</p>
                                    <p className="text-[10px] text-slate-500 mt-1">{result.source}</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span
                                        className={`text-xs font-bold uppercase px-3 py-1 rounded ${result.status.includes('Phishing') || result.score > 50
                                                ? 'bg-red-500/10 text-red-500'
                                                : 'bg-emerald-500/10 text-emerald-500'
                                            }`}
                                    >
                                        {result.status}
                                    </span>
                                    <span className="text-sm font-mono text-white w-12 text-right">
                                        {result.score}%
                                    </span>
                                    {result.status.includes('Phishing') || result.score > 50 ? (
                                        <AlertCircle className="text-red-500" size={20} />
                                    ) : (
                                        <CheckCircle className="text-emerald-500" size={20} />
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default BulkScanner;
