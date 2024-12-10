// Get references
const bus = document.getElementById('bus');
const roadStrip = document.querySelector('.road-strip');
const letterBlocks = Array.from(roadStrip.children);

// Check for Web Speech API support (for the final word)
if (!('speechSynthesis' in window)) {
    alert("Your browser does not support speech synthesis. The final word won't be spoken.");
}

// Play individual letter sound from .mp3 file
function playLetterAudio(letter) {
    const audio = new Audio(`${letter}.mp3`);
    audio.play();
}

// Text-to-Speech for the final word
function speak(text) {
    if (!('speechSynthesis' in window)) return;
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-GB';
    synth.speak(utterance);
}

// Drag events
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
        blendSounds();
    }
});

function blendSounds() {
    let word = '';

    letterBlocks.forEach((block, index) => {
        const letterSound = block.getAttribute('data-sound');
        word += block.textContent; // Collecting letters for final word

        setTimeout(() => {
            block.classList.add('highlight');
            playLetterAudio(letterSound);

            setTimeout(() => {
                block.classList.remove('highlight');
            }, 800);
        }, index * 1200);
    });

    // Speak the full word after all letter sounds
    setTimeout(() => {
        speak(word.toLowerCase());
    }, letterBlocks.length * 1200);
}
