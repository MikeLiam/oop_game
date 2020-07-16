/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */

 class Game {
    constructor() {
        this.missed = 0;
        this.phrases = [new Phrase('Hola'), new Phrase('Adios'), new Phrase('Hasta luego'), new Phrase('Que vaya bien'), new Phrase('Volveremos a vernos')];
        this.activePhrase = null;
    }

    /**
     * Hides the start screen overlay, gets a random phrase and adds itto the board.
     */
    startGame() {
        document.querySelector('#overlay').style.display = 'none';
        this.getRandomPhrase();
        this.activePhrase = this.getRandomPhrase();

        this.activePhrase.addPhraseToDisplay();
    }

    /**
     * randomly retrieves one of the phrase objects stored in the phrases array and returns it.
     */
    getRandomPhrase() {
        return this.phrases[Math.floor(Math.random() * 5)];
    }


 }