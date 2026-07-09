import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, BookMarked, BrainCircuit, ArrowRight, RotateCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const storiesDb = {
  anxiety: [
    {
      title: "The Impostor's Spotlight",
      author: "Anonymous Sophomore",
      time: "3 min read",
      tags: ["AcademicPressure", "ImpostorSyndrome", "Exams"],
      story: "In my freshman year, I sat in the engineering lecture hall feeling like a mistake. Everyone else seemed to nod and write equations instantly, while I stared at a blank screen. My chest would tighten before midterms, and I was convinced the admissions office had sent my acceptance letter by accident. It took months before I opened up to a peer coordinator. I realized almost half of our row felt the exact same spotlight effect—convinced everyone was watching their failures.",
      takeaways: [
        "The spotlight effect makes us feel isolated, but inadequacy is a shared, common feeling.",
        "Grades measure prep time and circumstances, not your internal capacity or human worth."
      ]
    },
    {
      title: "Panic at the Podium",
      author: "Anonymous Junior",
      time: "4 min read",
      tags: ["PublicSpeaking", "SocialAnxiety", "Reflect"],
      story: "During our group project presentation, my mouth went completely dry. My vision blurred and I felt my heart beating in my ears. I couldn't remember my next slide. Instead of hiding it, I paused and drank some water. I told my group, 'Give me ten seconds.' They nodded and supported me. Taking that small pause broke the panic loop. I realized the audience wants you to succeed; they aren't waiting to criticize you.",
      takeaways: [
        "Pauses feel ten times longer to you than they do to the audience.",
        "Vulnerability during anxiety breaks the performance pressure and builds real rapport."
      ]
    }
  ],
  loneliness: [
    {
      title: "Quiet Dining Halls",
      author: "Anonymous Freshman",
      time: "3 min read",
      tags: ["SocialIsolation", "Transition", "Belonging"],
      story: "Moving 400 miles from home left me entirely anchorless. In high school, I had a group I sat with daily. At college, walking into the dining hall felt like walking onto a stage. I'd grab my food and rush back to my dorm to eat alone. I felt invisible, like a ghost passing through campus. Things shifted when I joined a peer wellness group. Simply talking about the quiet dining halls made me realize that dozens of students were eating in their dorm rooms for the exact same reason.",
      takeaways: [
        "Campus transition takes time; the initial vacuum is not a permanent rejection.",
        "Establishing connection starts with low-stakes presence—sitting in public, even in silence."
      ]
    },
    {
      title: "Invisible in the Crowd",
      author: "Anonymous Senior",
      time: "4 min read",
      tags: ["Loneliness", "SocialAnxiety", "PeerConnection"],
      story: "I had 500 connections on social media, but no one to call when my grandmother fell ill. I was surrounded by thousands of students in lectures, yet felt completely disconnected. I realized I was performing a version of myself online instead of showing real, messy feelings. When I started sharing raw reflections in wellness clubs, I found that authentic connection requires dropping the polished profile.",
      takeaways: [
        "High connectivity does not equal deep belonging; depth requires vulnerable disclosure.",
        "Anonymous boards allow us to share the unpolished truth, building genuine commonality."
      ]
    }
  ],
  stress: [
    {
      title: "The Overlap of Deadlines",
      author: "Anonymous Student",
      time: "3 min read",
      tags: ["Overwhelmed", "Burnout", "Stress"],
      story: "Last November, I had three lab reports, a final presentation, and a part-time job shift in the same 48 hours. I sat at my desk and felt paralyzed. I couldn't start any of them because my brain was screaming about all of them. I ended up shutting my laptop and walking outside. I sat on a bench and forced myself to pick just one micro-task—writing the title page of one lab report. That single, tiny action broke the block. I finished the work, not perfectly, but it got done.",
      takeaways: [
        "Paralysis comes from evaluating all tasks simultaneously. Pick one microscopic action to start.",
        "Taking a physical break from your desk resets high stress cycles and increases focus."
      ]
    },
    {
      title: "Burning the Candle",
      author: "Anonymous Senior",
      time: "4 min read",
      tags: ["Burnout", "Exams", "SelfCare"],
      story: "I used to pride myself on sleeping 4 hours a night during exam weeks. I wore my exhaustion like a badge of honor. But my grades started slipping, and I was irritable all the time. One morning, I forgot to show up for a mid-term exam entirely. That was my wake-up call. I realized rest is not a reward you earn after working; it is the fuel required to do the work in the first place.",
      takeaways: [
        "Chronic sleep deprivation decreases cognitive speed and increases emotional volatility.",
        "Setting a strict shut-down time is a productive work boundary, not laziness."
      ]
    }
  ],
  grief: [
    {
      title: "The Empty Chair at Graduation",
      author: "Anonymous Senior",
      time: "4 min read",
      tags: ["Grief", "Loss", "Remembrance"],
      story: "My dad passed away during my sophomore year. Returning to class felt surreal; professors were lecturing about marketing, and classmates were complaining about lunch, while my world had ended. I felt guilty when I laughed, and angry when people asked how I was. Over time, I learned that grief isn't a mountain you climb and get over. It is a weight you learn to carry, and it is okay to let the grief sit alongside joy.",
      takeaways: [
        "Grief has no linear timeline; healing means expanding your life around the loss.",
        "Suppressing sad feelings out of guilt delays emotional recovery. Allow yourself to feel."
      ]
    }
  ],
  hope: [
    {
      title: "Finding Calm in the Chaos",
      author: "Anonymous Peer",
      time: "3 min read",
      tags: ["Hope", "Growth", "Community"],
      story: "I spent three semesters thinking my anxiety would never end. But by practicing daily box breathing, logging reflections in the AI journal, and participating in local awareness walks, I began to see small shifts. I still get anxious, but now I know it is a passing state, not my identity. I feel like I've finally found my bridge back to connection.",
      takeaways: [
        "Recovery is a spiral, not a straight line. Bad days do not erase previous progress.",
        "Small, repetitive actions build emotional resilience over time."
      ]
    }
  ]
};

