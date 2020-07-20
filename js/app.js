/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */

const game = new Game();
// Event listener for start button to play
document.querySelector('#btn__reset').addEventListener('click', () => {
    game.startGame();
});

// Event listener for mouse click on qwerty panel
document.querySelector('#qwerty').addEventListener('click', (e) => {
    // Event delegation
    if (e.target.tagName === 'BUTTON') {
        game.handleInteraction(e.target);
    }
});
// Event listener for keypressing
document.addEventListener('keypress', (e) => {
    // Array formated Key Buttons NodeList to use array' find method
    const keys = [...document.querySelectorAll('#qwerty button.key')];
    // Only when game is started and listening a-z press keys only
    if (game.activePhrase !== null && /^[a-z]$/i.test(e.key)) {
        const keyBtn = keys.find(key => key.textContent === e.key.toLowerCase());
        game.handleInteraction(keyBtn);
    }


});