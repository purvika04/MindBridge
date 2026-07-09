import React, { useState, useEffect, useContext } from 'react';
import { HashRouter, Routes, Route, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, Play, Pause, Volume2, Shield, Heart, HelpCircle, BookOpen, MessageSquare, Compass, Zap, Phone, FileText, Download, CheckCircle2, ChevronRight, Lock } from 'lucide-react';

// Context
import { UserContext, UserProvider } from './context/UserContext';

// Synthesizer
import AudioSynth from './utils/AudioSynth';

// Components
import BackgroundBlobs from './components/BackgroundBlobs';
import Navbar from './components/Navbar';
import BreathingCircle from './components/BreathingCircle';
import MicroActivity from './components/MicroActivity';
import StoriesExplorer from './components/StoriesExplorer';
import CommunitySharing from './components/CommunitySharing';
import ResourcesPage from './components/ResourcesPage';
import PlatformLoop from './components/PlatformLoop';
import FAQ from './components/FAQ';
import Footer from './components/Footer';

// Pages
import JournalPage from './pages/JournalPage';
import AnalyticsPage from './pages/AnalyticsPage';
import CampaignsPage from './pages/CampaignsPage';
import ProfilePage from './pages/ProfilePage';
import DashboardHub from './pages/DashboardHub';
import ReflectionPage from './pages/ReflectionPage';
import { MapPage, CoachPage, SyncPage } from './pages/SupportPages';

