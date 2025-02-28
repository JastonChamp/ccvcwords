console.log('Script loaded'); // Confirm script starts

document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM fully loaded');

  // ----------------------------
  // Configuration & Data Constants
  // ----------------------------
  const wordGroups = {
    cvc: {
      a: ['cat', 'bat', 'hat', 'mat', 'rat'],
      e: ['bed', 'pen', 'jet', 'net', 'red'],
      i: ['pig', 'sit', 'win', 'fin', 'lip'],
      o: ['dog', 'top', 'hop', 'mop', 'pot'],
      u: ['bug', 'run', 'cup', 'sun', 'mud']
    },
    ccvc: {
      a: ['clap', 'snap', 'flag', 'trap', 'glad'],
      e: ['step', 'fret', 'sled', 'bled', 'stem'],
      i: ['skip', 'trip', 'grin', 'slip', 'clip'],
      o: ['drop', 'stop', 'flop', 'crop', 'plot'],
      u: ['drum', 'plug', 'club', 'slug', 'snug']
    },
    digraphs: {
      a: ['chat', 'bash', 'path', 'that', 'sham'],
      e: ['shed', 'then', 'chew', 'theft', 'shell'],
      i: ['chip', 'shin', 'whip', 'thin', 'chill'],
      o: ['shop', 'thud', 'chop', 'shot', 'show'],
      u: ['shut', 'chug', 'thump', 'rush', 'brush']
    }
  };

  const digraphs = ['sh', 'th', 'ch', 'ng', 'wh'];

  // Difficulty configuration: base times in ms, badge thresholds, and success streak required
  const difficulties = {
    easy: { types: ['cvc'], baseTime: 6000, badgeThreshold: 5, successStreak: 3 },
    medium: { types: ['cvc', 'ccvc'], baseTime: 4500, badgeThreshold: 10, successStreak: 4 },
    hard: { types: ['cvc', 'ccvc', 'digraphs'], baseTime: 3000, badgeThreshold: 15, successStreak: 5 }
  };

  // Pete's motivational messages
  const peteMessages = {
    spin: ['Let’s find a nest word!', 'Spin for Pete!', 'Here comes a word!'],
    blend: ['Say each sound slow!', 'Blend it for Pete!', 'Mix those sounds!'],
    success: ['Perfect! Pete’s nest grows!', 'You’re a blending hero!', 'Pete flaps for you!'],
    error: ['Oops, not quite!', 'Try again, Pete believes in you!', 'Close! Listen again!'],
    streak: ['Wow, three in a row!', 'Four perfect blends!', 'Five? You’re flying!']
  };

  // ----------------------------
  // State Management
  // ----------------------------
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

  // ----------------------------
  // DOM Element Cache
  // ----------------------------
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

  // ----------------------------
  // Utility Functions
  // ----------------------------
  const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
  const randomItem = arr => arr[Math.floor(Math.random() * arr.length)];

  // Fuzzy matching: compute Levenshtein distance between two strings
  const levenshteinDistance = (s1, s2) => {
    const dp = Array.from({ length: s1.length + 1 }, () => Array(s2.length + 1).fill(0));
    for (let i = 0; i <= s1.length; i++) dp[i][0] = i;
    for (let j = 0; j <= s2.length; j++) dp[0][j] = j;
    for (let i = 1; i <= s1.length; i++) {
      for (let j = 1; j <= s2.length; j++) {
        const cost = s1[i - 1] === s2[j - 1] ? 0 : 1;
        dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + cost);
      }
    }
    return dp[s1.length][s2.length];
  };

  // Announce a message via live region and update captions and mascot animation
  const announce = async (text, duration = 4000) => {
    els.screenReaderAnnounce.textContent = text;
    els.captions.textContent = text;
    els.mascot.classList.add('speaking');
    await delay(duration);
    els.screenReaderAnnounce.textContent = '';
    els.captions.textContent = '';
    els.mascot.classList.remove('speaking');
  };

  // Play a letter sound (no TTS fallback for individual letters)
  const playLetterSound = async (sound, caption = sound) => {
    if (!state.soundsEnabled || state.isPaused) return Promise.resolve();
    return new Promise(async (resolve) => {
      try {
        const audio = new Audio(`${sound}.mp3`);
        els.captions.textContent = caption;
        audio.addEventListener('ended', () => {
          els.captions.textContent = '';
          resolve();
        });
        audio.addEventListener('error', (e) => {
          console.error(`Letter sound "${sound}.mp3" failed:`, e);
          els.captions.textContent = '';
          resolve();
        });
        await audio.play();
      } catch (e) {
        console.error(`Error playing "${sound}.mp3":`, e);
        els.captions.textContent = '';
        resolve();
      }
    });
  };

  // Play a full-word sound; if unavailable, use TTS fallback
  const playWordSound = async (word, caption = word) => {
    if (!state.soundsEnabled || state.isPaused) return Promise.resolve();
    return new Promise(async (resolve) => {
      try {
        const audio = new Audio(`${word}.mp3`);
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

  // Split a word into phonetic units; combine digraphs
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

  // ----------------------------
  // Game Logic Functions
  // ----------------------------

  // Returns an array of available words based on current difficulty settings
  const getAvailableWords = () =>
    difficulties[state.difficulty].types.flatMap(type => Object.values(wordGroups[type]).flat());

  // Returns a random unused word; if all used, resets the used words and levels up
  const getRandomWord = () => {
    const words = getAvailableWords().filter(w => !state.usedWords.has(w));
    if (!words.length) {
      state.usedWords.clear();
      state.level++;
      els.levelValue.textContent = state.level;
      // Update mascot state based on level
      els.mascot.classList.toggle('mascot--baby', state.level < 3);
      els.mascot.classList.toggle('mascot--grown', state.level >= 3);
      announce(`Level ${state.level}! Pete’s nest is growing!`);
      return getRandomWord();
    }
    return words[Math.floor(Math.random() * words.length)];
  };

  // Update the progress bar and related UI
  const updateProgress = () => {
    const total = getAvailableWords().length;
    els.progressText.textContent = `${state.wordsDone} / ${total} Words`;
    const percent = (state.wordsDone / total) * 100;
    els.progressFill.style.width = `${percent}%`;
    els.progressBar.setAttribute('aria-valuenow', Math.round(percent));
  };

  // Display feedback message; add mascot animations on error/success
  const showFeedback = (text, isCorrect = true) => {
    els.feedbackBox.textContent = text;
    els.feedbackBox.classList.add('show');
    if (!isCorrect) {
      els.feedbackBox.classList.add('error');
      els.mascot.classList.add('failure');
      setTimeout(() => els.mascot.classList.remove('failure'), 2000);
    } else {
      els.feedbackBox.classList.remove('error');
    }
    setTimeout(() => els.feedbackBox.classList.remove('show', 'error'), 2000);
  };

  // Award a badge and trigger celebratory animations and confetti
  const awardBadge = () => {
    state.badges++;
    els.badgeCount.textContent = state.badges;
    els.progressIcon.classList.add('star-animate');
    setTimeout(() => els.progressIcon.classList.remove('star-animate'), 1000);
    announce(`Feather earned! Pete’s nest shines brighter!`);
    launchConfetti(true);
    els.mascot.classList.add('celebrate');
    setTimeout(() => els.mascot.classList.remove('celebrate'), 2000);
  };

  // Launch confetti animation; isStar toggles extra confetti for badge or streak events
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

  // Adjust blending time based on the user's success streak (faster blending for higher streaks)
  const adjustDifficulty = () => {
    const baseTime = difficulties[state.difficulty].baseTime;
    const streakBonus = Math.min(state.maxStreak, 5) * -200; // Reduce time by 200ms per streak, max 1000ms reduction
    state.blendingTime = Math.max(baseTime + streakBonus, 2000); // Minimum blending time: 2 seconds
  };

  // Reveal a word: animate each letter, play corresponding sounds, and prompt the user
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
        await playLetterSound(units[i].text, units[i].text);
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
        await playWordSound(word, word);
        await announce(`The word is ${word}. Say it for Pete’s nest!`);
      }
    } catch (e) {
      console.error('Reveal word failed:', e);
      showFeedback('Oops, something went wrong with the word!', false);
    }
  };

  // Check the user's spoken answer using Speech Recognition with fuzzy matching, optimized for Android and children
  const checkAnswer = async () => {
    if (!state.currentWord || state.isPaused) return;
    try {
      // Fallback to typed input if SpeechRecognition is unavailable
      if (!window.SpeechRecognition && !window.webkitSpeechRecognition) {
        showFeedback('Pete can’t hear you on this device. Type it instead?', false);
        const answer = prompt('Type the word you heard:', '');
        if (answer?.toLowerCase().trim() === state.currentWord) {
          handleSuccess();
        } else {
          showFeedback(`It’s ${state.currentWord}. Try again!`, false);
        }
        return;
      }
      if (state.recognition) state.recognition.stop();
      els.sayButton.classList.add('busy');
      const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
      state.recognition = recognition;
      recognition.lang = 'en-US'; // Adjust to 'en-GB' or your language if needed
      recognition.continuous = true; // Keep listening longer for children
      recognition.interimResults = true; // Capture partial results
      recognition.maxAlternatives = 7; // Increased to capture more speech options for children
      let attempts = 0;
      const maxAttempts = 5; // Increased to allow more retries for children

      recognition.onresult = event => {
        const results = event.results[0];
        const spoken = results[0].transcript.toLowerCase().trim();
        console.log(`Recognized on Android: "${spoken}"`); // Debug for Android
        if (results.isFinal) {
          if (spoken === state.currentWord || levenshteinDistance(spoken, state.currentWord) <= 3) { // Increased threshold for children’s speech
            handleSuccess();
          } else {
            attempts++;
            if (attempts < maxAttempts) {
              showFeedback(`${randomItem(peteMessages.error)} You said "${spoken}". Try speaking louder or clearer!`, false);
            } else {
              state.successStreak = 0;
              showFeedback(`${randomItem(peteMessages.error)} You said "${spoken}", it’s "${state.currentWord}". Try again later!`, false);
              recognition.stop();
            }
          }
        }
      };

      recognition.onerror = event => {
        if (['no-speech', 'audio-capture'].includes(event.error)) {
          attempts++;
          if (attempts < maxAttempts) {
            showFeedback(randomItem(peteMessages.error), false);
          } else {
            showFeedback('Pete couldn’t hear you after several tries. Please speak up or try again later!', false);
            recognition.stop();
          }
        } else {
          console.warn('Speech recognition error on Android:', event.error);
          showFeedback('Oops, something went wrong. Please try again later!', false);
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
          if (attempts === 0) showFeedback('Pete didn’t hear anything. Speak up or try again!', false);
        }
      }, 9000); // Extended to 9 seconds for children’s slower speech
    } catch (e) {
      console.error('Check answer failed on Android:', e);
      showFeedback('Voice check failed, please try again later!', false);
      els.sayButton.classList.remove('busy');
    }
  };

  // Handle a correct answer
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
    els.mascot.classList.add('success');
    setTimeout(() => els.mascot.classList.remove('success'), 2000);
    launchConfetti(isBadge || isStreak);
    if (isBadge) awardBadge();
    adjustDifficulty();
    if (state.recognition) state.recognition.stop();
  };

  // ----------------------------
  // Event Handlers
  // ----------------------------
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

  // Save and load user preferences
  const savePreferences = () => {
    localStorage.setItem('wordSpinnerPrefs', JSON.stringify({
      difficulty: state.difficulty,
      soundsEnabled: state.soundsEnabled
    }));
  };

  const loadPreferences = () => {
    const prefs = JSON.parse(localStorage.getItem('wordSpinnerPrefs')) || {};
    state.difficulty = prefs.difficulty || 'easy';
    state.soundsEnabled = prefs.soundsEnabled !== undefined ? prefs.soundsEnabled : true;
    els.soundToggle.textContent = state.soundsEnabled ? '🔊 On' : '🔇 Off';
    els.difficultyRadios.forEach(radio => {
      if (radio.value === state.difficulty) radio.checked = true;
    });
  };

  // ----------------------------
  // Event Listeners
  // ----------------------------
  els.spinButton.addEventListener('click', spin);
  els.sayButton.addEventListener('click', checkAnswer);
  els.repeatButton.addEventListener('click', repeat);
  els.pauseButton.addEventListener('click', togglePause);
  els.soundToggle.addEventListener('click', toggleSound);
  els.toggleSettingsButton.addEventListener('click', () => {
    const isVisible = els.advancedSettings.style.display === 'block';
    els.advancedSettings.style.display = isVisible ? 'none' : 'block';
    els.toggleSettingsButton.textContent = isVisible
      ? `⚙️ Play ${state.difficulty.charAt(0).toUpperCase() + state.difficulty.slice(1)}`
      : '✖️ Close';
    els.toggleSettingsButton.setAttribute('aria-expanded', !isVisible);
  });
  els.difficultyRadios.forEach(radio => {
    radio.addEventListener('change', () => {
      state.difficulty = radio.value;
      state.blendingTime = difficulties[state.difficulty].baseTime;
      resetGame();
      savePreferences();
    });
  });
  els.resetGame.addEventListener('click', () => {
    resetGame();
    savePreferences();
  });
  els.startTutorial.addEventListener('click', () => {
    els.tutorialModal.close();
    localStorage.setItem('hasSeenTutorial', 'true');
    spin();
  });
  els.skipTutorial.addEventListener('click', () => {
    els.tutorialModal.close();
    localStorage.setItem('hasSeenTutorial', 'true');
  });

  // Initialize preferences and progress; show tutorial if not seen
  loadPreferences();
  updateProgress();
  if (!localStorage.getItem('hasSeenTutorial')) els.tutorialModal.showModal();
});
