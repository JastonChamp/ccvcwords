document.addEventListener('DOMContentLoaded', () => {
  const wordGroups = {
    cvc: ['bat', 'cat', 'bed', 'den', 'big', 'dig', 'box', 'cot', 'bug', 'cup'],
    ccvc: ['brag', 'clap', 'bled', 'fret', 'brim', 'clip', 'blot', 'crop', 'drum', 'grub'],
    cvcc: ['band', 'damp', 'bent', 'felt', 'film', 'hint', 'bond', 'cost', 'bunk', 'dump'],
    ccvcc: ['brand', 'clamp', 'blend', 'strep', 'blink', 'crimp', 'frost', 'stomp', 'blunt', 'crust'],
    digraphs: ['chat', 'shed', 'chip', 'shop', 'shut', 'thud', 'chug', 'than', 'thing', 'strong'],
    extended: ['fantastic', 'smashing', 'wrecking', 'blinking', 'jumping']
  };

  const digraphs = ['sh', 'th', 'ch', 'ng'];
  const state = {
    score: 0,
    revealedWords: 0,
    totalWords: 50,
    usedWords: new Set(),
    currentWord: '',
    blendingTime: 3000,
    soundsEnabled: true,
    wordType: 'cvc',
    theme: 'default',
    celebrationMode: false,
    badges: new Map()
  };

  const els = {
    spinButton: document.querySelector('#spinButton'),
    repeatButton: document.querySelector('#repeatButton'),
    hintButton: document.querySelector('#hintButton'),
    wordBox: document.querySelector('#wordBox'),
    wordInput: document.querySelector('#wordInput'),
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
    wordTypeSelector: document.querySelector('#wordTypeSelector'),
    themeSelector: document.querySelector('#themeSelector'),
    toggleAudioButton: document.querySelector('#toggleAudioButton'),
    blendingTimeDisplay: document.querySelector('#blendingTimeDisplay'),
    increaseTime: document.querySelector('#increaseBlendingTime'),
    decreaseTime: document.querySelector('#decreaseBlendingTime'),
    celebrationModeCheckbox: document.querySelector('#celebrationMode'),
    confettiContainer: document.querySelector('#confettiContainer'),
    tutorialModal: document.querySelector('#tutorialModal'),
    startTutorial: document.querySelector('#startTutorial'),
    skipTutorial: document.querySelector('#skipTutorial'),
    toggleSettingsButton: document.querySelector('#toggleSettingsButton'),
    advancedSettings: document.querySelector('#advancedSettings'),
    badges: document.querySelector('#badges')
  };

  const compliments = ['Great Job!', 'Awesome!', 'You’re a Star!', 'Well Done!', 'Fantastic!'];
  const badgeNames = {
    cvc: 'CVC Star',
    ccvc: 'CCVC Hero',
    cvcc: 'CVCC Champ',
    ccvcc: 'CCVCC Master',
    digraphs: 'Digraph Ace',
    extended: 'Word Wizard'
  };

  let voice = null;
  async function initSpeech() {
    try {
      const voices = await new Promise(resolve => {
        speechSynthesis.onvoiceschanged = () => resolve(speechSynthesis.getVoices());
        if (speechSynthesis.getVoices().length) resolve(speechSynthesis.getVoices());
      });
      voice = voices.find(v => v.lang.startsWith('en') && v.name.toLowerCase().includes('female')) || voices[0];
    } catch (e) {
      console.warn('Speech synthesis unavailable:', e);
    }
  }

  function speak(text) {
    if (!state.soundsEnabled || !voice) return Promise.resolve();
    return new Promise(resolve => {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.voice = voice;
      utterance.rate = 0.9;
      utterance.pitch = 1.1;
      utterance.onend = resolve;
      utterance.onerror = () => resolve();
      speechSynthesis.speak(utterance);
    });
  }

  const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
  const announce = text => {
    els.screenReaderAnnounce.textContent = text;
    setTimeout(() => els.screenReaderAnnounce.textContent = '', 1000);
  };

  function updateScore(points = 10) {
    state.score += points;
    els.scoreValue.textContent = state.score;
    els.scoreIncrement.textContent = `+${points}`;
    els.scoreIncrement.classList.add('show');
    setTimeout(() => els.scoreIncrement.classList.remove('show'), 800);
    speak(`Score: ${state.score}`);
  }

  function updateProgress() {
    state.revealedWords = state.usedWords.size;
    const percent = (state.revealedWords / state.totalWords) * 100;
    els.progressText.textContent = `${state.revealedWords} / ${state.totalWords} Words`;
    els.progressFill.style.width = `${percent}%`;
    els.progressBar.setAttribute('aria-valuenow', Math.round(percent));
    if (state.revealedWords % 10 === 0 && state.revealedWords > 0) {
      els.progressIcon.classList.add('star-animate');
      setTimeout(() => els.progressIcon.classList.remove('star-animate'), 1000);
      earnBadge(state.wordType);
    }
  }

  function showCompliment() {
    const compliment = compliments[Math.floor(Math.random() * compliments.length)];
    els.complimentBox.textContent = compliment;
    speak(compliment);
    state.celebrationMode ? launchFireworks() : launchConfetti();
    setTimeout(() => els.complimentBox.textContent = '', 2000);
  }

  function launchConfetti() {
    for (let i = 0; i < 20; i++) {
      const confetti = document.createElement('div');
      confetti.className = 'confetti';
      confetti.style.left = `${Math.random() * 100}vw`;
      confetti.style.background = `hsl(${Math.random() * 360}, 100%, 50%)`;
      els.confettiContainer.appendChild(confetti);
      setTimeout(() => confetti.remove(), 3000);
    }
  }

  function launchFireworks() {
    for (let i = 0; i < 15; i++) {
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
        units.push({ text: nextTwo, isDigraph: true });
        i += 2;
      } else {
        const letter = word[i].toLowerCase();
        units.push({ text: letter, isVowel: /[aeiou]/.test(letter) });
        i++;
      }
    }
    return units;
  }

  function savePreferences() {
    localStorage.setItem('wordSpinnerPrefs', JSON.stringify({
      ...state,
      usedWords: Array.from(state.usedWords),
      badges: Object.fromEntries(state.badges)
    }));
  }

  function loadPreferences() {
    const prefs = JSON.parse(localStorage.getItem('wordSpinnerPrefs')) || {};
    Object.assign(state, {
      wordType: prefs.wordType || 'cvc',
      theme: prefs.theme || 'default',
      blendingTime: prefs.blendingTime || 3000,
      soundsEnabled: prefs.soundsEnabled ?? true,
      celebrationMode: prefs.celebrationMode || false,
      badges: new Map(Object.entries(prefs.badges || {})),
      usedWords: new Set(prefs.usedWords || [])
    });
    document.body.dataset.theme = state.theme;
    els.wordTypeSelector.value = state.wordType;
    els.themeSelector.value = state.theme;
    els.blendingTimeDisplay.textContent = state.blendingTime / 1000;
    els.toggleAudioButton.textContent = state.soundsEnabled ? '🔇 Sounds Off' : '🔊 Sounds On';
    els.celebrationModeCheckbox.checked = state.celebrationMode;
  }

  function updateBadges() {
    els.badges.innerHTML = '';
    state.badges.forEach((_, type) => {
      const badge = document.createElement('div');
      badge.className = 'badge';
      badge.textContent = badgeNames[type];
      els.badges.appendChild(badge);
    });
  }

  function earnBadge(wordType) {
    if (!state.badges.has(wordType)) {
      state.badges.set(wordType, true);
      updateBadges();
      speak(`You earned the ${badgeNames[wordType]} badge!`);
      launchConfetti();
      savePreferences();
    }
  }

  async function revealWord(word, isRepeat = false) {
    els.wordBox.innerHTML = '';
    const units = parseWord(word);
    units.forEach((unit, i) => {
      const span = document.createElement('span');
      span.textContent = unit.text;
      span.classList.add('letter', unit.isVowel ? 'vowel' : unit.isDigraph ? 'digraph' : 'consonant');
      span.style.animationDelay = `${i * 0.4}s`;
      els.wordBox.appendChild(span);
    });

    for (const unit of units) {
      await delay(400);
      if (state.soundsEnabled) await speak(unit.text);
    }

    els.blendingTimerContainer.style.display = 'block';
    els.blendingTimer.style.transition = `width ${state.blendingTime / 1000}s linear`;
    els.blendingTimer.style.width = '100%';
    requestAnimationFrame(() => els.blendingTimer.style.width = '0%');
    announce('Blend the letters aloud!');
    await delay(state.blendingTime);
    els.blendingTimerContainer.style.display = 'none';

    if (state.soundsEnabled) await speak(word);
    announce(`The word is: ${word}`);
    if (!isRepeat) {
      state.usedWords.add(word);
      showCompliment();
      updateScore();
      updateProgress();
      if (state.usedWords.size === state.totalWords) resetGame();
    }
    els.hintButton.hidden = false;
    els.repeatButton.disabled = false;
  }

  function getRandomWord() {
    const words = wordGroups[state.wordType].filter(w => !state.usedWords.has(w));
    if (!words.length) {
      state.usedWords.clear();
      return getRandomWord();
    }
    return words[Math.floor(Math.random() * words.length)];
  }

  function resetGame() {
    state.usedWords.clear();
    state.revealedWords = 0;
    state.score = 0;
    state.currentWord = '';
    els.scoreValue.textContent = '0';
    els.repeatButton.disabled = true;
    els.hintButton.hidden = true;
    state.totalWords = wordGroups[state.wordType].length;
    updateProgress();
    savePreferences();
  }

  async function spin() {
    els.spinButton.disabled = true;
    state.currentWord = getRandomWord();
    await revealWord(state.currentWord);
    els.spinButton.disabled = false;
  }

  async function repeat() {
    if (!state.currentWord) return;
    els.repeatButton.disabled = true;
    await revealWord(state.currentWord, true);
  }

  function checkWord(event) {
    if (event.key !== 'Enter' || !state.currentWord) return;
    const input = els.wordInput.value.trim().toLowerCase();
    if (input === state.currentWord) {
      state.usedWords.add(state.currentWord);
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

  els.spinButton.addEventListener('click', spin);
  els.repeatButton.addEventListener('click', repeat);
  els.hintButton.addEventListener('click', () => speak(state.currentWord));
  els.wordInput.addEventListener('keypress', checkWord);
  els.wordTypeSelector.addEventListener('change', () => {
    state.wordType = els.wordTypeSelector.value;
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
    const isVisible = els.advancedSettings.hidden;
    els.advancedSettings.hidden = !isVisible;
    els.toggleSettingsButton.textContent = isVisible ? 'Hide Settings' : '⚙️ Customize';
  });
  els.startTutorial.addEventListener('click', () => {
    els.tutorialModal.close();
    localStorage.setItem('hasSeenTutorial', 'true');
    speak('Click Spin to start!');
  });
  els.skipTutorial.addEventListener('click', () => {
    els.tutorialModal.close();
    localStorage.setItem('hasSeenTutorial', 'true');
  });

  (async () => {
    await initSpeech();
    loadPreferences();
    updateBadges();
    resetGame();
    if (!localStorage.getItem('hasSeenTutorial')) els.tutorialModal.showModal();
  })();
});
