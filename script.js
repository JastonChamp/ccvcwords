document.addEventListener('DOMContentLoaded', () => {
  console.log('Word Spinner initialized.');

  /* Configuration */
  const wordGroups = {
    cvc: {
      a: ['bat', 'cat', 'dad', 'fan', 'jam', 'mad', 'pan', 'rat', 'tan', 'wag'],
      e: ['bed', 'den', 'get', 'hen', 'jet', 'net', 'pet', 'red', 'ten', 'wet'],
      i: ['big', 'dig', 'fin', 'hit', 'kid', 'lip', 'pin', 'sit', 'tin', 'wig'],
      o: ['box', 'cot', 'dog', 'fog', 'hop', 'log', 'mop', 'not', 'pot', 'top'],
      u: ['bug', 'cup', 'fun', 'gum', 'hug', 'mud', 'nut', 'run', 'sun', 'tug']
    },
    ccvc: {
      a: ['brag', 'clap', 'crab', 'drag', 'flag', 'flap', 'glad', 'grab', 'plan', 'slam'],
      e: ['bled', 'bred', 'fled', 'fret', 'glen', 'sped', 'stem', 'step', 'trek', 'sled'],
      i: ['brim', 'brig', 'clip', 'crib', 'drip', 'flip', 'grin', 'grip', 'skip', 'slim'],
      o: ['blot', 'blog', 'clog', 'crop', 'drop', 'frog', 'flop', 'glob', 'plod', 'plot'],
      u: ['drum', 'grub', 'plug', 'slug', 'slum', 'spun', 'stub', 'stud', 'stun']
    },
    cvcc: {
      a: ['band', 'bank', 'damp', 'hand', 'land', 'lamp', 'ramp', 'sand', 'pant', 'tank'],
      e: ['bent', 'dent', 'felt', 'fend', 'help', 'kept', 'lend', 'mend', 'nest', 'rest'],
      i: ['dink', 'film', 'gild', 'gimp', 'hilt', 'hint', 'jilt', 'mint', 'milk', 'silk'],
      o: ['bond', 'colt', 'comb', 'fond', 'cost', 'lost', 'loft', 'soft', 'post', 'pond'],
      u: ['bunk', 'bump', 'bust', 'dump', 'dunk', 'fund', 'funk', 'gust', 'hunt', 'junk']
    },
    ccvcc: {
      a: ['brand', 'blank', 'clamp', 'cramp', 'crank', 'drank', 'flank', 'frank', 'plank', 'prank'],
      e: ['blend', 'blent', 'strep', 'trend', 'swept', 'stent'],
      i: ['blink', 'brink', 'clink', 'clint', 'crimp', 'drink', 'drift', 'print', 'sprint', 'strip'],
      o: ['frost', 'stomp', 'strong', 'throb', 'throng', 'prong', 'prompt', 'clomp', 'chomp', 'clonk'],
      u: ['blunt', 'brunt', 'clump', 'clunk', 'crust', 'drunk', 'flung', 'frump', 'grunt', 'plump']
    },
    digraphs: {
      a: ['chat', 'chap', 'than', 'that', 'math', 'hang', 'bang', 'rang', 'cash', 'dash'],
      e: ['shed', 'them', 'then', 'fetch', 'bench', 'retch', 'ketch', 'stretch', 'sketch', 'drench'],
      i: ['chip', 'chin', 'thin', 'thing', 'king', 'ring', 'sing', 'wing', 'sting', 'bring'],
      o: ['shop', 'shot', 'chop', 'strong', 'throb', 'cloth', 'crotch', 'notch', 'botch'],
      u: ['shut', 'thud', 'chug', 'chunk', 'thump', 'shrug', 'brush', 'crush', 'blush', 'flush']
    },
    extended: {
      a: ['fantastic', 'smashing', 'crashing', 'stamping', 'clapping'],
      e: ['wrecking'],
      i: ['blinking', 'drinking', 'tripping', 'flipping', 'snipping'],
      o: ['blocking', 'rocking'],
      u: ['jumping']
    }
  };

  const digraphs = ['sh', 'th', 'ch', 'ng'];

  /* State */
  let state = {
    score: 0,
    revealedWords: 0,
    totalWords: 50,
    usedWords: [],
    currentWord: '',
    blendingTime: 3000,
    soundsEnabled: true,
    wordType: 'cvc',
    theme: 'default',
    celebrationMode: false,
    badges: {}
  };

  /* DOM Elements */
  const els = {
    spinButton: document.getElementById('spinButton'),
    repeatButton: document.getElementById('repeatButton'),
    hintButton: document.getElementById('hintButton'),
    wordBox: document.getElementById('wordBox'),
    wordInput: document.getElementById('wordInput'),
    scoreText: document.getElementById('scoreValue'),
    scoreIncrement: document.getElementById('scoreIncrement'),
    progressText: document.getElementById('progressText'),
    progressFill: document.getElementById('progressFill'),
    progressBar: document.getElementById('progressBar'),
    progressIcon: document.getElementById('progressIcon'),
    complimentBox: document.getElementById('complimentBox'),
    screenReaderAnnounce: document.getElementById('screenReaderAnnounce'),
    blendingTimerContainer: document.getElementById('blendingTimerContainer'),
    blendingTimer: document.getElementById('blendingTimer'),
    wordTypeSelector: document.getElementById('wordTypeSelector'),
    themeSelector: document.getElementById('themeSelector'),
    toggleAudioButton: document.getElementById('toggleAudioButton'),
    blendingTimeDisplay: document.getElementById('blendingTimeDisplay'),
    increaseTime: document.getElementById('increaseBlendingTime'),
    decreaseTime: document.getElementById('decreaseBlendingTime'),
    celebrationModeCheckbox: document.getElementById('celebrationMode'),
    confettiContainer: document.getElementById('confettiContainer'),
    tutorialModal: document.getElementById('tutorialModal'),
    startTutorial: document.getElementById('startTutorial'),
    skipTutorial: document.getElementById('skipTutorial'),
    toggleSettingsButton: document.getElementById('toggleSettingsButton'),
    advancedSettings: document.getElementById('advancedSettings'),
    badges: document.getElementById('badges')
  };

  const compliments = ['Superb!', 'Brilliant!', 'You’re Amazing!', 'Fantastic!', 'Well Done!'];
  const badges = {
    cvc: 'CVC Star',
    ccvc: 'CCVC Explorer',
    cvcc: 'CVCC Champion',
    ccvcc: 'CCVCC Master',
    digraphs: 'Digraph Pro',
    extended: 'Extended Wizard'
  };

  /* Speech Synthesis */
  let voice = null;
  async function initSpeech() {
    const voices = await new Promise(resolve => {
      const loadVoices = () => {
        const v = speechSynthesis.getVoices();
        if (v.length) resolve(v);
      };
      if (speechSynthesis.getVoices().length) loadVoices();
      else speechSynthesis.onvoiceschanged = loadVoices;
    });
    voice = voices.find(v => v.lang.startsWith('en') && v.name.toLowerCase().includes('female')) || voices[0];
  }

  function speak(text) {
    if (!state.soundsEnabled || !voice || speechSynthesis.speaking) return Promise.resolve();
    return new Promise(resolve => {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.voice = voice;
      utterance.rate = 0.9;
      utterance.pitch = 1.2;
      utterance.onend = resolve;
      utterance.onerror = resolve;
      speechSynthesis.speak(utterance);
    });
  }

  /* Utilities */
  const isVowel = letter => /[aeiou]/.test(letter);
  const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

  function announce(text) {
    els.screenReaderAnnounce.textContent = text;
    setTimeout(() => els.screenReaderAnnounce.textContent = '', 1000);
  }

  function updateScore() {
    state.score += 10;
    els.scoreText.textContent = state.score;
    els.scoreIncrement.textContent = '+10';
    els.scoreIncrement.classList.add('show');
    setTimeout(() => els.scoreIncrement.classList.remove('show'), 800);
    speak(`Score: ${state.score}`);
  }

  function updateProgress() {
    state.revealedWords = state.usedWords.length;
    const percent = (state.revealedWords / state.totalWords) * 100 || 0;
    els.progressText.textContent = `${state.revealedWords} / ${state.totalWords} Words`;
    els.progressFill.style.width = `${percent}%`;
    els.progressBar.setAttribute('aria-valuenow', Math.round(percent));
    if (state.revealedWords % 10 === 0) els.progressIcon.classList.add('star-animate');
    setTimeout(() => els.progressIcon.classList.remove('star-animate'), 1000);
  }

  function showCompliment() {
    const compliment = compliments[Math.floor(Math.random() * compliments.length)];
    els.complimentBox.textContent = compliment;
    els.complimentBox.style.opacity = '1';
    speak(compliment);
    if (state.celebrationMode) launchFireworks();
    else launchConfetti();
    setTimeout(() => els.complimentBox.style.opacity = '0', 2000);
    const wordType = els.wordTypeSelector.value;
    if (state.revealedWords % 10 === 0) earnBadge(wordType);
  }

  function launchConfetti() {
    for (let i = 0; i < 25; i++) {
      const confetti = document.createElement('div');
      confetti.className = 'confetti';
      confetti.style.left = `${Math.random() * 100}vw`;
      confetti.style.background = `hsl(${Math.random() * 360}, 100%, 50%)`;
      const duration = 2000 + Math.random() * 2000;
      confetti.style.animationDuration = `${duration}ms`;
      els.confettiContainer.appendChild(confetti);
      setTimeout(() => confetti.remove(), duration);
    }
  }

  function launchFireworks() {
    for (let i = 0; i < 20; i++) {
      const firework = document.createElement('div');
      firework.className = 'confetti star';
      firework.style.left = `${Math.random() * 100}vw`;
      firework.style.top = `${Math.random() * 50}vh`;
      firework.style.background = `hsl(${Math.random() * 360}, 100%, 50%)`;
      els.confettiContainer.appendChild(firework);
      setTimeout(() => firework.remove(), 1500);
    }
  }

  function parseWord(word) {
    const units = [];
    let i = 0;
    while (i < word.length) {
      const nextTwo = word.slice(i, i + 2).toLowerCase();
      if (i < word.length - 1 && digraphs.includes(nextTwo)) {
        units.push({ text: nextTwo, isVowel: false, isDigraph: true });
        i += 2;
      } else {
        const letter = word[i].toLowerCase();
        units.push({ text: letter, isVowel: isVowel(letter), isDigraph: false });
        i++;
      }
    }
    return units;
  }

  function savePreferences() {
    const prefs = {
      wordType: state.wordType,
      theme: state.theme,
      blendingTime: state.blendingTime,
      soundsEnabled: state.soundsEnabled,
      celebrationMode: state.celebrationMode,
      badges: state.badges
    };
    localStorage.setItem('wordSpinnerPrefs', JSON.stringify(prefs));
  }

  function loadPreferences() {
    const prefs = JSON.parse(localStorage.getItem('wordSpinnerPrefs')) || {};
    state.wordType = prefs.wordType || 'cvc';
    state.theme = prefs.theme || 'default';
    state.blendingTime = prefs.blendingTime || 3000;
    state.soundsEnabled = prefs.soundsEnabled !== false;
    state.celebrationMode = prefs.celebrationMode || false;
    state.badges = prefs.badges || {};
    document.body.setAttribute('data-theme', state.theme);
    els.wordTypeSelector.value = state.wordType;
    els.themeSelector.value = state.theme;
    els.blendingTimeDisplay.textContent = state.blendingTime / 1000;
    els.toggleAudioButton.textContent = state.soundsEnabled ? '🔇 Sounds Off' : '🔊 Sounds On';
    els.celebrationModeCheckbox.checked = state.celebrationMode;
  }

  function updateBadges() {
    els.badges.innerHTML = '';
    Object.entries(state.badges).forEach(([type, earned]) => {
      if (earned) {
        const badge = document.createElement('div');
        badge.className = 'badge';
        badge.textContent = badges[type];
        els.badges.appendChild(badge);
      }
    });
    els.badges.setAttribute('aria-hidden', !Object.values(state.badges).some(Boolean));
  }

  function earnBadge(wordType) {
    if (!state.badges[wordType]) {
      state.badges[wordType] = true;
      updateBadges();
      speak(`Congratulations! You earned the ${badges[wordType]} badge!`);
      launchConfetti();
    }
  }

  async function revealWord(word, isRepeat = false) {
    els.wordBox.innerHTML = '';
    const units = parseWord(word);
    els.wordBox.setAttribute('data-tooltip', `Phonics: /${units.map(u => u.text).join('/ ')}/`);
    const spans = units.map((unit, i) => {
      const span = document.createElement('span');
      span.textContent = unit.text;
      span.classList.add('letter');
      if (unit.isVowel) span.classList.add('vowel');
      else if (unit.isDigraph) span.classList.add('digraph');
      else span.classList.add('consonant');
      span.style.animationDelay = `${i * 0.4}s`;
      return span;
    });
    els.wordBox.append(...spans);

    for (const unit of units) {
      await delay(400);
      if (state.soundsEnabled) speak(unit.text);
    }

    announce('Now, blend the letters aloud!');
    els.blendingTimerContainer.style.display = 'block';
    els.blendingTimer.style.width = '100%';
    els.blendingTimer.style.transition = `width ${state.blendingTime / 1000}s linear`;
    if ('vibrate' in navigator) navigator.vibrate([200]);
    els.blendingTimer.setAttribute('aria-valuenow', 100);
    requestAnimationFrame(() => {
      els.blendingTimer.style.width = '0%';
      let progress = 100;
      const interval = setInterval(() => {
        progress -= 10;
        if (progress >= 0) els.blendingTimer.setAttribute('aria-valuenow', progress);
        else clearInterval(interval);
      }, state.blendingTime / 10);
    });
    await delay(state.blendingTime);
    els.blendingTimerContainer.style.display = 'none';
    els.blendingTimer.setAttribute('aria-valuenow', 0);

    if (state.soundsEnabled) await speak(word);
    announce(`The word is: ${word}`);
    if (!isRepeat) {
      showCompliment();
      updateScore();
      updateProgress();
      state.usedWords.push(word);
      if (state.usedWords.length === state.totalWords) resetGame(false);
    }
    els.hintButton.hidden = false;
  }

  function showHint() {
    if (!state.currentWord) return alert('Spin first!');
    const units = parseWord(state.currentWord);
    const hint = `Try blending: /${units.map(u => u.text).join('/ ')}/`;
    if (state.soundsEnabled) speak(hint);
    announce(hint);
  }

  function getWords() {
    const group = wordGroups[state.wordType];
    return Object.values(group).flat();
  }

  function getRandomWord() {
    const words = getWords().filter(w => !state.usedWords.includes(w));
    if (!words.length) {
      alert('All words completed! Starting over.');
      state.usedWords = [];
      return getRandomWord();
    }
    return words[Math.floor(Math.random() * words.length)];
  }

  function resetGame(updateTotal = true) {
    state.usedWords = [];
    state.revealedWords = 0;
    state.score = 0;
    state.currentWord = '';
    els.scoreText.textContent = '0';
    els.repeatButton.disabled = true;
    els.hintButton.hidden = true;
    if (updateTotal) state.totalWords = getWords().length;
    updateProgress();
    updateBadges();
  }

  /* Event Handlers */
  async function spin() {
    els.spinButton.disabled = true;
    els.repeatButton.disabled = true;
    els.hintButton.hidden = true;
    if ('vibrate' in navigator) navigator.vibrate([200]);
    await delay(1000);

    state.currentWord = getRandomWord();
    await revealWord(state.currentWord);
    els.spinButton.disabled = false;
    els.repeatButton.disabled = false;
  }

  async function repeat() {
    if (!state.currentWord) return alert('Spin first!');
    els.repeatButton.disabled = true;
    if ('vibrate' in navigator) navigator.vibrate([200]);
    await revealWord(state.currentWord, true);
    els.repeatButton.disabled = false;
  }

  function checkWord(event) {
    if (event.key === 'Enter') {
      const userInput = els.wordInput.value.trim().toLowerCase();
      if (userInput === state.currentWord) {
        showCompliment();
        updateScore();
        updateProgress();
        els.wordInput.value = '';
        spin();
      } else {
        announce('Try again!');
        els.wordInput.value = '';
      }
    }
  }

  els.spinButton.addEventListener('click', spin);
  els.repeatButton.addEventListener('click', repeat);
  els.hintButton.addEventListener('click', showHint);
  els.wordInput.addEventListener('keypress', checkWord);
  els.wordTypeSelector.addEventListener('change', () => {
    state.wordType = els.wordTypeSelector.value;
    resetGame(true);
    savePreferences();
  });
  els.themeSelector.addEventListener('change', () => {
    state.theme = els.themeSelector.value;
    document.body.setAttribute('data-theme', state.theme);
    savePreferences();
  });
  els.toggleAudioButton.addEventListener('click', () => {
    state.soundsEnabled = !state.soundsEnabled;
    els.toggleAudioButton.textContent = state.soundsEnabled ? '🔇 Sounds Off' : '🔊 Sounds On';
    savePreferences();
  });
  els.increaseTime.addEventListener('click', () => {
    if (state.blendingTime < 7000) {
      state.blendingTime += 1000;
      els.blendingTimeDisplay.textContent = state.blendingTime / 1000;
      savePreferences();
    }
  });
  els.decreaseTime.addEventListener('click', () => {
    if (state.blendingTime > 1000) {
      state.blendingTime -= 1000;
      els.blendingTimeDisplay.textContent = state.blendingTime / 1000;
      savePreferences();
    }
  });
  els.celebrationModeCheckbox.addEventListener('change', () => {
    state.celebrationMode = els.celebrationModeCheckbox.checked;
    savePreferences();
  });
  els.toggleSettingsButton.addEventListener('click', () => {
    const isVisible = els.advancedSettings.style.display === 'block';
    els.advancedSettings.style.display = isVisible ? 'none' : 'block';
    els.toggleSettingsButton.textContent = isVisible ? '⚙️ Customize' : 'Hide Settings';
    els.toggleSettingsButton.setAttribute('aria-expanded', !isVisible);
    els.advancedSettings.setAttribute('aria-hidden', isVisible);
  });

  /* Initialization */
  (async () => {
    await initSpeech();
    loadPreferences();
    updateBadges();
    resetGame(true);
    if (!localStorage.getItem('hasSeenTutorial')) {
      els.tutorialModal.style.display = 'flex';
      els.startTutorial.addEventListener('click', () => {
        els.tutorialModal.style.display = 'none';
        localStorage.setItem('hasSeenTutorial', 'true');
        speak('Welcome! Click Spin to start blending words.');
      });
      els.skipTutorial.addEventListener('click', () => {
        els.tutorialModal.style.display = 'none';
        localStorage.setItem('hasSeenTutorial', 'true');
      });
    }
  })();
});
