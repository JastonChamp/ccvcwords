// =====================
// Word Groups Configuration
// =====================
const wordGroups = {
    cvc: {
        a: ['bat', 'cat', 'mat'],
        e: ['bet', 'pet', 'set'],
        i: ['bit', 'sit', 'fit'],
        o: ['cot', 'dot', 'pot'],
        u: ['but', 'cut', 'nut']
    }
};

// =====================
// Audio Configuration
// =====================
const audioPath = './'; // Assuming .mp3 files are in the root directory
const letterSounds = {};
const clickSound = new Audio(`${audioPath}click.mp3`);
const successSound = new Audio(`${audioPath}success.mp3`);

'abcdefghijklmnopqrstuvwxyz'.split('').forEach(letter => {
    letterSounds[letter] = new Audio(`${audioPath}${letter}.mp3`);
});
['sh', 'th', 'ch', 'ng'].forEach(digraph => {
    letterSounds[digraph] = new Audio(`${audioPath}${digraph}.mp3`);
});

// =====================
// Speech Synthesis Configuration
// =====================
let selectedVoice = null;
function setVoice() {
    if ('speechSynthesis' in window) {
        const voices = speechSynthesis.getVoices();
        selectedVoice = voices.find(voice => voice.lang.startsWith('en')) || voices[0];
    }
}

function speak(text) {
    return new Promise(resolve => {
        if ('speechSynthesis' in window && selectedVoice) {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.voice = selectedVoice;
            speechSynthesis.speak(utterance);
            utterance.onend = resolve;
        } else {
            resolve();
        }
    });
}

// =====================
// Core Functions
// =====================
function getRandomWord() {
    const allWords = Object.values(wordGroups.cvc).flat();
    return allWords[Math.floor(Math.random() * allWords.length)];
}

async function revealWord(word) {
    document.getElementById('wordBox').textContent = word;
    await speak(word);
    successSound.play();
}

// =====================
// Event Listeners
// =====================
document.getElementById('spinButton').addEventListener('click', () => {
    const word = getRandomWord();
    revealWord(word);
});

setVoice();
