// Updated Game Data with All Levels and Sentences
const levels = [
  {
    levelNumber: 1,
    sentences: [
      {
        text: "Sam has a cat.",
        sightWords: ["Sam", "has", "a", "cat"],
      },
      {
        text: "Dan has a mat.",
        sightWords: ["Dan", "has", "a", "mat"],
      },
      {
        text: "Max has a rat.",
        sightWords: ["Max", "has", "a", "rat"],
      },
    ],
  },
  {
    levelNumber: 2,
    sentences: [
      {
        text: "Dan runs about.",
        sightWords: ["Dan", "runs", "about"],
      },
      {
        text: "Max digs about.",
        sightWords: ["Max", "digs", "about"],
      },
      {
        text: "Jill hops about.",
        sightWords: ["Jill", "hops", "about"],
      },
    ],
  },
  {
    levelNumber: 3,
    sentences: [
      {
        text: "A cat sits above.",
        sightWords: ["A", "cat", "sits", "above"],
      },
      {
        text: "A dog sits above.",
        sightWords: ["A", "dog", "sits", "above"],
      },
      {
        text: "A bug sits above.",
        sightWords: ["A", "bug", "sits", "above"],
      },
    ],
  },
  {
    levelNumber: 4,
    sentences: [
      {
        text: "Pat runs again.",
        sightWords: ["Pat", "runs", "again"],
      },
      {
        text: "A pup digs again.",
        sightWords: ["A", "pup", "digs", "again"],
      },
      {
        text: "A cat sits again.",
        sightWords: ["A", "cat", "sits", "again"],
      },
    ],
  },
  {
    levelNumber: 5,
    sentences: [
      {
        text: "All the dogs ran.",
        sightWords: ["All", "the", "dogs", "ran"],
      },
      {
        text: "All the rats hid.",
        sightWords: ["All", "the", "rats", "hid"],
      },
      {
        text: "All the kids ran.",
        sightWords: ["All", "the", "kids", "ran"],
      },
    ],
  },
  {
    levelNumber: 6,
    sentences: [
      {
        text: "She also has a pet cat.",
        sightWords: ["She", "also", "has", "a", "pet", "cat"],
      },
      {
        text: "The dog dug all day.",
        sightWords: ["The", "dog", "dug", "all", "day"],
      },
      {
        text: "He also got a new hat.",
        sightWords: ["He", "also", "got", "a", "new", "hat"],
      },
    ],
  },
  {
    levelNumber: 7,
    sentences: [
      {
        text: "The dogs are big.",
        sightWords: ["The", "dogs", "are", "big"],
      },
      {
        text: "The hats are red.",
        sightWords: ["The", "hats", "are", "red"],
      },
      {
        text: "The bats are black.",
        sightWords: ["The", "bats", "are", "black"],
      },
    ],
  },
  {
    levelNumber: 8,
    sentences: [
      {
        text: "It will be hot.",
        sightWords: ["It", "will", "be", "hot"],
      },
      {
        text: "It will be fun.",
        sightWords: ["It", "will", "be", "fun"],
      },
      {
        text: "It will be big.",
        sightWords: ["It", "will", "be", "big"],
      },
    ],
  },
  {
    levelNumber: 9,
    sentences: [
      {
        text: "A fox came by.",
        sightWords: ["A", "fox", "came", "by"],
      },
      {
        text: "A frog came by.",
        sightWords: ["A", "frog", "came", "by"],
      },
      {
        text: "A pig came by.",
        sightWords: ["A", "pig", "came", "by"],
      },
    ],
  },
  {
    levelNumber: 10,
    sentences: [
      {
        text: "We run one day.",
        sightWords: ["We", "run", "one", "day"],
      },
      {
        text: "We sit one day.",
        sightWords: ["We", "sit", "one", "day"],
      },
      {
        text: "We jump one day.",
        sightWords: ["We", "jump", "one", "day"],
      },
    ],
  },
  {
    levelNumber: 11,
    sentences: [
      {
        text: "Can it do tricks?",
        sightWords: ["Can", "it", "do", "tricks"],
      },
      {
        text: "Can she do jumps?",
        sightWords: ["Can", "she", "do", "jumps"],
      },
      {
        text: "Can he do flips?",
        sightWords: ["Can", "he", "do", "flips"],
      },
    ],
  },
  {
    levelNumber: 12,
    sentences: [
      {
        text: "It does get hot.",
        sightWords: ["It", "does", "get", "hot"],
      },
      {
        text: "It does get wet.",
        sightWords: ["It", "does", "get", "wet"],
      },
      {
        text: "It does fit well.",
        sightWords: ["It", "does", "fit", "well"],
      },
    ],
  },
  {
    levelNumber: 13,
    sentences: [
      {
        text: "A mat for the cat.",
        sightWords: ["A", "mat", "for", "the", "cat"],
      },
      {
        text: "A pen for the hen.",
        sightWords: ["A", "pen", "for", "the", "hen"],
      },
      {
        text: "A log for the dog.",
        sightWords: ["A", "log", "for", "the", "dog"],
      },
    ],
  },
  {
    levelNumber: 14,
    sentences: [
      {
        text: "I go in the hut.",
        sightWords: ["I", "go", "in", "the", "hut"],
      },
      {
        text: "I go in the zoo.",
        sightWords: ["I", "go", "in", "the", "zoo"],
      },
      {
        text: "I go on the mat.",
        sightWords: ["I", "go", "on", "the", "mat"],
      },
    ],
  },
  {
    levelNumber: 15,
    sentences: [
      {
        text: "He sits.",
        sightWords: ["He", "sits"],
      },
      {
        text: "He hops.",
        sightWords: ["He", "hops"],
      },
      {
        text: "He jogs.",
        sightWords: ["He", "jogs"],
      },
    ],
  },
  {
    levelNumber: 16,
    sentences: [
      {
        text: "Her cat naps.",
        sightWords: ["Her", "cat", "naps"],
      },
      {
        text: "Her bat hid.",
        sightWords: ["Her", "bat", "hid"],
      },
      {
        text: "Her fox runs.",
        sightWords: ["Her", "fox", "runs"],
      },
    ],
  },
  {
    levelNumber: 17,
    sentences: [
      {
        text: "His dog naps.",
        sightWords: ["His", "dog", "naps"],
      },
      {
        text: "His fox hid.",
        sightWords: ["His", "fox", "hid"],
      },
      {
        text: "His cat runs.",
        sightWords: ["His", "cat", "runs"],
      },
    ],
  },
  {
    levelNumber: 18,
    sentences: [
      {
        text: "I ran.",
        sightWords: ["I", "ran"],
      },
      {
        text: "I cut.",
        sightWords: ["I", "cut"],
      },
      {
        text: "I hit.",
        sightWords: ["I", "hit"],
      },
    ],
  },
  {
    levelNumber: 19,
    sentences: [
      {
        text: "How did it nap?",
        sightWords: ["How", "did", "it", "nap"],
      },
      {
        text: "How did it hop?",
        sightWords: ["How", "did", "it", "hop"],
      },
      {
        text: "How did it run?",
        sightWords: ["How", "did", "it", "run"],
      },
    ],
  },
  {
    levelNumber: 20,
    sentences: [
      {
        text: "A cat sat in a hat.",
        sightWords: ["A", "cat", "sat", "in", "a", "hat"],
      },
      {
        text: "A fox hid in a box.",
        sightWords: ["A", "fox", "hid", "in", "a", "box"],
      },
      {
        text: "A pig dug in a wig.",
        sightWords: ["A", "pig", "dug", "in", "a", "wig"],
      },
    ],
  },
  {
    levelNumber: 21,
    sentences: [
      {
        text: "It digs into the mud.",
        sightWords: ["It", "digs", "into", "the", "mud"],
      },
      {
        text: "It went into a net.",
        sightWords: ["It", "went", "into", "a", "net"],
      },
      {
        text: "It hops into a box.",
        sightWords: ["It", "hops", "into", "a", "box"],
      },
    ],
  },
  {
    levelNumber: 22,
    sentences: [
      {
        text: "It is hot.",
        sightWords: ["It", "is", "hot"],
      },
      {
        text: "It is fun.",
        sightWords: ["It", "is", "fun"],
      },
      {
        text: "It is wet.",
        sightWords: ["It", "is", "wet"],
      },
    ],
  },
  {
    levelNumber: 23,
    sentences: [
      {
        text: "It is a dot.",
        sightWords: ["It", "is", "a", "dot"],
      },
      {
        text: "It is a bog.",
        sightWords: ["It", "is", "a", "bog"],
      },
      {
        text: "It is a log.",
        sightWords: ["It", "is", "a", "log"],
      },
    ],
  },
  {
    levelNumber: 24,
    sentences: [
      {
        text: "I know that cat.",
        sightWords: ["I", "know", "that", "cat"],
      },
      {
        text: "I know that jet.",
        sightWords: ["I", "know", "that", "jet"],
      },
      {
        text: "I know that bat.",
        sightWords: ["I", "know", "that", "bat"],
      },
    ],
  },
  {
    levelNumber: 25,
    sentences: [
      {
        text: "Many kids jump.",
        sightWords: ["Many", "kids", "jump"],
      },
      {
        text: "Many cats nap.",
        sightWords: ["Many", "cats", "nap"],
      },
      {
        text: "Many dogs run.",
        sightWords: ["Many", "dogs", "run"],
      },
    ],
  },
  {
    levelNumber: 26,
    sentences: [
      {
        text: "My name is Tim.",
        sightWords: ["My", "name", "is", "Tim"],
      },
      {
        text: "My name is Jim.",
        sightWords: ["My", "name", "is", "Jim"],
      },
      {
        text: "My name is Kim.",
        sightWords: ["My", "name", "is", "Kim"],
      },
    ],
  },
  {
    levelNumber: 27,
    sentences: [
      {
        text: "I did not run.",
        sightWords: ["I", "did", "not", "run"],
      },
      {
        text: "I did not cut.",
        sightWords: ["I", "did", "not", "cut"],
      },
      {
        text: "I did not hit.",
        sightWords: ["I", "did", "not", "hit"],
      },
    ],
  },
  {
    levelNumber: 28,
    sentences: [
      {
        text: "Now it will run.",
        sightWords: ["Now", "it", "will", "run"],
      },
      {
        text: "Now it will jump.",
        sightWords: ["Now", "it", "will", "jump"],
      },
      {
        text: "Now it will nap.",
        sightWords: ["Now", "it", "will", "nap"],
      },
    ],
  },
  {
    levelNumber: 29,
    sentences: [
      {
        text: "A cup of tea.",
        sightWords: ["A", "cup", "of", "tea"],
      },
      {
        text: "A cup of wax.",
        sightWords: ["A", "cup", "of", "wax"],
      },
      {
        text: "A cup of jam.",
        sightWords: ["A", "cup", "of", "jam"],
      },
    ],
  },
  {
    levelNumber: 30,
    sentences: [
      {
        text: "It is on the mat.",
        sightWords: ["It", "is", "on", "the", "mat"],
      },
      {
        text: "It is on the rug.",
        sightWords: ["It", "is", "on", "the", "rug"],
      },
      {
        text: "It is on the log.",
        sightWords: ["It", "is", "on", "the", "log"],
      },
    ],
  },
  {
    levelNumber: 31,
    sentences: [
      {
        text: "One cat on the mat.",
        sightWords: ["One", "cat", "on", "the", "mat"],
      },
      {
        text: "One kid in the hut.",
        sightWords: ["One", "kid", "in", "the", "hut"],
      },
      {
        text: "One dog in the sun.",
        sightWords: ["One", "dog", "in", "the", "sun"],
      },
    ],
  },
  {
    levelNumber: 32,
    sentences: [
      {
        text: "She runs.",
        sightWords: ["She", "runs"],
      },
      {
        text: "She sits.",
        sightWords: ["She", "sits"],
      },
      {
        text: "She jumps.",
        sightWords: ["She", "jumps"],
      },
    ],
  },
  {
    levelNumber: 33,
    sentences: [
      {
        text: "Over the lake.",
        sightWords: ["Over", "the", "lake"],
      },
      {
        text: "Over the hills.",
        sightWords: ["Over", "the", "hills"],
      },
      {
        text: "Over the rope.",
        sightWords: ["Over", "the", "rope"],
      },
    ],
  },
  {
    levelNumber: 34,
    sentences: [
      {
        text: "He said it was big.",
        sightWords: ["He", "said", "it", "was", "big"],
      },
      {
        text: "Mum said to eat up.",
        sightWords: ["Mum", "said", "to", "eat", "up"],
      },
      {
        text: "She said to sit down.",
        sightWords: ["She", "said", "to", "sit", "down"],
      },
    ],
  },
  {
    levelNumber: 35,
    sentences: [
      {
        text: "It is so big.",
        sightWords: ["It", "is", "so", "big"],
      },
      {
        text: "It is so hot.",
        sightWords: ["It", "is", "so", "hot"],
      },
      {
        text: "It is so fat.",
        sightWords: ["It", "is", "so", "fat"],
      },
    ],
  },
  {
    levelNumber: 36,
    sentences: [
      {
        text: "I have some jam.",
        sightWords: ["I", "have", "some", "jam"],
      },
      {
        text: "She has some pets.",
        sightWords: ["She", "has", "some", "pets"],
      },
      {
        text: "He has some pens.",
        sightWords: ["He", "has", "some", "pens"],
      },
    ],
  },
  {
    levelNumber: 37,
    sentences: [
      {
        text: "Their dogs run.",
        sightWords: ["Their", "dogs", "run"],
      },
      {
        text: "Their rats nip.",
        sightWords: ["Their", "rats", "nip"],
      },
      {
        text: "Their cats nap.",
        sightWords: ["Their", "cats", "nap"],
      },
    ],
  },
  {
    levelNumber: 38,
    sentences: [
      {
        text: "The story was sad.",
        sightWords: ["The", "story", "was", "sad"],
      },
      {
        text: "The story was good.",
        sightWords: ["The", "story", "was", "good"],
      },
      {
        text: "The story was fun.",
        sightWords: ["The", "story", "was", "fun"],
      },
    ],
  },
  {
    levelNumber: 39,
    sentences: [
      {
        text: "The book.",
        sightWords: ["The", "book"],
      },
      {
        text: "The hoop.",
        sightWords: ["The", "hoop"],
      },
      {
        text: "The cook.",
        sightWords: ["The", "cook"],
      },
    ],
  },
  {
    levelNumber: 40,
    sentences: [
      {
        text: "Then she ran.",
        sightWords: ["Then", "she", "ran"],
      },
      {
        text: "Then he put.",
        sightWords: ["Then", "he", "put"],
      },
      {
        text: "Then he cut.",
        sightWords: ["Then", "he", "cut"],
      },
    ],
  },
  {
    levelNumber: 41,
    sentences: [
      {
        text: "There is a cat.",
        sightWords: ["There", "is", "a", "cat"],
      },
      {
        text: "There is a vat.",
        sightWords: ["There", "is", "a", "vat"],
      },
      {
        text: "There is a bat.",
        sightWords: ["There", "is", "a", "bat"],
      },
    ],
  },
  {
    levelNumber: 42,
    sentences: [
      {
        text: "This is a bag.",
        sightWords: ["This", "is", "a", "bag"],
      },
      {
        text: "This is a bot.",
        sightWords: ["This", "is", "a", "bot"],
      },
      {
        text: "This is a pen.",
        sightWords: ["This", "is", "a", "pen"],
      },
    ],
  },
  {
    levelNumber: 43,
    sentences: [
      {
        text: "Go to the van.",
        sightWords: ["Go", "to", "the", "van"],
      },
      {
        text: "Go to the bot.",
        sightWords: ["Go", "to", "the", "bot"],
      },
      {
        text: "Go to the cot.",
        sightWords: ["Go", "to", "the", "cot"],
      },
    ],
  },
  {
    levelNumber: 44,
    sentences: [
      {
        text: "It is too big.",
        sightWords: ["It", "is", "too", "big"],
      },
      {
        text: "It is too ill.",
        sightWords: ["It", "is", "too", "ill"],
      },
      {
        text: "It is too hot.",
        sightWords: ["It", "is", "too", "hot"],
      },
    ],
  },
  {
    levelNumber: 45,
    sentences: [
      {
        text: "I want a bag.",
        sightWords: ["I", "want", "a", "bag"],
      },
      {
        text: "I want a box.",
        sightWords: ["I", "want", "a", "box"],
      },
      {
        text: "I want a bot.",
        sightWords: ["I", "want", "a", "bot"],
      },
    ],
  },
  {
    levelNumber: 46,
    sentences: [
      {
        text: "The frog was big.",
        sightWords: ["The", "frog", "was", "big"],
      },
      {
        text: "The dog was hot.",
        sightWords: ["The", "dog", "was", "hot"],
      },
      {
        text: "The bat was wet.",
        sightWords: ["The", "bat", "was", "wet"],
      },
    ],
  },
  {
    levelNumber: 47,
    sentences: [
      {
        text: "They were hot.",
        sightWords: ["They", "were", "hot"],
      },
      {
        text: "They were fun.",
        sightWords: ["They", "were", "fun"],
      },
      {
        text: "They were ill.",
        sightWords: ["They", "were", "ill"],
      },
    ],
  },
  {
    levelNumber: 48,
    sentences: [
      {
        text: "When the sun sets.",
        sightWords: ["When", "the", "sun", "sets"],
      },
      {
        text: "When the bat naps.",
        sightWords: ["When", "the", "bat", "naps"],
      },
      {
        text: "When the dog ran.",
        sightWords: ["When", "the", "dog", "ran"],
      },
    ],
  },
  {
    levelNumber: 49,
    sentences: [
      {
        text: "What is in the bag?",
        sightWords: ["What", "is", "in", "the", "bag"],
      },
      {
        text: "What is in the bug?",
        sightWords: ["What", "is", "in", "the", "bug"],
      },
      {
        text: "What is in the bog?",
        sightWords: ["What", "is", "in", "the", "bog"],
      },
    ],
  },
  {
    levelNumber: 50,
    sentences: [
      {
        text: "A white dog.",
        sightWords: ["A", "white", "dog"],
      },
      {
        text: "A white rat.",
        sightWords: ["A", "white", "rat"],
      },
      {
        text: "A white cat.",
        sightWords: ["A", "white", "cat"],
      },
    ],
  },
];
// Game State Variables
let currentLevel = 1;
let currentSentenceIndex = 0;
let starsColored = 0;

