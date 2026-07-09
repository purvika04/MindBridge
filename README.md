# MindBridge: Unified Mental Health Experiential Learning Platform

MindBridge is a premium, unified mental health awareness and experiential learning platform designed to bridge the gap between *"I'm not okay"* and *"I'm ready to talk about it."* 

Rather than working as three disconnected tools, MindBridge guides users through a continuous learning journey across three stages: **Reflect** (AI Companion), **Connect** (Collaborative Platform), and **Act** (Experiential Campaigning) — all sharing a synchronized user profile, history, and streaks.

---

## 🗺️ The MindBridge Learning Loop

### 1. Reflect (AI Companion)
- **Dynamic Check-in**: A minimalist, distraction-free landing page asking *"How are you feeling today?"* with a natural language input analyzer.
- **Sensory Calibration**: Personalizes ambient soundscape synthesis (rain, fire, wind, piano, ocean) and runs box breathing timers to regulate heart rate.
- **Cognitive Mapping**: Translates raw input to target lived-experience narratives shared by other students.
- **AI Reflection Companion**: A cognitive therapist chat interface featuring live emotional analysis (confidence indicators, stress state trends, and progress bars), writing prompts, and downloadable session summaries.

### 2. Connect (Collaborative Platform)
- **Gatekept Safe Space**: The community sharing route remains locked until a user completes their reflection, protecting the authenticity of the peer-support space.
- **Quote Card Studio**: Create, style, and tag cards to share coping milestones.
- **communal Board**: Filter by emotional tags (e.g., `#AcademicPressure`, `#SocialAnxiety`), leave supportive comments, and resonate (like) posts.

### 3. Act (Experiential Campaigning)
- **Impact Dashboard**: Renders real-time advocacy metrics including People Reached, Events Conducted, Reflections, and Volunteers engaged.
- **AI-Assisted Proposal Builder**: Prompts users to convert their personal reflections into physical actions. Generates campaign outlines (Objective, Teammates, Tasks, Duration, Resources, and Expected Impact) that can be fully customized and launched.
- **8-Tab Campaign detail panels**:
  1. *Overview*: Details objectives, why the campaign matters, and expected impact.
  2. *Team Members*: Active volunteer rosters with interactive fields for peers to join.
  3. *Tasks*: Interactive checklists that dynamically update the progress bar.
  4. *Posters*: Printable digital flyers and box breathing PDF handout templates.
  5. *Social Media Assets*: Copywriting blocks with copy-to-clipboard triggers.
  6. *Event Schedule*: Day-by-day coordinates for quad booths and coffee circles.
  7. *Progress*: Track checklist milestones and status.
  8. *Community Participation*: Interactive feedback feeds allowing peers to post suggestions.
- **Communal Materials Gallery**: A shared showcase of flyers and quotes with an **Upload Studio** allowing users to select assets, select gradient themes (Indigo, Purple, Teal, Emerald, Rose, Amber), and publish.

---

## 🛠️ Technology Stack

- **Framework**: [React 18](https://react.dev/) + [Vite](https://vitejs.dev/) (Fast HMR & build setups)
- **Styling**: Pure vanilla CSS styled systems + glassmorphism themes
- **Animations**: [Framer Motion](https://www.framer.com/motion/) (Smooth stage transitions & card loading)
- **Icons**: [Lucide React](https://lucide.dev/) (Premium line icon set)
- **Charts**: [Recharts](https://recharts.org/) (Interactive area charts for emotional analytics)
- **Audio**: Web Audio API Synthesizers (Dynamic client-side ambient sound generation)

---

## 🚀 Installation & Local Development

### 1. Prerequisites
Ensure you have **Node.js** (v16+) and **npm** installed on your machine.

### 2. Clone and Install Dependencies
Navigate to the directory and run:
```bash
npm install
```

### 3. Start Development Server
Run the local Vite dev server:
```bash
npm run dev
```
Open **`http://localhost:5173/`** in your browser to experience the platform.

### 4. Build for Production
To build a highly optimized production bundle, run:
```bash
npm run build
```

---

## 📁 Codebase Directory Highlights

- `src/context/UserContext.jsx`: Centralized user state (mood history, streaks, journal, launched campaigns, achievements) backed by `localStorage` persistence.
- `src/pages/ReflectionPage.jsx`: Dialogue logic, Web Audio presets, and report exporter.
- `src/pages/CampaignsPage.jsx`: Campaign builder, metrics dashboards, event schedules, and shared materials gallery.
- `src/components/BreathingCircle.jsx`: Calibrator for box, diaphragmatic, and 4-7-8 timing rhythms.
- `src/utils/AudioSynth.js`: Raw synthesizer producing custom wave tones on the client browser.
- `src/pages/AnalyticsPage.jsx`: Renders emotional tracking trends.
