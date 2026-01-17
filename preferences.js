// preferences.js

// This file manages game preferences using localStorage

class Preferences {
    constructor() {
        this.preferencesKey = 'gamePreferences';
    }

    // Save preferences to localStorage
    savePreferences(preferences) {
        localStorage.setItem(this.preferencesKey, JSON.stringify(preferences));
    }

    // Load preferences from localStorage
    loadPreferences() {
        const storedPreferences = localStorage.getItem(this.preferencesKey);
        return storedPreferences ? JSON.parse(storedPreferences) : {};
    }

    // Reset preferences to default
    resetPreferences() {
        localStorage.removeItem(this.preferencesKey);
    }
}

// Example usage:
// const gamePreferences = new Preferences();
// gamePreferences.savePreferences({ sound: true, difficulty: 'medium' });
// console.log(gamePreferences.loadPreferences());