// Elements
const sentenceTextElement = document.getElementById('sentence-text');
const feedbackElement = document.getElementById('feedback');
const readAloudButton = document.getElementById('readAloud');
const starsContainer = document.getElementById('stars-container');
const imageContainer = document.getElementById('image-container');
const levelNumberElement = document.getElementById('level-number');

// Initialize Game
function initGame() {
  generateStars();
  updateLevelIndicator();
  loadSentence();
}

// Generate Stars
function generateStars() {
  starsContainer.innerHTML = '';
  for (let i = 0; i < 6; i++) {
    const star = document.createElement('div');
    star.classList.add('star');
    star.dataset.index = i;
    star.tabIndex = 0; // Make focusable
    star.addEventListener('click', () => colorStar(i));
    star.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        colorStar(i);
      }
    });
    starsContainer.appendChild(star);
  }
}

// Color Star
function colorStar(index) {
  const star = starsContainer.querySelectorAll('.star')[index];
  if (!star.classList.contains('star-colored') && starsColored < 6) {
    star.classList.add('star-colored');
    starsColored += 1;

    // Play sound effect (optional)
    // const audio = new Audio('sounds/star-click.mp3');
    // audio.play();
  }
}

// Load Sentence
function loadSentence() {
  const level = levels[currentLevel - 1];
  if (!level) {
    console.error(`Level ${currentLevel} not found.`);
    return;
  }

  const sentenceObj = level.sentences[currentSentenceIndex];
  if (!sentenceObj) {
    console.error(`Sentence index ${currentSentenceIndex} not found in level ${currentLevel}.`);
    return;
  }

  // Highlight sight words in the sentence
  const sentenceWithHighlights = highlightSightWords(sentenceObj.text, sentenceObj.sightWords);
  sentenceTextElement.innerHTML = sentenceWithHighlights;
  feedbackElement.textContent = '';

  // Display images related to the sentence
  displayImages(sentenceObj.images);

  // Set up word audio playback
  setupWordAudio();
}

