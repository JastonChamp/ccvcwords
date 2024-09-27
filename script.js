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
    ccvc: {
        a: [
            'brag', 'clap', 'crab', 'drag', 'flag', 'flap', 'glad', 'grab', 'plan',
            'slam', 'slap', 'snap', 'span', 'stab', 'swam', 'trap', 'tram', 'scan',
            'bran', 'brat', 'clan', 'drab', 'frat', 'gran', 'scat', 'scam', 'slat', 'snag',
        ],
        e: [
            'bled', 'bred', 'fled', 'fret', 'glen', 'grep', 'sped', 'stem', 'trem',
            'dress', 'press', 'smell', 'spell', 'spend', 'spelt', 'dwelt', 'kemp',
            'dwell', 'trend', 'tress', 'meld', 'bless', 'blend', 'blent',
        ],
        i: [
            'brig', 'brim', 'clip', 'crib', 'drip', 'flip', 'glib', 'grim', 'grip',
            'grid', 'grin', 'grit', 'prim', 'skim', 'skin', 'skip', 'slim', 'slip', 'snip',
            'spin', 'spit', 'swim', 'twig', 'twin', 'twit', 'whim', 'whip', 'whiz',
        ],
        o: [
            'bloc', 'blob', 'blog', 'clog', 'crop', 'drop', 'frog', 'glob', 'plot',
            'plod', 'prod', 'prop', 'scot', 'slot', 'smog', 'snob', 'spot', 'stop', 'swop',
            'trod', 'trot', 'trop', 'clop', 'plop', 'clod', 'slog',
        ],
        u: [
            'blub', 'club', 'crub', 'drub', 'drum', 'flub', 'glum', 'grub', 'plug',
            'plum', 'slum', 'smug', 'snub', 'snug', 'spud', 'stud', 'stun', 'swum', 'trug',
            'trum', 'trun', 'brum', 'stub',
        ],
    },
    cvcc: {
        a: [
            'band', 'bank', 'damp', 'fang', 'gang', 'hand', 'hang', 'land', 'lamp',
            'mask', 'pant', 'sand', 'sang', 'tank', 'tang', 'task', 'wand', 'want', 'yank',
            'bask', 'last', 'past', 'raft', 'rant', 'rang', 'rash', 'bang',
        ],
        e: [
            'bend', 'desk', 'felt', 'fend', 'help', 'jest', 'kept', 'lend', 'mend',
            'meld', 'melt', 'nest', 'pest', 'rest', 'send', 'tend', 'tent', 'vend', 'vest',
            'went', 'welt', 'west', 'zest', 'pelt', 'kemp', 'rend', 'test', 'fend', 'meld',
        ],
        i: [
            'dink', 'find', 'film', 'gild', 'gimp', 'hind', 'hilt', 'hint', 'jilt',
            'kind', 'king', 'link', 'lint', 'mint', 'milk', 'pink', 'rink', 'ring', 'silt',
            'silk', 'sink', 'sift', 'tint', 'tilt', 'wink', 'wind', 'wilt', 'wild', 'wimp',
        ],
        o: [
            'bond', 'bold', 'colt', 'comb', 'cold', 'fond', 'fold', 'gold', 'gong',
            'hold', 'holt', 'jolt', 'mold', 'most', 'pond', 'post', 'told', 'volt', 'wold',
            'wolf', 'wont', 'cost', 'lost', 'host', 'fond', 'dolt', 'bolt', 'tomb', 'trod',
        ],
        u: [
            'bunk', 'bump', 'bust', 'dump', 'dunk', 'fund', 'funk', 'gust', 'gunk',
            'hulk', 'hunt', 'hung', 'junk', 'just', 'jump', 'lump', 'lunk', 'lung', 'must',
            'musk', 'punk', 'pulp', 'punt', 'rung', 'sunk', 'tusk', 'tump', 'bust', 'cusp',
        ],
    },
    ccvcc: {
        a: [
            'brand', 'blank', 'clamp', 'cramp', 'crank', 'draft', 'drank', 'flank',
            'frank', 'grand', 'grant', 'grasp', 'plant', 'plank', 'prank', 'scamp',
            'slant', 'spank', 'stand', 'stamp', 'stack', 'stank', 'strap', 'track',
            'tramp', 'clamp', 'scalp', 'scant', 'splat',
        ],
        e: [
            'blend', 'blent', 'dreck', 'dress', 'press', 'slept', 'smelt', 'spent',
            'swept', 'trend', 'tress', 'dwell', 'smell', 'spell', 'spend', 'spelt',
            'strep', 'stress', 'stretch', 'fret', 'crest', 'dwelt', 'fled', 'kemp',
            'tremp', 'skelp', 'swept', 'bless', 'blent', 'meld',
        ],
        i: [
            'blink', 'brink', 'clink', 'clint', 'crimp', 'crisp', 'drink', 'drift',
            'flint', 'frisk', 'grind', 'grist', 'print', 'prism', 'skimp', 'skirt',
            'slink', 'split', 'sprint', 'stink', 'sting', 'swift', 'swing', 'twist',
            'twink', 'frisk', 'skink', 'flint', 'blink', 'twist',
        ],
        o: [
            'block', 'clomp', 'clonk', 'croft', 'cross', 'flock', 'front', 'frost',
            'gloss', 'plonk', 'prompt', 'smock', 'smolt', 'stock', 'stomp', 'stork',
            'strong', 'tromp', 'trock', 'clomp', 'clost', 'floss', 'frock', 'prong',
            'plomb', 'brock', 'tromp', 'frost', 'plonk', 'clomp',
        ],
        u: [
            'blunt', 'brunt', 'clump', 'clunk', 'crust', 'drunk', 'flung', 'frump',
            'grunt', 'plump', 'plunk', 'skunk', 'slump', 'slung', 'spunk', 'stuck',
            'stump', 'strut', 'strum', 'stunt', 'swung', 'trunk', 'trust', 'truss',
            'plump', 'grunt', 'strut', 'trump', 'blurb', 'blush',
        ],
    },
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
    };

    // Merge all words into one array for 'all' selection
    const allCvcWords = Object.values(wordGroups.cvc).flat();
    const allCcvcWords = Object.values(wordGroups.ccvc).flat();
    const allCvccWords = Object.values(wordGroups.cvcc).flat();
    const allCcvccWords = Object.values(wordGroups.ccvcc).flat();
    const allDigraphWords = Object.values(wordGroups.digraphs).flat();

    // Preload letter and digraph sounds
    const audioPath = './'; // Audio files are in the root folder
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

    // Initialize Speech Synthesis
    let voices = [];
    const synth = window.speechSynthesis;
    let selectedVoice = null;

    // Populate the voice list and select a female voice
    function populateVoiceList() {
        voices = synth.getVoices();
        if (voices.length !== 0) {
            // Attempt to select a female voice; fallback to default if not found
            selectedVoice = voices.find(voice => voice.name.toLowerCase().includes('female')) || voices.find(voice => voice.lang === 'en-US') || voices[0];
        }
    }

    populateVoiceList();
    if (speechSynthesis.onvoiceschanged !== undefined) {
        speechSynthesis.onvoiceschanged = populateVoiceList;
    }

    // Set selected voice
    function setVoice() {
        if (!selectedVoice && voices.length > 0) {
            // Select the first female voice available
            selectedVoice = voices.find(voice => voice.name.toLowerCase().includes('female')) || voices.find(voice => voice.lang === 'en-US') || voices[0];
        }
    }

    // Function to speak text
    function speak(text) {
        return new Promise((resolve) => {
            if (synth.speaking) {
                resolve();
                return;
            }
            const utterThis = new SpeechSynthesisUtterance(text);
            utterThis.voice = selectedVoice;
            utterThis.onend = resolve;
            synth.speak(utterThis);
        });
    }

    // Function to give a random compliment
    function giveCompliment() {
        const compliment = compliments[Math.floor(Math.random() * compliments.length)];
        complimentBox.textContent = compliment;
        setTimeout(() => {
            complimentBox.textContent = '';
        }, 2000);
    }

    // Function to update score
    function updateScore() {
        score += 1;
        scoreText.textContent = `Score: ${score}`;
    }

    // Function to update progress
    function updateProgress() {
        const totalWords = getTotalWords();
        const progress = revealedWords / totalWords * 100;
        progressFill.style.width = `${progress}%`;
        progressText.textContent = `${revealedWords} / ${totalWords} words revealed`;
    }

    // Function to get total words based on selected type and vowel
    function getTotalWords() {
        const selectedWordType = wordTypeSelector.value;
        const selectedVowel = vowelSelector.value;

        switch (selectedWordType) {
            case 'cvc':
                return selectedVowel === 'all' ? allCvcWords.length : wordGroups.cvc[selectedVowel].length;
            case 'ccvc':
                return selectedVowel === 'all' ? allCcvcWords.length : wordGroups.ccvc[selectedVowel].length;
            case 'cvcc':
                return selectedVowel === 'all' ? allCvccWords.length : wordGroups.cvcc[selectedVowel].length;
            case 'ccvcc':
                return selectedVowel === 'all' ? allCcvccWords.length : wordGroups.ccvcc[selectedVowel].length;
            case 'digraphs':
                return allDigraphWords.length;
            default:
                return 0;
        }
    }

    // Function to get available words based on selection
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
                return allDigraphWords;
            default:
                return [];
        }
    }

    // Function to check if a letter is a vowel
    function isVowel(letter) {
        return 'aeiou'.includes(letter.toLowerCase()) && letter.length === 1;
    }

    // Function to play letter or digraph sound
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

    // Function to reveal word with animations and sounds
    async function revealWord(word) {
        wordBox.innerHTML = ''; // Clear previous word
        const letterSpans = [];

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

            // Set animation delay for CSS
            span.style.setProperty('--animation-delay', `${i * 0.3}s`);
        }

        revealedWords += 1;
        updateProgress();

        // Play letter sounds with delays matching the CSS animation
        for (let i = 0; i < letterSpans.length; i++) {
            const { isSilent, letter } = letterSpans[i];
            await new Promise((resolve) => setTimeout(resolve, i * 300)); // Adjusted delay to match CSS

            // Only play sound if the letter is not silent
            if (!isSilent) {
                await playLetterSound(letter);
            }
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
    }

    // Function to spin and reveal a word
    function spin() {
        const word = getRandomWord();
        revealWord(word);
    }

    // Function to get a random word
    function getRandomWord() {
        const availableWords = getAvailableWords();

        // Filter out used words to get the list of remaining words
        const remainingWords = availableWords.filter(word => !usedWords.includes(word));

        // If all words have been used, inform the user and reset the usedWords array
        if (remainingWords.length === 0) {
            alert('You have gone through all the words! The list will reset.');
            usedWords = [];
            revealedWords = 0;
            score = 0;
            scoreText.textContent = `Score: ${score}`;
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

    // Event listener for word type selection
    wordTypeSelector.addEventListener('change', () => {
        usedWords = [];
        revealedWords = 0;
        score = 0;
        scoreText.textContent = `Score: ${score}`;
        updateProgress();

        if (wordTypeSelector.value === 'digraphs') {
            vowelSelection.style.display = 'none';
        } else {
            vowelSelection.style.display = 'block';
        }
    });

    // Initialize
    spinButton.addEventListener('click', spin);
    setVoice();

    // Initial progress update
    updateProgress();

    // Initial score update
    scoreText.textContent = `Score: ${score}`;

    // Function to preload all audio files
    function preloadAudio() {
        for (let key in letterSounds) {
            letterSounds[key].load();
        }
    }

    // Call preloadAudio on page load
    window.onload = preloadAudio;
    ```

**Key Fixes and Enhancements:**

1. **Audio Path Correction:**
   - **Before:** `const audioPath = './audio/';`
   - **After:** `const audioPath = './';`
   - **Reason:** Since your audio files are in the root folder, the `audioPath` should point directly to `'./'`.

2. **Voice Selection:**
   - The script attempts to select a female voice. If no female voice is found, it falls back to an English (US) voice or the first available voice.
   - **Ensured Selection of Female Voice:**
     ```javascript
     selectedVoice = voices.find(voice => voice.name.toLowerCase().includes('female')) || voices.find(voice => voice.lang === 'en-US') || voices[0];
     ```

3. **Animation Delay Synchronization:**
   - Adjusted the delay in the `revealWord` function to match the CSS animation for smoother visual effects.
   - **Adjusted Delay:**
     ```javascript
     span.style.setProperty('--animation-delay', `${i * 0.3}s`);
     ```
     and
     ```javascript
     await new Promise((resolve) => setTimeout(resolve, i * 300));
     ```

4. **Error Handling for Audio Playback:**
   - Enhanced the `playLetterSound` function to handle cases where an audio file might not be found, preventing the application from crashing.
   - **Handled Missing Audio Files:**
     ```javascript
     if (sound) {
         // play sound
     } else {
         console.warn(`No sound found for letter "${letter}"`);
         resolve();
     }
     ```

5. **Reset Functionality on Word Type Change:**
   - When the word type is changed, the score and progress are reset to provide a fresh start.

6. **Preloading Audio:**
   - Ensured that all audio files are preloaded when the page initializes to prevent delays during playback.

---

## **3. Complete `style.css`**

This CSS file styles all elements, including silent letters and digraphs, maintaining a clean and appealing design.

```css
/* General Styles */
body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background-color: #f0f8ff; /* AliceBlue for a soft background */
    color: #333;
    text-align: center;
    padding: 20px;
    margin: 0;
}

/* Header */
header {
    margin-bottom: 20px;
}

header h1 {
    font-size: 36px;
    margin-bottom: 10px;
    color: #2c3e50; /* Dark blue-gray color */
}

header p {
    font-size: 18px;
    color: #7f8c8d; /* Gray color for subtitle */
}

/* Score Display */
#scoreText {
    font-size: 24px;
    margin-bottom: 20px;
    font-weight: bold;
    color: #16a085; /* Green-teal color */
}

