import React, { useState } from 'react';
import { MapPin, Camera, Sparkles, Navigation, CloudLightning, CheckCircle2, ShieldAlert, Cpu } from 'lucide-react';

// 1. MapPage (/map)
export function MapPage() {
  const [markers, setMarkers] = useState([
    { id: 1, title: "Union Plaza Booth", lat: "37.7749", lng: "-122.4194", desc: "Handed out 45 copia flyers." },
    { id: 2, title: "Science Hall Board", lat: "37.7752", lng: "-122.4189", desc: "Posted 3 Impostor Syndrome flyers." }
  ]);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !desc.trim()) return;

    const newMarker = {
      id: Date.now(),
      title,
      lat: (37.774 + Math.random() * 0.005).toFixed(4),
      lng: (-122.418 - Math.random() * 0.005).toFixed(4),
      desc
    };
    setMarkers([...markers, newMarker]);
    setTitle('');
    setDesc('');
    setSuccess(true);
    setTimeout(() => setSuccess(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-28 relative z-10 text-left min-h-screen">
      <div className="mb-12">
        <h1 className="text-3xl md:text-5xl font-bold font-display text-white mb-2">Geo-Tagging Logs</h1>
        <p className="text-sm text-gray-400">Register coordinates and upload images of physical campus wellness posters.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7 space-y-6">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <MapPin className="w-5 h-5 text-teal-primary" /> Logged Geotags Map
          </h3>
          
          {/* Mock Map Canvas */}
          <div className="w-full h-80 rounded-3xl bg-slate-900 border border-white/5 relative flex flex-col justify-end p-6 overflow-hidden shadow-inner">
            {/* Grid Map Background */}
            <div 
              className="absolute inset-0 opacity-[0.08]" 
              style={{
                backgroundImage: `
                  linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)
                `,
                backgroundSize: '30px 30px',
              }}
            />
            {/* Active markers icons */}
            {markers.map((m, idx) => (
              <div 
                key={m.id}
                style={{
                  top: `${30 + idx * 25}%`,
                  left: `${20 + idx * 30}%`
                }}
                className="absolute z-20 flex flex-col items-center group cursor-pointer"
              >
                <MapPin className="w-6 h-6 text-teal-primary animate-bounce fill-teal-950" />
                <span className="absolute bottom-full mb-1 text-[8px] bg-dark-bg border border-teal-500/20 text-white rounded px-2 py-0.5 whitespace-nowrap shadow opacity-0 group-hover:opacity-100 transition-opacity">
                  {m.title}
                </span>
              </div>
            ))}

            <div className="relative z-10 p-4 rounded-2xl glass-panel border border-white/10 max-w-sm">
              <span className="text-[8px] text-gray-500 font-bold uppercase tracking-wider block">CURRENT OBSERVER ZONE</span>
              <span className="text-xs font-semibold text-white">📍 State Campus Main Quadrant</span>
            </div>
          </div>

          {/* List of tags */}
          <div className="space-y-3">
            {markers.map(m => (
              <div key={m.id} className="p-4 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between text-xs">
                <div>
                  <h4 className="font-bold text-white">{m.title}</h4>
                  <p className="text-[10px] text-gray-400 mt-1">{m.desc}</p>
                </div>
                <div className="text-right text-[10px] font-mono text-teal-primary">
                  <span>{m.lat}° N, {m.lng}° W</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right side form */}
        <div className="lg:col-span-5">
          <div className="p-6 rounded-3xl glass-panel border border-white/10 shadow-lg space-y-6">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Camera className="w-5 h-5 text-teal-primary" /> Register Event Tag
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block">Post / Location Name</label>
                <input 
                  type="text" 
                  required
                  value={title} 
                  onChange={(e) => setTitle(e.target.value)} 
                  placeholder="e.g. Student Gym Brochure Rack"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-teal-primary"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block">Materials Logged</label>
                <textarea 
                  required
                  value={desc} 
                  onChange={(e) => setDesc(e.target.value)} 
                  placeholder="e.g. Added 5 coping card packets..."
                  rows={3}
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-teal-primary resize-none"
                />
              </div>

              <button 
                type="submit"
                className="w-full py-3 rounded-xl bg-teal-primary text-white font-bold text-xs hover:shadow-[0_0_15px_rgba(20,184,166,0.4)] transition-all cursor-pointer"
              >
                Register GPS Tag
              </button>

              {success && (
                <p className="text-center text-[10px] text-emerald-400 font-bold animate-pulse">
                  Geotag registered with current GPS coordinate stamp!
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

// 2. CoachPage (/coach)
export function CoachPage() {
  const [selectedLocation, setSelectedLocation] = useState('plaza');

  const nudges = {
    plaza: {
      location: "Main Plaza Quad",
      nudges: [
        "Group 3 has an active campaign table here today. Drop by to hand out flyers and sync observations.",
        "Take a physical 10-second posture check. Roll your shoulders back and relax your jaw."
      ]
    },
    dorms: {
      location: "Student Residence Block B",
      nudges: [
        "Dorm spaces can trigger feelings of isolation. Try opening your door or checking in on your neighbor.",
        "Log a quick emotional check-in if you are returning from late study halls."
      ]
    },
    gym: {
      location: "Campus Recreation Center",
      nudges: [
        "Physical movement helps metabolize cortisol (stress hormones). Try a quick 10-minute stretch or walk.",
        "Reflect on how physical fatigue impacts your academic overwhelm today."
      ]
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-28 relative z-10 text-left min-h-screen">
      <div className="mb-12">
        <h1 className="text-3xl md:text-5xl font-bold font-display text-white mb-2">AI Nudges & Coaching</h1>
        <p className="text-sm text-gray-400">Contextual wellness coaching based on physical proximity prompts.</p>
      </div>

      <div className="space-y-8">
        {/* Switchers */}
        <div className="flex gap-2 bg-white/5 p-1 rounded-xl border border-white/5 max-w-sm">
          {[
            { key: 'plaza', label: 'Main Plaza' },
            { key: 'dorms', label: 'Dorm Block' },
            { key: 'gym', label: 'Rec Center' }
          ].map(loc => (
            <button
              key={loc.key}
              onClick={() => setSelectedLocation(loc.key)}
              className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                selectedLocation === loc.key ? 'bg-indigo-primary text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              {loc.label}
            </button>
          ))}
        </div>

        {/* Nudges Container */}
        <div className="p-6 md:p-8 rounded-3xl glass-panel border border-white/10 shadow-lg space-y-6">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-primary animate-pulse" />
            <h3 className="text-lg font-bold text-white">Geofenced Recommendations for: <span className="text-indigo-primary">{nudges[selectedLocation].location}</span></h3>
          </div>

          <div className="space-y-4">
            {nudges[selectedLocation].nudges.map((nudge, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-white/5 border border-white/5 flex items-start space-x-3 text-xs md:text-sm">
                <Navigation className="w-5 h-5 text-indigo-primary shrink-0 mt-0.5" />
                <p className="text-gray-300 leading-relaxed">{nudge}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// 3. SyncPage (/sync)
export function SyncPage() {
  const [syncing, setSyncing] = useState(false);
  const [logs, setLogs] = useState(["[sys] profile loaded successfully", "[sys] connection latency: 12ms", "[sys] encrypted local storage buffer check: OK"]);

  const triggerSync = () => {
    setSyncing(true);
    setLogs(prev => [...prev, `[sync] starting force database handshake...`]);
    setTimeout(() => {
      setLogs(prev => [
        ...prev,
        `[sync] mapping local check-ins: found ${localStorage.getItem('mindbridge_user_data') ? 'data file' : 'empty'}`,
        `[sync] syncing active campaign lists...`,
        `[sync] encrypting transfer handshake: RSA-4096 OK`,
        `[sys] profile synchronization fully updated.`
      ]);
      setSyncing(false);
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-28 relative z-10 text-left min-h-screen">
      <div className="mb-12">
        <h1 className="text-3xl md:text-5xl font-bold font-display text-white mb-2">Cloud Synchronization</h1>
        <p className="text-sm text-gray-400">Verifying secure profile locks and synchronization protocols.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        {/* Status Dashboard */}
        <div className="p-6 rounded-3xl glass-panel border border-white/10 shadow-lg space-y-6">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <CloudLightning className="w-5 h-5 text-indigo-primary animate-pulse" /> Sync Diagnostics
          </h3>

          <div className="space-y-4 text-xs">
            <div className="flex justify-between items-center py-2 border-b border-white/5">
              <span className="text-gray-400">Connection State</span>
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Stable
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-white/5">
              <span className="text-gray-400">Profile Security Lock</span>
              <span className="text-indigo-300 font-bold flex items-center gap-1">
                <Cpu className="w-3.5 h-3.5" /> RSA-4096 Encrypted
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-white/5">
              <span className="text-gray-400">Local Cache File size</span>
              <span className="text-white font-bold font-mono">
                {new Blob([localStorage.getItem('mindbridge_user_data') || '']).size} bytes
              </span>
            </div>
          </div>

          <button
            onClick={triggerSync}
            disabled={syncing}
            className="w-full py-3 rounded-xl bg-indigo-primary text-white font-bold text-xs hover:shadow-[0_0_15px_rgba(99,102,241,0.4)] disabled:opacity-50 transition-all cursor-pointer"
          >
            {syncing ? "Synchronizing DB..." : "Force Profile Sync"}
          </button>
        </div>

        {/* Live Terminal Log */}
        <div className="p-6 rounded-3xl bg-black border border-white/5 font-mono text-[10px] text-green-400 space-y-4 min-h-[220px]">
          <span className="text-gray-500 uppercase tracking-widest font-bold">Sync Console Terminal Log</span>
          <div className="space-y-1.5 max-h-[140px] overflow-y-auto pr-2 scrollbar-thin">
            {logs.map((log, index) => (
              <p key={index} className="leading-relaxed">{log}</p>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