// Highlight Sight Words
function highlightSightWords(sentence, sightWords) {
  let words = sentence.split(' ');
  words = words.map(word => {
    const cleanWord = word.replace(/[^a-zA-Z]/g, '');
    if (sightWords.includes(cleanWord)) {
      return `<span class="sight-word">${word}</span>`;
    } else {
      return `<span class="decodable-word">${word}</span>`;
    }
  });
  return words.join(' ');
}

// Display Images
function displayImages(images) {
  imageContainer.innerHTML = '';
  if (Array.isArray(images) && images.length > 0) {
    images.forEach(src => {
      const img = document.createElement('img');
      img.src = src;
      img.alt = 'Related Image';
      img.onerror = function() {
        this.src = 'images/default-image.jpg'; // Provide a default image
      };
      imageContainer.appendChild(img);
    });
  } else {
    console.warn('No images available for this sentence.');
  }
}

// Setup Word Audio
function setupWordAudio() {
  const words = document.querySelectorAll('.sentence span');
  words.forEach(wordSpan => {
    wordSpan.tabIndex = 0; // Make focusable
    wordSpan.addEventListener('click', () => {
      const word = wordSpan.textContent.replace(/[^a-zA-Z]/g, '');
      playWordAudio(word);
    });
    wordSpan.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const word = wordSpan.textContent.replace(/[^a-zA-Z]/g, '');
        playWordAudio(word);
      }
    });
  });
}

