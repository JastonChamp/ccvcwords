// Word list object from your provided data
const words = {
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
    // Additional categories omitted for brevity. Add them as needed.
    // ccvc: {...}, cvcc: {...}, ccvcc: {...}, digraphs: {...}
};

// Selectors
const bus = document.getElementById('bus');
const roadStrip = document.querySelector('.road-strip');

// Check for Web Speech API support for speaking the final word
if (!('speechSynthesis' in window)) {
    alert("Your browser does not support speech synthesis. The final word will not be spoken.");
}

// Function to play individual letter/digraph audio from a .mp3 file
function playLetterAudio(letter) {
    const audio = new Audio(`${letter}.mp3`);
    audio.play();
}

// Use Text-to-Speech for the final word
function speak(text) {
    if (!('speechSynthesis' in window)) return;
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-GB';
    synth.speak(utterance);
}

// Function to display a chosen word on the road strip as individual blocks
function displayWord(word) {
    roadStrip.innerHTML = '';
    // For simplicity, each character in the word is treated as a block.
    // If you need digraphs (e.g., 'sh'), you can adapt this logic to chunk the word.
    for (const char of word) {
        const block = document.createElement('div');
        block.textContent = char;
        block.setAttribute('data-sound', char.toLowerCase());
        roadStrip.appendChild(block);
    }
}

// Pick a random word from cvc.a for demonstration
function getRandomWord() {
    const wordList = words.cvc.a; // You can modify this to choose different categories
    const randomIndex = Math.floor(Math.random() * wordList.length);
    return wordList[randomIndex];
}

// Function to blend sounds when bus is dropped
function blendSounds() {
    const letterBlocks = Array.from(roadStrip.children);
    let word = '';

    letterBlocks.forEach((block, index) => {
        const letterSound = block.getAttribute('data-sound');
        word += block.textContent;

        setTimeout(() => {
            // Highlight the current letter block
            block.classList.add('highlight');

            // Play the letter sound
            playLetterAudio(letterSound);

            // Remove highlight after a short delay
            setTimeout(() => {
                block.classList.remove('highlight');
            }, 800);
        }, index * 1200);
    });

    // After all letters, speak the full word
    setTimeout(() => {
        speak(word.toLowerCase());
    }, letterBlocks.length * 1200);
}

// Drag events for the bus
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

// Initialize the game on page load
document.addEventListener('DOMContentLoaded', () => {
    const chosenWord = getRandomWord();
    displayWord(chosenWord);
});
