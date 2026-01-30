/**
 * Speech-to-Text Service
 * Reusable STT functionality for Communication and Position questions
 */

class STTService {
  constructor() {
    this.recognition = null;
    this.isListening = false;
    this.transcript = '';
    this.interimTranscript = '';
    this.isSupported = false;
  }

  async initialize() {
    if (this.isSupported) return true;

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      console.warn('Speech recognition not supported in this browser');
      return false;
    }

    this.recognition = new SpeechRecognition();
    this.recognition.continuous = true;
    this.recognition.interimResults = true;
    this.recognition.lang = 'en-US';
    this.isSupported = true;

    // Set up event handlers
    this.recognition.onstart = () => {
      this.isListening = true;
    };

    this.recognition.onend = () => {
      this.isListening = false;
    };

    this.recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      this.isListening = false;
    };

    return true;
  }

  startListening(callbacks = {}) {
    if (!this.isSupported || !this.recognition) {
      console.error('Speech recognition not initialized');
      return false;
    }

    if (this.isListening) {
      this.stopListening();
    }

    this.transcript = '';
    this.interimTranscript = '';

    // Set up event handlers
    this.recognition.onresult = (event) => {
      let interim = '';
      let final = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          final += transcript + ' ';
        } else {
          interim += transcript;
        }
      }

      this.interimTranscript = interim;
      if (final) {
        this.transcript += final;
      }

      if (callbacks.onResult) {
        callbacks.onResult({
          final: this.transcript,
          interim: this.interimTranscript,
          full: this.transcript + this.interimTranscript
        });
      }
    };

    if (callbacks.onStart) {
      this.recognition.onstart = () => {
        this.isListening = true;
        callbacks.onStart();
      };
    }

    if (callbacks.onEnd) {
      this.recognition.onend = () => {
        this.isListening = false;
        callbacks.onEnd();
      };
    }

    if (callbacks.onError) {
      this.recognition.onerror = (event) => {
        this.isListening = false;
        callbacks.onError(event);
      };
    }

    try {
      this.recognition.start();
      return true;
    } catch (error) {
      console.error('Error starting speech recognition:', error);
      return false;
    }
  }

  stopListening() {
    if (this.recognition && this.isListening) {
      this.recognition.stop();
      this.isListening = false;
    }
  }

  getTranscript() {
    return this.transcript + this.interimTranscript;
  }

  clearTranscript() {
    this.transcript = '';
    this.interimTranscript = '';
  }

  isActive() {
    return this.isListening;
  }
}

// Export singleton instance
export const sttService = new STTService();




