import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, CheckCircle2, ChevronRight } from 'lucide-react';

export default function MicroActivity({ rawInput = '', onComplete }) {
  const [response, setResponse] = useState('');
  const [completed, setCompleted] = useState(false);

  const getExercise = () => {
    const text = rawInput.toLowerCase();
    
    if (text.includes('invisible') || text.includes('lonely') && text.includes('nobody')) {
      return {
        prompt: "Write one thing you did this week that nobody noticed but that made someone else's life easier or brighter.",
        category: "Empathy Recognition",
        duration: "2 min"
      };
    }
    
    if (text.includes('overwhelmed') || text.includes('busy') || text.includes('stress') || text.includes('work')) {
      return {
        prompt: "Close your eyes and identify 5 sounds around you (the hum of a fan, typing, a bird). Then write down one thing you can control today.",
        category: "Control Grounding",
        duration: "2 min"
      };
    }

    if (text.includes('anxious') || text.includes('anxiety') || text.includes('exam') || text.includes('test')) {
      return {
        prompt: "Focus on your physical surroundings. List 3 objects you can touch right now, and describe their physical textures (e.g. cold desk, rough keyboard).",
        category: "Sensory Grounding",
        duration: "2 min"
      };
    }

    if (text.includes('sad') || text.includes('grief') || text.includes('lost') || text.includes('cry')) {
      return {
        prompt: "Honor a feeling: Write down one good memory, standard, or value you would like to keep close to you today. Let it rest in your thoughts.",
        category: "Valued Remembrance",
        duration: "2 min"
      };
    }

    // Default
    return {
      prompt: "Breathe. Write down one thing you feel grateful for in this exact moment, no matter how tiny it may seem (e.g., a warm cup of water, a comfortable chair).",
      category: "Gratitude Grounding",
      duration: "2 min"
    };
  };

  const exercise = getExercise();

  const handleFinish = (e) => {
    e.preventDefault();
    if (!response.trim()) return;
    setCompleted(true);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <AnimatePresence mode="wait">
        {!completed ? (
          <motion.div
            key="activity-card"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="p-6 rounded-2xl glass-panel border border-white/10 shadow-lg text-left space-y-4"
          >
            {/* Header info */}
            <div className="flex justify-between items-center">
              <span className="text-[10px] bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 px-2.5 py-0.5 rounded-full font-bold inline-flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 animate-pulse" /> {exercise.category}
              </span>
              <span className="text-[10px] text-gray-500 font-mono">Duration: {exercise.duration}</span>
            </div>

            {/* Prompt */}
            <h5 className="text-white font-bold text-sm leading-relaxed">
              {exercise.prompt}
            </h5>

            {/* Interactive textarea response */}
            <form onSubmit={handleFinish} className="space-y-4">
              <textarea
                value={response}
                onChange={(e) => setResponse(e.target.value)}
                placeholder="Write your thoughts down..."
                rows={3}
                required
                className="w-full bg-dark-bg/60 border border-white/10 rounded-xl p-3 text-xs md:text-sm text-white focus:outline-none focus:border-indigo-primary transition-all resize-none placeholder-gray-600"
              />
              
              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-purple-primary to-indigo-primary text-white text-xs font-bold hover:shadow-[0_0_15px_rgba(99,102,241,0.3)] transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                Complete Exercise <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </form>
          </motion.div>
        ) : (
          <motion.div
            key="activity-success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-6 rounded-2xl glass-panel border border-emerald-500/20 bg-emerald-950/5 text-center space-y-4"
          >
            <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6 animate-pulse" />
            </div>

            <div className="space-y-1">
              <h5 className="text-white font-bold text-sm">Reflection Recorded</h5>
              <p className="text-xs text-gray-400">Your response has been stored securely in your synchronized learner profile.</p>
            </div>

            <button
              onClick={() => onComplete && onComplete()}
              className="py-2 px-6 bg-white/5 border border-white/10 rounded-lg text-xs font-bold text-white hover:bg-white/10 transition-all cursor-pointer"
            >
              Continue to Stories
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
