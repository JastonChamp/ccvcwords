document.addEventListener('DOMContentLoaded', () => {
  console.log('Word Spinner initialized.');

  /* =====================
     Word Spinner for All Ages
     (Optimized for both children and elderly)
  ===================== */
  
  /* ---------- Word Groups Configuration ---------- */
  const wordGroups = {
    cvc: {
      a: ['bat', 'bag', 'bad', 'cab', 'cap', 'cat', 'dad', 'dam', 'fad', 'fan', 'mad', 'jam', 'van', 'rag', 'tan', 'man', 'lap', 'mat', 'rat', 'can', 'gas', 'wag', 'had', 'lad', 'yam', 'wax', 'pad', 'ram', 'ham', 'pan'],
      e: ['bed', 'beg', 'ben', 'bet', 'den', 'fed', 'get', 'hen', 'jet', 'leg', 'met', 'net', 'pet', 'men', 'pen', 'red', 'set', 'ten', 'wet', 'web', 'yet', 'vet', 'hem', 'peg', 'let', 'keg', 'pep', 'ned', 'ted', 'ken'],
      i: ['bib', 'bid', 'big', 'bin', 'bit', 'dig', 'dip', 'fig', 'fin', 'fit', 'him', 'hit', 'kid', 'lid', 'lip', 'mid', 'pin', 'pig', 'pit', 'rid', 'rim', 'sip', 'sit', 'tin', 'tip', 'wig', 'win', 'zip', 'fix', 'mix'],
      o: ['bob', 'bog', 'cod', 'cob', 'cop', 'cot', 'dog', 'dot', 'fog', 'god', 'box', 'fox', 'got', 'hop', 'hot', 'jog', 'job', 'log', 'lot', 'mob', 'mop', 'nod', 'not', 'pod', 'pop', 'pot', 'rod', 'rot', 'sod', 'top'],
      u: ['bun', 'bud', 'bug', 'bus', 'but', 'cub', 'cud', 'cup', 'cut', 'dug', 'fun', 'gun', 'gum', 'hut', 'hum', 'hug', 'jug', 'mud', 'mug', 'nut', 'nun', 'pug', 'pun', 'pup', 'rub', 'rug', 'run', 'sum', 'sun', 'tug']
    },
    ccvc: {
      a: ['brag', 'clap', 'crab', 'drag', 'flag', 'flap', 'glad', 'grab', 'plan', 'slam', 'snap', 'snag', 'span', 'stab', 'trap', 'scab', 'scam', 'scan', 'scat', 'swam', 'chap', 'that', 'drab', 'gran', 'plat', 'pram', 'slap', 'clan', 'slab'],
      e: ['bled', 'bred', 'fled', 'fret', 'glen', 'sped', 'stem', 'step', 'trek', 'clef', 'sled'],
      i: ['brim', 'brig', 'clip', 'crib', 'drip', 'flip', 'grin', 'grid', 'grip', 'skip', 'slim', 'slip', 'spin', 'spit', 'swim', 'twin', 'trip', 'trim', 'twig', 'skid'],
      o: ['blot', 'blog', 'clog', 'crop', 'drop', 'frog', 'flop', 'glob', 'glop', 'plod', 'plot', 'prod', 'prop', 'slot', 'smog', 'snob', 'spot', 'stop', 'swop', 'trod'],
      u: ['drum', 'grub', 'plug', 'slug', 'slum', 'spun', 'stub', 'stud', 'stun']
    },
    cvcc: {
      a: ['band', 'bank', 'damp', 'hand', 'land', 'lamp', 'ramp', 'sand', 'pant', 'tank', 'camp'],
      e: ['bent', 'dent', 'felt', 'fend', 'help', 'kept', 'lend', 'mend', 'nest', 'rest', 'sent', 'tent', 'vest', 'vent', 'wept', 'weld', 'text', 'next', 'heft', 'jest', 'best', 'pest', 'test', 'west', 'zest', 'desk', 'self', 'meld', 'held', 'belt'],
      i: ['dink', 'find', 'film', 'gild', 'gimp', 'hind', 'hilt', 'hint', 'jilt', 'mint', 'milk', 'silk', 'fist', 'list', 'risk', 'sink', 'link', 'pink', 'kink', 'rink', 'tint', 'tilt', 'skimp', 'wilt'],
      o: ['bond', 'colt', 'comb', 'fond', 'cost', 'lost', 'loft', 'soft', 'post', 'pond'],
      u: ['bunk', 'bump', 'bust', 'dump', 'dunk', 'fund', 'funk', 'gust', 'gunk', 'hunt', 'junk', 'just', 'lump', 'must', 'pump', 'rust', 'runt', 'sunk', 'tuft', 'tusk', 'husk', 'dust', 'dusk']
    },
    ccvcc: {
      a: ['brand', 'blank', 'clamp', 'cramp', 'crank', 'drank', 'flank', 'frank', 'plank', 'prank', 'stamp', 'stand', 'strand', 'tract', 'scrap', 'swank'],
      e: ['blend', 'blent', 'strep', 'trend', 'swept', 'stent'],
      i: ['blink', 'brink', 'clink', 'clint', 'crimp', 'drink', 'drift', 'print', 'sprint', 'strip', 'strict', 'shrink', 'script', 'twist', 'flint', 'shrimp', 'splint', 'swift'],
      o: ['frost', 'stomp', 'strong', 'throb', 'throng', 'swamp', 'prong', 'prompt', 'clomp', 'chomp', 'clonk'],
      u: ['blunt', 'brunt', 'clump', 'clunk', 'crust', 'drunk', 'flung', 'frump', 'grunt', 'plump', 'plunk', 'skunk', 'stump', 'strut', 'trunk', 'trust', 'strum', 'stunt', 'skulk', 'spunk', 'slump']
    },
    digraphs: {
      a: ['chat', 'chap', 'than', 'that', 'math', 'hang', 'bang', 'rang', 'cash', 'dash', 'stash', 'trash', 'patch', 'catch', 'match', 'batch', 'rash', 'sash'],
      e: ['shed', 'them', 'then', 'fetch', 'bench', 'retch', 'ketch', 'stretch', 'sketch', 'drench', 'flesh', 'fresh'],
      i: ['chip', 'chin', 'thin', 'thing', 'king', 'ring', 'sing', 'wing', 'sting', 'bring', 'cling', 'string', 'swing', 'ditch', 'pitch', 'switch', 'twitch'],
      o: ['shop', 'shot', 'chop', 'strong', 'throb', 'cloth', 'crotch', 'notch', 'botch'],
      u: ['shut', 'thud', 'chug', 'chunk', 'thump', 'shrug', 'brush', 'crush', 'blush', 'flush', 'crutch', 'clutch']
    },
    extended: {
      a: ['fantastic', 'smashing', 'crashing', 'dancing', 'stamping', 'clapping'],
      e: ['wrecking'],
      i: ['blinking', 'drinking', 'tripping', 'flipping', 'snipping'],
      o: ['blocking', 'rocking'],
      u: ['jumping']
    }
  };

  const audioPath = './audio/';
  const letterSounds = {};
  const digraphs = ['sh', 'th', 'ch', 'ng'];
  'abcdefghijklmnopqrstuvwxyz'.split('').concat(digraphs).forEach(sound => {
    letterSounds[sound] = new Audio(`${audioPath}${sound}.mp3`);
  });
  const uiSounds = {
    click: new Audio(`${audioPath}click.mp3`),
    success: new Audio(`${audioPath}success.mp3`)
  };

  /* === State === */
  let state = {
    score: 0,
    revealedWords: 0,
    totalWords: 0,
    usedWords: [],
    currentWord: '',
    blendingTime: 3000,
    soundsEnabled: true
  };

  /* === DOM Elements === */
  const els = {
    spinButton: document.getElementById('spinButton'),
    repeatButton: document.getElementById('repeatButton'),
    wordBox: document.getElementById('wordBox'),
    scoreText: document.getElementById('scoreValue'),
    scoreIncrement: document.getElementById('scoreIncrement'),
    progressText: document.getElementById('progressText'),
    progressFill: document.getElementById('progressFill'),
    progressIcon: document.getElementById('progressIcon'),
    complimentBox: document.getElementById('complimentBox'),
    vowelSelector: document.getElementById('vowelSelector'),
    wordTypeSelector: document.getElementById('wordTypeSelector'),
    toggleAudioButton: document.getElementById('toggleAudioButton'),
    blendingTimeDisplay: document.getElementById('blendingTimeDisplay'),
    increaseTime: document.getElementById('increaseBlendingTime'),
    decreaseTime: document.getElementById('decreaseBlendingTime'),
    blendingTimerContainer: document.getElementById('blendingTimerContainer'),
    blendingTimer: document.getElementById('blendingTimer'),
    fullscreenButton: document.getElementById('fullscreenButton'),
    toggleSettingsButton: document.getElementById('toggleSettingsButton'),
    advancedSettings: document.getElementById('advancedSettings')
  };

  const compliments = ['Great job!', 'Awesome!', 'You’re a star!', 'Fantastic!', 'Well done!'];

  /* === Speech Synthesis === */
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
    if (!voice || !speechSynthesis.speaking) return Promise.resolve();
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

  /* === Utilities === */
  const isVowel = letter => /[aeiou]/.test(letter);
  const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

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
    els.progressIcon.classList.add('star-animate');
    setTimeout(() => els.progressIcon.classList.remove('star-animate'), 500);
  }

  function showCompliment() {
    const compliment = compliments[Math.floor(Math.random() * compliments.length)];
    els.complimentBox.textContent = compliment;
    els.complimentBox.style.opacity = '1';
    speak(compliment);
    uiSounds.success.play();
    setTimeout(() => els.complimentBox.style.opacity = '0', 2000);
  }

  async function playSound(sound) {
    if (!state.soundsEnabled || !letterSounds[sound]) return;
    const audio = letterSounds[sound];
    audio.currentTime = 0;
    await audio.play();
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

  /* === Core Logic === */
  async function revealWord(word, isRepeat = false) {
    els.wordBox.innerHTML = '';
    const units = parseWord(word);
    units.forEach((unit, i) => {
      const span = document.createElement('span');
      span.textContent = unit.text;
      span.classList.add('letter');
      if (unit.isVowel) span.classList.add('vowel');
      if (unit.isDigraph) span.classList.add('digraph');
      span.style.animationDelay = `${i * 0.4}s`;
      els.wordBox.appendChild(span);
    });

    for (const unit of units) {
      await delay(400);
      await playSound(unit.text);
    }

    els.blendingTimerContainer.style.display = 'block';
    els.blendingTimer.style.width = '100%';
    els.blendingTimer.style.transition = `width ${state.blendingTime / 1000}s linear`;
    requestAnimationFrame(() => els.blendingTimer.style.width = '0%');
    await delay(state.blendingTime);
    els.blendingTimerContainer.style.display = 'none';

    await speak(word);
    if (!isRepeat) {
      showCompliment();
      updateScore();
      updateProgress();
    }
  }

  function getWords() {
    const type = els.wordTypeSelector.value;
    const vowel = els.vowelSelector.value;
    const group = wordGroups[type];
    return vowel === 'all' ? Object.values(group).flat() : group[vowel] || [];
  }

  function getRandomWord() {
    const words = getWords().filter(w => !state.usedWords.includes(w));
    if (!words.length) {
      alert('All words completed! Starting over.');
      resetGame(false);
      return getRandomWord();
    }
    const word = words[Math.floor(Math.random() * words.length)];
    state.usedWords.push(word);
    return word;
  }

  /* === Event Handlers === */
  async function spin() {
    els.spinButton.disabled = true;
    els.repeatButton.disabled = true;
    els.spinButton.innerHTML = '<span class="spin-icon-animate">🎡</span>';
    uiSounds.click.play();
    await delay(1000);
    els.spinButton.innerHTML = '🎡 Spin';

    state.currentWord = getRandomWord();
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

  function resetGame(updateTotal = true) {
    state.usedWords = [];
    state.revealedWords = 0;
    state.score = 0;
    state.currentWord = '';
    els.scoreText.textContent = '0';
    els.repeatButton.disabled = true;
    if (updateTotal) state.totalWords = getWords().length;
    updateProgress();
  }

  els.vowelSelector.addEventListener('change', () => resetGame(true));
  els.wordTypeSelector.addEventListener('change', () => resetGame(true));

  els.toggleAudioButton.addEventListener('click', () => {
    state.soundsEnabled = !state.soundsEnabled;
    els.toggleAudioButton.textContent = state.soundsEnabled ? '🔇 Sounds Off' : '🔊 Sounds On';
  });

  els.increaseTime.addEventListener('click', () => {
    if (state.blendingTime < 7000) {
      state.blendingTime += 1000;
      els.blendingTimeDisplay.textContent = state.blendingTime / 1000;
    }
  });

  els.decreaseTime.addEventListener('click', () => {
    if (state.blendingTime > 1000) {
      state.blendingTime -= 1000;
      els.blendingTimeDisplay.textContent = state.blendingTime / 1000;
    }
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
    els.toggleSettingsButton.textContent = isVisible ? 'Advanced Settings' : 'Hide Settings';
    els.toggleSettingsButton.setAttribute('aria-expanded', !isVisible);
    els.advancedSettings.setAttribute('aria-hidden', isVisible);
  });

  /* === Initialization === */
  (async () => {
    await initSpeech();
    resetGame(true);
    Object.values(letterSounds).concat(Object.values(uiSounds)).forEach(audio => audio.load());
    els.spinButton.addEventListener('click', spin);
    els.repeatButton.addEventListener('click', repeat);
  })();
});
