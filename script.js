document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM fully loaded and parsed');

  const wordGroups = {
    cvc: {
      a: ['bat', 'cat', 'dad', 'fan', 'hat', 'jam', 'mad', 'nap', 'pan', 'rat', 'sad', 'tan', 'wag', 'zap', 'lap'],
      e: ['bed', 'den', 'fed', 'get', 'hen', 'jet', 'leg', 'men', 'net', 'pen', 'red', 'set', 'ten', 'vet', 'web'],
      i: ['big', 'dig', 'fin', 'hit', 'jig', 'kid', 'lip', 'mix', 'nip', 'pig', 'pin', 'sit', 'tin', 'wig', 'zip'],
      o: ['box', 'cot', 'dog', 'fog', 'hop', 'job', 'log', 'mop', 'not', 'pod', 'pop', 'pot', 'rot', 'top', 'sob'],
      u: ['bug', 'cup', 'cut', 'fun', 'gum', 'hug', 'jug', 'mud', 'nut', 'pup', 'run', 'sun', 'tug', 'bud', 'bus']
    },
    ccvc: {
      a: ['brag', 'clap', 'crab', 'drag', 'flag', 'flap', 'glad', 'grab', 'plan', 'slam', 'snap', 'trap', 'flat', 'swat', 'chat'],
      e: ['bled', 'bred', 'fled', 'fret', 'glen', 'pled', 'sled', 'spec', 'stem', 'step', 'trek', 'prep', 'flex', 'dred', 'smell'],
      i: ['brim', 'clip', 'crib', 'drip', 'flip', 'grin', 'grip', 'skip', 'slim', 'snip', 'spin', 'trip', 'twig', 'skin', 'swim'],
      o: ['blot', 'clog', 'crop', 'drop', 'flop', 'frog', 'glob', 'plot', 'prop', 'shop', 'slot', 'stop', 'trot', 'clot', 'spot'],
      u: ['club', 'drum', 'grub', 'plug', 'slug', 'snug', 'spun', 'stub', 'stun', 'trud', 'flub', 'glut', 'plum', 'scum', 'shut']
    },
    cvcc: {
      a: ['band', 'bank', 'damp', 'hand', 'lamp', 'land', 'pant', 'ramp', 'sand', 'tank', 'fast', 'last', 'past', 'cast', 'raft'],
      e: ['bend', 'dent', 'felt', 'lend', 'mend', 'nest', 'rest', 'sent', 'tent', 'vest', 'best', 'jest', 'pest', 'test', 'west'],
      i: ['film', 'hint', 'lift', 'milk', 'mint', 'pink', 'ring', 'silk', 'sink', 'tilt', 'disk', 'fist', 'list', 'mist', 'wish'],
      o: ['bond', 'cost', 'fond', 'host', 'lost', 'most', 'pond', 'post', 'soft', 'bolt', 'colt', 'jolt', 'molt', 'roll', 'told'],
      u: ['bump', 'bunk', 'dust', 'hunt', 'jump', 'just', 'lump', 'must', 'rust', 'dunk', 'cusp', 'fuss', 'gust', 'husk', 'tusk']
    },
    ccvcc: {
      a: ['brand', 'clamp', 'cramp', 'drank', 'flank', 'frank', 'plank', 'prank', 'stamp', 'plant', 'stand'],
      e: ['blend', 'fleck', 'flesh', 'spend', 'strep', 'swept', 'trend', 'bless', 'crept', 'dress', 'fresh', 'press', 'slept', 'smelt', 'spent'],
      i: ['blink', 'clink', 'crisp', 'drink', 'flint', 'print', 'slink', 'stink', 'twist', 'brisk', 'cling', 'fling', 'grift', 'shift', 'swift'],
      o: ['blond', 'chomp', 'frost', 'prompt', 'stomp', 'strong', 'throb', 'clonk', 'floss', 'gloss', 'gross', 'prong', 'scoff', 'snort', 'thong'],
      u: ['blunt', 'brunt', 'clump', 'crust', 'drunk', 'flung', 'grunt', 'plump', 'stump', 'trunk', 'brush', 'crush', 'flush', 'shrug', 'slush']
    },
    digraphs: {
      a: ['chat', 'chap', 'than', 'that', 'math', 'path', 'bash', 'cash', 'dash', 'lash', 'rash', 'shag', 'sham', 'wham'],
      e: ['shed', 'them', 'then', 'fetch', 'bench', 'check', 'chess', 'fresh', 'retch', 'shell', 'shred', 'theft', 'wrench'],
      i: ['chip', 'chin', 'thin', 'ship', 'shin', 'chick', 'chill', 'shift', 'thick', 'thing','wish'],
      o: ['shop', 'shot', 'chop', 'shock', 'cloth', 'froth', 'notch', 'shod', 'sloth', 'thong' ],
      u: ['shut', 'thud', 'chug', 'chunk', 'thump', 'brush', 'crush', 'flush', 'shrug', 'blush','shuck', 'stuck', 'thumb']
    },
    extended: {
      a: ['fantastic', 'smashing', 'crashing', 'stamping', 'clapping', 'tracking', 'snapping', 'flashing', 'grabbing', 'slashing'],
      e: ['wrecking', 'spelling', 'pressing', 'dressing', 'fetching', 'stretching', 'checking', 'swelling', 'shedding', 'tempting'],
      i: ['blinking', 'drinking', 'tripping', 'flipping', 'snipping', 'skipping', 'swinging', 'chirping', 'slipping', 'twisting'],
      o: ['blocking', 'rocking', 'crossing', 'stopping', 'chopping', 'dropping', 'flopping', 'locking', 'shocking', 'trotting'],
      u: ['jumping', 'bumping', 'hunting', 'rushing', 'crushing', 'brushing', 'dumping', 'hugging', 'running', 'tugging']
    },
    silentE: {
      a: ['spade', 'mate', 'game', 'bake', 'gave', 'rake', 'cake', 'lake'],
      e: ['theme', 'these', 'eve'],
      i: ['bike', 'kite', 'lime', 'mine', 'pine', 'time', 'dive', 'five'],
      o: ['home', 'nose', 'rope', 'note', 'cone', 'hope', 'robe', 'stone'],
      u: ['cube', 'tune', 'mule', 'rude', 'flute', 'cute', 'dune', 'june']
    }
  };
