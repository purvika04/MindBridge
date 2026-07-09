// Client-side Web Audio API Synthesizer for MindBridge Ambient Soundscapes
class AudioSynth {
  constructor() {
    this.ctx = null;
    this.gainNode = null;
    this.nodes = [];
    this.timer = null;
    this.isPlaying = false;
    this.volume = 0.5;
  }

  init() {
    if (this.ctx) return;
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;
    this.ctx = new AudioContextClass();
    this.gainNode = this.ctx.createGain();
    this.gainNode.gain.value = this.volume;
    this.gainNode.connect(this.ctx.destination);
  }

  setVolume(val) {
    this.volume = val;
    if (this.gainNode && this.ctx) {
      this.gainNode.gain.setTargetAtTime(val, this.ctx.currentTime, 0.1);
    }
  }

  createNoiseBuffer() {
    if (!this.ctx) return null;
    const bufferSize = 2 * this.ctx.sampleRate;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }
    return noiseBuffer;
  }

  start(emotion) {
    this.init();
    this.stop();
    if (!this.ctx) return;

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    this.isPlaying = true;

    switch (emotion) {
      case 'anxiety':
        this.playAnxietyRain();
        break;
      case 'loneliness':
        this.playLonelinessFire();
        break;
      case 'stress':
        this.playStressWind();
        break;
      case 'grief':
        this.playGriefPiano();
        break;
      case 'hope':
        this.playHopeOcean();
        break;
      default:
        this.playStressWind();
    }
  }

  stop() {
    this.isPlaying = false;
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
    this.nodes.forEach(node => {
      try {
        node.stop();
      } catch (e) {}
      try {
        node.disconnect();
      } catch (e) {}
    });
    this.nodes = [];
  }

  // Synthesis helper nodes tracking
  track(node) {
    this.nodes.push(node);
    return node;
  }

  // 1. Anxiety (Rain & Slow Pentatonic Chords)
  playAnxietyRain() {
    const buffer = this.createNoiseBuffer();
    if (!buffer) return;

    // Rain noise source
    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 600;

    const rainGain = this.ctx.createGain();
    rainGain.gain.value = 0.15;

    noise.connect(filter);
    filter.connect(rainGain);
    rainGain.connect(this.gainNode);
    noise.start();
    this.track(noise);

    // Soft chords loop (C Minor Pentatonic: C3, Eb3, F3, G3, Bb3)
    const freqs = [130.81, 155.56, 174.61, 196.00, 233.08, 261.63];
    const triggerChord = () => {
      if (!this.isPlaying) return;
      
      const osc = this.ctx.createOscillator();
      osc.type = 'sine';
      // Pick a random frequency
      osc.frequency.setValueAtTime(freqs[Math.floor(Math.random() * freqs.length)], this.ctx.currentTime);

      const oscGain = this.ctx.createGain();
      const t = this.ctx.currentTime;
      oscGain.gain.setValueAtTime(0, t);
      oscGain.gain.linearRampToValueAtTime(0.04, t + 2); // long attack
      oscGain.gain.setValueAtTime(0.04, t + 4);
      oscGain.gain.exponentialRampToValueAtTime(0.0001, t + 7); // long decay

      osc.connect(oscGain);
      oscGain.connect(this.gainNode);
      osc.start();
      osc.stop(t + 7.5);
      
      this.track(osc);
    };

    triggerChord();
    this.timer = setInterval(triggerChord, 4000);
  }

  // 2. Loneliness (Warm Fire Crackle & Lower Drones)
  playLonelinessFire() {
    // Lower Drone (G2 + D3)
    const frequencies = [98.00, 146.83];
    frequencies.forEach(f => {
      const osc = this.ctx.createOscillator();
      osc.type = 'triangle';
      osc.frequency.value = f;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = 180;

      const oscGain = this.ctx.createGain();
      oscGain.gain.value = 0.08;

      osc.connect(filter);
      filter.connect(oscGain);
      oscGain.connect(this.gainNode);
      osc.start();
      this.track(osc);
    });

    // Fire Crackle simulation
    const crackle = () => {
      if (!this.isPlaying) return;

      const buffer = this.createNoiseBuffer();
      if (!buffer) return;

      const crackNode = this.ctx.createBufferSource();
      crackNode.buffer = buffer;

      const bandpass = this.ctx.createBiquadFilter();
      bandpass.type = 'bandpass';
      bandpass.frequency.value = 2500;
      bandpass.Q.value = 4.0;

      const gain = this.ctx.createGain();
      const t = this.ctx.currentTime;
      gain.gain.setValueAtTime(0.05, t);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.02); // sharp click

      crackNode.connect(bandpass);
      bandpass.connect(gain);
      gain.connect(this.gainNode);

      crackNode.start();
      crackNode.stop(t + 0.05);

      // Schedule next crackle
      setTimeout(crackle, Math.random() * 200 + 40);
    };
    crackle();
  }

  // 3. Stress (Forest Wind & Bird Chirps)
  playStressWind() {
    const buffer = this.createNoiseBuffer();
    if (!buffer) return;

    // Wind Generator using bandpassed white noise
    const windNode = this.ctx.createBufferSource();
    windNode.buffer = buffer;
    windNode.loop = true;

    const bpFilter = this.ctx.createBiquadFilter();
    bpFilter.type = 'bandpass';
    bpFilter.frequency.setValueAtTime(400, this.ctx.currentTime);
    bpFilter.Q.value = 1.8;

    const windGain = this.ctx.createGain();
    windGain.gain.value = 0.12;

    windNode.connect(bpFilter);
    bpFilter.connect(windGain);
    windGain.connect(this.gainNode);
    windNode.start();
    this.track(windNode);

    // Modulate wind frequency slowly (gusts)
    const modulateWind = () => {
      if (!this.isPlaying) return;
      const t = this.ctx.currentTime;
      const nextFreq = Math.random() * 600 + 200;
      bpFilter.frequency.exponentialRampToValueAtTime(nextFreq, t + 4);
    };
    modulateWind();
    this.timer = setInterval(modulateWind, 4000);

    // Occasional bird chirps (sine frequency sweep)
    const chirp = () => {
      if (!this.isPlaying) return;
      const osc = this.ctx.createOscillator();
      osc.type = 'sine';
      
      const t = this.ctx.currentTime;
      osc.frequency.setValueAtTime(3200, t);
      osc.frequency.exponentialRampToValueAtTime(4500, t + 0.08);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(0.008, t + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.08);

      osc.connect(gain);
      gain.connect(this.gainNode);
      osc.start();
      osc.stop(t + 0.1);
      
      // Random schedule next bird
      setTimeout(chirp, Math.random() * 5000 + 4000);
    };
    setTimeout(chirp, 3000);
  }

  // 4. Grief (Echoing Soft Ambient Piano notes)
  playGriefPiano() {
    // Warm background drone
    const drone = this.ctx.createOscillator();
    drone.type = 'sine';
    drone.frequency.value = 110; // A2
    const droneGain = this.ctx.createGain();
    droneGain.gain.value = 0.04;
    drone.connect(droneGain);
    droneGain.connect(this.gainNode);
    drone.start();
    this.track(drone);

    // Delay Node for echoes
    const delay = this.ctx.createDelay();
    delay.delayTime.value = 0.4;
    const feedback = this.ctx.createGain();
    feedback.gain.value = 0.4;

    delay.connect(feedback);
    feedback.connect(delay);
    delay.connect(this.gainNode);

    // Piano notes trigger (G minor Pentatonic scale)
    const notes = [196.00, 220.00, 233.08, 293.66, 329.63, 392.00];
    const triggerNote = () => {
      if (!this.isPlaying) return;

      const osc = this.ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(notes[Math.floor(Math.random() * notes.length)], this.ctx.currentTime);

      const gain = this.ctx.createGain();
      const t = this.ctx.currentTime;
      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(0.03, t + 0.05); // quick attack
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 3); // slow release

      osc.connect(gain);
      gain.connect(this.gainNode);
      gain.connect(delay); // send to echo loop
      
      osc.start();
      osc.stop(t + 3.2);
      this.track(osc);
    };

    triggerNote();
    this.timer = setInterval(triggerNote, 3000);
  }

  // 5. Hope (Shoreline Ocean Tide & Major chords)
  playHopeOcean() {
    const buffer = this.createNoiseBuffer();
    if (!buffer) return;

    // Ocean Waves
    const waveNode = this.ctx.createBufferSource();
    waveNode.buffer = buffer;
    waveNode.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 350;

    const waveGain = this.ctx.createGain();
    waveGain.gain.setValueAtTime(0.05, this.ctx.currentTime);

    waveNode.connect(filter);
    filter.connect(waveGain);
    waveGain.connect(this.gainNode);
    waveNode.start();
    this.track(waveNode);

    // LFO Wave gain modulation (8s cycle)
    const modulateTide = () => {
      if (!this.isPlaying) return;
      const t = this.ctx.currentTime;
      // Fade in and out to simulate water washing
      waveGain.gain.linearRampToValueAtTime(0.18, t + 4);
      waveGain.gain.linearRampToValueAtTime(0.02, t + 8);
    };
    modulateTide();
    this.timer = setInterval(modulateTide, 8000);

    // Hope Drone (Major chords C4 -> F4 -> G4)
    const droneFreqs = [261.63, 329.63, 392.00]; // C Major
    droneFreqs.forEach(f => {
      const osc = this.ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.value = f;

      const oscGain = this.ctx.createGain();
      oscGain.gain.value = 0.025;

      osc.connect(oscGain);
      oscGain.connect(this.gainNode);
      osc.start();
      this.track(osc);
    });
  }
}

export default new AudioSynth();
