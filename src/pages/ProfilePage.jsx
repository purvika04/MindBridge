import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { Award, Zap, Heart, MessageSquare, Compass, ShieldAlert, Sparkles, BookOpen, Clock, Calendar } from 'lucide-react';

export default function ProfilePage() {
  const { state } = useContext(UserContext);

  const stats = [
    { label: "Breathing Sessions", value: state.breathingSessionsCompleted || 0, icon: Zap, color: "text-amber-400 bg-amber-500/10" },
    { label: "Stories Read", value: (state.storiesRead && state.storiesRead.length) || 0, icon: BookOpen, color: "text-indigo-400 bg-indigo-500/10" },
    { label: "Campaigns Created", value: (state.createdCampaigns && state.createdCampaigns.length) || 0, icon: Compass, color: "text-blue-400 bg-blue-500/10" },
    { label: "Community Actions", value: state.communityInteractions || 0, icon: MessageSquare, color: "text-purple-400 bg-purple-500/10" },
  ];

  const achievementBadges = [
    { id: 'First Check-In', name: 'First Reflection', desc: 'Logged your initial emotional check-in.', icon: Heart, unlocked: state.moodHistory && state.moodHistory.length > 0 },
    { id: 'Journal Starter', name: 'Journal Starter', desc: 'Answered your first cognitive prompt.', icon: BookOpen, unlocked: state.journalHistory && state.journalHistory.length > 0 },
    { id: 'Mindful Breather', name: 'Mindful Breather', desc: 'Completed a guided breathing session.', icon: Zap, unlocked: state.breathingSessionsCompleted > 0 },
    { id: 'Reader of Minds', name: 'Reader of Minds', desc: 'Read a peer lived-experience story.', icon: BookOpen, unlocked: state.storiesRead && state.storiesRead.length > 0 },
    { id: 'Campaign Creator', name: 'Campaign Creator', desc: 'Formulated a group awareness campaign.', icon: Compass, unlocked: state.createdCampaigns && state.createdCampaigns.length > 1 },
    { id: 'Community Speaker', name: 'Community Speaker', desc: 'Posted a quote card on the board.', icon: MessageSquare, unlocked: state.communityInteractions > 0 }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-28 relative z-10 text-left min-h-screen">
      
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-3xl md:text-5xl font-bold font-display text-white mb-2">User Profile & Activity</h1>
        <p className="text-sm text-gray-400">Review your wellness streak, unlocked milestones, and physical field logs.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Streaks & Achievements */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Streak & Bio Card */}
          <div className="p-6 rounded-3xl glass-panel border border-white/10 text-center space-y-4 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-2xl" />
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-purple-primary to-indigo-primary text-white font-extrabold text-lg flex items-center justify-center mx-auto shadow-lg">
              {state.streak || 0}
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Your Reflection Streak</h3>
              <p className="text-xs text-gray-500 font-medium">Streak: {state.streak || 0} Days active</p>
            </div>
          </div>

          {/* Quick stats numbers grid */}
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div key={idx} className="p-4 rounded-2xl glass-panel border border-white/5 space-y-2">
                  <div className={`p-2 w-8 h-8 rounded-lg flex items-center justify-center ${stat.color} shrink-0`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[9px] text-gray-500 font-bold uppercase tracking-wider block">{stat.label}</span>
                    <h5 className="text-lg font-bold text-white font-mono">{stat.value}</h5>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Achievements badge grid */}
          <div className="p-6 rounded-3xl glass-panel border border-white/5 space-y-4">
            <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
              <Award className="w-4.5 h-4.5 text-indigo-primary" /> Unlocked Milestones
            </h4>
            
            <div className="space-y-3">
              {achievementBadges.map((badge, idx) => {
                const BadgeIcon = badge.icon;
                return (
                  <div 
                    key={idx} 
                    className={`p-3 rounded-xl border flex items-start space-x-3 transition-all ${
                      badge.unlocked 
                        ? 'border-indigo-500/20 bg-indigo-500/5 text-white' 
                        : 'border-white/5 opacity-40 text-gray-500'
                    }`}
                  >
                    <div className={`p-2 rounded-lg border flex items-center justify-center shrink-0 ${
                      badge.unlocked ? 'bg-indigo-500/20 border-indigo-500/30 text-indigo-300' : 'bg-white/5 border-transparent text-gray-500'
                    }`}>
                      <BadgeIcon className="w-4 h-4" />
                    </div>
                    <div>
                      <h5 className="text-xs font-bold">{badge.name}</h5>
                      <p className="text-[10px] text-gray-400 leading-snug mt-0.5">{badge.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Right Column: Historical Activity feed tabs */}
        <div className="lg:col-span-8 space-y-6">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Clock className="w-5 h-5 text-indigo-primary" /> Activity Log History
          </h3>

          <div className="space-y-4">
            
            {/* Mood History logs */}
            <div className="p-6 rounded-2xl glass-panel border border-white/5 space-y-4 text-left">
              <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block">Checked-In Mood History</span>
              
              <div className="space-y-2">
                {state.moodHistory && state.moodHistory.length > 0 ? (
                  state.moodHistory.map((item) => (
                    <div key={item.id} className="p-4 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between text-xs">
                      <div>
                        <span className="text-gray-400 block font-semibold">" {item.text} "</span>
                        <span className="text-[9px] text-gray-500 font-medium font-mono mt-1 block">Logged on {item.date}</span>
                      </div>
                      <span className="bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded font-bold">
                        {item.emotion}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-gray-500 italic py-4">Complete your first reflection to see your progress.</p>
                )}
              </div>
            </div>

            {/* Stories Read List */}
            <div className="p-6 rounded-2xl glass-panel border border-white/5 space-y-4 text-left">
              <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block">Lived Stories Read</span>
              
              <div className="space-y-2">
                {state.storiesRead && state.storiesRead.length > 0 ? (
                  state.storiesRead.map((title, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl bg-white/5 border border-white/5 flex items-center space-x-2 text-xs">
                      <BookOpen className="w-4 h-4 text-indigo-primary shrink-0" />
                      <span className="text-gray-300 font-semibold">{title}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-gray-500 italic py-4">No stories read yet. Explore the community catalog.</p>
                )}
              </div>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
