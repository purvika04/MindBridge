import React, { useContext, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserContext } from '../context/UserContext';
import { Edit3, BookOpen, Clock, Calendar, CheckCircle } from 'lucide-react';

export default function JournalPage() {
  const { state, addJournalEntry } = useContext(UserContext);
  const [entryText, setEntryText] = useState('');
  const [activePrompt, setActivePrompt] = useState("What did you discover about your anxiety triggers today?");
  const [success, setSuccess] = useState(false);

  const prompts = [
    "What did you discover about your anxiety triggers today?",
    "Describe a conversation that made you feel connected.",
    "What coping strategy felt most responsive to your overwhelm?",
    "Write about a small victory or boundary you established this week."
  ];

  const handleSave = (e) => {
    e.preventDefault();
    if (!entryText.trim()) return;

    addJournalEntry(activePrompt, entryText);
    setEntryText('');
    setSuccess(true);
    setTimeout(() => setSuccess(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-28 relative z-10 text-left min-h-screen">
      
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-3xl md:text-5xl font-bold font-display text-white mb-2">Guided Journaling</h1>
        <p className="text-sm text-gray-400">Log entries, answer cognitive prompts, and map your emotional journey over time.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Journal History */}
        <div className="lg:col-span-5 space-y-6">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-purple-primary" /> Logged Entries
          </h3>

          <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 scrollbar-thin">
            <AnimatePresence>
              {state.journalHistory && state.journalHistory.length > 0 ? (
                state.journalHistory.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="p-5 rounded-2xl glass-panel border border-white/5 space-y-3"
                  >
                    <div className="flex justify-between items-center text-[10px] text-gray-500 font-semibold font-mono">
                      <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {item.date}</span>
                      <span>Verified Sync</span>
                    </div>
                    <span className="text-xs text-purple-primary font-bold block">{item.prompt}</span>
                    <p className="text-xs text-gray-300 leading-relaxed font-sans italic">
                      "{item.text}"
                    </p>
                  </motion.div>
                ))
              ) : (
                <div className="p-12 text-center rounded-2xl glass-panel border border-white/5 flex flex-col items-center justify-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-gray-500">
                    <Clock className="w-6 h-6 animate-pulse" />
                  </div>
                  <h4 className="text-sm font-bold text-white">No entries logged yet</h4>
                  <p className="text-xs text-gray-500 max-w-[200px] leading-relaxed">
                    Complete your first reflection or write an entry to begin your journal history.
                  </p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Right Column: New Entry Studio */}
        <div className="lg:col-span-7">
          <div className="p-6 md:p-8 rounded-3xl glass-panel border border-white/10 shadow-lg space-y-6">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Edit3 className="w-5 h-5 text-purple-primary animate-pulse" /> Write a New Entry
            </h3>

            {/* Prompt Selector */}
            <div className="space-y-2">
              <label className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block">Select Journal Prompt</label>
              <div className="grid grid-cols-1 gap-2">
                {prompts.map((p, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActivePrompt(p)}
                    className={`text-xs text-left p-3.5 rounded-xl border transition-all cursor-pointer ${
                      activePrompt === p 
                        ? 'border-purple-primary/40 bg-purple-500/10 text-white' 
                        : 'border-white/5 bg-white/5 text-gray-400 hover:border-white/10 hover:text-white'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            {/* Input area */}
            <form onSubmit={handleSave} className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block">Your Reflection Entry</label>
                <textarea
                  value={entryText}
                  onChange={(e) => setEntryText(e.target.value)}
                  placeholder="Record your thoughts here..."
                  rows={6}
                  required
                  className="w-full bg-dark-bg/60 border border-white/10 rounded-2xl p-4 text-xs md:text-sm text-white focus:outline-none focus:border-purple-primary transition-all resize-none placeholder-gray-600"
                />
              </div>

              <div className="flex items-center justify-between">
                <AnimatePresence>
                  {success && (
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-xs text-emerald-400 font-semibold flex items-center gap-1"
                    >
                      <CheckCircle className="w-4 h-4" /> Entry saved to profile
                    </motion.span>
                  )}
                </AnimatePresence>

                <button
                  type="submit"
                  className="px-6 py-3 ml-auto rounded-xl bg-purple-primary text-white font-bold text-xs hover:shadow-[0_0_15px_rgba(168,85,247,0.4)] transition-all cursor-pointer flex items-center gap-1.5"
                >
                  Save Journal Entry
                </button>
              </div>
            </form>

          </div>
        </div>

      </div>

    </div>
  );
}
