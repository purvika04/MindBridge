import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { UserContext } from '../context/UserContext';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import { Activity, Heart, TrendingUp, Sparkles } from 'lucide-react';

export default function AnalyticsPage() {
  const { state } = useContext(UserContext);
  const moodHistory = state.moodHistory || [];

  // Group and format chart data
  const chartData = moodHistory.map((item, idx) => ({
    name: item.date,
    score: item.value,
    emotion: item.emotion,
    text: item.text
  }));

  // Calculate stats
  const totalLogs = moodHistory.length;
  
  const getDominantEmotion = () => {
    if (totalLogs === 0) return 'None';
    const counts = {};
    moodHistory.forEach(h => {
      counts[h.emotion] = (counts[h.emotion] || 0) + 1;
    });
    return Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b);
  };

  const dominantEmotion = getDominantEmotion();

  return (
    <div className="max-w-7xl mx-auto px-6 py-28 relative z-10 text-left min-h-screen">
      
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-3xl md:text-5xl font-bold font-display text-white mb-2">Emotional Analytics</h1>
        <p className="text-sm text-gray-400">Longitudinal mapping of your emotional state based on your daily text check-ins.</p>
      </div>

      {totalLogs > 0 ? (
        <div className="space-y-8">
          
          {/* Stats summary cards row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl glass-panel border border-white/5 space-y-2">
              <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block">Total Mood Logs</span>
              <h3 className="text-3xl font-extrabold text-white font-mono">{totalLogs}</h3>
              <p className="text-xs text-gray-400">Total check-in observations registered.</p>
            </div>
            <div className="p-6 rounded-2xl glass-panel border border-white/5 space-y-2">
              <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block">Dominant Emotion</span>
              <h3 className="text-3xl font-extrabold text-white uppercase tracking-tight">{dominantEmotion}</h3>
              <p className="text-xs text-gray-400">Most frequently recorded check-in state.</p>
            </div>
            <div className="p-6 rounded-2xl glass-panel border border-indigo-500/20 space-y-2">
              <span className="text-[10px] text-indigo-400 font-bold uppercase tracking-wider block">Streak status</span>
              <h3 className="text-3xl font-extrabold text-white font-mono">{state.streak} Days</h3>
              <p className="text-xs text-indigo-300 flex items-center gap-1"><Sparkles className="w-3.5 h-3.5 animate-pulse" /> Consistent reflection unlocks insights.</p>
            </div>
          </div>

          {/* Recharts Area Chart Container */}
          <div className="p-6 md:p-8 rounded-3xl glass-panel border border-white/10 shadow-lg">
            <div className="mb-6 flex justify-between items-center">
              <div>
                <h4 className="text-lg font-bold text-white">Mood Progression Chart</h4>
                <p className="text-xs text-gray-500">Values map from 1 (Grief) to 8 (Happiness) based on checks.</p>
              </div>
              <Activity className="w-5 h-5 text-indigo-primary animate-pulse" />
            </div>

            <div className="w-full h-[320px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                  <defs>
                    <linearGradient id="chartMoodGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.25}/>
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" />
                  <XAxis dataKey="name" stroke="#6b7280" fontSize={10} tickLine={false} />
                  <YAxis stroke="#6b7280" fontSize={10} tickLine={false} domain={[0, 9]} tickCount={10} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'rgba(15,17,28,0.95)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px' }}
                    labelStyle={{ color: '#fff', fontWeight: 'bold', fontSize: 11 }}
                    itemStyle={{ fontSize: 11, color: '#6366f1' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="score" 
                    stroke="#6366f1" 
                    strokeWidth={2} 
                    fillOpacity={1} 
                    fill="url(#chartMoodGrad)" 
                    name="Mood Level" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>
      ) : (
        /* Empty State */
        <div className="p-16 text-center rounded-3xl glass-panel border border-white/5 flex flex-col items-center justify-center space-y-4 max-w-xl mx-auto my-12">
          <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-gray-500">
            <Heart className="w-8 h-8 animate-pulse" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-white">Your mood trends will appear here after a few check-ins.</h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              Complete your first check-in from the Home dashboard to see your progress graph.
            </p>
          </div>
        </div>
      )}

    </div>
  );
}
