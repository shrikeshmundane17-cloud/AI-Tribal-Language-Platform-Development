// BHASHA SETU - SPEECH SERVICE (STT & TTS)
class SpeechService {
  constructor() {
    this.synth = window.speechSynthesis;
    this.currentUtterance = null;
    this.speed = 1.0;
    this.isListening = false;
    this.recognition = null;
    this.initSTT();
  }

  initSTT() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = false;
      this.recognition.interimResults = true;
    }
  }

  setSpeed(rate) {
    this.speed = parseFloat(rate) || 1.0;
  }

  /**
   * Speak text with speed control and tribal phonetics assist
   */
  speak(text, lang = 'hi-IN', onEnd) {
    if (!this.synth) {
      window.apiService.showToast('Browser Text-to-Speech is not supported.', 'error');
      return;
    }

    this.stop();

    if (!text || !text.trim()) return;

    // Clean text for speech synthesis
    const cleanText = text.replace(/\[|\]/g, '');
    const utter = new SpeechSynthesisUtterance(cleanText);
    utter.rate = this.speed;
    utter.pitch = 1.0;

    // Use Hindi or Indian English voice fallback for accurate phonetics of Indian tribal names
    const voices = this.synth.getVoices();
    const indianVoice = voices.find(v => v.lang.includes('hi') || v.lang.includes('IN')) || voices[0];
    if (indianVoice) {
      utter.voice = indianVoice;
    }

    utter.onend = () => {
      this.currentUtterance = null;
      if (onEnd) onEnd();
    };

    utter.onerror = (e) => {
      console.warn('TTS error:', e);
      this.currentUtterance = null;
      if (onEnd) onEnd();
    };

    this.currentUtterance = utter;
    this.synth.speak(utter);
  }

  pause() {
    if (this.synth && this.synth.speaking) {
      this.synth.pause();
    }
  }

  resume() {
    if (this.synth && this.synth.paused) {
      this.synth.resume();
    }
  }

  stop() {
    if (this.synth) {
      this.synth.cancel();
      this.currentUtterance = null;
    }
  }

  /**
   * Start Speech-to-Text with callbacks
   */
  startListening(langCode = 'hi-IN', onInterim, onFinal, onError) {
    if (!this.recognition) {
      // Simulate STT input for demo if SpeechRecognition is blocked or unsupported in current browser
      window.apiService.showToast('Web Speech API unavailable in this browser. Running live voice assistant simulation.', 'info');
      setTimeout(() => {
        if (onFinal) onFinal('नमस्ते, आप कैसे हैं?');
      }, 2000);
      return;
    }

    try {
      this.recognition.lang = langCode === 'English' ? 'en-IN' : 'hi-IN';
      this.isListening = true;

      this.recognition.onresult = (event) => {
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          } else {
            interimTranscript += event.results[i][0].transcript;
          }
        }

        if (interimTranscript && onInterim) onInterim(interimTranscript);
        if (finalTranscript && onFinal) {
          this.isListening = false;
          onFinal(finalTranscript);
        }
      };

      this.recognition.onerror = (err) => {
        this.isListening = false;
        if (onError) onError(err);
      };

      this.recognition.onend = () => {
        this.isListening = false;
      };

      this.recognition.start();
    } catch (e) {
      console.warn('Recognition start exception:', e);
      this.isListening = false;
    }
  }

  stopListening() {
    if (this.recognition && this.isListening) {
      this.recognition.stop();
      this.isListening = false;
    }
  }
}

window.speechService = new SpeechService();