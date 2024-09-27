// Word groups categorized by vowel sounds and word types
const wordGroups = {
    cvc: {
        a: [
            'bat', 'bag', 'bad', 'cab', 'cap', 'cat', 'dad', 'dam', 'fad', 'fan',
            'gap', 'gas', 'had', 'ham', 'hat', 'jam', 'jab', 'lad', 'lag', 'lap',
            'mad', 'man', 'map', 'nap', 'pad', 'pan', 'pat', 'rag', 'ram', 'ran',
            'rat', 'sad', 'sap', 'sat', 'tab', 'tag', 'tan', 'tap', 'van', 'wag',
        ],
        e: [
            'bed', 'beg', 'ben', 'bet', 'den', 'fed', 'gem', 'get', 'hen', 'jet',
            'keg', 'led', 'leg', 'let', 'men', 'met', 'net', 'pen', 'pep', 'pet',
            'red', 'rep', 'set', 'ten', 'vet', 'web', 'wed', 'wet', 'yet', 'zed',
        ],
        i: [
            'bib', 'bid', 'big', 'bin', 'bit', 'dig', 'dip', 'fig', 'fin', 'fit',
            'gig', 'gin', 'hid', 'him', 'hip', 'hit', 'jig', 'kid', 'kin', 'kit',
            'lid', 'lip', 'lit', 'mix', 'nip', 'pin', 'pig', 'pip', 'rib', 'rid',
            'rig', 'rim', 'rip', 'sip', 'sit', 'tin', 'tip', 'wig', 'win', 'zip',
        ],
        o: [
            'bob', 'bog', 'cod', 'cob', 'cop', 'cot', 'dog', 'dot', 'fog', 'god',
            'got', 'hog', 'hot', 'jog', 'job', 'log', 'lob', 'lot', 'mop', 'mob',
            'nod', 'not', 'pod', 'pop', 'pot', 'rod', 'rot', 'sob', 'sod', 'tom',
        ],
        u: [
            'bun', 'bud', 'bug', 'bus', 'but', 'cub', 'cud', 'cup', 'cut', 'dug',
            'fun', 'gum', 'gun', 'gut', 'hum', 'hug', 'hut', 'jug', 'mud', 'mug',
            'nut', 'nun', 'pun', 'pug', 'rug', 'run', 'sun', 'tub', 'tug', 'yum',
        ],
    },
    // Other word types (ccvc, cvcc, ccvcc) remain the same as before
    // ...

    // Adding the new Digraphs category
    digraphs: {
        sh: [
            // 10 words containing 'sh'
            [
                { letter: 'sh', isDigraph: true },
                { letter: 'i', isDigraph: false },
                { letter: 'p', isDigraph: false },
            ],
            [
                { letter: 'f', isDigraph: false },
                { letter: 'i', isDigraph: false },
                { letter: 'sh', isDigraph: true },
            ],
            [
                { letter: 'd', isDigraph: false },
                { letter: 'i', isDigraph: false },
                { letter: 'sh', isDigraph: true },
            ],
            [
                { letter: 'c', isDigraph: false },
                { letter: 'a', isDigraph: false },
                { letter: 'sh', isDigraph: true },
            ],
            [
                { letter: 'm', isDigraph: false },
                { letter: 'a', isDigraph: false },
                { letter: 'sh', isDigraph: true },
            ],
            [
                { letter: 'b', isDigraph: false },
                { letter: 'u', isDigraph: false },
                { letter: 'sh', isDigraph: true },
            ],
            [
                { letter: 'h', isDigraph: false },
                { letter: 'a', isDigraph: false },
                { letter: 'sh', isDigraph: true },
            ],
            [
                { letter: 'w', isDigraph: false },
                { letter: 'i', isDigraph: false },
                { letter: 'sh', isDigraph: true },
            ],
            [
                { letter: 'b', isDigraph: false },
                { letter: 'a', isDigraph: false },
                { letter: 'sh', isDigraph: true },
            ],
            [
                { letter: 'p', isDigraph: false },
                { letter: 'o', isDigraph: false },
                { letter: 'sh', isDigraph: true },
            ],
        ],
        th: [
            // 10 words containing 'th'
            [
                { letter: 'th', isDigraph: true },
                { letter: 'i', isDigraph: false },
                { letter: 'n', isDigraph: false },
            ],
            [
                { letter: 'b', isDigraph: false },
                { letter: 'a', isDigraph: false },
                { letter: 'th', isDigraph: true },
            ],
            [
                { letter: 'p', isDigraph: false },
                { letter: 'a', isDigraph: false },
                { letter: 'th', isDigraph: true },
            ],
            [
                { letter: 'th', isDigraph: true },
                { letter: 'a', isDigraph: false },
                { letter: 'n', isDigraph: false },
            ],
            [
                { letter: 'th', isDigraph: true },
                { letter: 'e', isDigraph: false },
                { letter: 'm', isDigraph: false },
            ],
            [
                { letter: 'w', isDigraph: false },
                { letter: 'i', isDigraph: false },
                { letter: 'th', isDigraph: true },
            ],
            [
                { letter: 'b', isDigraph: false },
                { letter: 'o', isDigraph: false },
                { letter: 'th', isDigraph: true },
            ],
            [
                { letter: 'm', isDigraph: false },
                { letter: 'o', isDigraph: false },
                { letter: 'th', isDigraph: true },
            ],
            [
                { letter: 'th', isDigraph: true },
                { letter: 'i', isDigraph: false },
                { letter: 's', isDigraph: false },
            ],
            [
                { letter: 'p', isDigraph: false },
                { letter: 'a', isDigraph: false },
                { letter: 'th', isDigraph: true },
            ],
        ],
        ch: [
            // 10 words containing 'ch'
            [
                { letter: 'ch', isDigraph: true },
                { letter: 'i', isDigraph: false },
                { letter: 'p', isDigraph: false },
            ],
            [
                { letter: 'l', isDigraph: false },
                { letter: 'u', isDigraph: false },
                { letter: 'n', isDigraph: false },
                { letter: 'ch', isDigraph: true },
            ],
            [
                { letter: 'm', isDigraph: false },
                { letter: 'u', isDigraph: false },
                { letter: 'ch', isDigraph: true },
            ],
            [
                { letter: 'r', isDigraph: false },
                { letter: 'i', isDigraph: false },
                { letter: 'ch', isDigraph: true },
            ],
            [
                { letter: 'ch', isDigraph: true },
                { letter: 'a', isDigraph: false },
                { letter: 't', isDigraph: false },
            ],
            [
                { letter: 'p', isDigraph: false },
                { letter: 'u', isDigraph: false },
                { letter: 'ch', isDigraph: true },
            ],
            [
                { letter: 'h', isDigraph: false },
                { letter: 'u', isDigraph: false },
                { letter: 'n', isDigraph: false },
                { letter: 'ch', isDigraph: true },
            ],
            [
                { letter: 'b', isDigraph: false },
                { letter: 'e', isDigraph: false },
                { letter: 'n', isDigraph: false },
                { letter: 'ch', isDigraph: true },
            ],
            [
                { letter: 'b', isDigraph: false },
                { letter: 'a', isDigraph: false },
                { letter: 'ch', isDigraph: true },
            ],
            [
                { letter: 'r', isDigraph: false },
                { letter: 'a', isDigraph: false },
                { letter: 'ch', isDigraph: true },
            ],
        ],
        ng: [
            // 10 words containing 'ng'
            [
                { letter: 's', isDigraph: false },
                { letter: 'i', isDigraph: false },
                { letter: 'ng', isDigraph: true },
            ],
            [
                { letter: 'r', isDigraph: false },
                { letter: 'a', isDigraph: false },
                { letter: 'ng', isDigraph: true },
            ],
            [
                { letter: 's', isDigraph: false },
                { letter: 'a', isDigraph: false },
                { letter: 'ng', isDigraph: true },
            ],
            [
                { letter: 'k', isDigraph: false },
                { letter: 'i', isDigraph: false },
                { letter: 'ng', isDigraph: true },
            ],
            [
                { letter: 'l', isDigraph: false },
                { letter: 'o', isDigraph: false },
                { letter: 'ng', isDigraph: true },
            ],
            [
                { letter: 's', isDigraph: false },
                { letter: 'o', isDigraph: false },
                { letter: 'ng', isDigraph: true },
            ],
            [
                { letter: 'r', isDigraph: false },
                { letter: 'i', isDigraph: false },
                { letter: 'ng', isDigraph: true },
            ],
            [
                { letter: 'br', isDigraph: false },
                { letter: 'i', isDigraph: false },
                { letter: 'ng', isDigraph: true },
            ],
            [
                { letter: 'th', isDigraph: true },
                { letter: 'i', isDigraph: false },
                { letter: 'ng', isDigraph: true },
            ],
            [
                { letter: 's', isDigraph: false },
                { letter: 'tru', isDigraph: false },
                { letter: 'ng', isDigraph: true },
            ],
        ],
    },
};

