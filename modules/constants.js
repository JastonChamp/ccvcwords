export const DEBUG = false;
export const debugLog = (...args) => {
    if (DEBUG) console.log(...args);
};
export const WORD_GROUPS = {
    cvc: { a: [ 'bat', 'cat', ... ],
    ccvc: { a: ['brag', 'clap', ... ],
    cvcc: { a: ['band', 'bank', ... ],
    ccvcc: { a: ['brand', 'clamp', ... ],
    digraphs: { a: ['chat', 'chap', ... ],
    extended: { a: ['fantastic', 'smashing', ... ],
    silentE: { a: ['spade', 'mate', ... ] },
};
export const DIGRAPHS = ['sh', 'th', 'ch', 'ng'];
export const COMPLIMENTS = ['Great Job!', 'Awesome!', 'You\'re a Star!', 'Well Done!', 'Fantastic!'];
export const BADGE_NAMES = {
    cvc: 'CVC Star',
    ccvc: 'CCVC Hero',
    cvcc: 'CVCC Champ',
    ccvcc: 'CCVCC Master',
    digraphs: 'Digraph Ace',
    extended: 'Word Wizard',
    silentE: 'Silent E Expert'
};
export const CONFIG = {
    BLENDING_TIME_MIN: 1000,
    BLENDING_TIME_MAX: 7000,
    BLENDING_TIME_DEFAULT: 3000,
    CONFETTI_COUNT: 20,
    FIREWORK_COUNT: 15,
    CONFETTI_LIFETIME_MS: 3000,
    FIREWORK_LIFETIME_MS: 1500,
    ANIMATION_DELAY_MS: 400,
    ANNOUNCEMENT_DURATION_MS: 1000,
    SCORE_INCREMENT_DURATION_MS: 800,
    ICON_ANIMATION_DURATION_MS: 1000,
    FEMALE_VOICE_INDICATORS: ['female', 'samantha', 'kate', 'victoria', 'alice', 'moira', 'tessa', 'zira'],
    SPEECH_PITCH: 1.3,
    SPEECH_RATE: 0.7,
    SPEECH_DELAY_MS: 100
};