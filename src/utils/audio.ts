// Authentic Indian Festive & Diwali Audio Engine
// Curated playlist of authentic cultural Indian festive music and instruments:
// Traditional Sitar, Bansuri (flute), Shenhai, and celebratory Dholak rhythms.

export interface AudioTrack {
  title: string;
  artist: string;
  src: string;
}

export const FESTIVE_PLAYLIST: AudioTrack[] = [
  {
    title: 'Diwali Milan Utsav',
    artist: 'Traditional Indian Festive Ensemble',
    src: '/audio/diwali-music.mp3',
  },
  {
    title: 'Shubh Deepavali Dhun',
    artist: 'Festive Sitar & Flute Celebration',
    src: '/audio/diwali-song.mp3',
  },
  {
    title: 'Raag Yaman - Sitar Solo',
    artist: 'Indian Classical Raag',
    src: '/audio/sitar-yaman.ogg',
  },
];

class FestiveAudioEngine {
  private audio: HTMLAudioElement | null = null;
  private isPlaying = false;
  private currentTrackIndex = 0;
  private listeners: Set<(playing: boolean) => void> = new Set();
  private fadeInterval: any = null;
  private targetVolume = 0.45;

  constructor() {
    if (typeof window !== 'undefined') {
      this.initAudio();
    }
  }

  private initAudio() {
    if (this.audio) return;
    try {
      this.audio = new Audio();
      this.audio.preload = 'auto';
      this.audio.volume = 0;
      this.setTrack(0);

      this.audio.addEventListener('ended', () => {
        // Automatically progress through the festive celebration playlist
        this.nextTrack();
      });

      this.audio.addEventListener('error', (e) => {
        console.warn('Audio track load error, falling back to next festive track:', e);
        // Fallback to next track if one fails
        this.nextTrack();
      });
    } catch (err) {
      console.warn('Audio initialization deferred:', err);
    }
  }

  private setTrack(index: number) {
    if (!this.audio) return;
    this.currentTrackIndex = (index + FESTIVE_PLAYLIST.length) % FESTIVE_PLAYLIST.length;
    const track = FESTIVE_PLAYLIST[this.currentTrackIndex];
    this.audio.src = track.src;
    this.audio.load();
  }

  public nextTrack() {
    const wasPlaying = this.isPlaying;
    this.setTrack(this.currentTrackIndex + 1);
    if (wasPlaying) {
      this.start();
    }
  }

  public getCurrentTrack(): AudioTrack {
    return FESTIVE_PLAYLIST[this.currentTrackIndex];
  }

  public subscribe(fn: (playing: boolean) => void) {
    this.listeners.add(fn);
    fn(this.isPlaying);
    return () => {
      this.listeners.delete(fn);
    };
  }

  private notify() {
    this.listeners.forEach((fn) => fn(this.isPlaying));
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
    this.initAudio();
    if (!this.audio) return;

    if (this.fadeInterval) {
      clearInterval(this.fadeInterval);
      this.fadeInterval = null;
    }

    const playPromise = this.audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          this.isPlaying = true;
          this.notify();
          this.fadeIn();
        })
        .catch((err) => {
          console.warn('Audio play request blocked or awaiting user gesture:', err);
          this.isPlaying = false;
          this.notify();
        });
    }
  }

  private fadeIn() {
    if (!this.audio) return;
    let vol = this.audio.volume;
    this.fadeInterval = setInterval(() => {
      if (!this.audio) return;
      if (vol < this.targetVolume) {
        vol = Math.min(this.targetVolume, vol + 0.05);
        this.audio.volume = vol;
      } else {
        clearInterval(this.fadeInterval);
        this.fadeInterval = null;
      }
    }, 50);
  }

  public stop() {
    if (!this.audio) return;

    if (this.fadeInterval) {
      clearInterval(this.fadeInterval);
      this.fadeInterval = null;
    }

    let vol = this.audio.volume;
    this.fadeInterval = setInterval(() => {
      if (!this.audio) return;
      if (vol > 0.05) {
        vol = Math.max(0, vol - 0.08);
        this.audio.volume = vol;
      } else {
        clearInterval(this.fadeInterval);
        this.fadeInterval = null;
        this.audio.pause();
        this.isPlaying = false;
        this.notify();
      }
    }, 40);
  }
}

export const festiveAudio = new FestiveAudioEngine();