/* Word Type and Vowel Selection */
#wordTypeSelection,
#vowelSelection {
    margin: 10px 0;
}

label {
    font-size: 18px;
    margin-right: 10px;
    color: #34495e; /* Darker gray-blue */
}

select {
    font-size: 16px;
    padding: 5px 10px;
    border: 1px solid #bdc3c7;
    border-radius: 4px;
    background-color: #ecf0f1; /* Light gray */
    color: #2c3e50;
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
}

/* Spinner and Wheel */
.spinner {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 30px 0;
}

.wheel {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 48px;
    font-weight: bold;
    min-height: 60px;
    border: 2px solid #bdc3c7;
    border-radius: 10px;
    padding: 20px;
    background-color: #ffffff;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: all 0.5s ease-in-out;
}

/* Letter Styles */
.vowel {
    color: #e74c3c; /* Red color for vowels */
}

.silent {
    color: gray; /* Gray color for silent letters */
    font-style: italic;
}

.digraph {
    text-decoration: underline; /* Underline for digraphs */
    color: #2980b9; /* Blue color for digraphs */
}

/* Spin Button */
#spinButton {
    padding: 12px 24px;
    font-size: 18px;
    background-color: #27ae60; /* Green background */
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s ease;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

#spinButton:hover {
    background-color: #219150; /* Darker green on hover */
    transform: translateY(-2px);
}

