// =====================
// Configuration & Globals
// =====================

// Word lists grouped by pattern and vowel
const wordGroups = {
    cvc: {
        a: ['bat', 'bag', 'bad', 'cab', 'cap', 'cat', 'dad', 'dam', 'fad', 'fan',
            'mad', 'jam', 'van', 'rag', 'tan', 'man', 'lap', 'mat', 'rat', 'can',
            'gas', 'wag', 'had', 'lad', 'yam', 'wax', 'pad', 'ram', 'ham', 'pan'],
        e: ['bed', 'beg', 'ben', 'bet', 'den', 'fed', 'get', 'hen', 'jet', 'leg',
            'met', 'net', 'pet', 'men', 'pen', 'red', 'set', 'ten', 'wet', 'web',
            'yet', 'vet', 'hem', 'peg', 'let', 'keg', 'pep', 'ned', 'ted', 'ken'],
        i: ['bib', 'bid', 'big', 'bin', 'bit', 'dig', 'dip', 'fig', 'fin', 'fit',
            'him', 'hit', 'kid', 'lid', 'lip', 'mid', 'pin', 'pig', 'pit', 'rid',
            'rim', 'sip', 'sit', 'tin', 'tip', 'wig', 'win', 'zip', 'fix', 'mix'],
        o: ['bob', 'bog', 'cod', 'cob', 'cop', 'cot', 'dog', 'dot', 'fog', 'god',
            'box', 'fox', 'got', 'hop', 'hot', 'jog', 'job', 'log', 'lot', 'mob',
            'mop', 'nod', 'not', 'pod', 'pop', 'pot', 'rod', 'rot', 'sod', 'top'],
        u: ['bun', 'bud', 'bug', 'bus', 'but', 'cub', 'cud', 'cup', 'cut', 'dug',
            'fun', 'gun', 'gum', 'hut', 'hum', 'hug', 'jug', 'mud', 'mug', 'nut',
            'nun', 'pug', 'pun', 'pup', 'rub', 'rug', 'run', 'sum', 'sun', 'tug']
    },
    ccvc: {
        a: ['brag', 'clap', 'crab', 'drag', 'flag', 'flap', 'glad', 'grab', 'plan', 'slam',
            'snap', 'snag', 'span', 'stab', 'trap', 'scab', 'scam', 'scan', 'scat', 'swam',
            'chap', 'that', 'drab', 'gran', 'plat', 'pram', 'slap', 'clan', 'slab'],
        e: ['bled', 'bred', 'fled', 'fret', 'glen', 'sped', 'stem', 'step', 'trek', 'clef', 'sled'],
        i: ['brim', 'brig', 'clip', 'crib', 'drip', 'flip', 'grin', 'grid', 'grip', 'skip',
            'slim', 'slip', 'spin', 'spit', 'swim', 'twin', 'trip', 'trim', 'twig', 'skid'],
        o: ['blot', 'blog', 'clog', 'crop', 'drop', 'frog', 'flop', 'glob', 'glop', 'plod',
            'plot', 'prod', 'prop', 'slot', 'smog', 'snob', 'spot', 'stop', 'swop', 'trod'],
        u: ['drum', 'grub', 'plug', 'slug', 'slum', 'spun', 'stub', 'stud', 'stun']
    },
    cvcc: {
        a: ['band', 'bank', 'damp', 'hand', 'land', 'lamp', 'ramp', 'sand', 'pant', 'tank', 'camp'],
        e: ['bent', 'dent', 'felt', 'fend', 'help', 'kept', 'lend', 'mend', 'nest', 'rest',
            'sent', 'tent', 'vest', 'vent', 'wept', 'weld', 'text', 'next', 'heft', 'jest',
            'best', 'pest', 'test', 'west', 'zest', 'desk', 'self', 'meld', 'held', 'belt'],
        i: ['dink', 'find', 'film', 'gild', 'gimp', 'hind', 'hilt', 'hint', 'jilt', 'mint',
            'milk', 'silk', 'fist', 'list', 'risk', 'sink', 'link', 'pink', 'kink',
            'rink', 'tint', 'tilt', 'skimp', 'wilt'],
        o: ['bond', 'colt', 'comb', 'fond', 'cost', 'lost', 'loft', 'soft', 'post', 'pond'],
        u: ['bunk', 'bump', 'bust', 'dump', 'dunk', 'fund', 'funk', 'gust', 'gunk', 'hunt',
            'junk', 'just', 'lump', 'must', 'pump', 'rust', 'runt', 'sunk', 'tuft',
            'tusk', 'husk', 'dust', 'dusk']
    },
    ccvcc: {
        a: ['brand', 'blank', 'clamp', 'cramp', 'crank', 'drank', 'flank', 'frank', 'plank',
            'prank', 'stamp', 'stand', 'strand', 'tract', 'scrap', 'swank'],
        e: ['blend', 'blent', 'strep', 'trend', 'swept', 'stent'],
        i: ['blink', 'brink', 'clink', 'clint', 'crimp', 'drink', 'drift', 'print', 'sprint',
            'strip', 'strict', 'shrink', 'script', 'twist', 'flint', 'shrimp', 'splint', 'swift'],
        o: ['frost', 'stomp', 'strong', 'throb', 'throng', 'swamp', 'prong', 'prompt',
            'clomp', 'chomp', 'clonk'],
        u: ['blunt', 'brunt', 'clump', 'clunk', 'crust', 'drunk', 'flung', 'frump', 'grunt', 'plump',
            'plunk', 'skunk', 'stump', 'strut', 'trunk', 'trust', 'strum', 'stunt', 'skulk', 'spunk', 'slump']
    },
    digraphs: {
        a: ['chat', 'chap', 'than', 'that', 'math', 'hang', 'bang', 'rang', 'cash',
            'dash', 'stash', 'trash', 'patch', 'catch', 'match', 'batch', 'rash', 'sash'],
        e: ['shed', 'them', 'then', 'fetch', 'bench', 'retch', 'ketch',
            'stretch', 'sketch', 'drench', 'flesh', 'fresh'],
        i: ['chip', 'chin', 'thin', 'thing', 'king', 'ring', 'sing', 'wing', 'sting', 'bring',
            'cling', 'string', 'swing', 'ditch', 'pitch', 'switch', 'twitch'],
        o: ['shop', 'shot', 'chop', 'strong', 'throb', 'cloth', 'crotch', 'notch', 'botch'],
        u: ['shut', 'thud', 'chug', 'chunk', 'thump', 'shrug', 'brush', 'crush',
            'blush', 'flush', 'crutch', 'clutch']
    }
};

