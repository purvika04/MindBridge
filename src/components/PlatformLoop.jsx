import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, MessageSquare, Compass, RefreshCw, Layers, HelpCircle } from 'lucide-react';

export default function PlatformLoop() {
  const [activeCycleIndex, setActiveCycleIndex] = useState(0);

  const loopStages = [
    {
      title: "1. Express Emotion",
      subtitle: "AI Check-in",
      desc: "User inputs raw feelings in natural language on the landing dashboard (e.g. 'I feel invisible').",
      engine: "MindBridge Reflect (AI)",
      color: "text-purple-primary border-purple-500/20 bg-purple-500/5",
      accent: "text-purple-primary"
    },
    {
      title: "2. Calming Sensory",
      subtitle: "Nervous Regulation",
      desc: "System launches personalized ambient soundscapes, breathing circles, and cognitive micro-activities to regulate breathing and heart rates.",
      engine: "Multi-Sensory Engine",
      color: "text-blue-primary border-blue-500/20 bg-blue-500/5",
      accent: "text-blue-primary"
    },
    {
      title: "3. Lived Experiences",
      subtitle: "Empathy Reading",
      desc: "Learner reads anonymous peer stories sharing similar emotions to build empathy and combat isolation.",
      engine: "MindBridge Connect (Forums)",
      color: "text-indigo-primary border-indigo-500/20 bg-indigo-500/5",
      accent: "text-indigo-primary"
    },
    {
      title: "4. Guided Reflection",
      subtitle: "AI Coaching",
      desc: "AI Chatbot guides the student with inquiry questions, avoiding directives and facilitating emotional vocabulary mapping.",
      engine: "MindBridge Reflect (AI)",
      color: "text-purple-primary border-purple-500/20 bg-purple-500/5",
      accent: "text-purple-primary"
    },
    {
      title: "5. Collaborative Campaigns",
      subtitle: "Group Advocacy",
      desc: "Reflections compile into anonymous themes. Group teams build outreach proposals, flyers, and digital campaigns on the portal.",
      engine: "MindBridge Connect (Web)",
      color: "text-blue-primary border-blue-500/20 bg-blue-500/5",
      accent: "text-blue-primary"
    },
    {
      title: "6. Mobile Action",
      subtitle: "Field Deployment",
      desc: "Students deploy campaigns locally, coordinate booths, log observations, and snap geotagged photos using the Android app.",
      engine: "MindBridge Act (Mobile)",
      color: "text-teal-primary border-teal-500/20 bg-teal-500/5",
      accent: "text-teal-primary"
    },
    {
      title: "7. AI Analytics & Loop Reset",
      subtitle: "Growth Insights",
      desc: "Field logs sync back to the Reflect profile, providing longitudinal analytics and launching the next developmental check-in.",
      engine: "Feedback Loop Core",
      color: "text-purple-primary border-purple-500/20 bg-purple-500/5",
      accent: "text-purple-primary"
    }
  ];

  return (
    <section id="platform-loop" className="relative py-28 px-6 overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h4 className="text-sm font-bold text-indigo-primary tracking-widest uppercase mb-3">THE CONTINUOUS LOOP</h4>
          <h2 className="text-4xl md:text-5xl font-bold font-display text-white tracking-tight mb-6">
            The Experiential Learning Cycle
          </h2>
          <p className="text-gray-400 text-lg">
            MindBridge is not a one-time chatbot check-in. It is a continuous developmental engine connecting your internal feelings with external community impact.
          </p>
        </div>

        {/* Interactive SVG Connector Loop */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Interactive Diagram */}
          <div className="lg:col-span-7 relative flex justify-center items-center">
            
            {/* SVG Loop Background Path */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <svg className="w-[300px] h-[300px] md:w-[420px] md:h-[420px]" viewBox="0 0 100 100" fill="none">
                <circle cx="50" cy="50" r="40" stroke="rgba(255,255,255,0.03)" strokeWidth="1" strokeDasharray="3,3" />
                <motion.circle 
                  cx="50" 
                  cy="50" 
                  r="40" 
                  stroke="url(#loop-glow-grad)" 
                  strokeWidth="1.5"
                  strokeDasharray="15 80"
                  animate={{ strokeDashoffset: [250, 0] }}
                  transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
                />
                
                <defs>
                  <linearGradient id="loop-glow-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#a855f7" />
                    <stop offset="50%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#14b8a6" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {/* Central Circle Core */}
            <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full bg-dark-bg border border-white/10 flex flex-col items-center justify-center text-center p-4 shadow-[0_15px_30px_rgba(0,0,0,0.5)] z-20">
              <div className="absolute inset-0 rounded-full bg-indigo-500/5 animate-pulse" />
              <RefreshCw className="w-8 h-8 text-indigo-primary animate-spin mb-2" style={{ animationDuration: '15s' }} />
              <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">ECOSYSTEM</span>
              <span className="text-xs font-bold text-white leading-tight">Reflect • Connect • Act</span>
            </div>

            {/* Orbiting loop nodes */}
            {loopStages.map((stage, idx) => {
              const radius = 160; // radius of orbit
              const angleRad = ((idx * (360 / loopStages.length) - 90) * Math.PI) / 180;
              const x = Math.round(Math.cos(angleRad) * radius);
              const y = Math.round(Math.sin(angleRad) * radius);

              const isActive = activeCycleIndex === idx;

              return (
                <button
                  key={idx}
                  onClick={() => setActiveCycleIndex(idx)}
                  className="absolute z-30 transition-transform duration-300 hover:scale-105 focus:outline-none"
                  style={{
                    transform: `translate(${x}px, ${y}px)`
                  }}
                >
                  <div className={`w-11 h-11 md:w-12 md:h-12 rounded-full border flex items-center justify-center text-xs font-bold font-mono transition-all ${
                    isActive 
                      ? 'border-indigo-primary bg-indigo-500/20 text-white shadow-[0_0_15px_rgba(99,102,241,0.4)] scale-110' 
                      : 'border-white/5 bg-dark-card text-gray-400 hover:border-white/20'
                  }`}>
                    0{idx + 1}
                  </div>
                </button>
              );
            })}

          </div>

          {/* Right Column: Detailed Card explanation */}
          <div className="lg:col-span-5 text-left flex flex-col justify-center">
            
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCycleIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.35 }}
                className="space-y-6"
              >
                <div className="space-y-2">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold border uppercase tracking-wider ${loopStages[activeCycleIndex].color}`}>
                    {loopStages[activeCycleIndex].subtitle}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-bold font-display text-white">
                    {loopStages[activeCycleIndex].title}
                  </h3>
                </div>

                <div className="p-6 rounded-2xl glass-panel border border-white/5 shadow-inner">
                  <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                    {loopStages[activeCycleIndex].desc}
                  </p>
                </div>

                <div className="flex justify-between items-center text-xs pt-2">
                  <span className="text-gray-500 font-bold uppercase tracking-wider">Engine:</span>
                  <span className={`font-bold ${loopStages[activeCycleIndex].accent}`}>
                    {loopStages[activeCycleIndex].engine}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Indicator dots */}
            <div className="mt-8 flex space-x-2">
              {loopStages.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveCycleIndex(idx)}
                  className={`w-6 h-1 rounded-full transition-colors ${
                    activeCycleIndex === idx ? 'bg-indigo-primary' : 'bg-white/5 hover:bg-white/10'
                  }`}
                />
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
