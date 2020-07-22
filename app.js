// *** VARIABLES ***
const qwerty = document.querySelector('#qwerty');
const phrase = document.querySelector('#phrase');
const startButton = document.querySelector('.btn__reset');
let missed = 0;
const phrases = [
    'dream plan do',
    'decisions determine destiny',
    'seek magic everyday',
    'be the exeception',
    'find your fire'
];

//  *** EVENT HANDLERS ***

// Execute the game
startButton.addEventListener('click', () => {

    startButton.parentElement.style.opacity = '0';

    // Set .9 seconds until hide the overlay
    setTimeout(() => {
        startButton.parentElement.style.display = 'none';
    }, 900);

    if (startButton.textContent === 'Play again') {
        // New game 
        missed = 0;

        // Delete the last phrase
        const oldLIList = Array.from(phrase.firstElementChild.children);

        oldLIList.forEach(li => {
            li.remove();
        });

        // Restart the keyboard
        const buttons = document.querySelectorAll('button');
        buttons.forEach(button => {
            button.removeAttribute('class');
            button.removeAttribute('disabled')
        });

        // Restart the scoreboard
        const tries = document.querySelectorAll('.tries');
        tries.forEach(item => {
            item.firstElementChild.src = "images/liveHeart.png";
            item.style.opacity = '1';
        });
    }

    // New phrase
    const phraseArray = getRandomPhraseAsArray(phrases);
    addPhraseToDisplay(phraseArray);

});

// Respond to clicks from keyboard
qwerty.addEventListener('click', e => {
    let button = e.target;

    if (button.tagName === 'BUTTON') {
        // button.className = 'chosen';
        button.setAttribute('disabled', '');
        let letterFound = checkLetter(button.textContent);

        // Insert a transform in the key selected
        button.style.transform = 'scale(1.3)';

        // Check if the word selected is incorrect
        if (letterFound === null) {
            if (missed < 5) {
                missed++;
                const tries = document.querySelectorAll('.tries');
                tries[missed - 1].style.opacity = 0.1;
                setTimeout(() => {
                    tries[missed - 1].firstElementChild.src = "images/lostHeart.png"
                    tries[missed - 1].style.opacity = '1';

                }, 200);
            }
            button.className = 'unchosen';
        } else {
            button.className = 'chosen';
        }
    }

    // Set .8 seconds until show the result
    setTimeout(() => {
        checkWin();
    }, 800);

});

// End the transform in the key selected
qwerty.addEventListener("transitionend", e => {
    if (e.propertyName !== 'transform') return;
    e.target.style.transform = '';
});

// *** FUNCTIONS ***

// Select and return a random phrase from an array
const getRandomPhraseAsArray = arr => {
    // Create a random # from 0 to the length of the array [arr]
    let randomPhrase = Math.floor(Math.random() * arr.length);

    // Return a phrase with index based on the randomPhrase 
    return chosenPhrase = arr[randomPhrase].split('');

}

// Display the phrase selected to the screen
const addPhraseToDisplay = arr => {
    for (let i = 0; i < arr.length; i++) {
        const li = document.createElement('li');
        if (arr[i] !== ' ') {
            li.className = 'letter';
        } else {
            li.className = 'space';
        }
        li.textContent = arr[i];

        phrase.firstElementChild.appendChild(li);
    }
}

// Compare the keyword pressed and the letters available
const checkLetter = buttonClicked => {
    // Get all the letters with class [.letter]
    const letters = document.querySelectorAll('.letter');
    let match = null;

    // Loop and compare each letter with the button selected
    for (let i = 0; i < letters.length; i++) {
        if (buttonClicked === letters[i].textContent) {
            match = letters[i].textContent;
            letters[i].className += ' show';
            // Insert an animation in the letter revealed
            letters[i].style.animation = 'shake 0.4s';
        }
    }

    // Return if it matched or not
    return (match !== undefined) ? match : null;

}

// Check if the player won or lost
const checkWin = () => {
    const classShow = document.querySelectorAll('.show');
    const classLetter = document.querySelectorAll('.letter');
    const title = document.querySelector('.title');

    function finalScore(result, message) {

        startButton.parentElement.className = result;
        startButton.parentElement.style.display = 'flex';

        setTimeout(() => {
            startButton.parentElement.style.opacity = '1';
        }, 400);

        title.textContent = message;
        startButton.textContent = 'Play again';
    }

    if (classShow.length === classLetter.length) {
        finalScore('win', 'You Win!');
    } else if (missed > 4) {
        finalScore('lose', 'You Lose!');
    }
}