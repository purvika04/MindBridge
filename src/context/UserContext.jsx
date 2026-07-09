import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

const INITIAL_STATE = {
  moodHistory: [],
  journalHistory: [],
  breathingSessionsCompleted: 0,
  storiesRead: [],
  communityInteractions: 0,
  streak: 0,
  lastActiveDate: null,
  achievements: [],
  communityUnlocked: false,
  createdCampaigns: [
    {
      id: 1,
      title: "Unmasking Impostor Syndrome",
      desc: "Destigmatize inadequacy feelings in the Engineering Quad. High peer attrition is often due to silent self-doubt.",
      collaborators: "Sarah M., David K., Aria L.",
      deliverables: "3 Posters, 1 Web Page",
      progress: 50,
      objective: "Destigmatize inadequacy feelings in the Engineering Quad.",
      whyMatters: "High peer attrition is often due to silent self-doubt.",
      resources: "Custom stickers, pin boards, blank cards.",
      impact: "Help 300+ students share adequacy struggles anonymously.",
      teamSize: "4-6 Volunteers",
      duration: "1 Week",
      volunteers: ["Sarah M.", "David K.", "Aria L."],
      comments: [
        { id: 1, author: "Professor T.", text: "This is a much needed initiative for the department. Kudos to the organizers!" },
        { id: 2, author: "Emma S.", text: "Can I join this? The impostor syndrome check-ins resonated with me deeply." }
      ],
      tasks: [
        { id: 101, name: "Draft posters layout", done: true },
        { id: 102, name: "Establish union table booking", done: false },
        { id: 103, name: "Deploy digital flyers on community boards", done: false }
      ]
    }
  ],
  communityPosts: [
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
  ]
};

