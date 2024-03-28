//word array
const words = [
    { word: 'apple', hint: 'A fruit' },
    { word: 'devilish', hint: 'being bad' },
    { word: 'possessed', hint: 'feeling a bit different' },
    { word: 'unhallowed', hint: 'the ground I walk upon' }, //doom is satanic, I am not, just for the theme 
    { word: 'fiendish', hint: 'feeling summoned from below' },
    { word: 'kittens', hint: 'purrfect bunch of furballs' },
    { word: 'mango', hint: 'a fruit or a Chris Kattan character' },
    { word: 'fortuitous', hint: 'feeling lucky?' },
    { word: 'banana', hint: 'a yellow fruit' },
    { word: 'vancouver', hint: 'big city near Burnaby' },
    { word: 'squirrelled', hint: ' to put away; the longest one-syllable word in the English language' },
    //{ word: 'pneumonoultramicroscopicsilicovolcanoconiosis', hint: 'a lung disease caused by inhaling very fine silicate or quartz dust'}
  ];
  
  let selectedWord = '';
  let guessedLetters = [];
  let wrongGuesses = 0;
  
  // Select a random word from the list
  function selectWord() {
    const randomIndex = Math.floor(Math.random() * words.length);
    selectedWord = words[randomIndex].word;
    document.getElementById('categoryName').textContent = `Hint: ${words[randomIndex].hint}`;
  }
  
  // Reset the game to the initial state
  function resetGame() {
    selectWord();
    guessedLetters = [];
    wrongGuesses = 0;
    document.getElementById('guessWrapper').textContent = '_ '.repeat(selectedWord.length);
    document.getElementById('wrongLetters').textContent = 'Forbidden Text:\n';
    document.getElementById('head01').src = '../images/head01.png';
    const healthBar = document.querySelector('.bar');
    healthBar.style.width = '100%';
    healthBar.style.background = 'rgb(0, 255, 0)';
    const healthBarHit = document.querySelector('.hit ');
    healthBarHit.style.width = '0';
    document.body.style.background = 'url(../images/background.jpg) no-repeat center fixed , black';
    document.body.style.backgroundSize = 'cover'; 
    document.querySelectorAll('#keyboard button.selected').forEach(button => {
        button.classList.remove('selected');
    });
    if (audio) {
        audio.pause();
        audio.currentTime = 0;
    }
 
}

// Update the head and health bar
function updateHeadAndHealthBar() {
 
    document.getElementById('head01').src = `../images/head0${wrongGuesses + 1}.png`;
    const healthBar = document.querySelector('.bar');
    const healthBarHit = document.querySelector('.bar .hit');
    const healthPercentage = Math.min(100, (wrongGuesses / 7) * 100); 
    healthBarHit.style.width = `${healthPercentage}%`;
   
    if (wrongGuesses <= 2) {
        healthBar.style.background = 'rgb(0, 255, 0)'; // green
    } else if (wrongGuesses <= 3) {
        healthBar.style.background = 'rgb(255, 255, 0)'; // yellow
    } else if (wrongGuesses <= 4) {
        healthBar.style.background = 'rgb(255, 165, 0)'; // orange
    } else {
        healthBar.style.background = 'rgb(255, 0, 0)'; // red
    }
}

//audio
let audio;

  function playIncorrectGuessSound() {
    audio = new Audio('../sounds/classic_hurt.mp3');
    audio.play();
  }
  function playErrorSound() {
    audio = new Audio('../sounds/windows-95-error-sound-effect.mp3');
    audio.play();
  }

  function playVictorySound() {
    audio = new Audio('../sounds/doom-music.mp3');
    audio.play();
  }

  function playLossSound() {
    audio = new Audio('../sounds/losing_horn.mp3');
    audio.play();
  }
  function playCorrectSound() {
    audio = new Audio('../sounds/beep-select-sound-mp3.mp3');
    audio.play();
  }


  //on-screen keyboard


const keyboardContainer = document.getElementById('keyboard');
const rows = ['qwertyuiop', 'asdfghjkl', 'zxcvbnm'];

rows.forEach(row => {
    const rowDiv = document.createElement('div');
    row.split('').forEach(letter => {
        const button = document.createElement('button');
        button.textContent = letter.toUpperCase();
        button.addEventListener('click', () => {
            button.classList.add('selected');
            handleGuess(letter);
        });
        rowDiv.appendChild(button);
    });
    keyboardContainer.appendChild(rowDiv);
});

  
// handle guessing

  function handleGuess(letter) {
    letter = letter.toLowerCase();
    if (!/^[a-z]$/i.test(letter)) {
        playErrorSound();
        return;
    }
    if (letter && !guessedLetters.includes(letter)) {
      guessedLetters.push(letter);
      if (selectedWord.includes(letter)) {
       
        let displayedWord = '';
        for (const letter of selectedWord) {
          displayedWord += guessedLetters.includes(letter) ? `${letter} ` : '_ ';
          playCorrectSound();
        }
        document.getElementById('guessWrapper').textContent = displayedWord;
       

        if (!displayedWord.includes('_')) {
            document.body.style.background = 'url(../images/background.gif)no-repeat center fixed , black';
            document.body.style.backgroundSize = 'cover'; 
            showVictoryPopup();
            playVictorySound()
            
        }
      } else {
        wrongGuesses++;
        document.getElementById('wrongLetters').textContent += `${letter}  `;
        updateHeadAndHealthBar();
        playIncorrectGuessSound();
        const mainElement = document.querySelector('main');
        mainElement.classList.add('main-hit');
        setTimeout(() => mainElement.classList.remove('main-hit'), 150);

        if (wrongGuesses === 7) {
            document.body.style.background = 'url(../images/background.gif)no-repeat center fixed, black';
            document.body.style.backgroundSize = 'cover'; 
            showLossPopup();
            playLossSound();
            
        }
      }
    }
   
  }
  
  // Event listeners
document.getElementById('playAgainVictory').addEventListener('click', () => {
    document.getElementById('victoryPopup').style.display = 'none';
    resetGame();
});

document.getElementById('playAgainLoss').addEventListener('click', () => {
    document.getElementById('lossPopup').style.display = 'none';
    resetGame();
});

function showVictoryPopup() {
    document.getElementById('victoryPopup').style.display = 'block';
}

function showLossPopup() {
     document.getElementById('lossPopup').style.display = 'block';
}
document.getElementById('newGame').addEventListener('click', resetGame);
resetGame();