// Existing code for merging words for 'all' selection
const allCvcWords = Object.values(wordGroups.cvc).flat();
const allCcvcWords = Object.values(wordGroups.ccvc || {}).flat();
const allCvccWords = Object.values(wordGroups.cvcc || {}).flat();
const allCcvccWords = Object.values(wordGroups.ccvcc || {}).flat();

// Include code to flatten digraphs words
const allDigraphWords = Object.values(wordGroups.digraphs).flat();

// Preload letter sounds, including digraphs
const audioPath = './'; // Adjust the path if necessary
const letterSounds = {};

// Load individual letter sounds
'abcdefghijklmnopqrstuvwxyz'.split('').forEach(letter => {
    const audio = new Audio(`${audioPath}${letter}.mp3`);
    letterSounds[letter] = audio;
});

// Load digraph sounds
['sh', 'th', 'ch', 'ng'].forEach(digraph => {
    const audio = new Audio(`${audioPath}${digraph}.mp3`);
    letterSounds[digraph] = audio;
});

let revealedWords = 0;
let usedWords = [];
let score = 0;

const spinButton = document.getElementById('spinButton');
const wordBox = document.getElementById('wordBox');
const progressText = document.getElementById('progressText');
const progressFill = document.getElementById('progressFill');
const complimentBox = document.getElementById('complimentBox');
const vowelSelector = document.getElementById('vowelSelector');
const vowelSelection = document.getElementById('vowelSelection');
const wordTypeSelector = document.getElementById('wordTypeSelector');
const scoreText = document.getElementById('scoreText');

