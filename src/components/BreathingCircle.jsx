import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function BreathingCircle({ emotion = 'stress' }) {
  // Breathing timing cycles
  // Box: Inhale (4s) -> Hold (4s) -> Exhale (4s) -> Hold (4s)
  // 4-7-8: Inhale (4s) -> Hold (7s) -> Exhale (8s)
  // Diaphragmatic: Inhale (5s) -> Exhale (5s)
  
  const getPattern = () => {
    switch (emotion) {
      case 'anxiety':
        return {
          name: 'Box Breathing',
          steps: [
            { type: 'Inhale', duration: 4, scale: 1.4, desc: 'Breathe in through your nose.' },
            { type: 'Hold', duration: 4, scale: 1.4, desc: 'Suspend your breath gently.' },
            { type: 'Exhale', duration: 4, scale: 1.0, desc: 'Release slowly through your mouth.' },
            { type: 'Hold', duration: 4, scale: 1.0, desc: 'Rest before the next breath.' }
          ]
        };
      case 'grief':
        return {
          name: 'Slow Diaphragmatic Breathing',
          steps: [
            { type: 'Inhale', duration: 5, scale: 1.4, desc: 'Breathe deep into your diaphragm.' },
            { type: 'Exhale', duration: 5, scale: 1.0, desc: 'Exhale fully, letting your chest drop.' }
          ]
        };
      case 'stress':
      case 'loneliness':
      default:
        return {
          name: '4-7-8 Breathing Technique',
          steps: [
            { type: 'Inhale', duration: 4, scale: 1.4, desc: 'Inhale quietly for 4 seconds.' },
            { type: 'Hold', duration: 7, scale: 1.4, desc: 'Hold your breath for 7 seconds.' },
            { type: 'Exhale', duration: 8, scale: 1.0, desc: 'Sigh out fully for 8 seconds.' }
          ]
        };
    }
  };

  const pattern = getPattern();
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [secondsRemaining, setSecondsRemaining] = useState(pattern.steps[0].duration);

  useEffect(() => {
    // Reset state if pattern changes
    setCurrentStepIdx(0);
    setSecondsRemaining(pattern.steps[0].duration);
  }, [emotion]);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          // Move to next step
          const nextIdx = (currentStepIdx + 1) % pattern.steps.length;
          setCurrentStepIdx(nextIdx);
          return pattern.steps[nextIdx].duration;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentStepIdx, pattern]);

  const currentStep = pattern.steps[currentStepIdx];

  // Colors based on emotion
  const getThemeColor = () => {
    switch (emotion) {
      case 'anxiety':
        return 'from-teal-primary to-blue-primary shadow-[0_0_40px_rgba(20,184,166,0.3)]';
      case 'loneliness':
        return 'from-amber-500 to-orange-500 shadow-[0_0_40px_rgba(245,158,11,0.3)]';
      case 'grief':
        return 'from-purple-500 to-rose-500 shadow-[0_0_40px_rgba(244,63,94,0.3)]';
      case 'stress':
      default:
        return 'from-blue-primary to-indigo-primary shadow-[0_0_40px_rgba(59,130,246,0.3)]';
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 text-center space-y-6">
      <div className="space-y-1">
        <h4 className="text-white font-bold text-lg">{pattern.name}</h4>
        <span className="text-xs text-gray-500 uppercase tracking-widest font-semibold">Regulate Nervous System</span>
      </div>

      {/* Outer Circle Container */}
      <div className="relative w-64 h-64 flex items-center justify-center">
        {/* Soft decorative pulsating outer ring */}
        <div className="absolute inset-0 rounded-full border border-white/5 animate-pulse" />
        
        {/* Animated core breathing sphere */}
        <motion.div
          animate={{ scale: currentStep.scale }}
          transition={{ duration: currentStep.duration, ease: "easeInOut" }}
          className={`w-36 h-36 rounded-full bg-gradient-to-tr ${getThemeColor()} flex flex-col items-center justify-center relative z-10 transition-shadow duration-500`}
        >
          {/* Subtle micro haptic ring */}
          <div className="absolute inset-[-8px] rounded-full border border-white/10 animate-ping opacity-15" style={{ animationDuration: '3s' }} />

          {/* Action text */}
          <span className="text-white text-lg font-black tracking-wide font-display uppercase drop-shadow">
            {currentStep.type}
          </span>
          {/* Seconds ticker */}
          <span className="text-white text-xs font-mono font-bold mt-1 opacity-80 bg-black/10 px-2 py-0.5 rounded-full">
            {secondsRemaining}s
          </span>
        </motion.div>

        {/* Circular progress path tracker */}
        <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="46" fill="none" stroke="rgba(255,255,255,0.02)" strokeWidth="2" />
          <motion.circle
            cx="50"
            cy="50"
            r="46"
            fill="none"
            stroke="rgba(255,255,255,0.15)"
            strokeWidth="2.5"
            strokeDasharray="289"
            animate={{ 
              strokeDashoffset: [
                289, 
                289 - (289 * ((currentStep.duration - secondsRemaining) / currentStep.duration))
              ]
            }}
            transition={{ duration: 1, ease: "linear" }}
          />
        </svg>
      </div>

      {/* Guide description text */}
      <div className="h-12 flex flex-col justify-center max-w-sm">
        <AnimatePresence mode="wait">
          <motion.p
            key={currentStep.type + currentStep.desc}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.3 }}
            className="text-sm text-gray-300 font-medium"
          >
            {currentStep.desc}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}
