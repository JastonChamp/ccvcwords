document.addEventListener('DOMContentLoaded', () => {
  console.log('Word Spinner initialized.');

  /* Configuration */
  const audioPath = './';
  const wordGroups = {
    cvc: {
      a: ['bat', 'cat', 'dad', 'fan', 'jam', 'mad', 'pan', 'rat', 'tan', 'wag'],
      e: ['bed', 'den', 'get', 'hen', 'jet', 'net', 'pet', 'red', 'ten', 'wet'],
      i: ['big', 'dig', 'fin', 'hit', 'kid', 'lip', 'pin', 'sit', 'tin', 'wig'],
      o: ['box', 'cot', 'dog', 'fog', 'hop', 'log', 'mop', 'not', 'pot', 'top'],
      u: ['bug', 'cup', 'fun', 'gum', 'hug', 'mud', 'nut', 'run', 'sun', 'tug']
    }
  };

  const letterSounds = {};
  const digraphs = ['sh', 'th', 'ch', 'ng'];
  'abcdefghijklmnopqrstuvwxyz'.split('').concat(digraphs).forEach(sound => {
    letterSounds[sound] = new Audio(`${audioPath}${sound}.mp3`);
  });
  const uiSounds = {
    click: new Audio(`${audioPath}click.mp3`),
    success: new Audio(`${audioPath}success.mp3`)
  };

  /* State */
  let state = {
    score: 0,
    revealedWords: 0,
    totalWords: 10,
    usedWords: [],
    currentWord: '',
    soundsEnabled: true
  };

  /* DOM Elements */
  const els = {
    spinButton: document.getElementById('spinButton'),
    repeatButton: document.getElementById('repeatButton'),
    hintButton: document.getElementById('hintButton'),
    wordBox: document.getElementById('wordBox'),
    scoreText: document.getElementById('scoreValue'),
    scoreIncrement: document.getElementById('scoreIncrement'),
    progressText: document.getElementById('progressText'),
    progressFill: document.getElementById('progressFill'),
    progressBar: document.getElementById('progressBar'),
    progressIcon: document.getElementById('progressIcon'),
    complimentBox: document.getElementById('complimentBox'),
    screenReaderAnnounce: document.getElementById('screenReaderAnnounce'),
    themeSelector: document.getElementById('themeSelector'),
    toggleAudioButton: document.getElementById('toggleAudioButton'),
    fullscreenButton: document.getElementById('fullscreenButton'),
    toggleSettingsButton: document.getElementById('toggleSettingsButton'),
    advancedSettings: document.getElementById('advancedSettings'),
    confettiContainer: document.getElementById('confettiContainer'),
    tutorialModal: document.getElementById('tutorialModal'),
    startTutorial: document.getElementById('startTutorial'),
    skipTutorial: document.getElementById('skipTutorial')
  };

  const compliments = ['Superb!', 'Brilliant!', 'Awesome!', 'Great Job!', 'Wow!'];

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
    if (!voice || speechSynthesis.speaking) return Promise.resolve();
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
  }

  function updateProgress() {
    state.revealedWords = state.usedWords.length;
    const percent = (state.revealedWords / state.totalWords) * 100 || 0;
    els.progressText.textContent = `${state.revealedWords} / ${state.totalWords} Words`;
    els.progressFill.style.width = `${percent}%`;
    els.progressBar.setAttribute('aria-valuenow', Math.round(percent));
  }

  function showCompliment() {
    const compliment = compliments[Math.floor(Math.random() * compliments.length)];
    els.complimentBox.textContent = compliment;
    speak(compliment);
    uiSounds.success.play();
    launchConfetti();
    setTimeout(() => els.complimentBox.style.opacity = '0', 2000);
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

  async function playSound(sound) {
    if (!state.soundsEnabled) return;
    const audio = letterSounds[sound];
    audio.currentTime = 0;
    try {
      await audio.play();
    } catch (error) {
      console.error(`Failed to play sound ${sound}:`, error);
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

  /* Core Logic */
  async function revealWord(word, isRepeat = false) {
    els.wordBox.innerHTML = '';
    const units = parseWord(word);
    const spans = units.map((unit, i) => {
      const span = document.createElement('span');
      span.textContent = unit.text;
      span.classList.add('letter');
      if (unit.isVowel) span.classList.add('vowel');
      if (unit.isDigraph) span.classList.add('digraph');
      span.style.animationDelay = `${i * 0.4}s`;
      return span;
    });
    els.wordBox.append(...spans);

    for (const unit of units) {
      await delay(400);
      await playSound(unit.text);
    }

    await delay(3000);
    await speak(word);
    announce(`The word is: ${word}`);
    if (!isRepeat) {
      showCompliment();
      updateScore();
      updateProgress();
    }
    els.hintButton.hidden = false;
  }

  function getRandomWord() {
    const words = Object.values(wordGroups.cvc).flat().filter(w => !state.usedWords.includes(w));
    if (!words.length) {
      alert('All words done! Starting over.');
      state.usedWords = [];
      return getRandomWord();
    }
    return words[Math.floor(Math.random() * words.length)];
  }

  /* Event Handlers */
  async function spin() {
    els.spinButton.disabled = true;
    els.repeatButton.disabled = true;
    els.hintButton.hidden = true;
    uiSounds.click.play();
    await delay(1000);

    state.currentWord = getRandomWord();
    state.usedWords.push(state.currentWord);
    await revealWord(state.currentWord);
    els.spinButton.disabled = false;
    els.repeatButton.disabled = false;
  }

  async function repeat() {
    if (!state.currentWord) return alert('Spin first!');
    els.repeatButton.disabled = true;
    await revealWord(state.currentWord, true);
    els.repeatButton.disabled = false;
  }

  els.spinButton.addEventListener('click', spin);
  els.repeatButton.addEventListener('click', repeat);
  els.hintButton.addEventListener('click', () => speak(state.currentWord || 'Spin first!'));

  els.themeSelector.addEventListener('change', () => {
    document.body.setAttribute('data-theme', els.themeSelector.value);
  });

  els.toggleAudioButton.addEventListener('click', () => {
    state.soundsEnabled = !state.soundsEnabled;
    els.toggleAudioButton.textContent = state.soundsEnabled ? '🔇 Sounds Off' : '🔊 Sounds On';
  });

  els.fullscreenButton.addEventListener('click', () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      els.fullscreenButton.textContent = '⛶ Exit';
    } else {
      document.exitFullscreen();
      els.fullscreenButton.textContent = '⛶ Fullscreen';
    }
  });

  els.toggleSettingsButton.addEventListener('click', () => {
    const isVisible = els.advancedSettings.style.display === 'block';
    els.advancedSettings.style.display = isVisible ? 'none' : 'block';
    els.toggleSettingsButton.textContent = isVisible ? '⚙️ Customize' : 'Hide Settings';
  });

  /* Initialization */
  (async () => {
    await initSpeech();
    els.themeSelector.value = 'default';
    document.body.setAttribute('data-theme', 'default');
    state.totalWords = Object.values(wordGroups.cvc).flat().length;
    updateProgress();

    if (!localStorage.getItem('hasSeenTutorial')) {
      els.tutorialModal.style.display = 'flex';
      els.startTutorial.addEventListener('click', () => {
        els.tutorialModal.style.display = 'none';
        localStorage.setItem('hasSeenTutorial', 'true');
        speak('Welcome! Click Spin to start.');
      });
      els.skipTutorial.addEventListener('click', () => {
        els.tutorialModal.style.display = 'none';
        localStorage.setItem('hasSeenTutorial', 'true');
      });
    }
  })();
});
