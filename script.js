// =====================
// Word Groups Configuration
// =====================
const wordGroups = {
    cvc: {
        a: [
            'bat', 'bag', 'bad', 'cab', 'cap', 'cat', 'dad', 'dam', 'fad', 'fan',
            'mad', 'jam', 'van', 'rag', 'tan', 'man', 'lap', 'mat', 'rat', 'can',
            'gas', 'wag', 'had', 'lad', 'yam', 'wax', 'pad', 'ram', 'ham', 'pan'
        ],
        e: [
            'bed', 'beg', 'ben', 'bet', 'den', 'fed', 'get', 'hen', 'jet', 'leg',
            'met', 'net', 'pet', 'men', 'pen', 'red', 'set', 'ten', 'wet', 'web',
            'yet', 'vet', 'hem', 'peg', 'let', 'keg', 'pep', 'ned', 'ted', 'ken'
        ],
        i: [
            'bib', 'bid', 'big', 'bin', 'bit', 'dig', 'dip', 'fig', 'fin', 'fit',
            'him', 'hit', 'kid', 'lid', 'lip', 'mid', 'pin', 'pig', 'pit', 'rid',
            'rim', 'sip', 'sit', 'tin', 'tip', 'wig', 'win', 'zip', 'fix', 'mix'
        ],
        o: [
            'bob', 'bog', 'cod', 'cob', 'cop', 'cot', 'dog', 'dot', 'fog', 'god',
            'box', 'fox', 'got', 'hop', 'hot', 'jog', 'job', 'log', 'lot', 'mob',
            'mop', 'nod', 'not', 'pod', 'pop', 'pot', 'rod', 'rot', 'sod', 'top'
        ],
        u: [
            'bun', 'bud', 'bug', 'bus', 'but', 'cub', 'cud', 'cup', 'cut', 'dug',
            'fun', 'gun', 'gum', 'hut', 'hum', 'hug', 'jug', 'mud', 'mug', 'nut',
            'nun', 'pug', 'pun', 'pup', 'rub', 'rug', 'run', 'sum', 'sun', 'tug'
        ]
    },
    ccvc: {
        a: [
            'brag', 'clap', 'crab', 'drag', 'flag', 'flap', 'glad', 'grab', 'plan', 'slam',
            'snap', 'snag', 'span', 'stab', 'trap', 'scab', 'scam', 'scan', 'scat', 'swam',
            'chap', 'that', 'drab', 'gran', 'plat', 'pram', 'slap', 'clan', 'slab'
        ],
        e: [
            'bled', 'bred', 'fled', 'fret', 'glen', 'sped', 'stem', 'step', 'trek', 'clef',
            'sled'
        ],
        i: [
            'brim', 'brig', 'clip', 'crib', 'drip', 'flip', 'grin', 'grid', 'grip', 'skip',
            'slim', 'slip', 'spin', 'spit', 'swim', 'twin', 'trip', 'trim', 'twig', 'skid'
        ],
        o: [
            'blot', 'blog', 'clog', 'crop', 'drop', 'frog', 'flop', 'glob', 'glop', 'plod',
            'plot', 'prod', 'prop', 'slot', 'smog', 'snob', 'spot', 'stop', 'swop', 'trod'
        ],
        u: [
            'drum', 'grub', 'plug', 'slug', 'slum', 'spun', 'stub', 'stud', 'stun'
        ]
    },
    // Include other word groups (cvcc, ccvcc, digraphs) as needed here...
};

// =====================
// Audio Configuration
// =====================
const audioPath = './'; // Adjust if audio files are in a different directory
const letterSounds = {};
const clickSound = new Audio(`${audioPath}click.mp3`);
const successSound = new Audio(`${audioPath}success.mp3`);

// Load letter sounds with error handling
'abcdefghijklmnopqrstuvwxyz'.split('').forEach(letter => {
    const audio = new Audio(`${audioPath}${letter}.mp3`);
    audio.onerror = () => console.warn(`Audio for letter ${letter} not found.`);
    letterSounds[letter] = audio;
});

// =====================
// Application State
// =====================
let usedWords = [];
let totalWords = Object.values(wordGroups.cvc).flat().length; // Update this dynamically based on selected groups
let currentWord = '';
let score = 0;

// =====================
// Utility Functions
// =====================
function getRandomWord(group) {
    const vowels = Object.keys(wordGroups[group]);
    const randomVowel = vowels[Math.floor(Math.random() * vowels.length)];
    const words = wordGroups[group][randomVowel];
    let word = words[Math.floor(Math.random() * words.length)];

    // Avoid repetition
    while (usedWords.includes(word)) {
        word = words[Math.floor(Math.random() * words.length)];
    }
    usedWords.push(word);
    return word;
}

function playLetterSound(letter) {
    const audio = letterSounds[letter];
    if (audio) {
        audio.currentTime = 0;
        audio.play().catch(err => console.warn("Audio playback failed:", err));
    }
}

function updateScore() {
    score += 10;
    document.getElementById('scoreText').textContent = score;
}

function updateProgress() {
    const progressCount = document.getElementById('progressCount');
    progressCount.textContent = usedWords.length;
}

// =====================
// Core Functions
// =====================
function revealWord(word) {
    const wordBox = document.getElementById('wordBox');
    wordBox.textContent = '';

    [...word].forEach((letter, i) => {
        const span = document.createElement('span');
        span.textContent = letter;
        span.style.animationDelay = `${i * 0.3}s`;
        wordBox.appendChild(span);

        setTimeout(() => playLetterSound(letter), i * 500);
    });

    currentWord = word;
    updateScore();
    updateProgress();
}

// =====================
// Event Listeners
// =====================
document.getElementById('spinButton').addEventListener('click', () => {
    if (usedWords.length >= totalWords) {
        alert("You've completed all words!");
        return;
    }
    const word = getRandomWord('cvc');
    revealWord(word);
});

document.getElementById('repeatButton').addEventListener('click', () => {
    if (currentWord) revealWord(currentWord);
});

// =====================
// Initialize
// =====================
updateProgress();
