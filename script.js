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
longVowel: {
    a_e: [
      'spade','mate','game','afraid',
      'bake','gave','way','grey',
      'rake','great','holiday','Gayle',
      'may','clay','wake','weight',
      'baked','holidays','played','amazed',
      'stayed','stay','against','they'
    ],
    ea_ee: [
      'people','need','eagle','funny','meet',
      'breeze','maybe','breathe','puppy','lazy',
      'leaf','tree','meat','grumpy','peek',
      'released','speaking','revealed','happy','valley',
      'seat','thief','create','believe','seized',
      'green','three','clean','hungry','gleam'
    ],
    igh_ie: [
      'find','right','flight','skies','sight',
      'five','try','height','finally','dive',
      'kind','why','fly','myself','direct',
      'light','by','flies','wild','directly',
      'night','my','ride','realise','quite',
      'live','white','mild','realise','delighted'
    ],
    o_e_ow: [
      'go','Owen','drove','though','both',
      'so','low','home','hoped','nose',
      'ago','envelope','propose','floated','only',
      'Joan','won’t','wrote','don’t','close',
      'know','show','own','owned','spoke',
      'road','cove','Rowan','hope','own'
    ],
    oo: [
      'food','soon','bedroom','receive','special',
      'mood','swoop','move','place','especially',
      'room','cool','movie','face','office',
      'suit','truth','soup','decided','distance',
      'through','true','flew','exciting','receipt',
      'cockatoo','kangaroo','grew','chew','blew'
    ]
  }
};

// —————————————— Patterns & State ——————————————
const vowelPatterns = ['igh','ea','ee','ey','ow','oa','ie','ou','ue'];
const state = {
  usedWords: new Set(),
  totalWords: 0,
  currentWord: null,
  score: 0,
  blendingTime: 3000,
  wordType: 'longVowel'
};

// —————————————— DOM Refs ——————————————
const els = {
  spin:    document.getElementById('spinButton'),
  repeat:  document.getElementById('repeatButton'),
  wordBox: document.getElementById('wordBox'),
  stars:   [...document.querySelectorAll('.star')],
  timer:   document.getElementById('balloonTimer'),
  toggle:  document.getElementById('toggleSettingsButton'),
  settings:document.getElementById('advancedSettings'),
  wordTypeSelector: document.getElementById('wordTypeSelector'),
  blendingTimeInput:document.getElementById('blendingTimeInput')
};

// —————————————— Utility Functions ——————————————
const delay = ms => new Promise(r=>setTimeout(r,ms));

// Parse into units, detect multi-letter vowel clusters & tip
function parseWord(word) {
  const units = [];
  let i = 0;
  while (i < word.length) {
    // check 3-letter patterns first
    const tri = word.slice(i,i+3).toLowerCase();
    if (vowelPatterns.includes(tri)) {
      units.push({ text: tri, tip: tri[0], isVowel:true, isLongVowel:true });
      i += 3;
      continue;
    }
    // then 2-letter
    const duo = word.slice(i,i+2).toLowerCase();
    if (vowelPatterns.includes(duo)) {
      units.push({ text: duo, tip: duo[0], isVowel:true, isLongVowel:true });
      i += 2;
      continue;
    }
    // single letter
    const letter = word[i];
    units.push({ text: letter, isVowel:/[aeiou]/i.test(letter) });
    i++;
  }
  return units;
}

// Pick a random word from the selected group
function getAvailableWords() {
  if (state.wordType === 'longVowel') {
    // flatten all subgroups
    return Object.values(wordGroups.longVowel).flat();
  } else {
    return Object.values(wordGroups[state.wordType]).flat();
  }
}

function getRandomWord() {
  const pool = getAvailableWords().filter(w=>!state.usedWords.has(w));
  if (!pool.length) state.usedWords.clear();
  const word = pool[Math.floor(Math.random()*pool.length)];
  state.usedWords.add(word);
  return word;
}

// Animate star meter
function updateStars() {
  const idx = state.usedWords.size - 1;
  if (idx < els.stars.length) {
    els.stars[idx].classList.add('filled');
  }
}

// Animate balloon timer
function startTimer() {
  els.timer.style.animation = 'none';
  void els.timer.offsetWidth;
  els.timer.style.animation = `deflate ${state.blendingTime}ms linear forwards`;
}

// Reveal and speak the word
async function reveal(word, isRepeat=false) {
  els.wordBox.innerHTML = '';
  const units = parseWord(word);
  units.forEach((u,i)=>{
    const span = document.createElement('span');
    span.textContent = u.text;
    span.classList.add('letter');
    if (u.tip) span.dataset.tip = u.tip;
    span.style.animationDelay = `${i*0.4}s`;
    els.wordBox.appendChild(span);
  });

  startTimer();
  await delay(state.blendingTime);

  if (!isRepeat) {
    updateStars();
    if (state.usedWords.size === getAvailableWords().length) resetGame();
  }
}

// Reset for a fresh session
function resetGame() {
  state.usedWords.clear();
  els.stars.forEach(s => s.classList.remove('filled'));
}

// Event handlers
els.spin.addEventListener('click',async()=>{
  const w = getRandomWord();
  state.currentWord = w;
  els.repeat.disabled = false;
  await reveal(w);
});
els.repeat.addEventListener('click',()=> reveal(state.currentWord, true));

// Toggle teacher settings
els.toggle.addEventListener('click',()=>{
  const show = els.toggle.getAttribute('aria-expanded') === 'false';
  els.toggle.setAttribute('aria-expanded', show);
  els.settings.hidden = !show;
});

// Sync settings
els.wordTypeSelector.addEventListener('change', e=>{
  state.wordType = e.target.value;
  resetGame();
});
els.blendingTimeInput.addEventListener('change',e=>{
  state.blendingTime = Number(e.target.value)*1000;
});


// Initial
resetGame();
