/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */

 class Phrase {
     constructor(phrase) {
        this.phrase = [...phrase.toLowerCase()];
     }
     /**
      * Adds letter placeholders to the display when the game starts
      * Creating an <li> element for each letter with its respective classes and textContent
      * and appending them to the <ul> element inside phrase section at index.html.
      */
     addPhraseToDisplay() {
        const ul = document.querySelector('#phrase ul');

        this.phrase.forEach(letter => {
            const li = document.createElement('li');
            if (letter === ' ') {
                li.classList.add('space')
            } else {
                li.classList.add('hide');
                li.classList.add('letter');
                li.classList.add(`${letter}`);
            }
            li.textContent = letter;
            ul.appendChild(li);
        });
     }

     /**
      * Checks to see if the letter selected by the player matches a letter in the phrase
      * and call to show letter(s) in phrase board
      * @param {String} letterInput Letter pressed
      */
     checkLetter(letterInput) {
         let matches = false;
         this.phrase.forEach((letter, index) => {
            if (letter === letterInput) {
                this.showMatchedLetter(index);
                matches = true;
            } 
         });

         return matches;
     }
     
     /**
      * Reveals the letter(s) on the board that matches the player's selection. 
      * @param {Int} index Letter index in phrase array 
      */
     showMatchedLetter(index) {
        const letters = document.querySelectorAll('#phrase li');
        letters[index].classList.remove('hide');
        letters[index].classList.add('show');

     }

 }