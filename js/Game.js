/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */

class Game {
    constructor() {
        this.missed = 0;
        this.phrases = [
            new Phrase('Toni es un pajaro de cuidado'), 
            new Phrase('Lo siento pero el Mallorca desciende'), 
            new Phrase('Armando ponme algo'), 
            new Phrase('Hala Madrid'), 
            new Phrase('Una estrella garcia por favor')];
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

    /**
     * Checks to see if the button clicked by the player matches a letter in the phrase, 
     * and then directs the game based on a correct or incorrect guess
     */
    handleInteraction(element) {
        if (!this.activePhrase.checkLetter(element.textContent)) {
            element.classList.add('wrong');
            this.removeLife();
        } else {
            element.classList.add('chosen');
            this.checkForWin();
        }
    }

    /**
     * Removes a life from the scoreboard.
     * If the player has five missed guesses (i.e they're out of lives), 
     * then end the game by calling the gameOver() method.
     */
    removeLife() {
        if (this.missed < 4) {
            document.querySelectorAll('li.tries img')[4 - this.missed].setAttribute('src', "images/lostHeart.png");
            this.missed += 1;
        } else {
            this.gameOver('Eres un cule!', false);
        }
    }

    /**
     * Checks to see if the player has revealed all of the letters in the active phrase.
     */
    checkForWin() {
        const phraseHTML = document.querySelectorAll('#phrase li.show');
        const letters = this.activePhrase.phrase.reduce((total, letter) => {
            if(letter !== ' ') {
                total += 1;
            }
            return total
        }, 0);

        if(phraseHTML.length === letters) {
            this.gameOver("Eres un fenomeno!", true);
        }

    }

    /**
     * displays the original start screen overlay, and depending on the outcome of the game, 
     * updates the overlay h1 element with a friendly win or loss message, 
     * and replaces the overlay’s start CSS class with either the win or lose CSS class.
     */
    gameOver(message, winClass) {
        const overlay = document.querySelector('#overlay');
        overlay.style.display = '';
        overlay.className = winClass ? 'win' : 'lose';
        document.querySelector('#game-over-message').textContent = message;
        this.resetGame();
    }

    /**
     * Reset gameboard
     */
    resetGame() {
        // Reset missed guess to 0
        this.missed = 0;    
        // Reset to key class all on screen keyboard buttons
        [...document.querySelectorAll('#qwerty button.key')].forEach(element => element.className = 'key');
        // Remove phrase to guess elements
        [...document.querySelectorAll('#phrase li')].forEach(li => li.parentNode.removeChild(li));
        // Reset all hearts
        [...document.querySelectorAll('li.tries img')].forEach(heart => heart.setAttribute('src', "images/liveHeart.png"));
    }
}