// ----------------------------------------------------
// 1. LANDING/CHECK-IN PAGE (Route: /)
// ----------------------------------------------------
function CheckInLanding() {
  const { state, addMoodCheck } = useContext(UserContext);
  const [feeling, setFeeling] = useState('');
  const [forceCheckIn, setForceCheckIn] = useState(false);
  const navigate = useNavigate();

  const handleStart = (e) => {
    e.preventDefault();
    if (!feeling.trim()) return;

    // Analyze and log mood
    const analyzeEmotion = (text) => {
      const t = text.toLowerCase();
      // 1. Anxiety / Worry
      if (
        t.includes('anxi') || // anxious, anxiety
        t.includes('worry') || t.includes('worried') ||
        t.includes('panic') || t.includes('fear') || t.includes('scared') || t.includes('afraid') ||
        t.includes('nervous') || t.includes('dread') || t.includes('tense') || t.includes('tension') ||
        t.includes('exam') || t.includes('test')
      ) return 'anxiety';

      // 2. Loneliness / Isolation
      if (
        t.includes('lonel') || // lonely, loneliness
        t.includes('alone') || t.includes('isolat') || // isolated, isolation
        t.includes('invis') || // invisible
        t.includes('nobody') || t.includes('disconnect') ||
        t.includes('no friends') || t.includes('left out') || t.includes('homesick')
      ) return 'loneliness';

      // 3. Grief / Sadness
      if (
        t.includes('sad') || t.includes('grief') || t.includes('loss') || t.includes('lost') ||
        t.includes('cry') || t.includes('mourn') || t.includes('heartbreak') ||
        t.includes('depress') // depressed, depression
      ) return 'grief';

      // 4. Hope / Positive
      if (
        t.includes('hope') || t.includes('happ') || // happy, happiness
        t.includes('excit') || // excited, excitement
        t.includes('ready') || t.includes('better') || t.includes('calm') ||
        t.includes('peace') || t.includes('good') || t.includes('great')
      ) return 'hope';

      // 5. Stress / Burnout (default falls back to stress)
      if (
        t.includes('stress') || t.includes('overwhelm') ||
        t.includes('burnout') || t.includes('exhaust') || // exhausted, exhaustion
        t.includes('tired') || t.includes('fatigue') || t.includes('pressure') ||
        t.includes('busy') || t.includes('deadline') || t.includes('overload')
      ) return 'stress';

      return 'stress';
    };

    const emotion = analyzeEmotion(feeling);
    addMoodCheck(emotion, feeling);
    
    // Launch soundscape automatically
    AudioSynth.start(emotion);
    
    // Jump to the guided journey wizard
    navigate('/journey');
  };

  const hasRecentReflection = state.moodHistory && state.moodHistory.length > 0 && !forceCheckIn;
  const latestCheck = hasRecentReflection ? state.moodHistory[state.moodHistory.length - 1] : null;

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] max-w-4xl mx-auto px-6 relative z-10 text-center space-y-10">
      
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel-light text-xs font-semibold tracking-wider text-purple-primary border border-purple-500/20 shadow-[0_0_15px_rgba(168,85,247,0.1)]">
        <Sparkles className="w-3.5 h-3.5 animate-pulse" />
        <span>Unified Experiential MindBridge Workspace</span>
      </div>

      <div className="space-y-4">
        <h1 className="text-5xl md:text-7xl font-bold font-display text-white tracking-tight leading-tight">
          How are you feeling today?
        </h1>
        <p className="text-sm md:text-base text-gray-400 max-w-lg mx-auto leading-relaxed">
          Express your mental state in natural language to regulate breathing, read peer narratives, and align reflections with community support.
        </p>
      </div>

      {/* Dynamic Condition: Already checked in */}
      {hasRecentReflection ? (
        <div className="w-full max-w-2xl p-6 rounded-2xl glass-panel border border-white/10 space-y-6 text-left">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-white/5">
            <div>
              <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">RECENT ACTIVITY</span>
              <h4 className="text-sm font-bold text-white mt-1">
                You checked in as <span className="text-indigo-primary uppercase font-mono">{latestCheck.emotion}</span> today
              </h4>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 px-3 py-1 rounded-full font-bold">
                🔥 Streak: {state.streak} Days
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <button
              onClick={() => navigate('/journey')}
              className="flex-1 py-3 rounded-xl bg-indigo-primary text-white font-bold text-xs hover:shadow-[0_0_15px_rgba(99,102,241,0.4)] transition-all cursor-pointer flex items-center justify-center gap-1.5"
            >
              Continue Current Journey <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                setFeeling('');
                setForceCheckIn(true);
              }}
              className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-colors text-xs font-bold cursor-pointer"
            >
              New Check-in
            </button>
          </div>
        </div>
      ) : (
        /* Form */
        <form onSubmit={handleStart} className="w-full max-w-2xl relative">
          <input
            type="text"
            required
            value={feeling}
            onChange={(e) => setFeeling(e.target.value)}
            placeholder="e.g. I feel overwhelmed with my class assignments..."
            className="w-full bg-white/5 border border-white/10 rounded-full pl-6 pr-16 py-4.5 text-sm md:text-base text-white focus:outline-none focus:border-indigo-primary transition-all placeholder-gray-500 shadow-inner"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-gradient-to-r from-purple-primary to-indigo-primary text-white flex items-center justify-center shadow hover:shadow-[0_0_15px_rgba(99,102,241,0.4)] transition-all cursor-pointer"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
        </form>
      )}

      {/* Quick Access Grid */}
      <div className="w-full max-w-3xl space-y-3 pt-6 text-left">
        <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider pl-2">Quick Wellness Access</span>
        
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            { label: "Helplines", to: "/resources?cat=helpline", desc: "Emergency hotlines", color: "hover:border-rose-500/20" },
            { label: "Self-Care", to: "/resources?cat=guide", desc: "Exercise toolkits", color: "hover:border-purple-500/20" },
            { label: "Breathing Room", to: "/journey", desc: "Regulate stress", color: "hover:border-amber-500/20" },
            { label: "Stories", to: "/stories", desc: "Peer narratives", color: "hover:border-blue-500/20" },
            { label: "Community", to: "/community", desc: "Supportive forums", color: "hover:border-teal-500/20" },
          ].map((item, idx) => (
            <Link
              key={idx}
              to={item.to}
              className={`p-4 rounded-2xl glass-panel border border-white/5 ${item.color} hover:bg-white/[0.01] transition-all cursor-pointer flex flex-col justify-between h-24`}
            >
              <span className="text-xs font-bold text-white leading-snug">{item.label}</span>
              <span className="text-[9px] text-gray-500 block leading-tight">{item.desc}</span>
            </Link>
          ))}
        </div>
      </div>

    </div>
  );
}

