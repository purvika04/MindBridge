import React, { useState, useEffect, useContext, useRef } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { UserContext } from '../context/UserContext';
import { storiesDb } from '../components/StoriesExplorer';
import BreathingCircle from '../components/BreathingCircle';
import AudioSynth from '../utils/AudioSynth';
import { 
  BookOpen, 
  ChevronRight, 
  ChevronLeft, 
  Send, 
  Check, 
  Sparkles, 
  ArrowRight,
  BookMarked,
  Flame,
  Volume2,
  Play,
  Pause,
  Edit3,
  Download,
  Shield,
  Heart,
  TrendingDown
} from 'lucide-react';

export default function ReflectionPage() {
  const { state: userState, unlockCommunity, markStoryRead, addJournalEntry } = useContext(UserContext);
  const location = useLocation();
  const messagesEndRef = useRef(null);

  // Retrieve story and emotion from router state
  const { story, emotion } = location.state || {};

  // Resolve active story context safely
  const moodHistory = userState.moodHistory || [];
  const latestCheck = moodHistory.length > 0 ? moodHistory[moodHistory.length - 1] : { emotion: 'stress', text: 'feeling overwhelmed' };
  const activeEmotion = emotion || latestCheck.emotion || 'stress';
  const activeStory = story || (storiesDb[activeEmotion] && storiesDb[activeEmotion][0]) || storiesDb.stress[0];

  // Collapsible side panel state
  const [sidePanelOpen, setSidePanelOpen] = useState(true);

  // Modals state
  const [isBreathingOpen, setIsBreathingOpen] = useState(false);
  const [isJournalOpen, setIsJournalOpen] = useState(false);
  const [journalText, setJournalText] = useState('');
  const [journalSuccess, setJournalSuccess] = useState(false);

  // Audio tool states
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [audioVolume, setAudioVolume] = useState(0.5);
  const [audioPreset, setAudioPreset] = useState(activeEmotion);

  // Chat message state
  const [chatMessages, setChatMessages] = useState([
    { 
      id: 1, 
      sender: 'ai', 
      text: `Hello. I see you checked in feeling "${latestCheck.text}" today. You've just read "${activeStory.title}." What part of this story resonated with you the most?` 
    }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [chatStep, setChatStep] = useState(0); // 0, 1, 2, 3 (reflection complete)

  // Turn memory store

  // Typing animation states
  const [isTyping, setIsTyping] = useState(false);
  const [typingStatus, setTypingStatus] = useState('');

  // Quick reply options
  const [quickReplies, setQuickReplies] = useState([]);

  // Confidence & Validation States
  const [understandingConfidence, setUnderstandingConfidence] = useState('High');
  const [, setConsecutiveInvalidCount] = useState(0);

  // Summary generation states
  const [summary, setSummary] = useState({
    keyInsight: '',
    emotionalGrowth: '',
    positiveAction: '',
    highlights: []
  });
  const [isEditingSummary, setIsEditingSummary] = useState(false);
  const [editedSummary, setEditedSummary] = useState({
    keyInsight: '',
    emotionalGrowth: '',
    positiveAction: ''
  });
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Scroll chat to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, isTyping]);

  // Audio control helper
  const handleAudioToggle = () => {
    if (isAudioPlaying) {
      AudioSynth.stop();
      setIsAudioPlaying(false);
    } else {
      AudioSynth.start(audioPreset);
      AudioSynth.setVolume(audioVolume);
      setIsAudioPlaying(true);
    }
  };

  const handleAudioPresetChange = (preset) => {
    setAudioPreset(preset);
    if (isAudioPlaying) {
      AudioSynth.stop();
      AudioSynth.start(preset);
      AudioSynth.setVolume(audioVolume);
    }
  };

  // Keyboard mashing validator
  const checkGibberish = (text) => {
    const t = text.trim().toLowerCase();
    if (t === '...' || t.match(/^[^a-zA-Z0-9]+$/)) return true; // only symbols
    if (t.match(/^[0-9]+$/)) return true; // only numbers
    
    // Keyboard mashing check (longer words with no vowels)
    const words = t.split(/\s+/);
    for (let w of words) {
      if (w.length >= 4 && !/[aeiouy]/i.test(w)) return true;
    }
    
    // Repeat characters
    if (t.match(/^(.)\1{3,}$/)) return true;
    return false;
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!chatInput.trim() || isTyping) return;

    const userText = chatInput.trim();
    setChatInput('');
    processUserMessage(userText);
  };

  const processUserMessage = (userText) => {
    const userMsg = { id: Date.now(), sender: 'user', text: userText };
    setChatMessages(prev => [...prev, userMsg]);
    setQuickReplies([]);
    setIsTyping(true);

    // 1. GIBBERISH / MEANINGLESS INPUT VALIDATION
    if (checkGibberish(userText)) {
      setConsecutiveInvalidCount(prev => {
        const nextCount = prev + 1;
        setTypingStatus('Analyzing response...');
        setUnderstandingConfidence('Low');

        setTimeout(() => {
          setIsTyping(false);
          let aiReply = '';
          if (nextCount >= 2) {
            aiReply = `I want to support you, but I need a little more context or detail about what is happening to guide this reflection. Could you describe your current state in a sentence?`;
          } else {
            aiReply = `I'm not quite sure I understood what you meant. Could you tell me a little more about what you're feeling? There are no right or wrong words.`;
          }
          setChatMessages(prevMsgs => [...prevMsgs, { id: Date.now() + 1, sender: 'ai', text: aiReply }]);
        }, 1200);
        return nextCount;
      });
      return;
    }

    // 2. VAGUE SINGLE-WORD CHECK
    const vagueWords = ['fine', 'okay', 'ok', 'idk', 'nothing', 'good', 'bad', 'yes', 'no', 'meh'];
    if (vagueWords.includes(userText.toLowerCase())) {
      setConsecutiveInvalidCount(prev => {
        const nextCount = prev + 1;
        setTypingStatus('Analyzing response...');
        setUnderstandingConfidence('Medium');

        setTimeout(() => {
          setIsTyping(false);
          const aiReply = `"${userText}" can mean many different things. Would you say you're genuinely feeling okay today, or is something bothering you?`;
          setChatMessages(prevMsgs => [...prevMsgs, { id: Date.now() + 1, sender: 'ai', text: aiReply }]);
          setQuickReplies(["I'm okay", "Something is bothering me"]);
        }, 1200);
        return nextCount;
      });
      return;
    }

    // Reset validation counters upon valid response
    setConsecutiveInvalidCount(0);
    setUnderstandingConfidence('High');

    // 3. LOW CONFIDENCE CLARIFYING FLOW
    const isAmbiguous = userText.toLowerCase().includes('dunno') || userText.length < 3;
    if (isAmbiguous && chatStep < 2) {
      setTypingStatus('Clarifying emotion...');
      setUnderstandingConfidence('Low');

      setTimeout(() => {
        setIsTyping(false);
        const aiReply = `I want to make sure I understand you correctly. Are you experiencing anxiety, loneliness, stress, or something else?`;
        setChatMessages(prevMsgs => [...prevMsgs, { id: Date.now() + 1, sender: 'ai', text: aiReply }]);
        setQuickReplies(["Anxiety", "Loneliness", "Stress", "Grief"]);
      }, 1200);
      return;
    }

    // 4. NORMAL THERAPIST DIALOGUE TURNS
    if (chatStep === 0) {
      setTypingStatus('Analyzing your response...');
      
      setTimeout(() => {
        setTypingStatus('Generating a personalized reflection...');
      }, 700);

      setTimeout(() => {
        setIsTyping(false);
        const aiReply = `You mentioned: "${userText}". That makes complete sense, especially since you described feeling "${latestCheck.text}" earlier today. Looking closer at this resonance, when did this trigger or stress pattern first start affecting your daily routine?`;
        setChatMessages(prevMsgs => [...prevMsgs, { id: Date.now() + 1, sender: 'ai', text: aiReply }]);
        setChatStep(1);
      }, 1500);

    } else if (chatStep === 1) {
      setTypingStatus('Analyzing your response...');

      setTimeout(() => {
        setTypingStatus('Generating a personalized reflection...');
      }, 750);

      setTimeout(() => {
        setIsTyping(false);
        const lesson = activeStory.takeaways && activeStory.takeaways[0] 
          ? activeStory.takeaways[0] 
          : "grades represent prep circumstances, not your capacity";
        
        const aiReply = `I hear you. Dealing with that pattern is heavy. In the story, the author found that "${lesson}" was a crucial perspective shift. Keeping that lesson in mind, what is one small, positive action that feels manageable for you today?`;
        setChatMessages(prevMsgs => [...prevMsgs, { id: Date.now() + 1, sender: 'ai', text: aiReply }]);
        setChatStep(2);
      }, 1600);

    } else if (chatStep === 2) {
      setTypingStatus('Analyzing your response...');

      setTimeout(() => {
        setTypingStatus('Generating a personalized reflection...');
      }, 700);

      setTimeout(() => {
        setIsTyping(false);
        const aiReply = `That is a powerful choice: "${userText}". Taking a positive action helps restore agency and breaks the anxiety loops. I have compiled our conversation details into a Reflection Summary below. Let's finalize it together.`;
        setChatMessages(prevMsgs => [...prevMsgs, { id: Date.now() + 1, sender: 'ai', text: aiReply }]);
        setChatStep(3);

        // Prepopulate reflection summary
        const summaryData = {
          keyInsight: `Acknowledged that emotional resonance with "${activeStory.title}" stems from current struggles with "${latestCheck.text}."`,
          emotionalGrowth: `Identified historical triggers affecting daily routines, and recognized the validity of taking pauses.`,
          positiveAction: userText,
          highlights: [
            `Read and processed story: "${activeStory.title}"`,
            `Mapped check-in feeling: "${latestCheck.text}"`,
            `Committed to immediate de-escalation task.`
          ]
        };
        setSummary(summaryData);
        setEditedSummary({
          keyInsight: summaryData.keyInsight,
          emotionalGrowth: summaryData.emotionalGrowth,
          positiveAction: summaryData.positiveAction
        });

        // Trigger unlocks in context
        unlockCommunity();
        markStoryRead(activeStory.title);
      }, 1500);
    }
  };

  // Summary private save log
  const handleSavePrivately = () => {
    const summaryText = `[Insight]: ${editedSummary.keyInsight}\n[Growth]: ${editedSummary.emotionalGrowth}\n[Action]: ${editedSummary.positiveAction}`;
    addJournalEntry(`Reflection Summary: ${activeStory.title}`, summaryText);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  // Summary download helper
  const handleDownloadTxt = () => {
    const content = `=========================================
MINDBRIDGE REFLECTION SUMMARY
Date: ${new Date().toLocaleDateString()}
Story: ${activeStory.title}
Emotion: ${activeEmotion}
=========================================

[KEY INSIGHT]
${editedSummary.keyInsight}

[EMOTIONAL GROWTH]
${editedSummary.emotionalGrowth}

[POSITIVE ACTION STEP]
${editedSummary.positiveAction}

[DIALOGUE TRACKS]
${chatMessages.map(m => `${m.sender === 'user' ? 'USER' : 'AI'}: ${m.text}`).join('\n\n')}

-----------------------------------------
Your reflections are stored locally. Stay safe.
=========================================`;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `MindBridge_Reflection_Summary_${activeStory.title.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Live emotional statistics resolvers
  const getProgressPercentage = () => {
    if (chatStep === 0) return 0;
    if (chatStep === 1) return 33;
    if (chatStep === 2) return 66;
    return 100;
  };

  const getEmotionalConfidence = () => {
    if (chatStep === 0) return "82% Confidence";
    if (chatStep === 1) return "89% Confidence";
    if (chatStep === 2) return "94% Confidence";
    return "98% Confidence";
  };

  const getStressTrend = () => {
    if (chatStep === 0) return "Elevated / Analyzing";
    if (chatStep === 1) return "Mapping Triggers";
    if (chatStep === 2) return "Processing Tension";
    return "Regulated & Grounded";
  };

  // Aesthetics color helpers
  const getThemeText = () => {
    switch (activeEmotion) {
      case 'anxiety': return 'text-teal-400';
      case 'loneliness': return 'text-amber-400';
      case 'grief': return 'text-purple-400';
      case 'hope': return 'text-emerald-400';
      case 'stress':
      default:
        return 'text-blue-400';
    }
  };

  const getThemeBg = () => {
    switch (activeEmotion) {
      case 'anxiety': return 'bg-teal-500/10 border-teal-500/20 text-teal-300';
      case 'loneliness': return 'bg-amber-500/10 border-amber-500/20 text-amber-300';
      case 'grief': return 'bg-purple-500/10 border-purple-500/20 text-purple-300';
      case 'hope': return 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300';
      case 'stress':
      default:
        return 'bg-blue-500/10 border-blue-500/20 text-blue-300';
    }
  };

  const getThemeGlow = () => {
    switch (activeEmotion) {
      case 'anxiety': return 'shadow-[0_0_50px_rgba(20,184,166,0.15)] border-teal-500/20';
      case 'loneliness': return 'shadow-[0_0_50px_rgba(245,158,11,0.15)] border-amber-500/20';
      case 'grief': return 'shadow-[0_0_50px_rgba(168,85,247,0.15)] border-purple-500/20';
      case 'hope': return 'shadow-[0_0_50px_rgba(16,185,129,0.15)] border-emerald-500/20';
      case 'stress':
      default:
        return 'shadow-[0_0_50px_rgba(59,130,246,0.15)] border-blue-500/20';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-28 relative z-10 text-left min-h-screen flex flex-col justify-between">
      
      {/* Top Header Grid */}
      <div className="w-full space-y-6 mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl md:text-5xl font-bold font-display text-white mb-2">AI Reflection</h1>
            <p className="text-sm text-gray-400 font-sans">Engage with your cognitive companion to map patterns and unlock support channels.</p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-gray-400">
            <Flame className="w-3.5 h-3.5 text-orange-500" />
            <span>Streak: {userState.streak || 0} Days</span>
          </div>
        </div>

        {/* Stepper Progress Indicator */}
        <div className="grid grid-cols-4 gap-2 bg-white/5 border border-white/10 rounded-2xl p-4 max-w-2xl shadow-sm">
          {[
            { label: "Story Completed", status: "completed" },
            { label: `Reflection (${getProgressPercentage()}%)`, status: chatStep >= 3 ? "completed" : "active" },
            { label: "Community", status: userState.communityUnlocked ? "unlocked" : "pending" },
            { label: "Campaign", status: "pending" }
          ].map((step, idx) => (
            <div key={idx} className="flex flex-col sm:flex-row items-center gap-2">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-all ${
                step.status === "completed" || step.status === "unlocked"
                  ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20' 
                  : step.status === "active" 
                    ? 'bg-indigo-primary text-white ring-2 ring-indigo-500/30' 
                    : 'bg-white/5 text-gray-500'
              }`}>
                {step.status === "completed" || step.status === "unlocked" ? <Check className="w-3 h-3" /> : idx + 1}
              </div>
              <span className={`text-[10px] font-semibold hidden sm:inline ${
                step.status === "active" ? 'text-white font-bold animate-pulse' : step.status === "completed" || step.status === "unlocked" ? 'text-emerald-400' : 'text-gray-500'
              }`}>
                {step.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Workspace Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch flex-1 min-h-[520px]">
        
        {/* Left Column: Reference Story Side Panel */}
        <div className={`lg:col-span-4 transition-all duration-300 ${
          sidePanelOpen ? 'block' : 'hidden lg:block lg:max-w-[80px]'
        }`}>
          <div className="h-full p-6 rounded-3xl glass-panel border border-white/10 flex flex-col justify-between space-y-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-2xl pointer-events-none" />

            <div className="space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-white/5">
                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider flex items-center gap-1.5 font-mono">
                  <BookOpen className="w-3.5 h-3.5" /> Story Reference
                </span>
                <button
                  onClick={() => setSidePanelOpen(false)}
                  className="hidden lg:flex w-6 h-6 rounded-lg bg-white/5 border border-white/10 items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
                  title="Collapse Panel"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
              </div>

              {sidePanelOpen ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                  <div>
                    <h3 className="text-base font-bold text-white leading-snug">{activeStory.title}</h3>
                    <span className="text-[10px] text-gray-500 font-semibold">{activeStory.author}</span>
                  </div>

                  <span className={`inline-block text-[10px] uppercase font-bold tracking-widest px-2.5 py-0.5 rounded-full border ${getThemeBg()}`}>
                    #{activeEmotion}
                  </span>

                  <div className="max-h-[180px] overflow-y-auto pr-2 scrollbar-thin text-xs text-gray-300 leading-relaxed font-sans italic whitespace-pre-line border-t border-b border-white/5 py-3">
                    "{activeStory.story}"
                  </div>

                  {activeStory.takeaways && (
                    <div className="space-y-2">
                      <span className="text-[10px] text-indigo-400 font-bold uppercase tracking-wider flex items-center gap-1 font-mono">
                        <BookMarked className="w-3 h-3" /> Core Takeaways
                      </span>
                      <ul className="space-y-1">
                        {activeStory.takeaways.map((t, idx) => (
                          <li key={idx} className="text-[10px] text-gray-400 flex items-start gap-1 leading-relaxed">
                            <span className="text-indigo-primary">•</span>
                            <span>{t}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </motion.div>
              ) : (
                <div className="flex flex-col items-center gap-4 pt-4 text-center">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-indigo-primary">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] text-gray-500 font-bold uppercase vertical-text tracking-widest">
                    {activeStory.title.slice(0, 15)}...
                  </span>
                  <button
                    onClick={() => setSidePanelOpen(true)}
                    className="w-8 h-8 rounded-full bg-indigo-primary/20 border border-indigo-primary/30 flex items-center justify-center text-white hover:bg-indigo-primary/40 transition-all cursor-pointer mt-4"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            {sidePanelOpen && (
              <div className="p-4 rounded-xl bg-white/5 border border-white/5 text-[9px] text-gray-400 leading-relaxed">
                🧑‍🏫 <strong>Coping Loop:</strong> Reflecting coordinates our check-in triggers to prepare ourselves for constructive peer connection.
              </div>
            )}
          </div>
        </div>

        {/* Middle Column: Chat / Summary Interface */}
        <div className={`transition-all duration-300 flex flex-col justify-between ${
          sidePanelOpen ? 'lg:col-span-5' : 'lg:col-span-8'
        }`}>
          
          <div className={`p-6 rounded-3xl glass-panel border bg-dark-bg/30 flex flex-col justify-between h-[480px] relative overflow-hidden ${getThemeGlow()}`}>
            
            {/* Companion chat header */}
            <div className="flex justify-between items-center pb-3 border-b border-white/5 z-10">
              <div className="flex items-center space-x-2">
                {!sidePanelOpen && (
                  <button
                    onClick={() => setSidePanelOpen(true)}
                    className="hidden lg:flex w-8 h-8 rounded-xl bg-white/5 border border-white/10 items-center justify-center text-gray-300 hover:text-white transition-all cursor-pointer mr-2"
                    title="View Reference Story"
                  >
                    <BookOpen className="w-4 h-4 text-indigo-primary" />
                  </button>
                )}
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs text-white font-bold tracking-wide">Reflective Dialog</span>
              </div>
              <span className={`text-[9px] font-mono font-bold uppercase tracking-wider ${getThemeText()}`}>
                Connected
              </span>
            </div>

            {/* Conversation Messages */}
            <div className="flex-1 overflow-y-auto py-4 space-y-4 scrollbar-thin pr-2">
              {chatMessages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className="flex items-start gap-2.5 max-w-[85%]">
                    {msg.sender === 'ai' && (
                      <div className="w-7 h-7 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-primary flex items-center justify-center text-[10px] font-bold shadow-md flex-shrink-0 mt-0.5">
                        AI
                      </div>
                    )}
                    <div className={`p-4 rounded-2xl text-xs md:text-sm leading-relaxed shadow-sm ${
                      msg.sender === 'user'
                        ? 'bg-indigo-primary text-white rounded-tr-none'
                        : 'bg-white/5 border border-white/10 text-gray-200 rounded-tl-none'
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                </div>
              ))}

              {/* Typing State with dynamic status messaging */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-start gap-2.5 max-w-[85%]">
                    <div className="w-7 h-7 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-primary flex items-center justify-center text-[10px] font-bold shadow-md flex-shrink-0 mt-0.5">
                      AI
                    </div>
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-gray-400 rounded-tl-none flex flex-col space-y-1.5">
                      <span className="text-[10px] font-mono text-gray-500 animate-pulse">{typingStatus}</span>
                      <div className="flex items-center space-x-1">
                        <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick replies trigger block */}
            {quickReplies.length > 0 && (
              <div className="flex flex-wrap gap-2 px-1 pb-3 justify-start animate-fade-in z-10">
                {quickReplies.map((replyText, idx) => (
                  <button
                    key={idx}
                    onClick={() => processUserMessage(replyText)}
                    className="px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 hover:bg-indigo-500/25 transition-all text-xs font-semibold cursor-pointer shadow-sm hover:shadow-[0_0_10px_rgba(99,102,241,0.2)]"
                  >
                    {replyText}
                  </button>
                ))}
              </div>
            )}

            {/* Chat form trigger */}
            <div className="pt-3 border-t border-white/5 z-10 bg-dark-bg/25">
              {chatStep < 3 ? (
                <form onSubmit={handleSend} className="flex gap-2">
                  <input
                    type="text"
                    required
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder={isTyping ? "AI is typing..." : "Type your response..."}
                    disabled={isTyping}
                    className="flex-1 bg-dark-bg/70 border border-white/15 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-indigo-primary transition-all placeholder-gray-600 disabled:opacity-55"
                  />
                  <button
                    type="submit"
                    disabled={isTyping || !chatInput.trim()}
                    className="px-5 py-3 rounded-xl bg-indigo-primary text-white hover:shadow-[0_0_15px_rgba(99,102,241,0.4)] transition-all cursor-pointer font-bold text-xs disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-1.5"
                  >
                    Send <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              ) : (
                <div className="text-center p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-semibold">
                  🎉 Session Dialogue Concluded. Review summary details below.
                </div>
              )}
            </div>

          </div>
        </div>

        {/* Right Column: Live Analysis Panel + Sidebar Tools */}
        <div className="lg:col-span-3 space-y-6 flex flex-col justify-between">
          
          {/* Live Emotional Analysis Panel */}
          <div className="p-5 rounded-3xl glass-panel border border-white/10 space-y-4 shadow-sm">
            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block font-mono">
              Live Emotional Analysis
            </span>

            <div className="space-y-3">
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5 flex justify-between items-center">
                <div>
                  <span className="text-[9px] text-gray-500 block uppercase font-mono">Primary Emotion</span>
                  <span className="text-xs font-bold text-white capitalize">{activeEmotion}</span>
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${getThemeBg()}`}>
                  {getEmotionalConfidence()}
                </span>
              </div>

              {/* Live understanding confidence tracker */}
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5 flex justify-between items-center">
                <div>
                  <span className="text-[9px] text-gray-500 block uppercase font-mono">Understanding Confidence</span>
                  <span className="text-xs font-bold text-white">{understandingConfidence}</span>
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  understandingConfidence === 'High' 
                    ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/20' 
                    : understandingConfidence === 'Medium' 
                      ? 'bg-amber-500/10 text-amber-300 border border-amber-500/20' 
                      : 'bg-rose-500/10 text-rose-300 border border-rose-500/20 animate-pulse'
                }`}>
                  {understandingConfidence}
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5 flex justify-between items-center">
                <div>
                  <span className="text-[9px] text-gray-500 block uppercase font-mono">Stress State</span>
                  <span className="text-xs font-bold text-white">{getStressTrend()}</span>
                </div>
                <div className="w-6 h-6 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                  <TrendingDown className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>

            {/* Micro progress bar */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-[10px] text-gray-500 font-semibold font-mono">
                <span>Loop Alignment</span>
                <span>{getProgressPercentage()}% Complete</span>
              </div>
              <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-gradient-to-r from-purple-primary to-indigo-primary"
                  initial={{ width: 0 }}
                  animate={{ width: `${getProgressPercentage()}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>
          </div>

          {/* Contextual Tools Grid */}
          <div className="p-5 rounded-3xl glass-panel border border-white/10 space-y-4">
            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block font-mono">
              Contextual Tools
            </span>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setIsBreathingOpen(true)}
                className="p-3 rounded-2xl bg-white/5 border border-white/5 text-gray-300 hover:text-white hover:bg-white/10 hover:border-indigo-500/20 transition-all text-left flex flex-col justify-between h-20 cursor-pointer"
              >
                <Heart className="w-4 h-4 text-rose-400" />
                <div>
                  <span className="text-[10px] font-bold block leading-snug">Breathing</span>
                  <span className="text-[8px] text-gray-500 block leading-tight">Practice Box cycle</span>
                </div>
              </button>

              <button
                onClick={() => setIsJournalOpen(true)}
                className="p-3 rounded-2xl bg-white/5 border border-white/5 text-gray-300 hover:text-white hover:bg-white/10 hover:border-indigo-500/20 transition-all text-left flex flex-col justify-between h-20 cursor-pointer"
              >
                <Edit3 className="w-4 h-4 text-purple-400" />
                <div>
                  <span className="text-[10px] font-bold block leading-snug">Open Journal</span>
                  <span className="text-[8px] text-gray-500 block leading-tight">Write private logs</span>
                </div>
              </button>

              <button
                onClick={() => setSidePanelOpen(prev => !prev)}
                className="p-3 rounded-2xl bg-white/5 border border-white/5 text-gray-300 hover:text-white hover:bg-white/10 hover:border-indigo-500/20 transition-all text-left flex flex-col justify-between h-20 cursor-pointer"
              >
                <BookOpen className="w-4 h-4 text-teal-400" />
                <div>
                  <span className="text-[10px] font-bold block leading-snug">{sidePanelOpen ? "Hide Story" : "Show Story"}</span>
                  <span className="text-[8px] text-gray-500 block leading-tight">Reference article</span>
                </div>
              </button>

              <button
                onClick={() => chatStep >= 3 && handleDownloadTxt()}
                disabled={chatStep < 3}
                className="p-3 rounded-2xl bg-white/5 border border-white/5 text-gray-300 hover:text-white hover:bg-white/10 hover:border-indigo-500/20 transition-all text-left flex flex-col justify-between h-20 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Download className="w-4 h-4 text-blue-400" />
                <div>
                  <span className="text-[10px] font-bold block leading-snug">Save Report</span>
                  <span className="text-[8px] text-gray-500 block leading-tight">Export results</span>
                </div>
              </button>
            </div>

            {/* Ambient sound widget inside tools panel */}
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5 space-y-3">
              <div className="flex justify-between items-center text-[10px]">
                <span className="text-gray-400 font-bold uppercase tracking-wider font-mono">Calming Sounds</span>
                <span className="text-indigo-400 font-bold font-mono">Active: {audioPreset}</span>
              </div>

              <div className="flex items-center justify-between gap-3">
                <button
                  onClick={handleAudioToggle}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-white cursor-pointer ${
                    isAudioPlaying ? 'bg-indigo-primary' : 'bg-white/10 hover:bg-white/20'
                  }`}
                >
                  {isAudioPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 pl-0.5" />}
                </button>
                <div className="flex items-center gap-1.5 flex-1">
                  <Volume2 className="w-3.5 h-3.5 text-gray-500" />
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={audioVolume}
                    onChange={(e) => {
                      const val = parseFloat(e.target.value);
                      setAudioVolume(val);
                      AudioSynth.setVolume(val);
                    }}
                    className="w-full accent-indigo-primary"
                  />
                </div>
              </div>

              {/* Sound Presets */}
              <div className="grid grid-cols-5 gap-1 pt-1">
                {[
                  { name: 'rain', emoji: '🌧️', label: 'anxiety' },
                  { name: 'fire', emoji: '🔥', label: 'loneliness' },
                  { name: 'wind', emoji: '💨', label: 'stress' },
                  { name: 'piano', emoji: '🎹', label: 'grief' },
                  { name: 'ocean', emoji: '🌊', label: 'hope' }
                ].map(item => (
                  <button
                    key={item.name}
                    onClick={() => handleAudioPresetChange(item.label)}
                    className={`p-1.5 rounded-lg border text-[10px] flex items-center justify-center transition-all cursor-pointer ${
                      audioPreset === item.label 
                        ? 'border-indigo-primary bg-indigo-500/25' 
                        : 'border-white/5 bg-white/5 hover:bg-white/10'
                    }`}
                    title={`Select ${item.name}`}
                  >
                    {item.emoji}
                  </button>
                ))}
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Reflection Summary Block (Rendered once completed) */}
      <AnimatePresence>
        {chatStep >= 3 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-12 p-6 md:p-8 rounded-3xl glass-panel border border-indigo-500/20 bg-indigo-950/5 space-y-6"
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-4 border-b border-white/5">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-primary">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Reflection Summary</h3>
                  <p className="text-xs text-gray-400">Synthesized cognitive learnings and growth markers.</p>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setIsEditingSummary(!isEditingSummary)}
                  className="px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-white/10 transition-all text-xs font-bold cursor-pointer flex items-center gap-1.5"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  {isEditingSummary ? "View Summary" : "Edit Details"}
                </button>
                <button
                  onClick={handleDownloadTxt}
                  className="px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-white/10 transition-all text-xs font-bold cursor-pointer flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  Download summary
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Insight */}
              <div className="p-5 rounded-2xl bg-white/5 border border-white/5 space-y-2">
                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider font-mono">Key Insight</span>
                {isEditingSummary ? (
                  <textarea
                    value={editedSummary.keyInsight}
                    onChange={(e) => setEditedSummary(prev => ({ ...prev, keyInsight: e.target.value }))}
                    className="w-full h-24 bg-dark-bg/60 border border-white/10 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-indigo-primary resize-none font-sans"
                  />
                ) : (
                  <p className="text-xs md:text-sm text-gray-300 leading-relaxed font-sans">{editedSummary.keyInsight}</p>
                )}
              </div>

              {/* Growth */}
              <div className="p-5 rounded-2xl bg-white/5 border border-white/5 space-y-2">
                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider font-mono">Emotional Growth</span>
                {isEditingSummary ? (
                  <textarea
                    value={editedSummary.emotionalGrowth}
                    onChange={(e) => setEditedSummary(prev => ({ ...prev, emotionalGrowth: e.target.value }))}
                    className="w-full h-24 bg-dark-bg/60 border border-white/10 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-indigo-primary resize-none font-sans"
                  />
                ) : (
                  <p className="text-xs md:text-sm text-gray-300 leading-relaxed font-sans">{editedSummary.emotionalGrowth}</p>
                )}
              </div>

              {/* Action */}
              <div className="p-5 rounded-2xl bg-white/5 border border-white/5 space-y-2">
                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider font-mono">Committed Action</span>
                {isEditingSummary ? (
                  <textarea
                    value={editedSummary.positiveAction}
                    onChange={(e) => setEditedSummary(prev => ({ ...prev, positiveAction: e.target.value }))}
                    className="w-full h-24 bg-dark-bg/60 border border-white/10 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-indigo-primary resize-none font-sans"
                  />
                ) : (
                  <p className="text-xs md:text-sm text-emerald-400 font-bold leading-relaxed font-sans">
                    ✨ "{editedSummary.positiveAction}"
                  </p>
                )}
              </div>

            </div>

            {/* Highlights bullet list */}
            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-3">
              <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider font-mono">Reflection Highlights</span>
              <ul className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {summary.highlights.map((hl, idx) => (
                  <li key={idx} className="text-xs text-gray-400 flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-indigo-400 flex-shrink-0" />
                    <span>{hl}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Bottom summary action loop */}
            <div className="p-5 rounded-2xl bg-indigo-500/5 border border-indigo-500/20 space-y-4">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
                <div className="text-center sm:text-left space-y-1">
                  <h4 className="text-sm font-bold text-white">Transform Awareness to Action</h4>
                  <p className="text-xs text-gray-400">
                    "Would you like to turn today's reflection into a positive action?"
                  </p>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  <Link
                    to="/campaigns"
                    state={{
                      story: {
                        title: activeStory.title,
                        emotion: activeEmotion,
                        takeaways: activeStory.takeaways
                      }
                    }}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-primary to-indigo-primary text-white font-bold text-xs hover:shadow-[0_0_15px_rgba(99,102,241,0.4)] transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5" /> Yes, Build a Campaign
                  </Link>
                  <Link
                    to="/community"
                    className="px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-white/10 transition-all text-xs font-bold flex items-center gap-1 cursor-pointer"
                  >
                    Go to Community <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-4 justify-between items-center border-t border-white/5">
              <span className="text-[10px] text-gray-500 font-sans">
                Summary updates will immediately append as client-side logs in your history.
              </span>

              <button
                onClick={handleSavePrivately}
                className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-bold text-xs hover:bg-white/10 hover:border-indigo-500/20 transition-all flex items-center justify-center gap-1.5 cursor-pointer w-full sm:w-auto"
              >
                <Shield className="w-3.5 h-3.5 text-indigo-400" />
                {saveSuccess ? "Saved Privately ✓" : "Save Privately"}
              </button>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

      {/* Breathing Break Overlay Modal */}
      <AnimatePresence>
        {isBreathingOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-dark-bg/90 backdrop-blur-md p-6"
          >
            <div className="p-6 md:p-8 rounded-3xl glass-panel border border-white/10 max-w-md w-full text-center space-y-6 relative shadow-2xl">
              <h3 className="text-xl font-bold text-white">Mindful Breathing Break</h3>
              <p className="text-xs text-gray-400">Regulate your heart rate to ground your thoughts.</p>
              
              <BreathingCircle emotion={activeEmotion} />
              
              <button
                onClick={() => setIsBreathingOpen(false)}
                className="w-full py-3 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-white/10 transition-all text-xs font-bold cursor-pointer"
              >
                Close & Continue Reflection
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Journal quick entry log overlay modal */}
      <AnimatePresence>
        {isJournalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-dark-bg/90 backdrop-blur-md p-6"
          >
            <div className="p-6 md:p-8 rounded-3xl glass-panel border border-white/10 max-w-md w-full space-y-6 relative shadow-2xl text-left">
              <div className="flex justify-between items-center border-b border-white/5 pb-3">
                <h3 className="text-lg font-bold text-white">Quick Journal Entry</h3>
                <span className="text-[10px] text-gray-500 font-mono">Context: Reflection Loop</span>
              </div>
              
              <div className="space-y-2">
                <label className="text-[10px] text-gray-500 uppercase tracking-wider block">Prompt</label>
                <span className="text-xs text-indigo-400 font-bold block">
                  "What did this reflection session reveal about your coping mechanisms today?"
                </span>
              </div>

              <textarea
                value={journalText}
                onChange={(e) => setJournalText(e.target.value)}
                placeholder="Write your raw reflections here..."
                className="w-full h-32 bg-dark-bg/60 border border-white/15 rounded-xl p-3 text-xs md:text-sm text-white focus:outline-none focus:border-indigo-primary placeholder-gray-600 resize-none font-sans"
              />

              <div className="flex justify-end gap-3 pt-2">
                <button
                  onClick={() => setIsJournalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white transition-all text-xs font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    if (!journalText.trim()) return;
                    addJournalEntry("What did this reflection session reveal about your coping mechanisms today?", journalText);
                    setJournalText('');
                    setIsJournalOpen(false);
                    setJournalSuccess(true);
                    setTimeout(() => setJournalSuccess(false), 2000);
                  }}
                  className="px-5 py-2.5 rounded-xl bg-indigo-primary text-white hover:shadow-[0_0_15px_rgba(99,102,241,0.4)] transition-all text-xs font-bold cursor-pointer flex items-center gap-1"
                >
                  Save Log
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating alert for quick journal save confirmation */}
      <AnimatePresence>
        {journalSuccess && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-6 right-6 z-50 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold shadow-lg flex items-center gap-2"
          >
            <Check className="w-4 h-4" />
            <span>Journal entry logged successfully!</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom disclaimer */}
      <div className="mt-8 text-center text-[10px] text-gray-600 border-t border-white/5 pt-4">
        MindBridge is an experiential awareness platform. Private journal/reflection data is stored safely on your client browser.
      </div>

    </div>
  );
}
