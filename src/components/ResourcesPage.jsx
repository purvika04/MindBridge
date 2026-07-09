import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Phone, Download, BookOpen, Heart, HelpCircle, ShieldAlert, FileText, Play } from 'lucide-react';

export default function ResourcesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { key: 'all', label: 'All Resources' },
    { key: 'helpline', label: 'Emergency Helplines' },
    { key: 'toolkit', label: 'School Toolkits' },
    { key: 'guide', label: 'Self-Care & Guides' },
    { key: 'library', label: 'Meditation Library' }
  ];

  const resources = [
    {
      title: "National Suicide Prevention Lifeline",
      category: "helpline",
      description: "Call or text 988. Free, confidential support available 24/7 for anyone in distress.",
      actionLabel: "Call 988 Now",
      actionHref: "tel:988",
      icon: Phone,
      color: "text-rose-400 bg-rose-500/10 border-rose-500/20"
    },
    {
      title: "Crisis Text Line",
      category: "helpline",
      description: "Text HOME to 741741 to connect with a crisis counselor 24/7.",
      actionLabel: "Text HOME",
      actionHref: "sms:741741",
      icon: Phone,
      color: "text-rose-400 bg-rose-500/10 border-rose-500/20"
    },
    {
      title: "MindBridge Teacher Advocacy Toolkit",
      category: "toolkit",
      description: "Lesson plans, visual templates, and classroom prompts for aligning psychology semesters with experiential campaigns.",
      actionLabel: "Download PDF (4.8MB)",
      icon: Download,
      color: "text-blue-400 bg-blue-500/10 border-blue-500/20"
    },
    {
      title: "MindBridge Student Campaign Builder",
      category: "toolkit",
      description: "Step-by-step layout grids, printing resolutions, and tag structures for establishing outreach booths.",
      actionLabel: "Download Kit (12MB)",
      icon: Download,
      color: "text-blue-400 bg-blue-500/10 border-blue-500/20"
    },
    {
      title: "Cognitive Grounding Self-Care Guide",
      category: "guide",
      description: "Detailed worksheets outlining box breathing, 5-4-3-2-1 sensory grounding, and behavioral activation routines.",
      actionLabel: "Read Guide Online",
      icon: BookOpen,
      color: "text-purple-400 bg-purple-500/10 border-purple-500/20"
    },
    {
      title: "De-escalating Academic Anxiety",
      category: "guide",
      description: "Tips on setting homework boundaries, overcoming test panic, and neutralizing impostor syndrome sentiment.",
      actionLabel: "Read Article",
      icon: FileText,
      color: "text-purple-400 bg-purple-500/10 border-purple-500/20"
    },
    {
      title: "2-Minute Stress-Relief Meditation",
      category: "library",
      description: "Ambient guidance focusing on shoulder tension release and rhythmic belly breath sync.",
      actionLabel: "Play Audio (2:00)",
      icon: Play,
      color: "text-teal-400 bg-teal-500/10 border-teal-500/20"
    },
    {
      title: "Deep Sleep & Wind-Down Sounds",
      category: "library",
      description: "10-minute relaxing synthesized track using lower theta-frequency binaural waves.",
      actionLabel: "Play Audio (10:00)",
      icon: Play,
      color: "text-teal-400 bg-teal-500/10 border-teal-500/20"
    }
  ];

  // Filtering Logic
  const filteredResources = resources.filter(res => {
    const matchesSearch = res.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          res.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'all' || res.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <section id="resources" className="relative py-28 px-6 overflow-hidden border-t border-white/5 bg-dark-bg/40">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h4 className="text-sm font-bold text-indigo-primary tracking-widest uppercase mb-3">SUPPORT DIRECTORY</h4>
          <h2 className="text-4xl md:text-5xl font-bold font-display text-white tracking-tight mb-6">
            Help & Wellness Resources
          </h2>
          <p className="text-gray-400 text-lg">
            Access certified helpline organizations, curriculum toolkits, self-care worksheets, and calming meditations immediately.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-6 mb-12">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-5 h-5 text-gray-500 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search resource titles, descriptions..."
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-primary transition-all placeholder-gray-500"
            />
          </div>

          {/* Filters list */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                  activeCategory === cat.key
                    ? 'bg-indigo-primary text-white border-indigo-primary shadow-md'
                    : 'bg-white/5 text-gray-400 border-white/5 hover:border-white/10 hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredResources.map((res, idx) => {
              const ResIcon = res.icon;
              return (
                <motion.div
                  key={res.title}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="p-6 rounded-2xl glass-panel border border-white/5 hover:border-indigo-primary/20 transition-all flex flex-col justify-between text-left group"
                >
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <div className={`p-3 rounded-xl border flex items-center justify-center ${res.color} group-hover:scale-105 transition-transform`}>
                        <ResIcon className="w-5 h-5" />
                      </div>
                      <span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest font-mono">
                        {res.category}
                      </span>
                    </div>

                    <div className="space-y-1.5">
                      <h4 className="font-bold text-white text-base leading-snug group-hover:text-indigo-primary transition-colors">
                        {res.title}
                      </h4>
                      <p className="text-xs text-gray-400 leading-relaxed">
                        {res.description}
                      </p>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-white/5 mt-6">
                    {res.actionHref ? (
                      <a
                        href={res.actionHref}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-primary hover:text-white transition-colors"
                      >
                        {res.actionLabel}
                      </a>
                    ) : (
                      <button
                        onClick={() => alert(`SaaS Simulator Mode: "${res.title}" download or execution mock triggered.`)}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-primary hover:text-white transition-colors cursor-pointer"
                      >
                        {res.actionLabel}
                      </button>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
          
          {filteredResources.length === 0 && (
            <div className="col-span-full py-16 text-center text-gray-500 text-sm">
              No support assets match your query. Try searching for "crisis" or "meditation".
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