// Play Word Audio
function playWordAudio(word) {
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(word);
    window.speechSynthesis.speak(utterance);
  } else {
    alert('Sorry, your browser does not support text-to-speech.');
  }
}

// Read Aloud Sentence
readAloudButton.addEventListener('click', () => {
  const level = levels[currentLevel - 1];
  const sentenceObj = level.sentences[currentSentenceIndex];
  if (sentenceObj && sentenceObj.text) {
    playSentenceAudio(sentenceObj.text);
    showPositiveFeedback();
  }
});

// Play Sentence Audio
function playSentenceAudio(sentence) {
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(sentence);
    window.speechSynthesis.speak(utterance);
  } else {
    alert('Sorry, your browser does not support text-to-speech.');
  }
}

// Positive Feedback
function showPositiveFeedback() {
  feedbackElement.textContent = 'Great job!';
  setTimeout(() => {
    feedbackElement.textContent = '';
    moveToNextSentence();
  }, 1000);
}

// Move to Next Sentence or Level
function moveToNextSentence() {
  const level = levels[currentLevel - 1];
  if (currentSentenceIndex < level.sentences.length - 1) {
    currentSentenceIndex += 1;
  } else {
    if (currentLevel < levels.length) {
      currentLevel += 1;
      currentSentenceIndex = 0;
      starsColored = 0;
      updateLevelIndicator();
      generateStars();
    } else {
      // Game completed
      alert('Congratulations! You have completed all levels.');
      return;
    }
  }
  loadSentence();
}

// Update Level Indicator
function updateLevelIndicator() {
  levelNumberElement.textContent = currentLevel;
}

// Start Game
initGame();
