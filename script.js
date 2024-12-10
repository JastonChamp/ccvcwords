// Word list object
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
    }
    // Add other categories (ccvc, cvcc, etc.) if needed
};


const bus = document.getElementById('bus');
const roadStrip = document.querySelector('.road-strip');
const nextWordBtn = document.getElementById('nextWordBtn');

// Check for Web Speech API support
if (!('speechSynthesis' in window)) {
    alert("Your browser does not support speech synthesis. The final word will not be spoken.");
}

// Play individual letter audio
function playLetterAudio(letter) {
    const audio = new Audio(`${letter}.mp3`);
    audio.play();
}

// Speak the final word
function speak(text) {
    if (!('speechSynthesis' in window)) return;
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-GB';
    synth.speak(utterance);
}

// Display a chosen word on the road strip
function displayWord(word) {
    roadStrip.innerHTML = '';
    for (const char of word) {
        const block = document.createElement('div');
        block.textContent = char;
        block.setAttribute('data-sound', char.toLowerCase());
        roadStrip.appendChild(block);
    }
}

// Pick a random word from cvc.a
function getRandomWord() {
    const wordList = words.cvc.a;
    const randomIndex = Math.floor(Math.random() * wordList.length);
    return wordList[randomIndex];
}

// Blend sounds when bus is dropped
function blendSounds() {
    const letterBlocks = Array.from(roadStrip.children);
    let word = '';

    letterBlocks.forEach((block, index) => {
        const letterSound = block.getAttribute('data-sound');
        word += block.textContent;

        setTimeout(() => {
            block.classList.add('highlight');
            playLetterAudio(letterSound);
            setTimeout(() => {
                block.classList.remove('highlight');
            }, 800);
        }, index * 1200);
    });

    // After all letters have been played, speak the full word and highlight all blocks
    setTimeout(() => {
        speak(word.toLowerCase());
        letterBlocks.forEach(b => b.classList.add('complete'));
        // After the blending is done, load a new word automatically after a delay,
        // or let the user click 'Next Word'
        // Here, we'll just leave the 'Next Word' button so the user can control when to proceed.
    }, letterBlocks.length * 1200);
}

// Drag events
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

// Next Word button functionality
nextWordBtn.addEventListener('click', () => {
    const chosenWord = getRandomWord();
    displayWord(chosenWord);
});

// Initialize the game on page load
document.addEventListener('DOMContentLoaded', () => {
    const chosenWord = getRandomWord();
    displayWord(chosenWord);
});
