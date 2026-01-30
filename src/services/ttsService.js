/**
 * Text-to-Speech Service
 * Reusable TTS functionality for Communication and Position questions
 */

class TTSService {
  constructor() {
    this.speechSynth = null;
    this.selectedVoice = null;
    this.availableVoices = [];
    this.currentUtterance = null;
    this.isInitialized = false;
  }

  async initialize() {
    if (this.isInitialized) return;

    console.log("TTS: Initializing speech synthesis...");
    if ('speechSynthesis' in window) {
      this.speechSynth = window.speechSynthesis;
      await this.loadVoices();
      this.isInitialized = true;
      console.log("TTS: Speech synthesis initialized.");
    } else {
      console.error("TTS: Speech synthesis not supported in this browser.");
    }
  }

  async loadVoices() {
    return new Promise((resolve) => {
      const loadVoices = () => {
        const voices = this.speechSynth.getVoices();
        this.availableVoices = voices;
        console.log(`TTS: Found ${voices.length} available voices.`);

        // Priority 1: High-quality neural/enhanced voices (smooth and clear)
        let smoothVoice = voices.find(voice =>
          (voice.name.toLowerCase().includes('neural') ||
            voice.name.toLowerCase().includes('enhanced') ||
            voice.name.toLowerCase().includes('premium') ||
            voice.name.toLowerCase().includes('aria neural') ||
            voice.name.toLowerCase().includes('aria') ||
            voice.name.toLowerCase().includes('nova')) &&
          (voice.lang.startsWith('en') || voice.lang.includes('en'))
        );

        // Priority 2: Known smooth and clear voices
        if (!smoothVoice) {
          smoothVoice = voices.find(voice =>
            (voice.name.toLowerCase().includes('joanna') ||
              voice.name.toLowerCase().includes('salli') ||
              voice.name.toLowerCase().includes('kimberly') ||
              voice.name.toLowerCase().includes('kendra') ||
              voice.name.toLowerCase().includes('ivy') ||
              voice.name.toLowerCase().includes('emma') ||
              voice.name.toLowerCase().includes('amy') ||
              voice.name.toLowerCase().includes('nicole') ||
              voice.name.toLowerCase().includes('susan') ||
              voice.name.toLowerCase().includes('victoria')) &&
            (voice.lang.startsWith('en') || voice.lang.includes('en'))
          );
        }

        // Priority 3: macOS/iOS smooth voices
        if (!smoothVoice) {
          smoothVoice = voices.find(voice =>
            (voice.name.toLowerCase().includes('samantha') ||
              voice.name.toLowerCase().includes('karen') ||
              voice.name.toLowerCase().includes('sarah') ||
              voice.name.toLowerCase().includes('kate')) &&
            (voice.lang.startsWith('en') || voice.lang.includes('en'))
          );
        }

        // Priority 4: Any English female voice
        if (!smoothVoice) {
          smoothVoice = voices.find(voice =>
            voice.lang.startsWith('en') &&
            (voice.name.toLowerCase().includes('female') ||
              voice.gender === 'female' ||
              voice.name.toLowerCase().includes('zira'))
          );
        }

        if (smoothVoice) {
          this.selectedVoice = smoothVoice;
          console.log(`TTS: Selected voice: ${smoothVoice.name} (${smoothVoice.lang})`);
        } else {
          console.warn("TTS: No preferred English voice found, will use browser default.");
        }

        resolve();
      };

      loadVoices();
      if (this.speechSynth.onvoiceschanged !== undefined) {
        this.speechSynth.onvoiceschanged = loadVoices;
      }
    });
  }

  speak(text, callbacks = {}) {
    if (!this.speechSynth || !text) {
      console.warn("TTS: Cannot speak - speechSynth not available or text empty.");
      return null;
    }

    console.log(`TTS: Attempting to speak: "${text.substring(0, 50)}${text.length > 50 ? '...' : ''}"`);

    // Stop and resume to clear any stuck state
    this.stop();
    this.resume();

    const utterance = new SpeechSynthesisUtterance(text);

    if (this.selectedVoice) {
      utterance.voice = this.selectedVoice;
      utterance.lang = this.selectedVoice.lang || 'en-US';
    } else {
      utterance.lang = 'en-US';
    }

    // Optimize for smooth and clear speech
    utterance.rate = 0.88;
    utterance.pitch = 1.05;
    utterance.volume = 1;

    // Set up event handlers
    utterance.onstart = (event) => {
      console.log("TTS: Speech started.");
      if (callbacks.onStart) callbacks.onStart(event);
    };

    utterance.onend = (event) => {
      console.log("TTS: Speech ended.");
      if (callbacks.onEnd) callbacks.onEnd(event);
    };

    utterance.onerror = (event) => {
      console.error("TTS: Speech error:", event);
      if (callbacks.onError) callbacks.onError(event);
    };

    this.currentUtterance = utterance;
    this.speechSynth.speak(utterance);

    return utterance;
  }

  pause() {
    if (this.speechSynth && this.speechSynth.speaking) {
      this.speechSynth.pause();
    }
  }

  resume() {
    if (this.speechSynth && this.speechSynth.paused) {
      this.speechSynth.resume();
    }
  }

  stop() {
    if (this.speechSynth) {
      this.speechSynth.cancel();
      this.currentUtterance = null;
    }
  }

  isSpeaking() {
    return this.speechSynth && this.speechSynth.speaking;
  }

  isPaused() {
    return this.speechSynth && this.speechSynth.paused;
  }
}

// Export singleton instance
export const ttsService = new TTSService();