#spinButton:active {
    background-color: #1e8449; /* Even darker green on click */
    transform: translateY(0);
}

/* Compliment Box */
#complimentBox {
    margin-top: 20px;
    font-size: 20px;
    color: #2ecc71; /* Light green color for compliments */
    min-height: 24px;
    transition: opacity 0.5s ease;
}

/* Progress Bar */
#progressBar {
    width: 100%;
    background-color: #ddd;
    border-radius: 20px;
    overflow: hidden;
    margin: 20px 0;
    height: 25px;
}

#progressFill {
    height: 100%;
    width: 0%;
    background-color: #3498db; /* Blue fill for progress */
    transition: width 0.5s ease-in-out;
}

/* Progress Text */
#progressText {
    font-size: 16px;
    margin-top: 5px;
    color: #34495e; /* Darker gray-blue */
}

/* Animation for Letters */
@keyframes revealLetter {
    0% { opacity: 0; transform: translateY(-20px); }
    100% { opacity: 1; transform: translateY(0); }
}

.wheel span {
    display: inline-block;
    opacity: 0;
    animation: revealLetter 0.5s forwards;
    animation-delay: var(--animation-delay, 0s);
}

/* Responsive Design */
@media (max-width: 600px) {
    .wheel {
        font-size: 32px;
        padding: 15px;
    }

    #scoreText {
        font-size: 20px;
    }

    label, select {
        font-size: 16px;
    }

    #spinButton {
        font-size: 16px;
        padding: 8px 16px;
    }

    #complimentBox {
        font-size: 18px;
    }

    #progressBar {
        height: 20px;
    }

    #progressText {
        font-size: 14px;
    }
}