export default function StoriesExplorer({ emotion = 'stress', onComplete }) {
  const navigate = useNavigate();
  const activeStories = storiesDb[emotion] || storiesDb.stress;
  const [storyIdx, setStoryIdx] = useState(0);

  useEffect(() => {
    setStoryIdx(0);
  }, [emotion]);

  const activeStory = activeStories[storyIdx % activeStories.length];

  const handleNextStory = () => {
    setStoryIdx(prev => (prev + 1) % activeStories.length);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <AnimatePresence mode="wait">
        <motion.div
          key={emotion + storyIdx}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.4 }}
          className="p-6 md:p-8 rounded-3xl glass-panel border border-white/10 shadow-xl text-left space-y-6"
        >
          {/* Header Row */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pb-4 border-b border-white/5">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-indigo-primary">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-white font-bold text-base leading-snug">{activeStory.title}</h4>
                <span className="text-[10px] text-gray-500 font-semibold">{activeStory.author}</span>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-gray-400 font-mono bg-white/5 px-2 py-0.5 rounded">
                {activeStory.time}
              </span>
              <span className="text-[10px] bg-indigo-500/10 text-indigo-300 px-2 py-0.5 rounded-full font-bold">
                {emotion}
              </span>
            </div>
          </div>

          {/* Story Body */}
          <p className="text-gray-300 text-sm md:text-base leading-relaxed whitespace-pre-line font-sans italic">
            "{activeStory.story}"
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 pt-2">
            {activeStory.tags.map((tag, idx) => (
              <span key={idx} className="text-[10px] text-gray-400 font-semibold bg-white/5 border border-white/10 px-2.5 py-0.5 rounded-full">
                #{tag}
              </span>
            ))}
          </div>

          {/* Takeaways Container */}
          <div className="p-5 rounded-2xl bg-indigo-950/10 border border-indigo-500/15 space-y-3">
            <span className="text-[10px] text-indigo-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
              <BookMarked className="w-3.5 h-3.5" /> KEY TAKEAWAYS
            </span>
            <ul className="space-y-2">
              {activeStory.takeaways.map((takeaway, idx) => (
                <li key={idx} className="text-xs text-gray-300 flex items-start space-x-2 leading-relaxed">
                  <span className="text-indigo-primary font-bold select-none">•</span>
                  <span>{takeaway}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Action Row */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 justify-between items-center border-t border-white/5">
            {activeStories.length > 1 ? (
              <button
                onClick={handleNextStory}
                className="w-full sm:w-auto text-xs text-gray-400 hover:text-white flex items-center justify-center gap-1.5 transition-colors py-2"
              >
                <RotateCw className="w-3.5 h-3.5" /> Read Another Story
              </button>
            ) : (
              <div />
            )}

            <button
              onClick={() => {
                if (onComplete) {
                  onComplete(activeStory);
                } else {
                  navigate('/reflect', {
                    state: {
                      story: activeStory,
                      emotion: emotion
                    }
                  });
                }
              }}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-indigo-primary text-white font-bold text-xs hover:shadow-[0_0_15px_rgba(99,102,241,0.4)] transition-all cursor-pointer flex items-center justify-center gap-1.5"
            >
              Ready to Reflect <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </motion.div>
      </AnimatePresence>
    </div>
  );
}
