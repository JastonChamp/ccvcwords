// Function to play the audio for a given letter
function playAudio(letter) {
    const audio = new Audio(`${letter}.mp3`);
    audio.play();
}

// Dragging and blending functionality
const bus = document.getElementById('bus');
const roadStrip = document.querySelector('.road-strip');
const letterSounds = Array.from(roadStrip.children);

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
                playAudio(box.textContent.toLowerCase()); // Play the phonetics file
            }, index * 1000); // Delay for smooth sound blending
            word += box.textContent;
        });

        // Sound out the full word after all letters are blended
        setTimeout(() => {
            console.log(`Blended word: ${word}`); // Replace this with full word audio if available
        }, letterSounds.length * 1000);
    }
});