const digraphList = ['sh', 'th', 'ch', 'ng'];
const letters = 'abcdefghijklmnopqrstuvwxyz'.split('');

// UI Sounds
const audioPath = './';
let clickSound = null;
let successSound = null;
try {
    clickSound = new Audio(`${audioPath}click.mp3`);
    successSound = new Audio(`${audioPath}success.mp3`);
} catch (err) {
    console.warn('Audio files not available or failed to load.', err);
}

// State Variables
let revealedWords = 0;
let usedWords = [];
let score = 0;
let letterSoundsEnabled = true; 
let blendingTime = 3000; 
let totalWords = 0; 
let currentWord = ''; 
let selectedVoice = null;
let speechSynthesisAvailable = true;
let speechSynthesisAlertShown = false;

// Preload Letter Sounds
const letterSounds = {};
letters.forEach(letter => {
    try {
        letterSounds[letter] = new Audio(`${audioPath}${letter}.mp3`);
    } catch (err) {
        console.warn(`Could not load audio for letter: ${letter}`, err);
    }
});
digraphList.forEach(digraph => {
    try {
        letterSounds[digraph] = new Audio(`${audioPath}${digraph}.mp3`);
    } catch (err) {
        console.warn(`Could not load audio for digraph: ${digraph}`, err);
    }
});

