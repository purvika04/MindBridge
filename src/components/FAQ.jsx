import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, ChevronDown } from 'lucide-react';

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState(null);

  const faqs = [
    {
      q: "What is MindBridge?",
      a: "MindBridge is a unified mental health experiential learning platform. Rather than using multiple separate apps, it coordinates a single learning path across three synchronized interfaces: Reflect (AI Companion), Connect (Collaborative Web Space), and Act (Android Mobile App). It is designed to move awareness campaigns from passive reading into active, collaborative, real-world community action."
    },
    {
      q: "How does the AI companion work?",
      a: "The Reflect AI Companion engages you in daily conversational check-ins using cognitive-behavioral prompts. It analyzes sentiment trends and logs entries into your secure, encrypted profile. Crucially, the AI helps translate your personal insights into active theme tags that you can optionally discuss with peers in the Connect forum."
    },
    {
      q: "Is my data private?",
      a: "Yes. Your personal check-ins and journal entries are fully encrypted at rest and in transit. Your dashboard metrics and analytics are private. The Connect platform only receives anonymized group summaries (e.g. '80% of our group identified Academic Stress') to spark collaborative campaigns, keeping individual statements secure."
    },
    {
      q: "Can educational institutions use MindBridge?",
      a: "Absolutely. MindBridge is built specifically for schools, universities, and student wellness organizations. We provide a administration dashboard for course coordinators to evaluate student campaigns, view aggregated group sentiment indices, and verify field observation logs submitted via the Android app."
    },
    {
      q: "Does it work offline?",
      a: "The Act Android companion is optimized for offline field advocacy. You can capture geocoded coordinates, save camera snapshots of posters/flyers, and log observation notes without an internet connection. Your observations are saved locally and sync immediately to your profile once a network is detected."
    },
    {
      q: "Is there an Android application?",
      a: "Yes. The Android mobile companion (Act) is downloadable for students participating in field events. It lets you capture location-based logs, snap photos of campaign deliverables, track team locations at assemblies, and receive location-based coaching suggestions from the AI companion."
    }
  ];

  const toggleFAQ = (idx) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq" className="relative py-28 px-6 overflow-hidden border-t border-white/5 bg-dark-bg/40">
      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center mb-20">
          <h4 className="text-sm font-bold text-indigo-primary tracking-widest uppercase mb-3">COMMON QUESTIONS</h4>
          <h2 className="text-4xl md:text-5xl font-bold font-display text-white tracking-tight mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-400 text-lg">
            Have questions about privacy, sync behavior, or school implementations? We have answers.
          </p>
        </div>

        {/* Accordions */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div 
                key={idx}
                className="rounded-2xl glass-panel border border-white/5 overflow-hidden transition-all duration-300 hover:border-white/10"
              >
                {/* FAQ Header Row */}
                <button
                  onClick={() => toggleFAQ(idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 text-white focus:outline-none cursor-pointer"
                >
                  <div className="flex items-center space-x-3.5">
                    <HelpCircle className="w-5 h-5 text-indigo-primary shrink-0" />
                    <span className="font-bold text-sm md:text-base leading-snug">{faq.q}</span>
                  </div>
                  
                  {/* Rotating Chevron */}
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="p-1 rounded-lg bg-white/5 border border-white/10 text-gray-400 shrink-0"
                  >
                    <ChevronDown className="w-4 h-4" />
                  </motion.div>
                </button>

                {/* FAQ Answer Expandable Panel */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      exit={{ height: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 pt-1 text-xs md:text-sm text-gray-400 leading-relaxed border-t border-white/5 bg-white/[0.01]">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
