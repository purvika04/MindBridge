import React, { useContext, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserContext } from '../context/UserContext';
import { useLocation } from 'react-router-dom';
import { 
  Plus, 
  Users, 
  Award, 
  Tag, 
  CheckSquare, 
  Square, 
  ChevronRight, 
  HelpCircle,
  Sparkles,
  Megaphone,
  Calendar,
  FileText,
  Image as ImageIcon,
  MessageSquare,
  ClipboardList,
  Target,
  Clock,
  CheckCircle,
  BarChart3,
  Upload,
  Trash2,
  Heart
} from 'lucide-react';

export default function CampaignsPage() {
  const { state, createCampaign, toggleTask, addVolunteerToCampaign, addCommentToCampaign } = useContext(UserContext);
  const campaigns = state.createdCampaigns || [];
  const location = useLocation();

  // Active reflection check from router state (if they just navigated from /reflect)
  const [reflectionContext, setReflectionContext] = useState(null);
  
  useEffect(() => {
    if (location.state && location.state.story) {
      setReflectionContext(location.state.story);
    } else {
      // Fallback: check if there's any reflection in global state history
      const history = state.moodHistory || [];
      if (history.length > 0) {
        setReflectionContext({
          title: `Reflection on ${history[history.length - 1].emotion}`,
          emotion: history[history.length - 1].emotion,
          takeaways: ["take a step back, connect, and express thoughts"]
        });
      }
    }
  }, [location.state, state.moodHistory]);

  // Gallery Assets state (pre-populated with premium mock materials)
  const [galleryAssets, setGalleryAssets] = useState([
    {
      id: 1,
      title: "Rest is Fuel Poster",
      type: "Poster",
      text: "Your value is not defined by sleep deprivation. Rest is the fuel required to do the work.",
      theme: "purple",
      likes: 24,
      author: "Sarah M."
    },
    {
      id: 2,
      title: "Break the Silence Graphic",
      type: "Social Media",
      text: "Nobody has it all together. We are all just hoping someone else speaks first. Take the step.",
      theme: "teal",
      likes: 18,
      author: "David K."
    },
    {
      id: 3,
      title: "Dining Quad Assembly Photo",
      type: "Event Photo",
      text: "Our team sharing custom stickers and pocket grounding cards at the Main Quad assembly.",
      theme: "emerald",
      likes: 42,
      author: "Aria L."
    }
  ]);

  // New gallery asset upload states
  const [newAssetTitle, setNewAssetTitle] = useState('');
  const [newAssetText, setNewAssetText] = useState('');
  const [newAssetType, setNewAssetType] = useState('Poster');
  const [newAssetTheme, setNewAssetTheme] = useState('indigo');
  const [isUploading, setIsUploading] = useState(false);

  // AI Proposal generation state
  const [aiProposal, setAiProposal] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showBuilder, setShowBuilder] = useState(false);

  // Editable Form states for the launched proposal
  const [editCampaignName, setEditCampaignName] = useState('');
  const [editObjective, setEditObjective] = useState('');
  const [editWhyMatters, setEditWhyMatters] = useState('');
  const [editActivities, setEditActivities] = useState('');
  const [editTeamSize, setEditTeamSize] = useState('6-8');
  const [editDuration, setEditDuration] = useState('1 Week');
  const [editResources, setEditResources] = useState('');
  const [editImpact, setEditImpact] = useState('');
  
  // Interactive Active Campaign detail selected tab state
  const [activeTabs, setActiveTabs] = useState({}); // { campaignId: "overview" / "tasks" / "schedule" / "posters" }

  // AI Recommendation templates
  const recommendations = [
    {
      name: "Stress Less Week",
      emotion: "stress",
      objective: "Reduce academic pressure and final exams overwhelm in the library courtyard.",
      whyMatters: "74% of students report peak anxiety during exam week, leading to isolation and burnout.",
      activities: "Distribute stress balls, Set up a tea station, Run 10-minute box breathing circles, Hand out study guides",
      teamSize: "6-8",
      duration: "1 Week",
      resources: "Tea dispensers, pocket stress spheres, customized guidance pamphlets",
      impact: "Help 500+ students pause, de-escalate anxiety, and study with proper mindfulness breaks."
    },
    {
      name: "Break the Silence",
      emotion: "anxiety",
      objective: "Provide anonymous boards and discussion circles to share academic inadequacy feelings.",
      whyMatters: "Impostor syndrome thrives when kept secret. Sharing breaks the spotlight effect.",
      activities: "Set up the 'Unpolished Truth' boards, Host peer coffee circles, Hand out grounding cards",
      teamSize: "4-6",
      duration: "3 Days",
      resources: "Pin boards, blank colored cards, pocket guides, coffee thermos",
      impact: "Destigmatize fear of failure, collecting 150+ student stories on the communal boards."
    },
    {
      name: "You're Not Alone",
      emotion: "loneliness",
      objective: "Organize campus assemblies and dining tables coordinates for new transfer students.",
      whyMatters: "Lack of immediate anchors is the leading cause of early student withdrawal and loneliness.",
      activities: "Host a picnic circle, Set up open dining banners, Run a nature hiking loop, Give out badge pins",
      teamSize: "8-10",
      duration: "2 Weeks",
      resources: "Welcome pins, picnic mats, campus map flyers, snacks",
      impact: "Create peer connection anchors for 200+ new students entering this term."
    },
    {
      name: "Digital Detox Challenge",
      emotion: "burnout",
      objective: "Encourage screen-free hours and public studying sessions in outdoor quads.",
      whyMatters: "Constant connectivity increases comparative anxiety and sleep deprivation.",
      activities: "Set up lock-box challenge tables, Run garden sketch workshops, Play outdoor board games",
      teamSize: "4-5",
      duration: "5 Days",
      resources: "Lock envelopes, sketch pads, wooden board games, outdoor mats",
      impact: "Engage 100+ students in physical presence activities, reducing screen times."
    },
    {
      name: "Kindness Matters",
      emotion: "loneliness",
      objective: "Run random acts of kindness drives across dorms to foster positive peer connection.",
      whyMatters: "Small tokens of care significantly decrease feelings of alienation and student loneliness.",
      activities: "Distribute surprise greeting cards, Give free encouragement snacks, Set up peer flower giveaways",
      teamSize: "5-7",
      duration: "3 Days",
      resources: "Greeting envelopes, flowers, healthy snack packs, sticky notes",
      impact: "Distribute 400+ items of care, improving campus emotional atmosphere."
    },
    {
      name: "Gratitude Wall",
      emotion: "stress",
      objective: "Erect a public dry-erase gratitude billboard where students write what they're thankful for.",
      whyMatters: "Refocusing on positive highlights acts as a powerful cognitive shield against exam anxiety.",
      activities: "Assemble the central boards, Hand out color markers, Lead live acoustic music sessions nearby",
      teamSize: "3-4",
      duration: "4 Days",
      resources: "Dry-erase boards, multi-color dry erase markers, support pins",
      impact: "Collect 1,000+ anonymous gratitude notes from campus commuters."
    }
  ];

  // Trigger AI recommendation populator
  const handleSelectRecommendation = (rec) => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setAiProposal(rec);
      setEditCampaignName(rec.name);
      setEditObjective(rec.objective);
      setEditWhyMatters(rec.whyMatters);
      setEditActivities(rec.activities);
      setEditTeamSize(rec.teamSize);
      setEditDuration(rec.duration);
      setEditResources(rec.resources);
      setEditImpact(rec.impact);
      setShowBuilder(true);
    }, 1000);
  };

  // Turn active reflection into a proposal
  const handleReflectToAct = () => {
    if (!reflectionContext) return;
    setIsGenerating(true);
    
    setTimeout(() => {
      setIsGenerating(false);
      const isStress = reflectionContext.emotion === 'stress' || reflectionContext.emotion === 'burnout';
      const isLoneliness = reflectionContext.emotion === 'loneliness';
      
      const proposal = {
        name: isStress ? "Finals Calming Loop" : isLoneliness ? "Communal Dining Table" : "Mental Wellness Bridge",
        emotion: reflectionContext.emotion || "stress",
        objective: `Translate personal insights about "${reflectionContext.title}" into active support tools for peers facing similar triggers.`,
        whyMatters: `Reflecting on peer narratives highlights that inadequacy and emotional fatigue are shared struggles, not personal failures.`,
        activities: `Share key takeaways ("${reflectionContext.takeaways?.[0] || 'Take pauses and establish boundaries'}"), Set up custom support cards, Distribute wellness booklets`,
        teamSize: "5-6 Volunteers",
        duration: "1 Week",
        resources: "Custom stickers, poster templates, community sharing brochures",
        impact: `Reach 250+ students, helping them move from passive reading into active, collaborative mindfulness practices.`
      };

      setAiProposal(proposal);
      setEditCampaignName(proposal.name);
      setEditObjective(proposal.objective);
      setEditWhyMatters(proposal.whyMatters);
      setEditActivities(proposal.activities);
      setEditTeamSize(proposal.teamSize);
      setEditDuration(proposal.duration);
      setEditResources(proposal.resources);
      setEditImpact(proposal.impact);
      setShowBuilder(true);
    }, 1200);
  };

  // Campaign launch submission
  const handleLaunchCampaign = (e) => {
    e.preventDefault();
    if (!editCampaignName.trim() || !editObjective.trim()) return;

    // Combine objective, resources, impact into desc
    const combinedDesc = `${editObjective}\n\nWhy it matters: ${editWhyMatters}\n\nImpact: ${editImpact}\n\nResources: ${editResources}`;
    const taskList = editActivities.split(',').map(t => t.trim()).filter(t => t.length > 0);

    createCampaign({
      title: editCampaignName,
      desc: `${editObjective}\n\nWhy it matters: ${editWhyMatters}\n\nImpact: ${editImpact}\n\nResources: ${editResources}`,
      collaborators: "Sarah M., David K., Aria L.",
      deliverables: "Posters & Materials",
      objective: editObjective,
      whyMatters: editWhyMatters,
      resources: editResources,
      impact: editImpact,
      teamSize: editTeamSize,
      duration: editDuration,
      taskNames: taskList
    });

    // Reset Builder
    setAiProposal(null);
    setShowBuilder(false);
  };

  // Add custom poster card to gallery
  const handleAddAsset = (e) => {
    e.preventDefault();
    if (!newAssetTitle.trim() || !newAssetText.trim()) return;

    setIsUploading(true);
    setTimeout(() => {
      const newAsset = {
        id: Date.now(),
        title: newAssetTitle.trim(),
        type: newAssetType,
        text: newAssetText.trim(),
        theme: newAssetTheme,
        likes: 0,
        author: "You"
      };

      setGalleryAssets(prev => [newAsset, ...prev]);
      setNewAssetTitle('');
      setNewAssetText('');
      setIsUploading(false);
    }, 1000);
  };

  const handleLikeAsset = (id) => {
    setGalleryAssets(prev => prev.map(a => a.id === id ? { ...a, likes: a.likes + 1 } : a));
  };

  // Tab helper
  const getActiveTab = (campId) => activeTabs[campId] || "overview";
  const setActiveTab = (campId, tabName) => {
    setActiveTabs(prev => ({ ...prev, [campId]: tabName }));
  };

  // Style resolvers
  const getThemeGradient = (theme) => {
    switch (theme) {
      case 'purple': return 'from-purple-600/20 via-indigo-600/10 to-transparent border-purple-500/20';
      case 'teal': return 'from-teal-600/20 via-indigo-600/10 to-transparent border-teal-500/20';
      case 'emerald': return 'from-emerald-600/20 via-indigo-600/10 to-transparent border-emerald-500/20';
      case 'amber': return 'from-amber-600/20 via-indigo-600/10 to-transparent border-amber-500/20';
      case 'rose': return 'from-rose-600/20 via-indigo-600/10 to-transparent border-rose-500/20';
      case 'indigo':
      default:
        return 'from-indigo-600/20 via-purple-600/10 to-transparent border-indigo-500/20';
    }
  };

  const getThemeGlow = (theme) => {
    switch (theme) {
      case 'purple': return 'shadow-[0_0_20px_rgba(168,85,247,0.15)] hover:border-purple-400/50';
      case 'teal': return 'shadow-[0_0_20px_rgba(20,184,166,0.15)] hover:border-teal-400/50';
      case 'emerald': return 'shadow-[0_0_20px_rgba(16,185,129,0.15)] hover:border-emerald-400/50';
      case 'amber': return 'shadow-[0_0_20px_rgba(245,158,11,0.15)] hover:border-amber-400/50';
      case 'rose': return 'shadow-[0_0_20px_rgba(244,63,94,0.15)] hover:border-rose-400/50';
      case 'indigo':
      default:
        return 'shadow-[0_0_20px_rgba(99,102,241,0.15)] hover:border-indigo-400/50';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-28 relative z-10 text-left min-h-screen space-y-12">
      
      {/* Page Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-semibold text-blue-400 mb-3 shadow-[0_0_15px_rgba(59,130,246,0.1)]">
          <Award className="w-3.5 h-3.5" />
          <span>Stage 3: Act (Experiential Campaigning)</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-bold font-display text-white mb-2">Campaign Activations</h1>
        <p className="text-sm text-gray-400 max-w-2xl leading-relaxed">
          Transform personal insights and peer stories into physical outreach. Co-design digital flyers, host campus spaces, coordinate assemblies, and measure real-world community impact.
        </p>
      </div>

      {/* 1. IMPACT DASHBOARD */}
      <div className="p-6 md:p-8 rounded-3xl glass-panel border border-white/10 space-y-6">
        <div className="flex justify-between items-center pb-4 border-b border-white/5">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-indigo-400" />
            <h3 className="text-lg font-bold text-white">MindBridge Impact Metrics</h3>
          </div>
          <span className="text-[10px] text-gray-500 font-mono">Live Sync: Active Campus advocacy</span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          {[
            { label: "People Reached", val: "4,250", desc: "Digital & physical views" },
            { label: "Events Conducted", val: "12", desc: "Workshops & circles" },
            { label: "Reflections Collected", val: `${state.moodHistory?.length ? state.moodHistory.length + 32 : 32}`, desc: "Linked user check-ins" },
            { label: "Posters Shared", val: `${galleryAssets.length + 31}`, desc: "Printed materials logs" },
            { label: "Volunteers Engaged", val: "85", desc: "Active campus members" },
            { label: "Community Rating", val: "4.8/5", desc: "Communal feedback rating" },
          ].map((stat, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-1">
              <span className="text-[9px] text-gray-500 block font-mono uppercase leading-tight">{stat.label}</span>
              <span className="text-xl md:text-2xl font-bold text-white font-display block">{stat.val}</span>
              <span className="text-[8px] text-gray-400 block leading-tight">{stat.desc}</span>
            </div>
          ))}
        </div>

        {/* Live Feedback Feed */}
        <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
          <span className="text-[9px] text-gray-500 font-bold uppercase tracking-wider block font-mono">Communal Student Feedback</span>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs italic text-gray-400">
            <p className="leading-relaxed">
              "Setting up the coffee circle in the Science Hall broke my exam panic. I realized half the students sitting near me were struggling with the exact same impostor triggers." – Sophomore, Engineering
            </p>
            <p className="leading-relaxed">
              "The open tables Dining Quad initiative made it so easy to just sit down and join others. A simple sign made all the difference in making me feel visible." – Freshman, Business
            </p>
          </div>
        </div>
      </div>

      {/* Main Grid: Builder + Recommendations on Left, Active List on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Grid: AI Assistant Builder */}
        <div className="lg:col-span-6 space-y-6">
          
          {/* Reflect-to-Act Prompt Banner */}
          {reflectionContext && (
            <div className="p-6 rounded-3xl bg-gradient-to-br from-indigo-900/40 via-indigo-950/20 to-transparent border border-indigo-500/20 space-y-4 shadow-[0_0_20px_rgba(99,102,241,0.1)]">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 flex-shrink-0 animate-bounce">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-white">Active Reflection Completed</h4>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    You recently reflected on your check-in triggers. Would you like to turn today's reflection context into a positive campaign action?
                  </p>
                </div>
              </div>
              <button
                onClick={handleReflectToAct}
                disabled={isGenerating}
                className="w-full py-3 rounded-xl bg-indigo-primary hover:bg-indigo-600 text-white font-bold text-xs shadow-md shadow-indigo-500/20 hover:shadow-indigo-500/30 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                {isGenerating ? "AI is generating proposal..." : "Generate AI Campaign Proposal"}
              </button>
            </div>
          )}

          {/* AI RECOMMENDATION PANEL */}
          <div className="p-6 rounded-3xl glass-panel border border-white/10 space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-white/5">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <h3 className="text-sm font-bold text-white">Suggested Mental Health Actions</h3>
            </div>
            
            <p className="text-xs text-gray-400">Select an AI-recommended campaign card based on current campus emotional trends:</p>
            
            <div className="grid grid-cols-2 gap-3">
              {recommendations.map((rec) => (
                <button
                  key={rec.name}
                  onClick={() => handleSelectRecommendation(rec)}
                  className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-indigo-500/30 hover:bg-white/[0.08] transition-all text-left flex flex-col justify-between h-28 cursor-pointer group"
                >
                  <div className="space-y-1">
                    <span className="text-[8px] uppercase tracking-widest text-indigo-400 font-bold block font-mono">Theme: {rec.emotion}</span>
                    <h4 className="text-xs font-bold text-white leading-snug group-hover:text-indigo-300 transition-colors">{rec.name}</h4>
                  </div>
                  <span className="text-[9px] text-gray-500 block leading-tight truncate">{rec.objective}</span>
                </button>
              ))}
            </div>
          </div>

          {/* AI Assisted Campaign Builder Form */}
          {showBuilder && aiProposal && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 rounded-3xl glass-panel border border-indigo-500/30 shadow-lg space-y-6"
            >
              <div className="flex justify-between items-center border-b border-white/5 pb-3">
                <div className="flex items-center gap-2">
                  <Megaphone className="w-4.5 h-4.5 text-indigo-400" />
                  <h3 className="text-sm font-bold text-white">AI-Assisted Campaign Builder</h3>
                </div>
                <button 
                  onClick={() => { setAiProposal(null); setShowBuilder(false); }}
                  className="text-xs text-gray-500 hover:text-white"
                >
                  Cancel
                </button>
              </div>

              <form onSubmit={handleLaunchCampaign} className="space-y-4 text-xs">
                {/* Campaign Name */}
                <div className="space-y-1.5">
                  <label className="text-[9px] text-gray-500 uppercase tracking-wider block font-mono">Campaign Title</label>
                  <input
                    type="text"
                    required
                    value={editCampaignName}
                    onChange={(e) => setEditCampaignName(e.target.value)}
                    className="w-full bg-dark-bg/60 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-primary"
                  />
                </div>

                {/* Objective */}
                <div className="space-y-1.5">
                  <label className="text-[9px] text-gray-500 uppercase tracking-wider block font-mono">Campaign Objective</label>
                  <textarea
                    required
                    value={editObjective}
                    onChange={(e) => setEditObjective(e.target.value)}
                    className="w-full h-16 bg-dark-bg/60 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-indigo-primary resize-none"
                  />
                </div>

                {/* Why Matters */}
                <div className="space-y-1.5">
                  <label className="text-[9px] text-gray-500 uppercase tracking-wider block font-mono">Why This Matters</label>
                  <textarea
                    required
                    value={editWhyMatters}
                    onChange={(e) => setEditWhyMatters(e.target.value)}
                    className="w-full h-16 bg-dark-bg/60 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-indigo-primary resize-none"
                  />
                </div>

                {/* Activities (Tasks split by comma) */}
                <div className="space-y-1.5">
                  <label className="text-[9px] text-gray-500 uppercase tracking-wider block font-mono">Activities (comma-separated tasks)</label>
                  <textarea
                    required
                    value={editActivities}
                    onChange={(e) => setEditActivities(e.target.value)}
                    className="w-full h-16 bg-dark-bg/60 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-indigo-primary resize-none"
                  />
                </div>

                {/* Team size & Duration */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-[9px] text-gray-500 uppercase tracking-wider block font-mono">Team Size</label>
                    <input
                      type="text"
                      required
                      value={editTeamSize}
                      onChange={(e) => setEditTeamSize(e.target.value)}
                      className="w-full bg-dark-bg/60 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-primary"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[9px] text-gray-500 uppercase tracking-wider block font-mono">Est. Duration</label>
                    <input
                      type="text"
                      required
                      value={editDuration}
                      onChange={(e) => setEditDuration(e.target.value)}
                      className="w-full bg-dark-bg/60 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-primary"
                    />
                  </div>
                </div>

                {/* Resources & expected impact */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-[9px] text-gray-500 uppercase tracking-wider block font-mono">Resources Needed</label>
                    <input
                      type="text"
                      required
                      value={editResources}
                      onChange={(e) => setEditResources(e.target.value)}
                      className="w-full bg-dark-bg/60 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-primary"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[9px] text-gray-500 uppercase tracking-wider block font-mono">Expected Impact</label>
                    <input
                      type="text"
                      required
                      value={editImpact}
                      onChange={(e) => setEditImpact(e.target.value)}
                      className="w-full bg-dark-bg/60 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-primary"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-primary to-indigo-primary text-white font-bold hover:shadow-[0_0_15px_rgba(99,102,241,0.4)] transition-all cursor-pointer"
                >
                  Confirm & Launch Campaign Action
                </button>
              </form>
            </motion.div>
          )}

        </div>

        {/* Right Column: Active Campaign Listings */}
        <div className="lg:col-span-6 space-y-6">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <ClipboardList className="w-5 h-5 text-indigo-400" /> Active Campus Campaigns
          </h3>

          <div className="space-y-6">
            <AnimatePresence>
              {campaigns.length > 0 ? (
                campaigns.map((camp) => {
                  const currentTab = getActiveTab(camp.id);
                  
                  return (
                    <motion.div
                      key={camp.id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="p-6 rounded-3xl glass-panel border border-white/10 space-y-5 shadow-lg relative overflow-hidden"
                    >
                      {/* Decorative gradient corner */}
                      <div className="absolute top-0 right-0 w-28 h-28 bg-indigo-500/[0.02] rounded-full blur-2xl" />

                      {/* Header */}
                      <div className="flex flex-col sm:flex-row justify-between items-start gap-3 pb-3 border-b border-white/5">
                        <div>
                          <h4 className="text-base font-bold text-white leading-tight">{camp.title}</h4>
                          <span className="text-[10px] text-indigo-400 font-bold block mt-1">{camp.collaborators}</span>
                        </div>
                        <span className="text-[9px] bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 px-2.5 py-0.5 rounded-full font-mono font-bold">
                          {camp.deliverables}
                        </span>
                      </div>

                      {/* Accordion Style Section Tabs */}
                      <div className="flex gap-2 border-b border-white/5 pb-2 text-[10px] font-bold overflow-x-auto scrollbar-none font-mono">
                        {[
                          { id: "overview", label: "Overview" },
                          { id: "team", label: "Team Members" },
                          { id: "tasks", label: "Tasks" },
                          { id: "posters", label: "Posters" },
                          { id: "social", label: "Social Media Assets" },
                          { id: "schedule", label: "Event Schedule" },
                          { id: "progress", label: "Progress" },
                          { id: "participation", label: "Community Participation" }
                        ].map(t => (
                          <button
                            key={t.id}
                            onClick={() => setActiveTab(camp.id, t.id)}
                            className={`pb-1 px-1 transition-all cursor-pointer whitespace-nowrap ${
                              currentTab === t.id 
                                ? 'text-white border-b-2 border-indigo-primary' 
                                : 'text-gray-500 hover:text-gray-300'
                            }`}
                          >
                            {t.label}
                          </button>
                        ))}
                      </div>

                      {/* Tab Content 1: Overview */}
                      {currentTab === "overview" && (
                        <motion.div 
                          initial={{ opacity: 0 }} 
                          animate={{ opacity: 1 }} 
                          className="space-y-3.5 text-xs text-left"
                        >
                          <div className="space-y-1">
                            <span className="text-[9px] text-gray-500 uppercase tracking-wider font-mono block">Objective</span>
                            <p className="text-gray-200 leading-relaxed font-sans">{camp.objective || camp.desc.split("\n\n")[0]}</p>
                          </div>
                          {camp.whyMatters && (
                            <div className="space-y-1">
                              <span className="text-[9px] text-gray-500 uppercase tracking-wider font-mono block">Why This Matters</span>
                              <p className="text-gray-300 leading-relaxed font-sans">{camp.whyMatters}</p>
                            </div>
                          )}
                          {camp.impact && (
                            <div className="space-y-1">
                              <span className="text-[9px] text-gray-500 uppercase tracking-wider font-mono block">Expected Impact</span>
                              <p className="text-emerald-400 font-bold leading-relaxed font-sans">✨ {camp.impact}</p>
                            </div>
                          )}
                          {camp.resources && (
                            <div className="space-y-1">
                              <span className="text-[9px] text-gray-500 uppercase tracking-wider font-mono block">Required Resources</span>
                              <p className="text-gray-400 font-mono leading-relaxed">{camp.resources}</p>
                            </div>
                          )}
                        </motion.div>
                      )}

                      {/* Tab Content 2: Team Members */}
                      {currentTab === "team" && (
                        <motion.div 
                          initial={{ opacity: 0 }} 
                          animate={{ opacity: 1 }} 
                          className="space-y-4 text-xs text-left"
                        >
                          <div className="flex justify-between items-center text-[10px] font-bold font-mono text-gray-500 uppercase">
                            <span>Volunteer Roster ({camp.volunteers?.length || 3})</span>
                            <span className="text-indigo-400">Target: {camp.teamSize || "6-8 Volunteers"}</span>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {(camp.volunteers || ["Sarah M.", "David K.", "Aria L."]).map((v, i) => (
                              <span key={i} className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] text-gray-300">
                                👤 {v}
                              </span>
                            ))}
                          </div>
                          <div className="pt-2 flex gap-2">
                            <input
                              type="text"
                              id={`join-name-${camp.id}`}
                              placeholder="Enter your name to volunteer..."
                              className="flex-1 bg-dark-bg/60 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-primary"
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  const val = e.target.value.trim();
                                  if (val) {
                                    addVolunteerToCampaign(camp.id, val);
                                    e.target.value = '';
                                  }
                                }
                              }}
                            />
                            <button
                              onClick={() => {
                                const input = document.getElementById(`join-name-${camp.id}`);
                                const val = input.value.trim();
                                if (val) {
                                  addVolunteerToCampaign(camp.id, val);
                                  input.value = '';
                                }
                              }}
                              className="px-4 py-2 rounded-xl bg-indigo-primary text-white font-bold text-xs hover:bg-indigo-600 transition-all cursor-pointer"
                            >
                              Join Team
                            </button>
                          </div>
                        </motion.div>
                      )}

                      {/* Tab Content 3: Tasks */}
                      {currentTab === "tasks" && (
                        <motion.div 
                          initial={{ opacity: 0 }} 
                          animate={{ opacity: 1 }} 
                          className="space-y-4 text-left"
                        >
                          <div className="flex justify-between text-[10px] font-bold font-mono">
                            <span className="text-gray-500 uppercase">Tasks Checklist</span>
                            <span className="text-indigo-400">Toggling recalculates campaign progress</span>
                          </div>
                          {camp.tasks && camp.tasks.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              {camp.tasks.map((task) => (
                                <button
                                  key={task.id}
                                  type="button"
                                  onClick={() => toggleTask(camp.id, task.id)}
                                  className="p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/[0.08] hover:border-white/10 transition-all text-left flex items-center space-x-3 text-xs cursor-pointer group"
                                >
                                  <div className="text-indigo-primary flex-shrink-0">
                                    {task.done ? (
                                      <CheckSquare className="w-4.5 h-4.5 text-emerald-400" />
                                    ) : (
                                      <Square className="w-4.5 h-4.5 text-gray-600 group-hover:text-gray-400" />
                                    )}
                                  </div>
                                  <span className={`leading-snug truncate ${task.done ? 'text-gray-500 line-through' : 'text-gray-300'}`}>
                                    {task.name}
                                  </span>
                                </button>
                              ))}
                            </div>
                          ) : (
                            <div className="text-center text-xs text-gray-500 py-2">No activities configured.</div>
                          )}
                        </motion.div>
                      )}

                      {/* Tab Content 4: Posters */}
                      {currentTab === "posters" && (
                        <motion.div 
                          initial={{ opacity: 0 }} 
                          animate={{ opacity: 1 }} 
                          className="space-y-3 text-left"
                        >
                          <span className="text-[9px] text-gray-500 font-bold uppercase tracking-wider block font-mono">Campaign Print Materials</span>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                            <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 space-y-1.5 hover:border-indigo-500/20 transition-all text-left">
                              <ImageIcon className="w-4 h-4 text-purple-400 animate-pulse" />
                              <span className="font-bold text-white block leading-tight">Theme Awareness Poster</span>
                              <p className="text-[10px] text-gray-400">Premium 18x24 poster showing custom grounding prompts.</p>
                              <a href="#/campaigns" className="text-[9px] font-mono text-indigo-400 font-bold hover:underline block pt-1">
                                📥 Download PDF Template
                              </a>
                            </div>
                            <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 space-y-1.5 hover:border-indigo-500/20 transition-all text-left">
                              <FileText className="w-4 h-4 text-teal-400" />
                              <span className="font-bold text-white block leading-tight">Pocket Coping Handouts</span>
                              <p className="text-[10px] text-gray-400">Quarter-page printout template with box breathing guides.</p>
                              <a href="#/campaigns" className="text-[9px] font-mono text-indigo-400 font-bold hover:underline block pt-1">
                                📥 Download Print Pack
                              </a>
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {/* Tab Content 5: Social Media Assets */}
                      {currentTab === "social" && (
                        <motion.div 
                          initial={{ opacity: 0 }} 
                          animate={{ opacity: 1 }} 
                          className="space-y-3 text-left text-xs"
                        >
                          <span className="text-[9px] text-gray-500 font-bold uppercase tracking-wider block font-mono">Digital Social Kits</span>
                          <div className="space-y-2">
                            <div className="p-3 rounded-xl bg-white/5 border border-white/5 space-y-1">
                              <div className="flex justify-between items-center text-[9px] font-mono text-indigo-400 font-bold">
                                <span>Instagram Story Asset (9:16)</span>
                                <button 
                                  onClick={() => navigator.clipboard.writeText(`We're launching "${camp.title}" campaign on campus. Check in at MindBridge!`)}
                                  className="text-gray-500 hover:text-white cursor-pointer"
                                >
                                  Copy Copywriting
                                </button>
                              </div>
                              <p className="text-[10px] text-gray-300 italic font-sans">
                                "Nobody has it all together. Join us for '{camp.title}' and let's build wellness bridges. Check in to reflect: #MindBridge"
                              </p>
                            </div>
                            <div className="p-3 rounded-xl bg-white/5 border border-white/5 space-y-1">
                              <div className="flex justify-between items-center text-[9px] font-mono text-teal-400 font-bold">
                                <span>Discord Announcement Copy</span>
                                <button 
                                  onClick={() => navigator.clipboard.writeText(`Let's support students struggling with anxiety or exam stress. Check coordinates for our coffee circle and grounding booklets.`)}
                                  className="text-gray-500 hover:text-white cursor-pointer"
                                >
                                  Copy Announcement
                                </button>
                              </div>
                              <p className="text-[10px] text-gray-300 font-mono">
                                "Let's support peers struggling with anxiety. Join us for our next coffee circle. Details inside our campaigns dashboard."
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {/* Tab Content 6: Event Schedule */}
                      {currentTab === "schedule" && (
                        <motion.div 
                          initial={{ opacity: 0 }} 
                          animate={{ opacity: 1 }} 
                          className="space-y-3 text-left"
                        >
                          <span className="text-[9px] text-gray-500 font-bold uppercase tracking-wider block font-mono">Planned Events Schedule</span>
                          <div className="space-y-2">
                            {[
                              { time: "Day 1 - 10:00 AM", title: "Flyer distribution & booth layout", location: "Main Library courtyard" },
                              { time: "Day 3 - 03:00 PM", title: "Advocacy assembly sharing circle", location: "Student Union Lounge" },
                              { time: "Day 5 - 04:00 PM", title: "Communal feedback compilation & review", location: "Coordinators Office" }
                            ].map((evt, idx) => (
                              <div key={idx} className="p-3 rounded-xl bg-white/5 border border-white/5 text-xs flex justify-between gap-4">
                                <div className="space-y-0.5">
                                  <h5 className="font-bold text-white leading-tight">{evt.title}</h5>
                                  <span className="text-[10px] text-gray-500 block">📍 {evt.location}</span>
                                </div>
                                <span className="text-[9px] font-mono text-indigo-400 font-bold whitespace-nowrap">{evt.time}</span>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}

                      {/* Tab Content 7: Progress */}
                      {currentTab === "progress" && (
                        <motion.div 
                          initial={{ opacity: 0 }} 
                          animate={{ opacity: 1 }} 
                          className="space-y-4 text-left"
                        >
                          <div className="space-y-1.5">
                            <div className="flex justify-between text-[10px] font-bold font-mono">
                              <span className="text-gray-500 uppercase">Campaign Milestones</span>
                              <span className="text-indigo-400">{camp.progress || 0}% Completed</span>
                            </div>
                            <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                              <div className="bg-gradient-to-r from-purple-primary to-indigo-primary h-full transition-all duration-300" style={{ width: `${camp.progress || 0}%` }} />
                            </div>
                          </div>
                          <div className="space-y-2 text-xs">
                            <div className="flex items-center gap-2 text-gray-400">
                              <CheckCircle className={`w-4 h-4 ${camp.progress >= 30 ? 'text-emerald-400' : 'text-gray-600'}`} />
                              <span>Initialization: Proposal drafted and details locked ({camp.progress >= 30 ? "Complete" : "In Progress"})</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-400">
                              <CheckCircle className={`w-4 h-4 ${camp.progress >= 60 ? 'text-emerald-400' : 'text-gray-600'}`} />
                              <span>Resource Gathering: Flyer printing and table reservations ({camp.progress >= 60 ? "Complete" : "In Progress"})</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-400">
                              <CheckCircle className={`w-4 h-4 ${camp.progress >= 100 ? 'text-emerald-400' : 'text-gray-600'}`} />
                              <span>Execution: Campus presence, outreach logs and feedback compile ({camp.progress >= 100 ? "Complete" : "In Progress"})</span>
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {/* Tab Content 8: Community Participation */}
                      {currentTab === "participation" && (
                        <motion.div 
                          initial={{ opacity: 0 }} 
                          animate={{ opacity: 1 }} 
                          className="space-y-4 text-left"
                        >
                          <div className="flex justify-between items-center text-[10px] font-bold font-mono text-gray-500 uppercase border-b border-white/5 pb-1.5">
                            <span>Student Feedback & Suggestions</span>
                            <span className="text-indigo-400">Interactive Feed</span>
                          </div>
                          <div className="space-y-2 max-h-[160px] overflow-y-auto pr-2 scrollbar-thin">
                            {(camp.comments || [
                              { id: 1, author: "System AI", text: "Campaign launched! Encourage peers to join as volunteers and download materials." }
                            ]).map((comm) => (
                              <div key={comm.id} className="p-3 rounded-xl bg-white/5 border border-white/5 text-xs space-y-1">
                                <div className="flex justify-between items-center text-[10px]">
                                  <span className="font-bold text-white">💬 {comm.author}</span>
                                  <span className="text-gray-500 font-mono">Peer Comment</span>
                                </div>
                                <p className="text-gray-300 leading-relaxed italic">"{comm.text}"</p>
                              </div>
                            ))}
                          </div>
                          <div className="pt-2 flex gap-2">
                            <input
                              type="text"
                              id={`comment-text-${camp.id}`}
                              placeholder="Share your thoughts or feedback..."
                              className="flex-1 bg-dark-bg/60 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-primary"
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  const val = e.target.value.trim();
                                  if (val) {
                                    addCommentToCampaign(camp.id, "Student Peer", val);
                                    e.target.value = '';
                                  }
                                }
                              }}
                            />
                            <button
                              onClick={() => {
                                const input = document.getElementById(`comment-text-${camp.id}`);
                                const val = input.value.trim();
                                if (val) {
                                  addCommentToCampaign(camp.id, "Student Peer", val);
                                  input.value = '';
                                }
                              }}
                              className="px-4 py-2 rounded-xl bg-indigo-primary text-white font-bold text-xs hover:bg-indigo-600 transition-all cursor-pointer"
                            >
                              Submit
                            </button>
                          </div>
                        </motion.div>
                      )}

                    </motion.div>
                  );
                })
              ) : (
                <div className="p-12 text-center rounded-3xl glass-panel border border-white/10 flex flex-col items-center justify-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-gray-500">
                    <Megaphone className="w-6 h-6 animate-pulse" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-white">No campaigns launched yet</h4>
                    <p className="text-xs text-gray-500 max-w-[280px] leading-relaxed mx-auto">
                      Use the AI recommendations or select your active reflection to generate and launch your first mental health advocacy campaign.
                    </p>
                  </div>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>

      </div>

      {/* 2. CAMPAIGN MATERIALS GALLERY */}
      <div className="p-6 md:p-8 rounded-3xl glass-panel border border-white/10 space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-white/5">
          <div className="flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-indigo-400 animate-pulse" />
            <h3 className="text-lg font-bold text-white">Communal Materials Gallery</h3>
          </div>
          <span className="text-[10px] text-gray-500 font-mono">Shared posters, quote cards, and assembly photos</span>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <AnimatePresence>
            {galleryAssets.map((asset) => (
              <motion.div
                key={asset.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className={`p-6 rounded-2xl bg-gradient-to-br border flex flex-col justify-between h-[230px] relative overflow-hidden shadow-md group ${getThemeGlow(asset.theme)} ${getThemeGradient(asset.theme)}`}
              >
                {/* Background design */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/[0.01] rounded-full blur-xl pointer-events-none" />

                <div className="space-y-4">
                  <div className="flex justify-between items-center text-[9px] font-mono font-bold">
                    <span className="text-gray-400 uppercase">{asset.type}</span>
                    <span className="text-gray-500">Shared by {asset.author}</span>
                  </div>
                  <h4 className="text-sm font-bold text-white leading-snug">{asset.title}</h4>
                  <p className="text-xs text-gray-300 leading-relaxed font-sans italic">
                    "{asset.text}"
                  </p>
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-white/5">
                  <button
                    onClick={() => handleLikeAsset(asset.id)}
                    className="flex items-center gap-1.5 text-[10px] text-gray-400 hover:text-rose-400 transition-colors font-bold cursor-pointer"
                  >
                    <Heart className="w-3.5 h-3.5 fill-rose-500/10 group-hover:fill-rose-500/20" /> {asset.likes} Likes
                  </button>
                  <span className="text-[9px] font-mono text-gray-500">Verified Upload</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Upload Asset Studio Form */}
        <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-4 text-xs text-left">
          <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block font-mono">Upload New Material / Card</span>
          
          <form onSubmit={handleAddAsset} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            {/* Title */}
            <div className="space-y-1.5">
              <label className="text-[9px] text-gray-500 uppercase tracking-wider block font-mono">Asset Title</label>
              <input
                type="text"
                required
                value={newAssetTitle}
                onChange={(e) => setNewAssetTitle(e.target.value)}
                placeholder="e.g. Finals Breathing Poster"
                className="w-full bg-dark-bg/60 border border-white/10 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-indigo-primary"
              />
            </div>

            {/* Description/Text */}
            <div className="space-y-1.5">
              <label className="text-[9px] text-gray-500 uppercase tracking-wider block font-mono">Quote or Description</label>
              <input
                type="text"
                required
                value={newAssetText}
                onChange={(e) => setNewAssetText(e.target.value)}
                placeholder="e.g. Pause and draw a deep breath..."
                className="w-full bg-dark-bg/60 border border-white/10 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-indigo-primary"
              />
            </div>

            {/* Type & Color Theme */}
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1.5">
                <label className="text-[9px] text-gray-500 uppercase tracking-wider block font-mono">Material Type</label>
                <select
                  value={newAssetType}
                  onChange={(e) => setNewAssetType(e.target.value)}
                  className="w-full bg-dark-bg border border-white/10 rounded-xl px-2.5 py-2.5 text-white focus:outline-none"
                >
                  <option value="Poster">Poster</option>
                  <option value="Social Media">Social Media</option>
                  <option value="Event Photo">Event Photo</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[9px] text-gray-500 uppercase tracking-wider block font-mono">Color Theme</label>
                <select
                  value={newAssetTheme}
                  onChange={(e) => setNewAssetTheme(e.target.value)}
                  className="w-full bg-dark-bg border border-white/10 rounded-xl px-2.5 py-2.5 text-white focus:outline-none"
                >
                  <option value="indigo">Indigo</option>
                  <option value="purple">Purple</option>
                  <option value="teal">Teal</option>
                  <option value="emerald">Emerald</option>
                  <option value="rose">Rose</option>
                  <option value="amber">Amber</option>
                </select>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isUploading}
              className="py-3 rounded-xl bg-indigo-primary hover:bg-indigo-600 text-white font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-md shadow-indigo-500/10 hover:shadow-indigo-500/20 disabled:opacity-50"
            >
              <Upload className="w-4 h-4" />
              {isUploading ? "Uploading..." : "Upload Material"}
            </button>
          </form>
        </div>
      </div>

    </div>
  );
}
