console.log('Script loaded'); // Confirm script starts

document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM fully loaded'); // Confirm DOM is ready

  // Larger word database (still demo-sized; ideally load from JSON)
  const wordGroups = {
    cvc: { a: ['cat', 'bat', 'hat', 'mat', 'rat'], e: ['bed', 'pen', 'jet', 'net', 'red'], i: ['pig', 'sit', 'win', 'fin', 'lip'], o: ['dog', 'top', 'hop', 'mop', 'pot'], u: ['bug', 'run', 'cup', 'sun', 'mud'] },
    ccvc: { a: ['clap', 'snap', 'flag', 'trap', 'glad'], e: ['step', 'fret', 'sled', 'bled', 'stem'], i: ['skip', 'trip', 'grin', 'slip', 'clip'], o: ['drop', 'stop', 'flop', 'crop', 'plot'], u: ['drum', 'plug', 'club', 'slug', 'snug'] },
    digraphs: { a: ['chat', 'bash', 'path', 'that', 'sham'], e: ['shed', 'then', 'chew', 'theft', 'shell'], i: ['chip', 'shin', 'whip', 'thin', 'chill'], o: ['shop', 'thud', 'chop', 'shot', 'show'], u: ['shut', 'chug', 'thump', 'rush', 'brush'] }
  };
  const digraphs = ['sh', 'th', 'ch', 'ng', 'wh'];
  const difficulties = {
    easy: { types: ['cvc'], baseTime: 6000, badgeThreshold: 5, successStreak: 3 },
    medium: { types: ['cvc', 'ccvc'], baseTime: 4500, badgeThreshold: 10, successStreak: 4 },
    hard: { types: ['cvc', 'ccvc', 'digraphs'], baseTime: 3000, badgeThreshold: 15, successStreak: 5 }
  };
  const peteMessages = {
    spin: ['Let’s find a nest word!', 'Spin for Pete!', 'Here comes a word!'],
    blend: ['Say each sound slow!', 'Blend it for Pete!', 'Mix those sounds!'],
    success: ['Perfect! Pete’s nest grows!', 'You’re a blending hero!', 'Pete flaps for you!'],
    error: ['Oops, not quite!', 'Try again, Pete believes in you!', 'Close! Listen again!'],
    streak: ['Wow, three in a row!', 'Four perfect blends!', 'Five? You’re flying!']
  };

  const state = {
    score: 0,
    level: 1,
    wordsDone: 0,
    badges: 0,
    currentWord: '',
    difficulty: 'easy',
    blendingTime: difficulties.easy.baseTime,
    soundsEnabled: true,
    usedWords: new Set(),
    isPaused: false,
    recognition: null,
    successStreak: 0,
    maxStreak: 0
  };

  const els = {
    spinButton: document.querySelector('#spinButton'),
    sayButton: document.querySelector('#sayButton'),
    repeatButton: document.querySelector('#repeatButton'),
    pauseButton: document.querySelector('#pauseButton'),
    soundToggle: document.querySelector('#soundToggle'),
    wordBox: document.querySelector('#wordBox'),
    scoreValue: document.querySelector('#scoreValue'),
    levelValue: document.querySelector('#levelValue'),
    badgeCount: document.querySelector('#badgeCount'),
    progressText: document.querySelector('#progressText'),
    progressFill: document.querySelector('#progressFill'),
    progressBar: document.querySelector('#progressBar'),
    progressIcon: document.querySelector('#progressIcon'),
    feedbackBox: document.querySelector('#feedbackBox'),
    blendingTimerContainer: document.querySelector('#blendingTimerContainer'),
    blendingTimer: document.querySelector('#blendingTimer'),
    mascot: document.querySelector('#mascot'),
    confettiContainer: document.querySelector('#confettiContainer'),
    toggleSettingsButton: document.querySelector('#toggleSettingsButton'),
    advancedSettings: document.querySelector('#advancedSettings'),
    difficultyRadios: document.querySelectorAll('input[name="difficulty"]'),
    resetGame: document.querySelector('#resetGame'),
    tutorialModal: document.querySelector('#tutorialModal'),
    startTutorial: document.querySelector('#startTutorial'),
    skipTutorial: document.querySelector('#skipTutorial'),
    screenReaderAnnounce: document.querySelector('#screenReaderAnnounce'),
    captions: document.querySelector('#captions')
  };

  // Utilities
  const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
  const randomItem = arr => arr[Math.floor(Math.random() * arr.length)];

  const announce = async (text, duration = 4000) => {
    els.screenReaderAnnounce.textContent = text;
    els.captions.textContent = text;
    els.mascot.classList.add('speaking');
    await delay(duration);
    els.screenReaderAnnounce.textContent = '';
    els.captions.textContent = '';
    els.mascot.classList.remove('speaking');
  };

  const playLetterSound = async (sound, caption = sound) => {
    if (!state.soundsEnabled || state.isPaused) return Promise.resolve();
    return new Promise(async (resolve) => {
      try {
        const audio = new Audio(`${sound}.mp3`); // Use main folder path (e.g., a.mp3, sh.mp3)
        els.captions.textContent = caption;
        audio.addEventListener('ended', () => {
          els.captions.textContent = '';
          resolve();
        });
        audio.addEventListener('error', (e) => {
          console.error(`Letter sound "${sound}.mp3" failed:`, e);
          els.captions.textContent = '';
          resolve(); // Continue even if audio fails (no TTS fallback for letters)
        });
        await audio.play();
      } catch (e) {
        console.error(`Error playing "${sound}.mp3":`, e);
        els.captions.textContent = '';
        resolve();
      }
    });
  };

  const playWordSound = async (word, caption = word) => {
    if (!state.soundsEnabled || state.isPaused) return Promise.resolve();
    return new Promise(async (resolve) => {
      try {
        const audio = new Audio(`${word}.mp3`); // Use main folder path (e.g., cat.mp3)
        els.captions.textContent = caption;
        audio.addEventListener('ended', () => {
          els.captions.textContent = '';
          resolve();
        });
        audio.addEventListener('error', async (e) => {
          console.warn(`Word sound "${word}.mp3" unavailable, using TTS:`, e);
          const utterance = new SpeechSynthesisUtterance(word);
          utterance.lang = 'en-GB';
          const voices = speechSynthesis.getVoices();
          const ukFemaleVoice = voices.find(v => v.lang === 'en-GB' && /female/i.test(v.name)) || voices.find(v => v.lang === 'en-GB');
          if (ukFemaleVoice) utterance.voice = ukFemaleVoice;
          els.captions.textContent = caption;
          utterance.onend = () => {
            els.captions.textContent = '';
            resolve();
          };
          speechSynthesis.speak(utterance);
        });
        await audio.play();
      } catch (e) {
        console.error(`Error with "${word}.mp3":`, e);
        els.captions.textContent = '';
        resolve();
      }
    });
  };

  const parseWord = word => {
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
  };

  // Game Logic
  const getAvailableWords = () => difficulties[state.difficulty].types.flatMap(type => Object.values(wordGroups[type]).flat());

  const getRandomWord = () => {
    const words = getAvailableWords().filter(w => !state.usedWords.has(w));
    if (!words.length) {
      state.usedWords.clear();
      state.level++;
      els.levelValue.textContent = state.level;
      els.mascot.classList.toggle('mascot--baby', state.level < 3);
      els.mascot.classList.toggle('mascot--grown', state.level >= 3);
      announce(`Level ${state.level}! Pete’s nest is growing!`);
      return getRandomWord();
    }
    return words[Math.floor(Math.random() * words.length)];
  };

  const updateProgress = () => {
    const total = getAvailableWords().length;
    els.progressText.textContent = `${state.wordsDone} / ${total} Words`;
    const percent = (state.wordsDone / total) * 100;
    els.progressFill.style.width = `${percent}%`;
    els.progressBar.setAttribute('aria-valuenow', Math.round(percent));
  };

  const showFeedback = (text, isCorrect = true) => {
    els.feedbackBox.textContent = text;
    els.feedbackBox.classList.add('show');
    if (!isCorrect) els.feedbackBox.classList.add('error');
    setTimeout(() => els.feedbackBox.classList.remove('show', 'error'), 2000);
  };

  const awardBadge = () => {
    state.badges++;
    els.badgeCount.textContent = state.badges;
    els.progressIcon.classList.add('star-animate');
    setTimeout(() => els.progressIcon.classList.remove('star-animate'), 1000);
    announce(`Feather earned! Pete’s nest shines brighter!`);
    launchConfetti(true);
  };

  const launchConfetti = (isStar = false) => {
    const count = isStar ? 40 : 25;
    for (let i = 0; i < count; i++) {
      const confetti = document.createElement('div');
      confetti.className = `confetti${isStar && Math.random() > 0.5 ? ' star' : ''}`;
      confetti.style.left = `${Math.random() * 100}vw`;
      confetti.style.background = `hsl(${Math.random() * 360}, 100%, 50%)`;
      els.confettiContainer.appendChild(confetti);
      setTimeout(() => confetti.remove(), 3000);
    }
  };

  const adjustDifficulty = () => {
    const baseTime = difficulties[state.difficulty].baseTime;
    const streakBonus = Math.min(state.maxStreak, 5) * -200; // Reduce time by 200ms per streak, max 1000ms
    state.blendingTime = Math.max(baseTime + streakBonus, 2000); // Minimum 2s
  };

  const revealWord = async (word, isRepeat = false) => {
    if (state.isPaused) return;
    try {
      els.wordBox.innerHTML = '';
      const units = parseWord(word);
      for (let i = 0; i < units.length; i++) {
        const span = document.createElement('span');
        span.textContent = units[i].text;
        span.classList.add('letter', units[i].isVowel ? 'vowel' : units[i].isDigraph ? 'digraph' : 'consonant');
        span.style.animationDelay = `${i * 0.5}s`;
        els.wordBox.appendChild(span);
        await delay(500);
        await playLetterSound(units[i].text, units[i].text); // Use playLetterSound for letters
        await announce(`Say: ${units[i].text}`, 2000);
      }
      els.blendingTimerContainer.style.display = 'block';
      els.blendingTimer.style.transition = `width ${state.blendingTime / 1000}s linear`;
      els.blendingTimer.style.width = '100%';
      requestAnimationFrame(() => els.blendingTimer.style.width = '0%');
      await announce(randomItem(peteMessages.blend));
      await delay(state.blendingTime);
      els.blendingTimerContainer.style.display = 'none';
      if (!isRepeat) {
        await playWordSound(word, word); // Use playWordSound for words (with TTS fallback)
        await announce(`The word is ${word}. Say it for Pete’s nest!`);
      }
    } catch (e) {
      console.error('Reveal word failed:', e);
      showFeedback('Oops, something went wrong with the word!', false);
    }
  };

  const checkAnswer = async () => {
    if (!state.currentWord || state.isPaused) return;
    try {
      if (!window.SpeechRecognition && !window.webkitSpeechRecognition) {
        showFeedback('Pete can’t hear you on this device. Type it instead?', false);
        const answer = prompt('Type the word you heard:', '');
        if (answer?.toLowerCase().trim() === state.currentWord) handleSuccess();
        else showFeedback(`It’s ${state.currentWord}. Try again!`, false);
        return;
      }
      if (state.recognition) state.recognition.stop();
      els.sayButton.classList.add('busy');
      const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
      state.recognition = recognition;
      recognition.lang = 'en-US';
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.maxAlternatives = 3;
      let attempts = 0;
      const maxAttempts = 3;

      recognition.onresult = event => {
        const results = event.results[0];
        const spoken = results[0].transcript.toLowerCase().trim();
        if (results.isFinal) {
          if (spoken === state.currentWord || levenshteinDistance(spoken, state.currentWord) <= 1) {
            handleSuccess();
          } else {
            attempts++;
            if (attempts < maxAttempts) {
              showFeedback(`${randomItem(peteMessages.error)} You said "${spoken}".`, false);
            } else {
              state.successStreak = 0;
              showFeedback(`${randomItem(peteMessages.error)} You said "${spoken}", it’s "${state.currentWord}".`, false);
              recognition.stop();
            }
          }
        }
      };
      recognition.onerror = event => {
        if (event.error === 'no-speech' || event.error === 'audio-capture') {
          attempts++;
          if (attempts < maxAttempts) {
            showFeedback(randomItem(peteMessages.error), false);
          } else {
            showFeedback('Pete couldn’t hear you after a few tries. Try again!', false);
            recognition.stop();
          }
        } else {
          console.warn('Speech recognition error:', event.error);
          showFeedback('Oops, something went wrong. Try again!', false);
          recognition.stop();
        }
      };
      recognition.onend = () => {
        state.recognition = null;
        els.sayButton.classList.remove('busy');
      };
      recognition.start();
      setTimeout(() => {
        if (state.recognition) {
          recognition.stop();
          if (attempts === 0) showFeedback('Pete didn’t hear anything. Speak up!', false);
        }
      }, 5000);
    } catch (e) {
      console.error('Check answer failed:', e);
      showFeedback('Voice check failed, try again!', false);
      els.sayButton.classList.remove('busy');
    }
  };

  const handleSuccess = () => {
    state.score += 10 * state.level;
    state.wordsDone++;
    state.successStreak++;
    state.maxStreak = Math.max(state.maxStreak, state.successStreak);
    state.usedWords.add(state.currentWord);
    els.scoreValue.textContent = state.score;
    updateProgress();
    const isBadge = state.wordsDone % difficulties[state.difficulty].badgeThreshold === 0;
    const isStreak = state.successStreak === difficulties[state.difficulty].successStreak;
    showFeedback(isStreak ? randomItem(peteMessages.streak) : randomItem(peteMessages.success), true);
    launchConfetti(isBadge || isStreak);
    if (isBadge) awardBadge();
    adjustDifficulty();
  };

  // Event Handlers
  const spin = async () => {
    if (state.isPaused) return;
    els.spinButton.classList.add('busy');
    state.currentWord = getRandomWord();
    await announce(randomItem(peteMessages.spin));
    await revealWord(state.currentWord);
    els.sayButton.disabled = false;
    els.repeatButton.disabled = false;
    els.spinButton.classList.remove('busy');
  };

  const repeat = async () => {
    if (state.isPaused) return;
    els.repeatButton.classList.add('busy');
    await revealWord(state.currentWord, true);
    els.repeatButton.classList.remove('busy');
  };

  const togglePause = () => {
    state.isPaused = !state.isPaused;
    els.pauseButton.textContent = state.isPaused ? '▶️ Resume' : '⏸️ Pause';
    announce(state.isPaused ? 'Pete’s taking a nap!' : 'Back to the nest!');
  };

  const toggleSound = () => {
    state.soundsEnabled = !state.soundsEnabled;
    els.soundToggle.textContent = state.soundsEnabled ? '🔊 On' : '🔇 Off';
    announce(state.soundsEnabled ? 'Pete’s chirping again!' : 'Quiet time for Pete!');
  };

  const resetGame = () => {
    Object.assign(state, {
      score: 0,
      level: 1,
      wordsDone: 0,
      badges: 0,
      usedWords: new Set(),
      currentWord: '',
      isPaused: false,
      successStreak: 0,
      maxStreak: 0,
      blendingTime: difficulties[state.difficulty].baseTime
    });
    els.scoreValue.textContent = '0';
    els.levelValue.textContent = '1';
    els.badgeCount.textContent = '0';
    els.mascot.classList.remove('mascot--grown');
    els.mascot.classList.add('mascot--baby');
    els.sayButton.disabled = true;
    els.repeatButton.disabled = true;
    els.pauseButton.textContent = '⏸️ Pause';
    updateProgress();
    announce('A fresh quest with Pete begins!');
  };

  // Event Listeners
  els.spinButton.addEventListener('click', spin);
  els.sayButton.addEventListener('click', checkAnswer);
  els.repeatButton.addEventListener('click', repeat);
  els.pauseButton.addEventListener('click', togglePause);
  els.soundToggle.addEventListener('click', toggleSound);
  els.toggleSettingsButton.addEventListener('click', () => {
    const isVisible = els.advancedSettings.style.display === 'block';
    els.advancedSettings.style.display = isVisible ? 'none' : 'block';
    els.toggleSettingsButton.textContent = isVisible ? `⚙️ Play ${state.difficulty.charAt(0).toUpperCase() + state.difficulty.slice(1)}` : '✖️ Close';
    els.toggleSettingsButton.setAttribute('aria-expanded', !isVisible);
  });
  els.difficultyRadios.forEach(radio => {
    radio.addEventListener('change', () => {
      state.difficulty = radio.value;
      state.blendingTime = difficulties[state.difficulty].baseTime;
      resetGame();
    });
  });
  els.resetGame.addEventListener('click', resetGame);
  els.startTutorial.addEventListener('click', () => {
    els.tutorialModal.close();
    localStorage.setItem('hasSeenTutorial', 'true');
    spin();
  });
  els.skipTutorial.addEventListener('click', () => {
    els.tutorialModal.close();
    localStorage.setItem('hasSeenTutorial', 'true');
  });

  // Initialize
  updateProgress();
  if (!localStorage.getItem('hasSeenTutorial')) els.tutorialModal.showModal();
});
