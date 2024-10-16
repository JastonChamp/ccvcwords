// Game Data
const levels = [
  {
    levelNumber: 1,
    sentences: [
      {
        text: "Sam has a ___.",
        missingWord: "cat",
        options: ["cat", "dog", "mat"],
      },
      {
        text: "Dan has a ___.",
        missingWord: "mat",
        options: ["rat", "mat", "hat"],
      },
      {
        text: "Max has a ___.",
        missingWord: "rat",
        options: ["cat", "bat", "rat"],
      },
    ],
  },
  {
    levelNumber: 2,
    sentences: [
      {
        text: "Dan ___ about.",
        missingWord: "runs",
        options: ["runs", "hops", "sits"],
      },
      {
        text: "Max ___ about.",
        missingWord: "digs",
        options: ["digs", "runs", "jumps"],
      },
      {
        text: "Jill ___ about.",
        missingWord: "hops",
        options: ["hops", "sits", "runs"],
      },
    ],
  },
  // Add more levels as needed
];

// Game State
let currentLevel = 1;
let currentSentenceIndex = 0;
let starsColored = 0;

// Elements
const levelNumberElement = document.getElementById('level-number');
const starsColoredElement = document.getElementById('stars-colored');
const sentenceTextElement = document.getElementById('sentence-text');
const optionsContainer = document.getElementById('options-container');
const audioButton = document.getElementById('audio-button');
const feedbackElement = document.getElementById('feedback');
const starColoringContainer = document.getElementById('star-coloring-container');
const starCanvas = document.getElementById('star-canvas');
const colorPalette = document.getElementById('color-palette');
const continueButton = document.getElementById('continue-button');

// Initialize Game
function initGame() {
  loadSentence();
  setupAudioButton();
}

// Load Sentence
function loadSentence() {
  const level = levels[currentLevel - 1];
  const sentenceObj = level.sentences[currentSentenceIndex];

  levelNumberElement.textContent = currentLevel;
  sentenceTextElement.innerHTML = sentenceObj.text;
  feedbackElement.textContent = '';
  optionsContainer.innerHTML = '';

  // Generate Option Buttons
  sentenceObj.options.forEach((option) => {
    const button = document.createElement('button');
    button.classList.add('option-button');
    button.textContent = option;
    button.addEventListener('click', () => {
      checkAnswer(option, sentenceObj.missingWord);
    });
    optionsContainer.appendChild(button);
  });
}

// Audio Button Functionality
function setupAudioButton() {
  audioButton.addEventListener('click', () => {
    const level = levels[currentLevel - 1];
    const sentenceObj = level.sentences[currentSentenceIndex];
    const sentenceToRead = sentenceObj.text.replace('___', sentenceObj.missingWord);
    playSentenceAudio(sentenceToRead);
  });
}

// Play Sentence Audio
function playSentenceAudio(sentence) {
  const utterance = new SpeechSynthesisUtterance(sentence);
  window.speechSynthesis.speak(utterance);
}

// Check Answer
function checkAnswer(selectedWord, correctWord) {
  if (selectedWord === correctWord) {
    showPositiveFeedback();
    updateProgress();
  } else {
    provideHint();
  }
}

// Positive Feedback
function showPositiveFeedback() {
  feedbackElement.textContent = 'Great job!';
  setTimeout(() => {
    initiateStarColoring();
  }, 1000);
}

// Provide Hint
function provideHint() {
  feedbackElement.textContent = 'Try again!';
}

// Update Progress
function updateProgress() {
  starsColored += 1;
  starsColoredElement.textContent = starsColored;
}

// Initiate Star Coloring
function initiateStarColoring() {
  // Hide game elements
  optionsContainer.innerHTML = '';
  feedbackElement.textContent = '';
  
  // Show star coloring container
  starColoringContainer.style.display = 'block';
  setupStarCanvas();
  setupColorPalette();
}

// Setup Star Canvas
function setupStarCanvas() {
  const ctx = starCanvas.getContext('2d');
  const starImage = new Image();
  starImage.src = 'https://i.imgur.com/4HJbzEq.png'; // Placeholder star image
  starImage.onload = () => {
    ctx.drawImage(starImage, 0, 0, starCanvas.width, starCanvas.height);
  };

  // Drawing functionality
  let painting = false;
  let currentColor = '#ff0000';

  starCanvas.addEventListener('mousedown', startPosition);
  starCanvas.addEventListener('mouseup', finishedPosition);
  starCanvas.addEventListener('mousemove', draw);

  function startPosition(e) {
    painting = true;
    draw(e);
  }

  function finishedPosition() {
    painting = false;
    ctx.beginPath();
  }

  function draw(e) {
    if (!painting) return;
    ctx.lineWidth = 5;
    ctx.lineCap = 'round';
    ctx.strokeStyle = currentColor;

    const rect = starCanvas.getBoundingClientRect();
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
  }

  // Handle color changes
  colorPalette.addEventListener('click', (e) => {
    if (e.target.classList.contains('color-swatch')) {
      currentColor = e.target.dataset.color;
    }
  });
}

// Setup Color Palette
function setupColorPalette() {
  const colors = ['#FF0000', '#FFA500', '#FFFF00', '#008000', '#0000FF', '#4B0082', '#EE82EE', '#000000'];
  colorPalette.innerHTML = '';

  colors.forEach((color) => {
    const swatch = document.createElement('div');
    swatch.classList.add('color-swatch');
    swatch.style.backgroundColor = color;
    swatch.dataset.color = color;
    colorPalette.appendChild(swatch);
  });
}

// Continue Button Functionality
continueButton.addEventListener('click', () => {
  // Hide star coloring container
  starColoringContainer.style.display = 'none';

  // Move to next sentence or level
  const level = levels[currentLevel - 1];
  if (currentSentenceIndex < level.sentences.length - 1) {
    currentSentenceIndex += 1;
  } else {
    if (currentLevel < levels.length) {
      currentLevel += 1;
      currentSentenceIndex = 0;
    } else {
      // Game completed
      alert('Congratulations! You have completed all levels.');
      return;
    }
  }
  loadSentence();
});

// Start Game
initGame();
