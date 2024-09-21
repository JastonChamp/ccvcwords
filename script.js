const wheel = document.querySelector('.wheel');
let cvcWords = [
    'hop', 'nut', 'bed', 'cat', 'dog', 'pen', 'run', 'bug', 'fox', 'hat', 
    'jam', 'net', 'map', 'pig', 'tub', 'cup', 'van', 'wax', 'win', 'box', 
    'fan', 'jug', 'kid', 'lid', 'mat', 'pig', 'rat', 'sun', 'tap', 'vet', 
    'web', 'yak', 'zip', 'fog', 'leg', 'mop', 'sad', 'bed'
];

// Load audio dynamically based on word (for future audio integration)
function playAudioForWord(word) {
    console.log(`Audio for ${word} would play here.`);
}

// Render the CVC words with colored vowels
function renderSlots() {
    wheel.innerHTML = ''; // Clear existing words
    cvcWords.forEach((word) => {
        const slot = document.createElement('div');
        slot.className = 'slot';
        
        // Change color of vowel letters
        let coloredWord = '';
        for (let letter of word) {
            if ('aeiou'.includes(letter)) {
                coloredWord += `<span class="vowel letter">${letter}</span>`;
            } else {
                coloredWord += `<span class="letter">${letter}</span>`;
            }
        }
        
        slot.innerHTML = coloredWord;  // Use innerHTML to insert HTML content
        slot.style.display = 'none';
        wheel.appendChild(slot);
    });
}

renderSlots();

const slots = document.querySelectorAll('.slot');
let currentSlot = 0;
slots[currentSlot].style.display = 'flex';

// Spin button event listener
document.getElementById('spinButton').addEventListener('click', () => {
    let shuffleCount = 0;
    let lastRandom = 0;

    const shuffleEffect = setInterval(() => {
        slots[lastRandom].style.display = 'none';
        const randomSlot = Math.floor(Math.random() * cvcWords.length);
        slots[randomSlot].style.display = 'flex';
        lastRandom = randomSlot;
        shuffleCount++;
        if (shuffleCount > 20) {
            clearInterval(shuffleEffect);
            slots[lastRandom].style.display = 'none';
            slots[currentSlot].style.display = 'flex';
        }
    }, 100);

    setTimeout(() => {
        const randomSlot = Math.floor(Math.random() * cvcWords.length);
        slots[currentSlot].style.display = 'none';
        slots[randomSlot].style.display = 'flex';
        currentSlot = randomSlot;

        // Play audio for current word (optional)
        playAudioForWord(cvcWords[currentSlot]);

        // Letter by letter reveal
        revealLetters(slots[currentSlot]);
    }, 2500);
});

// Function to reveal letters one by one
function revealLetters(slot) {
    const letters = slot.querySelectorAll('.letter');
    letters.forEach((letter, index) => {
        letter.style.opacity = 0; // Hide letters initially
        setTimeout(() => {
            letter.style.opacity = 1; // Reveal one by one
        }, index * 500); // Adjust delay between letters
    });
}

// Custom word input functionality
document.getElementById('addWordButton').addEventListener('click', () => {
    const customWord = document.getElementById('customWordInput').value.trim().toLowerCase();
    if (customWord.length === 3 && /^[a-z]+$/.test(customWord)) {
        cvcWords.push(customWord);
        renderSlots();
    } else {
        alert('Please enter a valid 3-letter word.');
    }
});