// DOM Elements
const spinButton = document.getElementById('spinButton');
const repeatButton = document.getElementById('repeatButton');
const wordBox = document.getElementById('wordBox');
const progressText = document.getElementById('progressText');
const progressFill = document.getElementById('progressFill');
const progressIcon = document.getElementById('progressIcon');
const complimentBox = document.getElementById('complimentBox');
const vowelSelector = document.getElementById('vowelSelector');
const vowelSelection = document.getElementById('vowelSelection');
const wordTypeSelector = document.getElementById('wordTypeSelector');
const scoreText = document.getElementById('scoreText');
const scoreIncrement = document.getElementById('scoreIncrement');
const toggleAudioButton = document.getElementById('toggleAudioButton');
const increaseBlendingTimeButton = document.getElementById('increaseBlendingTime');
const decreaseBlendingTimeButton = document.getElementById('decreaseBlendingTime');
const blendingTimeDisplay = document.getElementById('blendingTimeDisplay');
const blendingTimerContainer = document.getElementById('blendingTimerContainer');
const blendingTimer = document.getElementById('blendingTimer');
const fullscreenButton = document.getElementById('fullscreenButton');

// Compliments
const compliments = [
    'Great job!', 'Fantastic!', 'Well done!', 'You did it!', 'Awesome!', 'Keep it up!', 'Excellent!'
];

// =====================
// Speech Synthesis Setup
// =====================
function fallbackNoSpeechSynthesis() {
    if (!speechSynthesisAlertShown) {
        console.warn('Speech synthesis not available. Will continue without voice.');
        speechSynthesisAlertShown = true;
    }
    selectedVoice = null;
    speechSynthesisAvailable = false;
}

function setVoice() {
    return new Promise(resolve => {
        if (!('speechSynthesis' in window)) {
            console.warn('Speech Synthesis API not supported.');
            fallbackNoSpeechSynthesis();
            return resolve();
        }

        function loadVoices() {
            const voices = speechSynthesis.getVoices();
            if (voices.length > 0) {
                selectedVoice =
                    voices.find(voice => voice.lang.startsWith('en') && voice.name.toLowerCase().includes('female')) ||
                    voices.find(voice => voice.lang.startsWith('en')) ||
                    voices[0];
                resolve();
            } else {
                fallbackNoSpeechSynthesis();
                resolve();
            }
        }

        if (speechSynthesis.getVoices().length === 0) {
            speechSynthesis.onvoiceschanged = () => {
                loadVoices();
                speechSynthesis.onvoiceschanged = null;
            };
            setTimeout(() => {
                if (!selectedVoice) {
                    fallbackNoSpeechSynthesis();
                    resolve();
                }
            }, 2000);
        } else {
            loadVoices();
        }
    });
}

// Speak a given text using speech synthesis, if available
function speak(text) {
    return new Promise(resolve => {
        if (!speechSynthesisAvailable || !selectedVoice) return resolve();

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.voice = selectedVoice;
        utterance.rate = 0.8;
        utterance.pitch = 1.1;
        utterance.volume = 0.9;

        const timeoutId = setTimeout(() => {
            console.warn('Speech synthesis timeout');
            speechSynthesis.cancel();
            resolve();
        }, 5000);

        utterance.onend = () => {
            clearTimeout(timeoutId);
            resolve();
        };
        utterance.onerror = () => {
            clearTimeout(timeoutId);
            resolve();
        };
        speechSynthesis.speak(utterance);
    });
}

// =====================
// Utility Functions
// =====================
function isVowel(letter) {
    return 'aeiou'.includes(letter.toLowerCase());
}

function updateScore() {
    score += 10;
    scoreText.textContent = `Score: ${score}`;
    scoreIncrement.textContent = '+10';
    scoreIncrement.classList.add('show');
    setTimeout(() => {
        scoreIncrement.classList.remove('show');
    }, 1000);
}

