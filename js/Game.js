/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */

class Game {
    constructor() {
        this.missed = 0;
        this.phrases = [
            new Phrase('Just keep swimming'),
            new Phrase('May the Force be with you'),
            new Phrase('Love means never having to say you are sorry'),
            new Phrase('Even the smallest person can change the course of the future'),
            new Phrase('The needs of the many outweigh the needs of the few')
        ];
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
        function keyMotion(element,heart) {
            const clone = element.cloneNode(true);
            const parent = document.querySelector('.main-container');
            element.parentNode.appendChild(clone);

            const cloneLeft = element.offsetLeft - parent.offsetLeft;
            const cloneTop = element.offsetTop - parent.offsetTop;
    
            clone.style.left = `${cloneLeft}px`;
            clone.style.top = `${cloneTop}px`;

            const moveTop = heart.offsetTop - parent.offsetTop;
            const moveLeft = heart.offsetLeft - parent.offsetLeft;

            clone.style.setProperty('--tx1', (cloneLeft - 40) + 'px');
            clone.style.setProperty('--ty1', (cloneTop + 30) + 'px');
            clone.style.setProperty('--tx2', moveLeft + 'px');
            clone.style.setProperty('--ty2', moveTop + 'px');

            clone.classList.add('clone');
            element.classList.add('wrong');
        }
        if (!element.classList.contains('wrong') && !element.classList.contains('wrong')){
        if (!this.activePhrase.checkLetter(element.textContent)) {
            keyMotion(element, document.querySelectorAll('li.tries img')[4 - this.missed]);
            setTimeout(() => {
                const lostKey = document.querySelector('button.clone');
                lostKey.parentNode.removeChild(lostKey);
                this.removeLife();
            }, 900);
        } else {
            element.classList.add('chosen');
            this.checkForWin();
        }
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
            this.gameOver('May the luck be with you next time', false);
        }
    }

    /**
     * Checks to see if the player has revealed all of the letters in the active phrase.
     */
    checkForWin() {
        const phraseHTML = document.querySelectorAll('#phrase li.show');
        const letters = this.activePhrase.phrase.reduce((total, letter) => {
            if (letter !== ' ') {
                total += 1;
            }
            return total
        }, 0);

        if (phraseHTML.length === letters) {
            this.gameOver("You rock it!", true);
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
        
        const messageFinish = document.querySelector('#game-over-message')
        messageFinish.textContent = message;
        if (winClass) {
            overlay.className = 'win';
            const phraseP = document.createElement('h3');
            let phraseToShow = this.activePhrase.phrase.join('');
            phraseToShow = phraseToShow.charAt(0).toUpperCase() + phraseToShow.slice(1);
            phraseP.textContent = `"${phraseToShow}"`;
            overlay.insertBefore(phraseP, messageFinish)
        } else {
            overlay.className = 'lose';
        }
        
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