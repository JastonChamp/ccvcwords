// Get references to elements
const bus = document.getElementById('bus');
const roadStrip = document.querySelector('.road-strip');
const letterBlocks = Array.from(roadStrip.children);

// Check for Web Speech API support for the final word
if (!('speechSynthesis' in window)) {
    alert("Your browser does not support speech synthesis. The blending of the final word will not be available.");
}

// Function to play individual letter audio
function playLetterAudio(letter) {
    const audio = new Audio(`${letter}.mp3`);
    audio.play();
}

// Text-to-Speech Function for the final word
function speak(text) {
    if (!('speechSynthesis' in window)) return;
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-GB'; // British English
    synth.speak(utterance);
}

// Drag and Drop Events for the bus
bus.addEventListener('dragstart', (e) => {
    e.dataTransfer.setData('text', 'bus');
});

roadStrip.addEventListener('dragover', (e) => {
    e.preventDefault();
});

roadStrip.addEventListener('drop', (e) => {
    e.preventDefault();
    const dragged = e.dataTransfer.getData('text');
    if (dragged === 'bus') {
        // If bus is dropped on the road, start blending the sounds
        blendSounds();
    }
});

// Function to blend sounds
function blendSounds() {
    let word = '';

    // First, play each letter's sound sequentially
    letterBlocks.forEach((block, index) => {
        const letterSound = block.getAttribute('data-sound');
        word += block.textContent;

        setTimeout(() => {
            // Highlight the current letter being played
            block.classList.add('highlight');

            // Play the letter sound from .mp3 file (e.g., "a.mp3")
            playLetterAudio(letterSound);

            // After a short delay, remove highlight
            setTimeout(() => {
                block.classList.remove('highlight');
            }, 800);

        }, index * 1200);
    });

    // After all letters have been played, use Web Speech API to speak the full word
    setTimeout(() => {
        speak(word.toLowerCase());
    }, letterBlocks.length * 1200);
}