function updateProgress() {
    revealedWords = usedWords.length;
    const progressPercentage = totalWords > 0 ? (revealedWords / totalWords) * 100 : 0;
    progressText.textContent = `${revealedWords} / ${totalWords} Words Revealed`;
    progressFill.style.width = `${progressPercentage}%`;

    progressIcon.classList.add('star-animate');
    setTimeout(() => {
        progressIcon.classList.remove('star-animate');
    }, 1000);
}

function giveCompliment() {
    const compliment = compliments[Math.floor(Math.random() * compliments.length)];
    complimentBox.textContent = compliment;
    complimentBox.style.color = 'green';
    complimentBox.style.opacity = '1';
    speak(compliment); // If speech not available, resolves silently.
    if (successSound) {
        try {
            successSound.currentTime = 0;
            successSound.play().catch(err => console.warn('Success sound failed:', err));
        } catch (err) {
            console.warn('Could not play success sound:', err);
        }
    }
    setTimeout(() => {
        complimentBox.style.opacity = '0';
    }, 2000);
}

function playLetterSound(unit) {
    return new Promise(resolve => {
        if (!letterSoundsEnabled) return resolve();
        const sound = letterSounds[unit.toLowerCase()];
        if (!sound) return resolve();

        sound.currentTime = 0;
        sound.play().then(resolve).catch((error) => {
            console.warn(`Error playing sound for "${unit}":`, error);
            resolve();
        });
    });
}

function parseWord(word) {
    const units = [];
    let i = 0;
    while (i < word.length) {
        if (i < word.length - 1) {
            const twoLetters = word.substring(i, i + 2).toLowerCase();
            if (digraphList.includes(twoLetters)) {
                units.push({ text: twoLetters, isVowel: false, isDigraph: true });
                i += 2;
                continue;
            }
        }
        const singleLetter = word[i].toLowerCase();
        units.push({ text: singleLetter, isVowel: isVowel(singleLetter), isDigraph: false });
        i += 1;
    }
    return units;
}

// =====================
// Core Functions
// =====================
async function revealWord(word, isRepeat = false) {
    wordBox.innerHTML = '';
    const units = parseWord(word);

    units.forEach((unit, index) => {
        const span = document.createElement('span');
        span.textContent = unit.text;
        span.classList.add('letter');
        if (unit.isVowel && !unit.isDigraph) span.classList.add('vowel');
        if (unit.isDigraph) span.classList.add('digraph');
        span.style.animationDelay = `${(index + 1) * 0.5}s`;
        wordBox.appendChild(span);
    });

    // Play each letter/digraph sound with slight delay
    for (let i = 0; i < units.length; i++) {
        await new Promise(r => setTimeout(r, 500));
        await playLetterSound(units[i].text);
    }

    startBlendingTimer(blendingTime / 1000);
    await new Promise(r => setTimeout(r, blendingTime));

    // Pronounce whole word (if speech available)
    await speak(word);

    if (!isRepeat) {
        giveCompliment();
        updateScore();
        updateProgress();
    }
}

function getAvailableWords() {
    const selectedWordType = wordTypeSelector.value;
    const selectedVowel = vowelSelector.value;
    const group = wordGroups[selectedWordType];
    if (!group) return [];
    if (selectedVowel === 'all') {
        return Object.values(group).flat();
    }
    return group[selectedVowel] || [];
}

function getRandomWord() {
    const availableWords = getAvailableWords();
    const remainingWords = availableWords.filter(w => !usedWords.includes(w));
    if (remainingWords.length === 0) {
        alert('You have gone through all the words! The list will reset.');
        resetGame(false);
        return getRandomWord();
    }
    const word = remainingWords[Math.floor(Math.random() * remainingWords.length)];
    usedWords.push(word);
    return word;
}

