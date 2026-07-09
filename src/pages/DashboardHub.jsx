import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  MessageSquare, Edit3, Heart, FileText, Users, Award, 
  MapPin, Sparkles, BarChart2, CheckSquare, HelpCircle, CloudLightning 
} from 'lucide-react';

export default function DashboardHub() {
  const navigate = useNavigate();

  const services = [
    {
      title: 'AI Reflection',
      desc: 'Engage in conversational check-ins that facilitate personal stress unpacking.',
      icon: MessageSquare,
      color: 'purple',
      to: '/reflect',
      cardClass: 'glow-card-purple hover:shadow-[0_0_25px_rgba(168,85,247,0.15)]'
    },
    {
      title: 'Guided Journaling',
      desc: 'Receive AI prompts to structure and write details of emotional reactions.',
      icon: Edit3,
      color: 'purple',
      to: '/journal',
      cardClass: 'glow-card-purple hover:shadow-[0_0_25px_rgba(168,85,247,0.15)]'
    },
    {
      title: 'Emotional Analytics',
      desc: 'Log and analyze sentiment vectors over time to identify warning signs.',
      icon: Heart,
      color: 'purple',
      to: '/analytics',
      cardClass: 'glow-card-purple hover:shadow-[0_0_25px_rgba(168,85,247,0.15)]'
    },
    {
      title: 'Community Stories',
      desc: 'Read curated narratives to build empathy and recognize shared patterns.',
      icon: FileText,
      color: 'blue',
      to: '/stories',
      cardClass: 'glow-card-blue hover:shadow-[0_0_25px_rgba(59,130,246,0.15)]'
    },
    {
      title: 'Discussion Forums',
      desc: 'Connect with peer learning circles to talk about themes anonymously.',
      icon: Users,
      color: 'blue',
      to: '/community',
      cardClass: 'glow-card-blue hover:shadow-[0_0_25px_rgba(59,130,246,0.15)]'
    },
    {
      title: 'Campaign Builder',
      desc: 'Co-design digital graphics and physical pamphlets collaboratively.',
      icon: Award,
      color: 'blue',
      to: '/campaigns',
      cardClass: 'glow-card-blue hover:shadow-[0_0_25px_rgba(59,130,246,0.15)]'
    },
    {
      title: 'Geo-Tagging',
      desc: 'Log geographical coordinators for local posters, events, or booths.',
      icon: MapPin,
      color: 'teal',
      to: '/map',
      cardClass: 'glow-card-teal hover:shadow-[0_0_25px_rgba(20,184,166,0.15)]'
    },
    {
      title: 'AI Nudges',
      desc: 'Receive context-aware notifications about nearby helper opportunities.',
      icon: Sparkles,
      color: 'teal',
      to: '/coach',
      cardClass: 'glow-card-teal hover:shadow-[0_0_25px_rgba(20,184,166,0.15)]'
    },
    {
      title: 'Impact Dashboard',
      desc: 'Log observation counts, check-ins, and empirical campaign success.',
      icon: BarChart2,
      color: 'teal',
      to: '/analytics', // routes to real analytics dashboard!
      cardClass: 'glow-card-teal hover:shadow-[0_0_25px_rgba(20,184,166,0.15)]'
    },
    {
      title: 'Learning Progress',
      desc: 'Advance through pedagogical milestones connected to your profile.',
      icon: CheckSquare,
      color: 'teal',
      to: '/profile', // routes to profile metrics
      cardClass: 'glow-card-teal hover:shadow-[0_0_25px_rgba(20,184,166,0.15)]'
    },
    {
      title: 'Personalized Coaching',
      desc: 'AI references your community logs to recommend coping resources.',
      icon: HelpCircle,
      color: 'purple',
      to: '/coach',
      cardClass: 'glow-card-purple hover:shadow-[0_0_25px_rgba(168,85,247,0.15)]'
    },
    {
      title: 'Cloud Synchronization',
      desc: 'Data syncs instantly between the AI, Web portal, and Android app.',
      icon: CloudLightning,
      color: 'blue',
      to: '/sync',
      cardClass: 'glow-card-blue hover:shadow-[0_0_25px_rgba(59,130,246,0.15)]'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-28 relative z-10 text-left min-h-screen">
      
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-3xl md:text-5xl font-bold font-display text-white mb-2">Ecosystem Services Hub</h1>
        <p className="text-sm text-gray-400">Direct sandbox access to all tools, dashboards, and sync systems in the MindBridge platform.</p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((feat, idx) => {
          const FeatIcon = feat.icon;

          // color variables mapping
          const colors = {
            purple: {
              accent: 'text-purple-primary',
              bg: 'bg-purple-500/10 border-purple-500/20'
            },
            blue: {
              accent: 'text-blue-primary',
              bg: 'bg-blue-500/10 border-blue-500/20'
            },
            teal: {
              accent: 'text-teal-primary',
              bg: 'bg-teal-500/10 border-teal-500/20'
            }
          }[feat.color];

          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.03 }}
              whileHover={{ y: -6, scale: 1.01 }}
              onClick={() => navigate(feat.to)}
              className={`p-6 rounded-2xl glass-panel border border-white/5 glow-card ${feat.cardClass} cursor-pointer transition-all duration-300 flex space-x-4 items-start`}
            >
              <div className={`p-3 rounded-xl ${colors.bg} border flex items-center justify-center shrink-0`}>
                <FeatIcon className={`w-5 h-5 ${colors.accent}`} />
              </div>
              
              <div className="space-y-1.5">
                <h4 className="font-bold text-white text-base group-hover:text-indigo-primary transition-colors">{feat.title}</h4>
                <p className="text-xs text-gray-400 leading-relaxed">{feat.desc}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

    </div>
  );
}
