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
     * Hides the start screen overlay, gets a random phrase and adds into the board.
     */
    startGame() {
        document.querySelector('#overlay').style.display = 'none';
        this.getRandomPhrase();
        this.activePhrase = this.getRandomPhrase();

        this.activePhrase.addPhraseToDisplay();
    }

    /**
     * Randomly retrieves one of the phrase objects stored in the phrase objects array and returns it.
     */
    getRandomPhrase() {
        return this.phrases[Math.floor(Math.random() * 5)];
    }

    /**
     * Checks to see if the button clicked 'element' by the player matches a letter in the phrase, 
     * and then directs the game based on a correct or incorrect guess
     * @param {HTMLElement} element 
     */
    handleInteraction(element) {
        /**
         * Add animation showing how the incorrect 'element' letter takes away a 'heart' lifeHeart
         * @param {HTMLElement} element 
         * @param {HTMLElement} heart 
         */
        function keyMotion(element, heart) {
            // Clone the incorrect letter and add it to the qwerty
            const clone = element.cloneNode(true);
            const parent = document.querySelector('.main-container');
            element.parentNode.appendChild(clone);
            // letter' offset left/top taking care of container offset
            const cloneLeft = element.offsetLeft - parent.offsetLeft;
            const cloneTop = element.offsetTop - parent.offsetTop;
            // place clone
            clone.style.left = `${cloneLeft}px`;
            clone.style.top = `${cloneTop}px`;
            // lifeheart to take away' offset left/top taking care of container offset
            const moveTop = heart.offsetTop - parent.offsetTop;
            const moveLeft = heart.offsetLeft - parent.offsetLeft;
            // Animation in two steps with css variables
            clone.style.setProperty('--tx1', (cloneLeft - 40) + 'px');
            clone.style.setProperty('--ty1', (cloneTop + 30) + 'px');
            clone.style.setProperty('--tx2', moveLeft + 'px');
            clone.style.setProperty('--ty2', moveTop + 'px');
            // class for animation in clone
            clone.classList.add('clone');
            // class wrong in qwerty element
            element.classList.add('wrong');
        }
        // Prevent pressing a pressed key
        if (!element.classList.contains('wrong') && !element.classList.contains('chosen')) {
            // Handle letter included in phrase
            if (!this.activePhrase.checkLetter(element.textContent)) {
                // Animation for incorrect letter
                keyMotion(element, document.querySelectorAll('li.tries img')[4 - this.missed]);
                // Coordinates changing life with incorrect letter animation 
                // and delete cloned element at the end.
                setTimeout(() => {
                    const lostKey = document.querySelector('button.clone');
                    lostKey.parentNode.removeChild(lostKey);
                    this.removeLife();
                }, 900);
            } else {
                // Coorect letter and check if player win
                element.classList.add('chosen');
                this.checkForWin();
            }
        }
    }

    /**
     * Removes a life from the scoreboard changing 'liveHeart.png' for 'lostHeart.png'.
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
     * Checks to see if the player has revealed all of the letters in the active phrase
     * comparing number of elements <li> of letter with class '.show' with length of 
     * active phrase without spaces.
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
     * add a <h3> element to show the prhase if it is guessed,
     * replaces the overlay’s start CSS class with either the win or lose CSS class,
     * call resetGame for next play
     * @param {String} message 
     * @param {Boolean} winOrNot 
     */
    gameOver(message, winOrNot) {
        const overlay = document.querySelector('#overlay');
        overlay.style.display = '';

        const messageFinish = document.querySelector('#game-over-message')
        messageFinish.textContent = message;
        if (winOrNot) {
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
        // Reset active phrase
        this.activePhrase = null;
        // Reset to key class all on screen keyboard buttons
        [...document.querySelectorAll('#qwerty button.key')].forEach(element => element.className = 'key');
        // Remove phrase to guess elements
        [...document.querySelectorAll('#phrase li')].forEach(li => li.parentNode.removeChild(li));
        // Reset all hearts
        [...document.querySelectorAll('li.tries img')].forEach(heart => heart.setAttribute('src', "images/liveHeart.png"));
    }
}