export function UserProvider({ children }) {
  const [state, setState] = useState(() => {
    const saved = localStorage.getItem('mindbridge_user_data');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return {
          ...INITIAL_STATE,
          ...parsed
        };
      } catch (e) {
        return INITIAL_STATE;
      }
    }
    return INITIAL_STATE;
  });

  useEffect(() => {
    localStorage.setItem('mindbridge_user_data', JSON.stringify(state));
  }, [state]);

  const addMoodCheck = (emotion, text) => {
    const valueMap = { grief: 1, loneliness: 2, anger: 3, stress: 4, anxiety: 5, burnout: 6, hope: 7, happiness: 8 };
    const value = valueMap[emotion] || 4;
    
    const newCheck = {
      id: Date.now(),
      date: new Date().toLocaleDateString(),
      emotion,
      text,
      value
    };

    // Calculate Streak
    const todayStr = new Date().toLocaleDateString();
    let newStreak = state.streak;
    if (state.lastActiveDate !== todayStr) {
      newStreak = (state.streak || 0) + 1;
    }

    // Achievements calculation
    const newAchievements = [...state.achievements];
    if (state.moodHistory.length === 0 && !newAchievements.includes('First Check-In')) {
      newAchievements.push('First Check-In');
    }

    setState(prev => ({
      ...prev,
      moodHistory: [...prev.moodHistory, newCheck],
      streak: newStreak,
      lastActiveDate: todayStr,
      achievements: newAchievements
    }));
  };

  const addJournalEntry = (prompt, text) => {
    const newEntry = {
      id: Date.now(),
      date: new Date().toLocaleDateString(),
      prompt,
      text
    };

    const newAchievements = [...state.achievements];
    if (state.journalHistory.length === 0 && !newAchievements.includes('Journal Starter')) {
      newAchievements.push('Journal Starter');
    }

    setState(prev => ({
      ...prev,
      journalHistory: [...prev.journalHistory, newEntry],
      achievements: newAchievements
    }));
  };

  const completeBreathingSession = () => {
    const count = state.breathingSessionsCompleted + 1;
    const newAchievements = [...state.achievements];
    
    if (count >= 1 && !newAchievements.includes('Mindful Breather')) {
      newAchievements.push('Mindful Breather');
    }
    if (count >= 5 && !newAchievements.includes('Zen Master')) {
      newAchievements.push('Zen Master');
    }

    setState(prev => ({
      ...prev,
      breathingSessionsCompleted: count,
      achievements: newAchievements
    }));
  };

  const markStoryRead = (title) => {
    if (state.storiesRead.includes(title)) return;
    
    const list = [...state.storiesRead, title];
    const newAchievements = [...state.achievements];
    if (list.length >= 1 && !newAchievements.includes('Reader of Minds')) {
      newAchievements.push('Reader of Minds');
    }

    setState(prev => ({
      ...prev,
      storiesRead: list,
      achievements: newAchievements
    }));
  };

  const createCampaign = (campaignData, ...args) => {
    let title, desc, collaborators, deliverables, taskNames, objective, whyMatters, resources, impact, teamSize, duration;
    
    if (typeof campaignData === 'object' && campaignData !== null) {
      title = campaignData.title;
      desc = campaignData.desc;
      collaborators = campaignData.collaborators;
      deliverables = campaignData.deliverables;
      taskNames = campaignData.taskNames || [];
      objective = campaignData.objective;
      whyMatters = campaignData.whyMatters;
      resources = campaignData.resources;
      impact = campaignData.impact;
      teamSize = campaignData.teamSize;
      duration = campaignData.duration;
    } else {
      title = campaignData;
      desc = args[0];
      collaborators = args[1];
      deliverables = args[2];
      taskNames = args[3] || [];
      objective = args[4] || "";
      whyMatters = args[5] || "";
      resources = args[6] || "";
      impact = args[7] || "";
      teamSize = args[8] || "6-8";
      duration = args[9] || "1 Week";
    }

    const tasks = taskNames.map((name, index) => ({
      id: Date.now() + index,
      name,
      done: false
    }));

    const newCamp = {
      id: Date.now(),
      title,
      desc,
      collaborators: collaborators || "Sarah M., David K., Aria L.",
      deliverables: deliverables || "Posters & Assets",
      progress: 0,
      tasks,
      objective,
      whyMatters,
      resources,
      impact,
      teamSize,
      duration,
      volunteers: ["Sarah M.", "David K.", "Aria L."],
      comments: [
        { id: 1, author: "System AI", text: "Campaign launched! Encourage peers to join as volunteers and download materials." }
      ]
    };

    const newAchievements = [...state.achievements];
    if (!newAchievements.includes('Campaign Creator')) {
      newAchievements.push('Campaign Creator');
    }

    setState(prev => ({
      ...prev,
      createdCampaigns: [...prev.createdCampaigns, newCamp],
      achievements: newAchievements
    }));
  };

  const addVolunteerToCampaign = (campaignId, volunteerName) => {
    setState(prev => {
      const updatedCampaigns = prev.createdCampaigns.map(camp => {
        if (camp.id === campaignId) {
          const vols = camp.volunteers || [];
          if (!vols.includes(volunteerName)) {
            const newVols = [...vols, volunteerName];
            return {
              ...camp,
              volunteers: newVols,
              collaborators: newVols.join(", ")
            };
          }
        }
        return camp;
      });
      return { ...prev, createdCampaigns: updatedCampaigns };
    });
  };

  const addCommentToCampaign = (campaignId, author, text) => {
    setState(prev => {
      const updatedCampaigns = prev.createdCampaigns.map(camp => {
        if (camp.id === campaignId) {
          const comments = camp.comments || [];
          return {
            ...camp,
            comments: [...comments, { id: Date.now(), author, text }]
          };
        }
        return camp;
      });
      return { ...prev, createdCampaigns: updatedCampaigns };
    });
  };

  const toggleTask = (campaignId, taskId) => {
    setState(prev => {
      const updatedCampaigns = prev.createdCampaigns.map(camp => {
        if (camp.id === campaignId) {
          const updatedTasks = camp.tasks.map(task => {
            if (task.id === taskId) {
              return { ...task, done: !task.done };
            }
            return task;
          });
          const doneCount = updatedTasks.filter(t => t.done).length;
          const progress = Math.round((doneCount / updatedTasks.length) * 100);
          return { ...camp, tasks: updatedTasks, progress };
        }
        return camp;
      });
      return { ...prev, createdCampaigns: updatedCampaigns };
    });
  };

  const addCommunityPost = (quote, tag, theme) => {
    const newPost = {
      id: Date.now(),
      quote,
      tag,
      theme,
      resonates: 0,
      comments: [],
      resonated: false
    };

    const newAchievements = [...state.achievements];
    if (!newAchievements.includes('Community Speaker')) {
      newAchievements.push('Community Speaker');
    }

    setState(prev => ({
      ...prev,
      communityPosts: [newPost, ...prev.communityPosts],
      communityInteractions: prev.communityInteractions + 1,
      achievements: newAchievements
    }));
  };

  const addCommentToPost = (postId, comment) => {
    setState(prev => {
      const updatedPosts = prev.communityPosts.map(post => {
        if (post.id === postId) {
          return { ...post, comments: [...post.comments, comment] };
        }
        return post;
      });
      return { ...prev, communityPosts: updatedPosts, communityInteractions: prev.communityInteractions + 1 };
    });
  };

  const toggleResonateOnPost = (postId) => {
    setState(prev => {
      const updatedPosts = prev.communityPosts.map(post => {
        if (post.id === postId) {
          return {
            ...post,
            resonates: post.resonated ? post.resonates - 1 : post.resonates + 1,
            resonated: !post.resonated
          };
        }
        return post;
      });
      return { ...prev, communityPosts: updatedPosts };
    });
  };

  const unlockCommunity = () => {
    setState(prev => ({
      ...prev,
      communityUnlocked: true
    }));
  };

  return (
    <UserContext.Provider value={{
      state,
      addMoodCheck,
      addJournalEntry,
      completeBreathingSession,
      markStoryRead,
      createCampaign,
      toggleTask,
      addCommunityPost,
      addCommentToPost,
      toggleResonateOnPost,
      unlockCommunity,
      addVolunteerToCampaign,
      addCommentToCampaign
    }}>
      {children}
    </UserContext.Provider>
  );
}
