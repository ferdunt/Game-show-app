// *** VARIABLES ***
const qwerty = document.querySelector('#qwerty');
const phrase = document.querySelector('#phrase');
let missed = 0;
const startButton = document.querySelector('.btn__reset');


// const phrases = [
//     'Dream plan do',
//     'Decisions determine destiny',
//     'Seek magic everyday',
//     'Be the exeception',
//     'Find your fire'
// ];

const phrases = [
    'hola',
    'adios'
];

//  *** EVENT HANDLERS ***
startButton.addEventListener('click', () => {
    startButton.parentElement.style.display = 'none';
});

// Respond to clicks from keyboard
qwerty.addEventListener('click', (e) => {
    let button = e.target;
    const ul = document.getElementById('try');

    if (button.tagName === 'BUTTON') {
        button.className = 'chosen';
        button.setAttribute('disabled', '');
        let letterFound = checkLetter(button.textContent);

        if (letterFound === null) {
            // TODO avoid to remove when there is no more tries
            if (missed < 5) {
                const firstTry = document.querySelector('.tries');
                firstTry.remove();
                missed++;
            }

        }
    }
    checkWin();
});

// *** FUNCTIONS ***

// Select and return a random phrase from an array
function getRandomPhraseAsArray(arr) {
    let randomPhrase = Math.floor(Math.random() * arr.length);
    let chosenPhrase = arr[randomPhrase].split('');
    return chosenPhrase;
}

// Display the phrase selected to the screen
function addPhraseToDisplay(arr) {
    for (let i = 0; i < arr.length; i++) {
        const li = document.createElement('li');
        if (arr[i] !== ' ') {
            li.className = 'letter'
        }
        li.textContent = arr[i];

        phrase.firstElementChild.appendChild(li);
    }
}

// Compare the keyword pressed and the
function checkLetter(buttonClicked) {
    const letters = document.querySelectorAll('.letter');
    let match = null;
    for (let i = 0; i < letters.length; i++) {
        if (buttonClicked === letters[i].textContent) {
            match = letters[i].textContent;
            letters[i].className += ' show';
        }
    }

    if (match !== undefined) {
        return match;
    } else {
        return null;
    }

}

// Check if the player won or lost
function checkWin() {
    const classShow = document.querySelectorAll('.show');
    const classLetter = document.querySelectorAll('.letter');
    const overlay = document.querySelector('#overlay');
    const title = document.querySelector('.title');
    if (classShow.length === classLetter.length) {
        overlay.style.display = 'flex';
        overlay.className = 'win';
        title.textContent = 'You Win!'
    } else if (missed >= 5) {
        overlay.style.display = 'flex';
        overlay.className = 'lose';
        title.textContent = 'You Lose!'
    }
}

// *** EXECUTION ***
const phraseArray = getRandomPhraseAsArray(phrases);
console.log(phraseArray);
addPhraseToDisplay(phraseArray);








