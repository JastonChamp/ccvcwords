console.log('Script loaded'); // Confirm script starts

document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM fully loaded'); // Confirm DOMContentLoaded fires

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
      a: ['brand', 'clamp', 'cramp', 'drank', 'flank', 'frank', 'plank', 'prank', 'slant', 'stamp', 'blast', 'craft', 'grant', 'plant', 'stand'],
      e: ['blend', 'fleck', 'flesh', 'spend', 'strep', 'swept', 'trend', 'bless', 'crept', 'dress', 'fresh', 'press', 'slept', 'smelt', 'spent'],
      i: ['blink', 'clink', 'crisp', 'drink', 'flint', 'print', 'slink', 'stink', 'twist', 'brisk', 'cling', 'fling', 'grift', 'shift', 'swift'],
      o: ['blond', 'chomp', 'frost', 'prompt', 'stomp', 'strong', 'throb', 'clonk', 'floss', 'gloss', 'gross', 'prong', 'scoff', 'snort', 'thong'],
      u: ['blunt', 'brunt', 'clump', 'crust', 'drunk', 'flung', 'grunt', 'plump', 'stump', 'trunk', 'brush', 'crush', 'flush', 'shrug', 'slush']
    },
    digraphs: {
      a: ['chat', 'chap', 'than', 'that', 'math', 'path', 'bash', 'cash', 'dash', 'lash', 'rash', 'shag', 'sham', 'thaw', 'wham'],
      e: ['shed', 'them', 'then', 'fetch', 'bench', 'check', 'chess', 'fresh', 'retch', 'sheep', 'sheet', 'shell', 'shred', 'theft', 'wrench'],
      i: ['chip', 'chin', 'thin', 'ship', 'shin', 'chick', 'chill', 'shift', 'shirt', 'thick', 'thing', 'whip', 'wish', 'chime', 'shine'],
      o: ['shop', 'shot', 'chop', 'shock', 'short', 'cloth', 'froth', 'notch', 'shod', 'show', 'sloth', 'thong', 'choke', 'phone', 'shore'],
      u: ['shut', 'thud', 'chug', 'chunk', 'thump', 'brush', 'crush', 'flush', 'shrug', 'blush', 'churn', 'shuck', 'stuck', 'thumb', 'whush']
    },
    extended: {
      a: ['fantastic', 'smashing', 'crashing', 'stamping', 'clapping', 'tracking', 'snapping', 'flashing', 'grabbing', 'slashing'],
      e: ['wrecking', 'spelling', 'pressing', 'dressing', 'fetching', 'stretching', 'checking', 'swelling', 'shedding', 'tempting'],
      i: ['blinking', 'drinking', 'tripping', 'flipping', 'snipping', 'skipping', 'swinging', 'chirping', 'slipping', 'twisting'],
      o: ['blocking', 'rocking', 'crossing', 'stopping', 'chopping', 'dropping', 'flopping', 'locking', 'shocking', 'trotting'],
      u: ['jumping', 'bumping', 'hunting', 'rushing', 'crushing', 'brushing', 'dumping', 'hugging', 'running', 'tugging']
    }
  };
  const digraphs = ['sh', 'th', 'ch', 'ng', 'wh'];
  const difficulties = {
    easy: { types: ['cvc'], baseTime: 6000, badgeThreshold: 5, successStreak: 3 },
    medium: { types: ['cvc', 'ccvc', 'cvcc'], baseTime: 4500, badgeThreshold: 10, successStreak: 4 },
    hard: { types: ['cvc', 'ccvc', 'cvcc', 'ccvcc', 'digraphs', 'extended'], baseTime: 3000, badgeThreshold: 15, successStreak: 5 }
  };
  const peteMessages = {
    spin: ['Let’s find a nest word!', 'Spin for Pete!', 'Here comes a word!'],
    blend: ['Say each sound slow!', 'Blend it for Pete!', 'Mix those sounds!'],
    success: ['Perfect! Pete’s nest grows!', 'You’re a blending hero!', 'Pete flaps for you!'],
    error: ['Oops, not quite!', 'Try again, Pete believes in you!', 'Close! Listen again!'],
    streak: ['Wow, three in a row!', 'Four perfect blends!', 'Five? You’re flying!'],
    voice: ['Speak louder, Pete’s listening!', 'Pete didn’t hear you, try again!', 'Say it clear for Pete!']
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
    maxStreak: 0,
    theme: 'default'
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
    themeSelector: document.querySelector('#themeSelector'),
    resetGame: document.querySelector('#resetGame'),
    tutorialModal: document.querySelector('#tutorialModal'),
    startTutorial: document.querySelector('#startTutorial'),
    skipTutorial: document.querySelector('#skipTutorial'),
    screenReaderAnnounce: document.querySelector('#screenReaderAnnounce'),
    captions: document.querySelector('#captions')
  };

  // Log all elements to check if they're found
  Object.entries(els).forEach(([key, value]) => {
    if (!value && key !== 'difficultyRadios' && key !== 'themeSelector') {
      console.warn(`Element "${key}" not found in DOM`);
    } else if (key === 'difficultyRadios') {
      console.log(`Found ${value.length} difficulty radios`);
    } else {
      console.log(`Found element: ${key}`);
    }
  });

  const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
  const randomItem = arr => arr[Math.floor(Math.random() * arr.length)];

  // Simple button test function
  const testButton = (buttonName) => {
    console.log(`${buttonName} button pressed`);
  };

  // Bind test function to all buttons
  els.spinButton.addEventListener('click', () => testButton('Spin'));
  els.sayButton.addEventListener('click', () => testButton('Say It!'));
  els.repeatButton.addEventListener('click', () => testButton('Repeat'));
  els.pauseButton.addEventListener('click', () => testButton('Pause'));
  els.soundToggle.addEventListener('click', () => testButton('Sound Toggle'));
  els.toggleSettingsButton.addEventListener('click', () => testButton('Toggle Settings'));
  els.resetGame.addEventListener('click', () => testButton('Reset Game'));
  els.startTutorial.addEventListener('click', () => testButton('Start Tutorial'));
  els.skipTutorial.addEventListener('click', () => testButton('Skip Tutorial'));

  console.log('Event listeners bound');
});
