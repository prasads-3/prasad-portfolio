const UI_SOUNDS = {
  HOVER: 'https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3',
  CLICK: 'https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3',
  STARTUP: 'https://assets.mixkit.co/active_storage/sfx/2572/2572-preview.mp3',
  SUCCESS: 'https://www.soundjay.com/buttons/button-21.mp3',
  ERROR: 'https://www.soundjay.com/buttons/button-10.mp3',
  POP: 'https://www.soundjay.com/buttons/button-16.mp3',
};

class SoundService {
  private static instance: SoundService;
  private audioEnabled: boolean = true;

  private constructor() {}

  public static getInstance(): SoundService {
    if (!SoundService.instance) {
      SoundService.instance = new SoundService();
    }
    return SoundService.instance;
  }

  public play(soundUrl: string, volume: number = 0.1) {
    if (!this.audioEnabled) return;
    try {
      const audio = new Audio(soundUrl);
      audio.volume = volume;
      audio.play().catch(() => {
        // Autoplay policy might block this until user interaction
      });
    } catch (e) {
      console.error('Failed to play sound:', e);
    }
  }

  public hover() {
    this.play(UI_SOUNDS.HOVER, 0.05);
  }

  public click() {
    this.play(UI_SOUNDS.CLICK, 0.1);
  }

  public startup() {
    this.play(UI_SOUNDS.STARTUP, 0.2);
  }

  public success() {
    this.play(UI_SOUNDS.SUCCESS, 0.15);
  }

  public pop() {
    this.play(UI_SOUNDS.POP, 0.1);
  }
}

export const soundService = SoundService.getInstance();
export { UI_SOUNDS };
