// audioController.js

class AudioController {
    constructor() {
        this.synth = window.speechSynthesis;
        this.isSpeaking = false;
    }

    speak(text) {
        if (this.isSpeaking) {
            this.synth.cancel();
        }
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.onstart = () => this.isSpeaking = true;
        utterance.onend = () => this.isSpeaking = false;
        this.synth.speak(utterance);
    }

    playSound(url) {
        const audio = new Audio(url);
        audio.play();
    }
}

// Example usage:
const audioController = new AudioController();
// audioController.speak('Hello, world!');
// audioController.playSound('soundEffect.mp3');