// =====================
// Event Handlers
// =====================
async function spin() {
    spinButton.disabled = true;
    repeatButton.disabled = true;
    spinButton.innerHTML = '<span class="spin-icon-animate">🎡</span>';
    if (clickSound) {
        try {
            clickSound.currentTime = 0;
            await clickSound.play();
        } catch (err) {
            console.warn('Click sound failed:', err);
        }
    }

    setTimeout(() => {
        spinButton.innerHTML = '🎡 Spin';
    }, 1000);

    complimentBox.textContent = '';
    complimentBox.style.opacity = '0';

    const word = getRandomWord();
    currentWord = word;

    try {
        await setVoice();
        await revealWord(word);
    } catch (error) {
        console.error('Error during word reveal:', error);
    } finally {
        spinButton.disabled = false;
        repeatButton.disabled = false;
    }
}

async function repeat() {
    if (!currentWord) {
        alert('No word to repeat. Please spin first.');
        return;
    }
    repeatButton.disabled = true;
    try {
        await setVoice();
        await revealWord(currentWord, true);
    } catch (error) {
        console.error('Error during word repeat:', error);
    } finally {
        repeatButton.disabled = false;
    }
}

vowelSelector.addEventListener('change', () => {
    resetGame(true);
});

wordTypeSelector.addEventListener('change', () => {
    resetGame(true);
    vowelSelection.style.display = 'flex';
});

function resetGame(resetTotalWords = true) {
    usedWords = [];
    revealedWords = 0;
    score = 0;
    scoreText.textContent = `Score: ${score}`;
    currentWord = '';
    repeatButton.disabled = true;

    if (resetTotalWords) {
        totalWords = getAvailableWords().length;
    }
    updateProgress();
}

function toggleLetterSounds() {
    letterSoundsEnabled = !letterSoundsEnabled;
    toggleAudioButton.textContent = letterSoundsEnabled ? '🔇 Disable Letter Sounds' : '🔊 Enable Letter Sounds';
}

toggleAudioButton.addEventListener('click', toggleLetterSounds);

increaseBlendingTimeButton.addEventListener('click', () => {
    if (blendingTime < 7000) {
        blendingTime += 1000;
        updateBlendingTimeDisplay();
    }
});

decreaseBlendingTimeButton.addEventListener('click', () => {
    if (blendingTime > 1000) {
        blendingTime -= 1000;
        updateBlendingTimeDisplay();
    }
});

function updateBlendingTimeDisplay() {
    blendingTimeDisplay.textContent = blendingTime / 1000;
}

function startBlendingTimer(seconds) {
    blendingTimerContainer.style.display = 'block';
    blendingTimer.style.width = '100%';
    blendingTimer.style.transition = `width ${seconds}s linear`;
    setTimeout(() => {
        blendingTimer.style.width = '0%';
    }, 50);
    setTimeout(() => {
        blendingTimerContainer.style.display = 'none';
    }, seconds * 1000);
}

function toggleFullscreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(err => {
            alert(`Error: ${err.message} (${err.name})`);
        });
        fullscreenButton.textContent = '⛶ Exit Fullscreen';
    } else {
        document.exitFullscreen();
        fullscreenButton.textContent = '⛶ Fullscreen';
    }
}

fullscreenButton.addEventListener('click', toggleFullscreen);
document.addEventListener('fullscreenchange', () => {
    if (!document.fullscreenElement) {
        fullscreenButton.textContent = '⛶ Fullscreen';
    } else {
        fullscreenButton.textContent = '⛶ Exit Fullscreen';
    }
});

// Initialize
setVoice().then(() => {
    resetGame(true);
});

// Preload audio if available
function preloadAudio() {
    Object.values(letterSounds).forEach(audio => {
        if (audio && typeof audio.load === 'function') {
            audio.load();
        }
    });
    if (clickSound && typeof clickSound.load === 'function') clickSound.load();
    if (successSound && typeof successSound.load === 'function') successSound.load();
}

window.addEventListener('load', preloadAudio);
