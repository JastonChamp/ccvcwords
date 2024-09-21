const words = [
    // Short 'A' sound
    'trap', 'clap', 'snap', 'grab', 'flap', 'slap', 'crab', 'flag', 'plan', 'brag',

    // Short 'E' sound
    'sled', 'step', 'tred', 'prep', 'fled', 'bred', 'dred', 'klem', 'glend', 'bren',

    // Short 'I' sound
    'slip', 'clip', 'drip', 'flip', 'grip', 'trip', 'skip', 'slim', 'slit', 'brim',

    // Short 'O' sound
    'drop', 'frog', 'crop', 'trot', 'plot', 'clop', 'clog', 'prod', 'bloc', 'flop',

    // Short 'U' sound
    'plug', 'drum', 'slug', 'crust', 'glum', 'brun', 'flut', 'smug', 'crum', 'drup'
];

// Set path to your audio files
const audioPath = './';  // Path to folder containing letter sound audio files (e.g., t.mp3, r.mp3, etc.)

let revealedWords = 0;

const spinButton = document.getElementById('spinButton');
const wordBox = document.querySelector('.wheel');
const progressText = document.getElementById('progressText');
const progressBar = document.getElementById('progressBar');
const complimentBox = document.getElementById('complimentBox');

const spinSound = new Audio('spin-sound.mp3');
let revealSound = new Audio('reveal-sound.mp3');

// Add voice selection
let selectedVoice;

// Function to set the female voice or fallback if not available
function setFemaleVoice() {
    const voices = window.speechSynthesis.getVoices();

    // Try to find a female voice
    selectedVoice = voices.find(voice => voice.name.includes('Google UK English Female') || voice.name.includes('female'));

    // If no female voice is found, fallback to the first available voice
    if (!selectedVoice && voices.length > 0) {
        selectedVoice = voices[0]; // Fallback to first available voice
    }

    // Safari-specific fallback: retry loading voices if none are found
    if (voices.length === 0) {
        console.log("No voices found, retrying...");
        setTimeout(setFemaleVoice, 500); // Retry after a brief delay
    }
}

// Detect when voices are changed or loaded, and then set the preferred voice
if ('speechSynthesis' in window) {
    if (speechSynthesis.onvoiceschanged !== undefined) {
        speechSynthesis.onvoiceschanged = setFemaleVoice;
    } else {
        setFemaleVoice(); // Fallback for older browsers or initial load
    }
} else {
    alert('Speech Synthesis API is not supported on this browser. Please try a different browser.');
}

// Event listener for spin button
spinButton.addEventListener('click', spin);

function spin() {
    spinSound.play();  // Play spin sound

    // Add shake effect
    wordBox.classList.add('shake');
    setTimeout(() => {
        wordBox.classList.remove('shake'); // Remove shake effect after animation
    }, 500);

    wordBox.innerHTML = ''; // Clear previous word
    complimentBox.innerHTML = ''; // Clear previous compliment
    const word = words[Math.floor(Math.random() * words.length)];
    revealWord(word);
}

function revealWord(word) {
    let index = 0;
    wordBox.innerHTML = ''; // Clear word box before displaying new word
    let revealInterval = setInterval(() => {
        if (index < word.length) {
            let span = document.createElement('span');
            span.textContent = word[index];

            // Color vowels red
            if (isVowel(word[index])) {
                span.style.color = 'red';
            }

            wordBox.appendChild(span);

            // Play the sound for the current letter after each reveal with delay
            let letterSound = new Audio(audioPath + word[index].toLowerCase() + '.mp3');
            letterSound.play();

            index++;
        } else {
            clearInterval(revealInterval);

            // Speak the whole word 1.5 seconds after all letters are revealed
            setTimeout(() => {
                speakWord(word); 
                setTimeout(() => {
                    giveCompliment();  // Compliment after word is spoken
                    updateProgress();
                }, 1000); // Delay before compliment
            }, 1500); // Delay before speaking word
        }
    }, 1500);  // Adjust this number to control the delay between each letter (in milliseconds)
}

function isVowel(letter) {
    return 'aeiou'.includes(letter.toLowerCase());
}

// Speak the word with a female voice
function speakWord(word) {
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.rate = 0.8;  // Slowed down for smoother delivery
    utterance.pitch = 1.1; // Lower pitch for pleasant tone
    utterance.volume = 0.9; // Reduced volume to avoid sharpness

    if (selectedVoice) {
        utterance.voice = selectedVoice;  // Use selected female voice
    }

    window.speechSynthesis.speak(utterance);
}

function giveCompliment() {
    const compliments = ['Great job!', 'Fantastic!', 'Well done!', 'You did it!', 'Awesome!'];
    const compliment = compliments[Math.floor(Math.random() * compliments.length)];
    complimentBox.textContent = compliment;
    complimentBox.style.color = 'green';
    complimentBox.style.fontSize = '30px';

    const utterance = new SpeechSynthesisUtterance(compliment);
    utterance.rate = 0.8;  // Slower rate for compliments as well
    utterance.pitch = 1.1; // Lower pitch for more pleasant tone
    utterance.volume = 0.9; // Reduced volume to avoid sharpness

    if (selectedVoice) {
        utterance.voice = selectedVoice;  // Use the same female voice for compliments
    }

    window.speechSynthesis.speak(utterance);
}

function updateProgress() {
    revealedWords++;
    progressText.textContent = `${revealedWords} / ${words.length} Words Revealed`;
    progressBar.value = (revealedWords / words.length) * 100;
}

// Initialize progress bar width (if needed)
progressBar.value = 0;
