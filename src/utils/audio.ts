// Web Audio API Festive Ambient Generator
// Plays a warm, celebratory Indian Tanpura + Festive Chime chord progression
// Fully self-contained, no external mp3 loading errors!

class FestiveAudioEngine {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private intervalId: any = null;
  private masterGain: GainNode | null = null;
  private listeners: Set<(playing: boolean) => void> = new Set();

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.3, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public subscribe(fn: (playing: boolean) => void) {
    this.listeners.add(fn);
    return () => {
      this.listeners.delete(fn);
    };
  }

  private notify() {
    this.listeners.forEach(fn => fn(this.isPlaying));
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  public start() {
    if (this.isPlaying) return;
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    this.isPlaying = true;
    this.notify();

    // Raga Bhairav / Yaman inspired scale frequencies (Root C# = 138.59 Hz)
    const droneFreqs = [138.59, 207.65, 277.18]; // C#3, G#3, C#4
    const melodyScale = [277.18, 311.13, 349.23, 415.30, 466.16, 554.37, 622.25]; // C#4, D#4, F4, G#4, A#4, C#5, D#5

    // Create warm tanpura drone
    const droneOscs: OscillatorNode[] = [];
    const droneGain = this.ctx.createGain();
    droneGain.gain.setValueAtTime(0.12, this.ctx.currentTime);
    droneGain.connect(this.masterGain);

    droneFreqs.forEach(freq => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      osc.connect(droneGain);
      osc.start();
      droneOscs.push(osc);
    });

    // Play periodic sitar/chime notes
    let step = 0;
    this.intervalId = setInterval(() => {
      if (!this.isPlaying || !this.ctx || !this.masterGain) return;

      const freq = melodyScale[step % melodyScale.length];
      const noteOsc = this.ctx.createOscillator();
      const noteGain = this.ctx.createGain();

      noteOsc.type = 'sine';
      noteOsc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      // Sitar-like envelope
      const now = this.ctx.currentTime;
      noteGain.gain.setValueAtTime(0.001, now);
      noteGain.gain.exponentialRampToValueAtTime(0.18, now + 0.05);
      noteGain.gain.exponentialRampToValueAtTime(0.001, now + 1.8);

      noteOsc.connect(noteGain);
      noteGain.connect(this.masterGain);

      noteOsc.start(now);
      noteOsc.stop(now + 1.9);

      // Play bell overtone on every 3rd step
      if (step % 3 === 0) {
        const bellOsc = this.ctx.createOscillator();
        const bellGain = this.ctx.createGain();
        bellOsc.type = 'sine';
        bellOsc.frequency.setValueAtTime(freq * 2.5, now);
        bellGain.gain.setValueAtTime(0.001, now);
        bellGain.gain.exponentialRampToValueAtTime(0.06, now + 0.02);
        bellGain.gain.exponentialRampToValueAtTime(0.0001, now + 2.5);

        bellOsc.connect(bellGain);
        bellGain.connect(this.masterGain);

        bellOsc.start(now);
        bellOsc.stop(now + 2.6);
      }

      step = (step + Math.floor(Math.random() * 3) + 1) % melodyScale.length;
    }, 1600);

    (this as any)._droneOscs = droneOscs;
  }

  public stop() {
    this.isPlaying = false;
    this.notify();
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    const droneOscs: OscillatorNode[] = (this as any)._droneOscs || [];
    droneOscs.forEach(osc => {
      try {
        osc.stop();
        osc.disconnect();
      } catch (e) {}
    });
    (this as any)._droneOscs = [];
  }
}

export const festiveAudio = new FestiveAudioEngine();