// ----------------------------------------------------
// 2. GUIDED EXPERIENCE WIZARD (Route: /journey)
// ----------------------------------------------------
function GuidedJourney() {
  const { state, completeBreathingSession, markStoryRead } = useContext(UserContext);
  const [journeyStep, setJourneyStep] = useState(1); // 1: calm/breathing, 2: story, 3: reflection, 4: share/community, 5: finish
  const navigate = useNavigate();

  const moodHistory = state.moodHistory || [];
  const latestCheck = moodHistory.length > 0 ? moodHistory[moodHistory.length - 1] : { emotion: 'stress', text: 'Stressed' };

  // Audio state
  const [isAudioPlaying, setIsAudioPlaying] = useState(true);
  const [audioVolume, setAudioVolume] = useState(0.5);

  const toggleAudio = () => {
    if (isAudioPlaying) {
      AudioSynth.stop();
      setIsAudioPlaying(false);
    } else {
      AudioSynth.start(latestCheck.emotion);
      AudioSynth.setVolume(audioVolume);
      setIsAudioPlaying(true);
    }
  };

  // Reflection chat context is now fully managed within the standalone /reflect route

  const getThemeText = () => {
    switch (latestCheck.emotion) {
      case 'anxiety': return 'text-teal-primary';
      case 'loneliness': return 'text-amber-500';
      case 'grief': return 'text-purple-primary';
      case 'hope': return 'text-emerald-400';
      case 'stress':
      default:
        return 'text-blue-primary';
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-28 relative z-10 text-left min-h-screen">
      
      {/* Progress Wizard Top steps indicator */}
      <div className="flex items-center justify-between gap-2 bg-white/5 border border-white/10 rounded-2xl p-4 mb-8">
        {[
          { step: 1, label: "Calming Sensory" },
          { step: 2, label: "Lived Story (Next: Reflection)" }
        ].map((item) => (
          <div key={item.step} className="flex items-center space-x-2">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
              journeyStep >= item.step ? 'bg-indigo-primary text-white shadow-md' : 'bg-white/5 text-gray-500'
            }`}>
              {item.step}
            </div>
            <span className={`text-[10px] font-semibold hidden md:inline ${journeyStep === item.step ? 'text-white' : 'text-gray-500'}`}>
              {item.label}
            </span>
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        
        {/* STEP 1: CALMING SENSORY */}
        {journeyStep === 1 && (
          <motion.div
            key="wizard-sensory"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
          >
            {/* Left side: Sound & breathing */}
            <div className="lg:col-span-6 flex flex-col items-center justify-center space-y-6">
              
              {/* Web Audio Synth Console */}
              <div className="w-full p-5 rounded-2xl bg-white/5 border border-white/5 space-y-4">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-400 font-bold uppercase tracking-wider">PERSONALIZED SOUNDSCAPE</span>
                  <span className={`font-mono text-[10px] font-bold ${getThemeText()}`}>
                    Active Synth: {latestCheck.emotion}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4">
                  {/* Play Pause */}
                  <button
                    onClick={toggleAudio}
                    className={`w-11 h-11 rounded-full flex items-center justify-center text-white cursor-pointer ${
                      isAudioPlaying ? 'bg-indigo-primary' : 'bg-white/10 hover:bg-white/20'
                    }`}
                  >
                    {isAudioPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 pl-0.5" />}
                  </button>

                  {/* Waveform bars */}
                  <div className="flex items-end gap-1 h-6 flex-1 justify-center px-4">
                    {[...Array(8)].map((_, i) => (
                      <motion.div
                        key={i}
                        animate={{
                          height: isAudioPlaying ? [4, Math.random() * 20 + 6, 4] : 4
                        }}
                        transition={{
                          duration: isAudioPlaying ? Math.random() * 0.4 + 0.3 : 0.2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                        className="w-1.5 bg-indigo-primary/40 rounded-full"
                      />
                    ))}
                  </div>

                  {/* Volume Slider */}
                  <div className="flex items-center gap-2">
                    <Volume2 className="w-4 h-4 text-gray-500" />
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
                      className="w-16 accent-indigo-primary"
                    />
                  </div>
                </div>
              </div>

              {/* Guided Breathing */}
              <BreathingCircle emotion={latestCheck.emotion} />
            </div>

            {/* Right side: Micro Activity */}
            <div className="lg:col-span-6 flex items-center justify-center">
              <MicroActivity 
                rawInput={latestCheck.text} 
                onComplete={() => {
                  completeBreathingSession();
                  setJourneyStep(2);
                }}
              />
            </div>
          </motion.div>
        )}

        {/* STEP 2: LIVED EXPERIENCE STORY */}
        {journeyStep === 2 && (
          <motion.div
            key="wizard-story"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-6"
          >
            <div className="text-center max-w-xl mx-auto space-y-2">
              <span className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold block">STEP 2 • STORYTELLING</span>
              <h3 className="text-xl font-bold text-white">Lived Experiences</h3>
              <p className="text-xs text-gray-400">Read a real story detailing similar emotional struggles.</p>
            </div>

            <StoriesExplorer 
              emotion={latestCheck.emotion}
              onComplete={(selectedStory) => {
                markStoryRead(selectedStory.title);
                navigate('/reflect', {
                  state: {
                    story: selectedStory,
                    emotion: latestCheck.emotion
                  }
                });
              }}
            />
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}

// ----------------------------------------------------
// 3. ROUTE PROTECTION & WRAPPERS
// ----------------------------------------------------
function CommunityRouteWrapper() {
  const { state } = useContext(UserContext);
  const navigate = useNavigate();

  if (state.communityUnlocked) {
    return <CommunitySharing />;
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-28 relative z-10 text-center min-h-[70vh] flex flex-col items-center justify-center space-y-8 animate-fade-in">
      <div className="w-16 h-16 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center shadow-lg shadow-rose-500/10 animate-pulse">
        <Lock className="w-6 h-6" />
      </div>

      <div className="space-y-3">
        <h2 className="text-3xl font-bold font-display text-white">Connection Requires Reflection</h2>
        <p className="text-sm text-gray-400 max-w-md mx-auto leading-relaxed font-sans">
          To protect the empathy and authenticity of our peer sharing spaces, you need to read a story and complete a quick reflection first.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <button
          onClick={() => navigate('/stories')}
          className="px-6 py-3 rounded-xl bg-indigo-primary text-white font-bold text-xs hover:shadow-[0_0_15px_rgba(99,102,241,0.4)] transition-all cursor-pointer flex items-center gap-1.5"
        >
          Read Stories <ChevronRight className="w-4 h-4" />
        </button>
        <button
          onClick={() => navigate('/reflect')}
          className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-white/10 transition-all text-xs font-bold cursor-pointer"
        >
          Begin Reflection
        </button>
      </div>
    </div>
  );
}

function StoriesRouteWrapper() {
  const { state } = useContext(UserContext);
  const moodHistory = state.moodHistory || [];
  const latestCheck = moodHistory.length > 0 ? moodHistory[moodHistory.length - 1] : { emotion: 'stress' };
  return <StoriesExplorer emotion={latestCheck.emotion} />;
}

// ----------------------------------------------------
// 4. MAIN ROUTER CONTAINER & BOOTSTRAP
// ----------------------------------------------------
export default function App() {
  return (
    <UserProvider>
      <HashRouter>
        <div className="relative min-h-screen bg-dark-bg text-gray-200 overflow-x-hidden">
          
          {/* Animated Background Canvas */}
          <BackgroundBlobs />

          {/* Sticky Header Nav */}
          <Navbar />

          {/* Routed Views */}
          <div className="relative z-10">
            <Routes>
              {/* Step 1 Check In Landing */}
              <Route path="/" element={<CheckInLanding />} />
              
              {/* Step-by-step Guided Journey */}
              <Route path="/journey" element={<GuidedJourney />} />
              
              {/* Standalone Pages mapped to clickable services cards */}
              <Route path="/reflect" element={<ReflectionPage />} />
              <Route path="/journal" element={<JournalPage />} />
              <Route path="/analytics" element={<AnalyticsPage />} />
              <Route path="/stories" element={<StoriesRouteWrapper />} />
              <Route path="/community" element={<CommunityRouteWrapper />} />
              <Route path="/campaigns" element={<CampaignsPage />} />
              
              {/* App dashboard hub with 12 clickable cards */}
              <Route path="/dashboard" element={<DashboardHub />} />
              
              {/* Geo-mapping, coaching nudges, and cloud sync diagnostic dashboard */}
              <Route path="/map" element={<MapPage />} />
              <Route path="/coach" element={<CoachPage />} />
              <Route path="/sync" element={<SyncPage />} />
              
              {/* Resources searchable listings */}
              <Route path="/resources" element={<ResourcesPage />} />
              
              {/* Real data-driven Profile streaks & stats */}
              <Route path="/profile" element={<ProfilePage />} />
            </Routes>
          </div>

          {/* Loop details & footer details visible on subpages or profiles */}
          <PlatformLoop />
          <FAQ />
          <Footer />
        </div>
      </HashRouter>
    </UserProvider>
  );
}
