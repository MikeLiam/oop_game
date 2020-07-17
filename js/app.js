/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */

const game = new Game();

document.querySelector('#btn__reset').addEventListener('click', () => {
    game.startGame();
});

document.querySelector('#qwerty').addEventListener('click', (e) => {
    // Event delegation
    if (e.target.tagName === 'BUTTON') {
        game.handleInteraction(e.target);
    }
});

document.addEventListener('keypress', (e) => {
    // Array formated Key Buttons NodeList to use array' find method
    const keys = [...document.querySelectorAll('#qwerty button.key')];
    // Only when game is started and listening a-z press keys only
    if (game.activePhrase !== null && /^[a-z]$/i.test(e.key)) {
        const keyBtn = keys.find(key => key.textContent === e.key.toLowerCase());
        keyBtn.focus();
        game.handleInteraction(keyBtn);
    }


});