/** Game State */
  const state = {
    score: 0,
    revealedWords: 0,
    totalWords: 0,
    usedWords: new Set(),
    currentWord: '',
    blendingTime: 3000,
    soundsEnabled: true,
    wordType: 'cvc',
    vowelFilter: 'all',
    theme: 'default',
    celebrationMode: false,
    animationsEnabled: true,
    fontStyle: 'default',
    badges: new Map(),
    successStreak: 0, // For adaptive difficulty
    difficultyLevel: 1 // 1: cvc, 2: ccvc, etc.
  };

  /** DOM Elements */
  const els = {
    spinButton: document.querySelector('#spinButton'),
    repeatButton: document.querySelector('#repeatButton'),
    hintButton: document.querySelector('#hintButton'),
    wordBox: document.querySelector('#wordBox'),
    scoreValue: document.querySelector('#scoreValue'),
    scoreIncrement: document.querySelector('#scoreIncrement'),
    progressText: document.querySelector('#progressText'),
    progressFill: document.querySelector('#progressFill'),
    progressBar: document.querySelector('#progressBar'),
    progressIcon: document.querySelector('#progressIcon'),
    complimentBox: document.querySelector('#complimentBox'),
    screenReaderAnnounce: document.querySelector('#screenReaderAnnounce'),
    blendingTimerContainer: document.querySelector('#blendingTimerContainer'),
    blendingTimer: document.querySelector('#blendingTimer'),
    pauseTimer: document.querySelector('#pauseTimer'),
    skipTimer: document.querySelector('#skipTimer'),
    wordTypeSelector: document.querySelector('#wordTypeSelector'),
    vowelSelector: document.querySelector('#vowelSelector'),
    themeSelector: document.querySelector('#themeSelector'),
    toggleAudioButton: document.querySelector('#toggleAudioButton'),
    blendingTimeDisplay: document.querySelector('#blendingTimeDisplay'),
    increaseTime: document.querySelector('#increaseBlendingTime'),
    decreaseTime: document.querySelector('#decreaseBlendingTime'),
    celebrationModeCheckbox: document.querySelector('#celebrationMode'),
    animationToggle: document.querySelector('#animationToggle'),
    dyslexiaFont: document.querySelector('#dyslexiaFont'),
    confettiContainer: document.querySelector('#confettiContainer'),
    tutorialModal: document.querySelector('#tutorialModal'),
    startTutorial: document.querySelector('#startTutorial'),
    skipTutorial: document.querySelector('#skipTutorial'),
    nextStep1: document.querySelector('#nextStep1'),
    nextStep2: document.querySelector('#nextStep2'),
    tutorialStep1: document.querySelector('#tutorialStep1'),
    tutorialStep2: document.querySelector('#tutorialStep2'),
    tutorialStep3: document.querySelector('#tutorialStep3'),
    toggleSettingsButton: document.querySelector('#toggleSettingsButton'),
    advancedSettings: document.querySelector('#advancedSettings'),
    badges: document.querySelector('#badges'),
    fullscreenButton: document.querySelector('#fullscreenButton'),
    parentalGateModal: document.querySelector('#parentalGateModal'),
    parentalGateInput: document.querySelector('#parentalGateInput'),
    submitParentalGate: document.querySelector('#submitParentalGate'),
    wordInput: document.querySelector('#wordInput'),
    submitWord: document.querySelector('#submitWord'),
    interactiveInput: document.querySelector('.interactive-input')
  };

  /** Preload Audio Assets */
  const audioCache = new Map();
  function preloadAudio(sounds) {
    sounds.forEach(sound => {
      const audio = new Audio(`${sound}.mp3`);
      audio.preload = 'auto';
      audioCache.set(sound, audio);
    });
  }

  const soundsToPreload = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'long_a', 'long_e', 'long_i', 'long_o', 'long_u', 'start'];
  preloadAudio(soundsToPreload);

  /** Speech Synthesis Initialization */
  let voice = null;
  async function initSpeech() {
    return new Promise(resolve => {
      const checkVoices = () => {
        const voices = speechSynthesis.getVoices();
        if (voices.length > 0) {
          voice = voices.find(v => v.lang.startsWith('en') && v.name.toLowerCase().includes('female')) || voices[0];
          resolve();
        } else {
          speechSynthesis.onvoiceschanged = checkVoices;
        }
      };
      checkVoices();
    });
  }

  /** Speak a Word */
  function speakWord(text) {
    if (!voice || !state.soundsEnabled || speechSynthesis.speaking) return Promise.resolve();
    return new Promise(resolve => {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.voice = voice;
      utterance.rate = 0.9;
      utterance.pitch = 1.2;
      utterance.onend = resolve;
      utterance.onerror = () => resolve();
    });
  }

  /** Play Sound Effect */
  function playSound(sound) {
    if (!state.soundsEnabled) return Promise.resolve();
    return new Promise(resolve => {
      const audio = audioCache.get(sound) || new Audio(`${sound}.mp3`);
      audio.onended = () => resolve();
      audio.onerror = () => {
        console.error(`Audio failed for ${sound}.mp3`);
        resolve();
      };
      audio.play().catch(e => {
        console.error(`Audio playback error for ${sound}.mp3:`, e);
        resolve();
      });
    });
  }

  /** Utility Functions */
  const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
  const announce = text => {
    els.screenReaderAnnounce.textContent = text;
    setTimeout(() => els.screenReaderAnnounce.textContent = '', 1000);
  };

  /** Update Score */
  function updateScore(points = 10) {
    state.score += points;
    els.scoreValue.textContent = state.score;
    els.scoreIncrement.textContent = `+${points}`;
    els.scoreIncrement.classList.add('show');
    setTimeout(() => els.scoreIncrement.classList.remove('show'), 800);
  }

  /** Update Progress */
  function updateProgress() {
    state.revealedWords = state.usedWords.size;
    const percent = (state.revealedWords / state.totalWords) * 100 || 0;
    els.progressText.textContent = `${state.revealedWords} / ${state.totalWords} Words`;
    els.progressFill.style.width = `${percent}%`;
    els.progressBar.setAttribute('aria-valuenow', Math.round(percent));
    if (state.revealedWords % 10 === 0 && state.revealedWords > 0) {
      els.progressIcon.classList.add('star-animate');
      setTimeout(() => els.progressIcon.classList.remove('star-animate'), 1000);
      earnBadge(state.wordType);
    }
  }

  /** Show Compliment */
  function showCompliment() {
    const compliment = ['Great Job!', 'Awesome!', 'You’re a Star!', 'Well Done!', 'Fantastic!'][Math.floor(Math.random() * 5)];
    els.complimentBox.textContent = compliment;
    els.complimentBox.classList.add('show');
    if (state.soundsEnabled) speakWord(compliment);
    if (state.animationsEnabled) {
      state.celebrationMode ? launchFireworks() : launchConfetti();
    }
    setTimeout(() => els.complimentBox.classList.remove('show'), 2000);
  }

  /** Launch Confetti (Reduced Intensity) */
  function launchConfetti() {
    for (let i = 0; i < 10; i++) { // Reduced from 20
      const confetti = document.createElement('div');
      confetti.className = 'confetti';
      confetti.style.left = `${Math.random() * 100}vw`;
      confetti.style.background = `hsl(${Math.random() * 360}, 100%, 50%)`;
      els.confettiContainer.appendChild(confetti);
      setTimeout(() => confetti.remove(), 1500); // Shortened duration
    }
  }

  /** Launch Fireworks (Reduced Intensity) */
  function launchFireworks() {
    for (let i = 0; i < 8; i++) { // Reduced from 15
      const firework = document.createElement('div');
      firework.className = 'confetti star';
      firework.style.left = `${Math.random() * 100}vw`;
      firework.style.top = `${Math.random() * 50}vh`;
      firework.style.background = `hsl(${Math.random() * 360}, 100%, 50%)`;
      els.confettiContainer.appendChild(firework);
      setTimeout(() => firework.remove(), 1000); // Shortened duration
    }
  }

  /** Parse Word into Units */
  function parseWord(word) {
    const units = [];
    let i = 0;
    while (i < word.length) {
      const letter = word[i].toLowerCase();
      units.push({ text: letter, isVowel: /[aeiou]/.test(letter) });
      i++;
    }
    return units;
  }

  /** Save Preferences */
  function savePreferences() {
    localStorage.setItem('wordSpinnerPrefs', JSON.stringify({
      ...state,
      usedWords: Array.from(state.usedWords),
      badges: Object.fromEntries(state.badges)
    }));
  }

  /** Load Preferences */
  function loadPreferences() {
    const prefs = JSON.parse(localStorage.getItem('wordSpinnerPrefs')) || {};
    Object.assign(state, {
      wordType: prefs.wordType || 'cvc',
      vowelFilter: prefs.vowelFilter || 'all',
      theme: prefs.theme || 'default',
      blendingTime: prefs.blendingTime || 3000,
      soundsEnabled: prefs.soundsEnabled ?? true,
      celebrationMode: prefs.celebrationMode || false,
      animationsEnabled: prefs.animationsEnabled ?? true,
      fontStyle: prefs.fontStyle || 'default',
      badges: new Map(Object.entries(prefs.badges || {})),
      usedWords: new Set(prefs.usedWords || []),
      successStreak: prefs.successStreak || 0,
      difficultyLevel: prefs.difficultyLevel || 1
    });
    document.body.dataset.theme = state.theme;
    document.body.dataset.font = state.fontStyle;
    els.wordTypeSelector.value = state.wordType;
    els.vowelSelector.value = state.vowelFilter;
    els.themeSelector.value = state.theme;
    els.blendingTimeDisplay.textContent = state.blendingTime / 1000;
    els.toggleAudioButton.textContent = state.soundsEnabled ? '🔇 Sounds Off' : '🔊 Sounds On';
    els.celebrationModeCheckbox.checked = state.celebrationMode;
    els.animationToggle.checked = state.animationsEnabled;
    els.dyslexiaFont.checked = state.fontStyle === 'dyslexia';
  }

  /** Earn a Badge */
  function earnBadge(wordType) {
    if (!state.badges.has(wordType)) {
      state.badges.set(wordType, true);
      if (state.soundsEnabled) speakWord(`Congratulations! You earned a badge!`);
      if (state.animationsEnabled) launchConfetti();
      savePreferences();
    }
  }

  /** Adaptive Difficulty */
  function adjustDifficulty() {
    if (state.successStreak >= 5 && state.difficultyLevel < 2) {
      state.difficultyLevel++;
      state.wordType = 'ccvc'; // Progress to harder word types
      els.wordTypeSelector.value = state.wordType;
      announce('Great job! Moving to harder words.');
    } else if (state.successStreak <= -3 && state.difficultyLevel > 1) {
      state.difficultyLevel--;
      state.wordType = 'cvc'; // Regress to easier words
      els.wordTypeSelector.value = state.wordType;
      announce('Let’s try some easier words.');
    }
  }

  /** Reveal Word with Sounds and Visuals */
  let isTimerPaused = false;
  async function revealWord(word, isRepeat = false) {
    els.wordBox.innerHTML = '';
    const units = parseWord(word);
    units.forEach((unit, i) => {
      const span = document.createElement('span');
      span.textContent = unit.text;
      span.classList.add('letter');
      if (unit.isVowel) span.classList.add('vowel');
      span.style.animationDelay = `${i * 0.4}s`;
      els.wordBox.appendChild(span);
    });

    for (const unit of units) {
      await delay(400);
      await playSound(unit.text);
    }

    els.blendingTimerContainer.style.display = 'block';
    els.blendingTimer.style.transition = `width ${state.blendingTime / 1000}s linear`;
    els.blendingTimer.style.width = '100%';
    requestAnimationFrame(() => els.blendingTimer.style.width = '0%');
    announce('Blend the letters aloud!');
    
    let elapsed = 0;
    while (elapsed < state.blendingTime) {
      if (isTimerPaused) {
        await delay(100);
        continue;
      }
      await delay(100);
      elapsed += 100;
    }
    els.blendingTimerContainer.style.display = 'none';

    if (state.soundsEnabled) await speakWord(word);
    announce(`The word is: ${word}`);
    if (!isRepeat) {
      state.usedWords.add(word);
      els.interactiveInput.hidden = false;
    }
    els.hintButton.hidden = false;
    els.repeatButton.disabled = false;
  }

  /** Get Available Words */
  function getAvailableWords() {
    const group = wordGroups[state.wordType];
    if (state.vowelFilter === 'all') return Object.values(group).flat();
    return group[state.vowelFilter] || [];
  }

  /** Get Random Word */
  function getRandomWord() {
    const words = getAvailableWords().filter(w => !state.usedWords.has(w));
    if (!words.length) {
      state.usedWords.clear();
      return getRandomWord();
    }
    return words[Math.floor(Math.random() * words.length)];
  }

  /** Reset Game */
  function resetGame() {
    state.usedWords.clear();
    state.revealedWords = 0;
    state.score = 0;
    state.currentWord = '';
    els.scoreValue.textContent = '0';
    els.repeatButton.disabled = true;
    els.hintButton.hidden = true;
    state.totalWords = getAvailableWords().length;
    updateProgress();
    savePreferences();
  }

  /** Spin to Reveal a New Word */
  async function spin() {
    els.spinButton.disabled = true;
    els.interactiveInput.hidden = true;
    els.wordInput.value = '';
    state.currentWord = getRandomWord();
    await revealWord(state.currentWord);
    els.spinButton.disabled = false;
  }

  /** Repeat Current Word */
  async function repeat() {
    if (!state.currentWord) return;
    els.repeatButton.disabled = true;
    await revealWord(state.currentWord, true);
  }

  /** Play Hint Sound */
  async function hint() {
    if (!state.currentWord) return;
    await playSound(state.currentWord);
  }

  /** Interactive Typing */
  function submitWord() {
    const userInput = els.wordInput.value.trim().toLowerCase();
    if (userInput === state.currentWord) {
      state.successStreak++;
      showCompliment();
      updateScore();
      updateProgress();
      adjustDifficulty();
      if (state.usedWords.size === state.totalWords) resetGame();
      els.interactiveInput.hidden = true;
    } else {
      state.successStreak--;
      announce('Try again! Use Repeat or Hint for help.');
      adjustDifficulty();
    }
  }

  /** Event Listeners */
  els.spinButton.addEventListener('click', spin);
  els.repeatButton.addEventListener('click', repeat);
  els.hintButton.addEventListener('click', hint);
  els.submitWord.addEventListener('click', submitWord);
  els.wordTypeSelector.addEventListener('change', () => {
    state.wordType = els.wordTypeSelector.value;
    resetGame();
  });
  els.vowelSelector.addEventListener('change', () => {
    state.vowelFilter = els.vowelSelector.value;
    resetGame();
  });
  els.themeSelector.addEventListener('change', () => {
    state.theme = els.themeSelector.value;
    document.body.dataset.theme = state.theme;
    savePreferences();
  });
  els.toggleAudioButton.addEventListener('click', () => {
    state.soundsEnabled = !state.soundsEnabled;
    els.toggleAudioButton.textContent = state.soundsEnabled ? '🔇 Sounds Off' : '🔊 Sounds On';
    savePreferences();
  });
  els.increaseTime.addEventListener('click', () => {
    if (state.blendingTime < 7000) {
      state.blendingTime += 500; // Finer adjustment
      els.blendingTimeDisplay.textContent = state.blendingTime / 1000;
      savePreferences();
    }
  });
  els.decreaseTime.addEventListener('click', () => {
    if (state.blendingTime > 1000) {
      state.blendingTime -= 500; // Finer adjustment
      els.blendingTimeDisplay.textContent = state.blendingTime / 1000;
      savePreferences();
    }
  });
  els.celebrationModeCheckbox.addEventListener('change', () => {
    state.celebrationMode = els.celebrationModeCheckbox.checked;
    savePreferences();
  });
  els.animationToggle.addEventListener('change', () => {
    state.animationsEnabled = els.animationToggle.checked;
    savePreferences();
  });
  els.dyslexiaFont.addEventListener('change', () => {
    state.fontStyle = els.dyslexiaFont.checked ? 'dyslexia' : 'default';
    document.body.dataset.font = state.fontStyle;
    savePreferences();
  });
  els.pauseTimer.addEventListener('click', () => {
    isTimerPaused = !isTimerPaused;
    els.pauseTimer.textContent = isTimerPaused ? '▶️ Resume' : '⏸️ Pause';
  });
  els.skipTimer.addEventListener('click', () => {
    isTimerPaused = false;
    els.blendingTimerContainer.style.display = 'none';
  });
  els.toggleSettingsButton.addEventListener('click', (event) => {
    event.preventDefault();
    els.parentalGateModal.showModal();
  });
  els.submitParentalGate.addEventListener('click', () => {
    const answer = parseInt(els.parentalGateInput.value, 10);
    if (answer === 5) { // 2 + 3 = 5
      els.parentalGateModal.close();
      const isVisible = els.advancedSettings.style.display === 'block';
      els.advancedSettings.style.display = isVisible ? 'none' : 'block';
      els.toggleSettingsButton.textContent = isVisible ? '⚙️ Customize' : 'Hide Settings';
      els.toggleSettingsButton.setAttribute('aria-expanded', !isVisible);
      els.advancedSettings.setAttribute('aria-hidden', isVisible);
    } else {
      announce('Incorrect answer. Please try again.');
    }
  });
  els.nextStep1.addEventListener('click', () => {
    els.tutorialStep1.hidden = true;
    els.tutorialStep2.hidden = false;
  });
  els.nextStep2.addEventListener('click', () => {
    els.tutorialStep2.hidden = true;
    els.tutorialStep3.hidden = false;
  });
  els.startTutorial.addEventListener('click', () => {
    els.tutorialModal.close();
    localStorage.setItem('hasSeenTutorial', 'true');
    if (state.soundsEnabled) playSound('start');
  });
  els.skipTutorial.addEventListener('click', () => {
    els.tutorialModal.close();
    localStorage.setItem('hasSeenTutorial', 'true');
  });
  els.fullscreenButton.addEventListener('click', () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(console.warn);
    } else {
      document.exitFullscreen().catch(console.warn);
    }
  });

  /** Initialization */
  (async () => {
    await initSpeech();
    loadPreferences();
    resetGame();
    if (!localStorage.getItem('hasSeenTutorial')) els.tutorialModal.showModal();
  })();
});