// Preload compliments
const compliments = ['Great job!', 'Fantastic!', 'Well done!', 'You did it!', 'Awesome!'];

// Voice selection for word pronunciation
let selectedVoice = null;

// ... [Rest of your existing code remains unchanged, but make sure to update functions as previously explained to handle digraphs]

// Update getAvailableWords function
function getAvailableWords() {
    const selectedWordType = wordTypeSelector.value;
    const selectedVowel = vowelSelector.value;

    switch (selectedWordType) {
        case 'cvc':
            return selectedVowel === 'all' ? allCvcWords : wordGroups.cvc[selectedVowel] || [];
        case 'ccvc':
            return selectedVowel === 'all' ? allCcvcWords : wordGroups.ccvc[selectedVowel] || [];
        case 'cvcc':
            return selectedVowel === 'all' ? allCvccWords : wordGroups.cvcc[selectedVowel] || [];
        case 'ccvcc':
            return selectedVowel === 'all' ? allCcvccWords : wordGroups.ccvcc[selectedVowel] || [];
        case 'digraphs':
            // Flatten all digraph words into a single array
            return allDigraphWords;
        default:
            return [];
    }
}

// Update isVowel function
function isVowel(letter) {
    return 'aeiou'.includes(letter.toLowerCase()) && letter.length === 1;
}

// Update revealWord function
async function revealWord(word) {
    wordBox.innerHTML = ''; // Clear previous word
    const letterSpans = [];

    let delay = 500; // Initial delay

    for (let i = 0; i < word.length; i++) {
        const { letter, isSilent, isDigraph } = word[i];
        const span = document.createElement('span');
        span.textContent = letter;

        if (isVowel(letter) && !isDigraph) {
            span.classList.add('vowel');
        }

        if (isSilent) {
            span.classList.add('silent'); // Add a class for silent letters
        }

        if (isDigraph) {
            span.classList.add('digraph'); // Add a class for digraphs
        }

        wordBox.appendChild(span);
        letterSpans.push({ span, isSilent, letter });

        // Set animation order for CSS
        span.style.setProperty('--animation-order', i + 1);
    }

    // Play letter sounds with delays matching the CSS animation
    for (let i = 0; i < letterSpans.length; i++) {
        const { span, isSilent, letter } = letterSpans[i];
        await new Promise((resolve) => setTimeout(resolve, delay));

        // Only play sound if the letter is not silent
        if (!isSilent) {
            await playLetterSound(letter);
        }

        delay = 500; // Set delay between letters
    }

    // Wait for the last letter animation to complete
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Speak the whole word
    const wordText = word.map(({ letter }) => letter).join('');
    await speak(wordText);

    // Give a compliment
    giveCompliment();

    // Update score
    updateScore();

    // Update progress
    updateProgress();
}

// Update playLetterSound function
function playLetterSound(letter) {
    return new Promise((resolve) => {
        const sound = letterSounds[letter.toLowerCase()];
        if (sound) {
            sound.currentTime = 0;
            sound.play().then(() => {
                sound.onended = resolve;
            }).catch((error) => {
                console.error(`Error playing sound for "${letter}":`, error);
                resolve();
            });
        } else {
            console.warn(`No sound found for letter "${letter}"`);
            resolve();
        }
    });
}

// Modify getRandomWord function
function getRandomWord() {
    const availableWords = getAvailableWords();

    // Filter out used words to get the list of remaining words
    const remainingWords = availableWords.filter(word => !usedWords.includes(word));

    // If all words have been used, inform the user and reset the usedWords array
    if (remainingWords.length === 0) {
        alert('You have gone through all the words! The list will reset.');
        usedWords = [];
        revealedWords = 0;
        updateProgress();
        return getRandomWord();
    }

    // Select a random word from the remaining words
    const word = remainingWords[Math.floor(Math.random() * remainingWords.length)];
    usedWords.push(word);

    // If the word is a string (for previous word types), convert it to the new format
    if (typeof word === 'string') {
        return word.split('').map((letter) => ({ letter, isSilent: false, isDigraph: false }));
    }

    // For words with digraphs or silent letters, it's already in the correct format
    return word;
}

// Initialize
spinButton.addEventListener('click', spin);
setVoice();

// Initial progress update
updateProgress();

// Initial score update
scoreText.textContent = `Score: ${score}`;

// Other existing functions remain unchanged
// ...

