import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, MessageSquare, Tag, Plus, Check, Send, Download, Sparkles, Shield, ChevronRight } from 'lucide-react';

export default function CommunitySharing({ initialQuote = '', emotion = 'stress', onComplete }) {
  const [quoteText, setQuoteText] = useState(initialQuote);
  const [cardTheme, setCardTheme] = useState('indigo');
  const [feedPosts, setFeedPosts] = useState([
    {
      id: 1,
      quote: "Accepting that my grades don't represent my ultimate capacity was the hardest but most freeing thing I did this term.",
      tag: "AcademicPressure",
      theme: "purple",
      resonates: 18,
      comments: ["Thank you for sharing this", "Totally agree, needed this today"],
      resonated: false
    },
    {
      id: 2,
      quote: "The quiet dining hall is temporary. Everyone around you is hoping someone else says hi first. Take the step.",
      tag: "SocialAnxiety",
      theme: "teal",
      resonates: 24,
      comments: ["Yes! We are all waiting", "So true, it is nerve wracking"],
      resonated: false
    }
  ]);

  const [activeCommentId, setActiveCommentId] = useState(null);
  const [commentText, setCommentText] = useState('');

  const themes = {
    purple: 'from-purple-600 via-purple-800 to-indigo-900',
    blue: 'from-blue-600 via-blue-800 to-indigo-900',
    teal: 'from-teal-600 via-teal-800 to-indigo-900',
    indigo: 'from-indigo-600 via-indigo-800 to-purple-900',
    rose: 'from-rose-600 via-rose-800 to-indigo-900'
  };

  const handlePost = (e) => {
    e.preventDefault();
    if (!quoteText.trim()) return;

    const newPost = {
      id: Date.now(),
      quote: quoteText,
      tag: emotion === 'stress' ? 'StressManagement' : emotion.charAt(0).toUpperCase() + emotion.slice(1),
      theme: cardTheme,
      resonates: 0,
      comments: [],
      resonated: false
    };

    setFeedPosts([newPost, ...feedPosts]);
    setQuoteText('');
  };

  const handleResonate = (id) => {
    setFeedPosts(posts => posts.map(post => {
      if (post.id === id) {
        return {
          ...post,
          resonates: post.resonated ? post.resonates - 1 : post.resonates + 1,
          resonated: !post.resonated
        };
      }
      return post;
    }));
  };

  const handleAddComment = (e, postId) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    setFeedPosts(posts => posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: [...post.comments, commentText]
        };
      }
      return post;
    }));

    setCommentText('');
    setActiveCommentId(null);
  };

  return (
    <section id="community-sharing" className="relative py-12 px-4 overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10 space-y-12">
        
        {/* Safety Moderator Badge */}
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-emerald-950/20 border border-emerald-500/20 text-xs font-semibold text-emerald-300">
            <Shield className="w-3.5 h-3.5" /> Anonymously Moderated Space • Supportive Environment Only
          </div>
        </div>

        {/* Double Column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Quote Card Studio */}
          <div className="lg:col-span-5 space-y-6">
            <div className="text-left space-y-2">
              <h4 className="text-white font-bold text-lg flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-indigo-primary" /> Quote Card Studio
              </h4>
              <p className="text-xs text-gray-400">
                Turn your reflection summary into a visual message card to share anonymously with our community circles.
              </p>
            </div>

            {/* Studio Workspace Card */}
            <div className="p-6 rounded-2xl glass-panel border border-white/10 shadow-lg text-left space-y-4">
              
              {/* Styled Preview Frame */}
              <div className={`w-full h-44 rounded-xl bg-gradient-to-tr ${themes[cardTheme]} p-5 flex flex-col justify-between shadow-inner relative overflow-hidden group`}>
                <div className="absolute -top-10 -right-10 w-28 h-28 bg-white/5 rounded-full blur-xl" />
                <span className="text-[8px] font-bold text-white/50 tracking-widest uppercase">MINDBRIDGE COMMUNITY</span>
                
                <p className="text-xs md:text-sm font-semibold text-white leading-relaxed italic my-auto drop-shadow-sm select-none">
                  {quoteText || "Type your anonymous reflection details below to preview..."}
                </p>

                <div className="flex justify-between items-center text-[8px] text-white/40">
                  <span>#{emotion === 'stress' ? 'StressManagement' : emotion}</span>
                  <span>Join the Journey</span>
                </div>
              </div>

              {/* Input Area */}
              <form onSubmit={handlePost} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Your Message</label>
                  <textarea
                    value={quoteText}
                    onChange={(e) => setQuoteText(e.target.value)}
                    placeholder="e.g. It's okay to feel overwhelmed. Small steps lead to recovery..."
                    rows={3}
                    maxLength={140}
                    className="w-full bg-dark-bg/60 border border-white/10 rounded-xl p-3 text-xs md:text-sm text-white focus:outline-none focus:border-indigo-primary transition-all resize-none placeholder-gray-600"
                  />
                  <div className="flex justify-between text-[10px] text-gray-500">
                    <span>Max 140 characters</span>
                    <span>{quoteText.length}/140</span>
                  </div>
                </div>

                {/* Theme palette picker */}
                <div className="space-y-2">
                  <label className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block">Select Background Theme</label>
                  <div className="flex space-x-2">
                    {Object.keys(themes).map((theme) => (
                      <button
                        key={theme}
                        type="button"
                        onClick={() => setCardTheme(theme)}
                        className={`w-6 h-6 rounded-full border bg-gradient-to-tr ${themes[theme]} flex items-center justify-center transition-all ${
                          cardTheme === theme ? 'scale-110 border-white' : 'border-transparent hover:scale-105'
                        }`}
                      >
                        {cardTheme === theme && <Check className="w-3 h-3 text-white" />}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Share Button */}
                <button
                  type="submit"
                  disabled={!quoteText.trim()}
                  className="w-full py-2.5 rounded-xl bg-indigo-primary text-white font-bold text-xs hover:shadow-[0_0_15px_rgba(99,102,241,0.3)] transition-all cursor-pointer flex items-center justify-center gap-1.5 disabled:opacity-50"
                >
                  <Plus className="w-4 h-4" /> Share on Community Board
                </button>
              </form>

            </div>
          </div>

          {/* Right Column: Community Feed board */}
          <div className="lg:col-span-7 space-y-6">
            <div className="text-left space-y-1">
              <h4 className="text-white font-bold text-lg">Anonymous Support Feed</h4>
              <p className="text-xs text-gray-400">See what other students in your circle are feeling, and leave supportive feedback.</p>
            </div>

            {/* Scrollable feed items container */}
            <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 scrollbar-thin">
              {feedPosts.map((post) => (
                <div 
                  key={post.id} 
                  className="p-5 rounded-2xl glass-panel border border-white/5 hover:border-white/10 transition-all flex flex-col md:flex-row items-stretch gap-4 text-left"
                >
                  {/* Card Visual Thumbnail */}
                  <div className={`w-full md:w-32 h-24 rounded-xl bg-gradient-to-tr ${themes[post.theme]} p-3 flex flex-col justify-between shrink-0`}>
                    <span className="text-[6px] text-white/50 uppercase tracking-widest font-mono">MindBridge</span>
                    <p className="text-[9px] text-white italic line-clamp-3 leading-snug">
                      "{post.quote}"
                    </p>
                    <span className="text-[6px] text-white/40">#{post.tag}</span>
                  </div>

                  {/* Actions & comments detail */}
                  <div className="flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <p className="text-xs md:text-sm text-gray-200 leading-relaxed font-sans font-medium">
                        "{post.quote}"
                      </p>
                      <span className="inline-flex items-center gap-1 mt-2 text-[10px] text-indigo-300 font-semibold">
                        <Tag className="w-3.5 h-3.5" /> #{post.tag}
                      </span>
                    </div>

                    {/* Likes & Comments Counters */}
                    <div className="flex flex-col space-y-2 pt-2 border-t border-white/5">
                      <div className="flex items-center space-x-4 text-xs text-gray-400">
                        <button 
                          onClick={() => handleResonate(post.id)}
                          className={`flex items-center gap-1 hover:text-rose-400 transition-colors ${post.resonated ? 'text-rose-400 font-bold' : ''}`}
                        >
                          <Heart className={`w-3.5 h-3.5 ${post.resonated ? 'fill-rose-400' : ''}`} />
                          <span>{post.resonates} Resonated</span>
                        </button>
                        
                        <button 
                          onClick={() => setActiveCommentId(activeCommentId === post.id ? null : post.id)}
                          className="flex items-center gap-1 hover:text-white transition-colors"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>{post.comments.length} Comments</span>
                        </button>
                      </div>

                      {/* Comment display lists */}
                      {post.comments.length > 0 && (
                        <div className="pl-4 border-l border-white/5 space-y-1.5 mt-2 bg-white/[0.01] p-2 rounded">
                          {post.comments.map((comment, cIdx) => (
                            <p key={cIdx} className="text-[10px] text-gray-400 leading-relaxed">
                              💬 <span className="italic">"{comment}"</span>
                            </p>
                          ))}
                        </div>
                      )}

                      {/* Comment Input form dropdown */}
                      {activeCommentId === post.id && (
                        <form onSubmit={(e) => handleAddComment(e, post.id)} className="flex gap-2 mt-2">
                          <input
                            type="text"
                            required
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                            placeholder="Write a supportive reply..."
                            className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-[10px] text-white focus:outline-none focus:border-indigo-primary transition-all"
                          />
                          <button
                            type="submit"
                            className="p-1.5 rounded-lg bg-indigo-primary text-white flex items-center justify-center hover:bg-indigo-600 transition-colors"
                          >
                            <Send className="w-3 h-3" />
                          </button>
                        </form>
                      )}

                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Complete Journey Redirect button */}
        {onComplete && (
          <div className="pt-6 flex justify-center border-t border-white/5">
            <button
              onClick={() => onComplete()}
              className="px-8 py-3 rounded-full bg-white/5 border border-white/10 text-white font-bold text-xs hover:bg-white/10 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              Continue to Loop Summary <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
