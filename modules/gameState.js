export const state = {
    score: 0,
    currentWord: '',
    theme: '',
    soundsEnabled: true,
    blendingTime: 0
};

export const setScore = (newScore) => {
    state.score = newScore;
};

export const setCurrentWord = (word) => {
    state.currentWord = word;
};

export const setTheme = (newTheme) => {
    state.theme = newTheme;
};

export const toggleSounds = () => {
    state.soundsEnabled = !state.soundsEnabled;
};

export const setBlendingTime = (time) => {
    state.blendingTime = time;
};