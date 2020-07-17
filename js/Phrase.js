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
      * checks to see if the letter selected by the player matches a letter in the phrase.
      */
     checkLetter(letterInput) {
         let matches = false;
         this.phrase.forEach((letter, index) => {
            if (letter === letterInput) {
                this.showMatchedLetter(index);
                console.log(letter, index);
                matches = true;
            } 
         });
         console.log(this.phrase);

         return matches;
     }
     
     /**
      * reveals the letter(s) on the board that matches the player's selection. 
      */
     showMatchedLetter(index) {
        const letters = document.querySelectorAll('#phrase li');
        console.log(letters);
        letters[index].classList.remove('hide');
        letters[index].classList.add('show')
     }

 }