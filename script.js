const bus = document.getElementById('bus');
const roadStrip = document.querySelector('.road-strip');
const letterSounds = Array.from(roadStrip.children);

// Web Speech API - Text-to-Speech
function speak(text) {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-GB'; // Set to UK English
    synth.speak(utterance);
}

// Dragging and blending functionality
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
        let word = '';
        letterSounds.forEach((box, index) => {
            setTimeout(() => {
                speak(box.getAttribute('data-sound')); // Speak each letter sound
            }, index * 1000); // Delay between each letter
            word += box.textContent;
        });

        // Speak the full word after sounding off all letters
        setTimeout(() => {
            speak(word);
        }, letterSounds.length * 1000);
    }
});
