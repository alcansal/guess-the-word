// an unorderedlist where guessed letters will appear
const guessedListLetters = document.querySelector(".guessed-letters"); 

// the guess button
const guessButton = document.querySelector(".guess");

// text input where the player will guess a letter
const letter = document.querySelector(".letter");

// paragraph with the class of word-in-progress
const wordInProgress = document.querySelector(".word-in-progress");

// paragraph where the remaining guesses will display
const guessesRemaining = document.querySelector("remaining");

// span inside the paragraph of the remaining guesses will display
const guessRemainingSpan = document.querySelector("span");

// an empty paragraph with the class of message
const message = document.querySelector(".message");

// the hidden button that will appear prompting the player to play again 
const playAgainButton = document.querySelector(".play-again");

// starting word to test out the game until setting up the fetch words from host page
let word = "magnolia";

// This array will contain all the letters the player has guessed 
const guessedLetters = [];

// Number of guesses the player will have guessing a word
let remainingGuesses = 8;


const getWord = async function () {
  const data = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
  const words = await data.text();
  const wordArray = words.split("\n");
  const randomIndex = Math.floor(Math.random() * wordArray.length);
  word = wordArray[randomIndex].trim();
  placeholder(word);
};

getWord();

const placeholder = function (word) {
  const placeholderLetters = [];
  for (let letter of word) {
    // console.log(letter);
    placeholderLetters.push("●");
  } 
  wordInProgress.innerText = placeholderLetters.join("");
};


guessButton.addEventListener("click", function (e) {
  e.preventDefault();
  const guess = letter.value;
  message.innerText = "";
  console.log(guess);
  goodGuess = playerInput(guess);
  
  if (goodGuess) {
    makeGuess(guess);
  }
  letter.value = "";
});

const playerInput = function (input) {
  const acceptedLetter = /[a-zA-Z]/;
  if (input.length === 0) {
    message.innerText = "Please enter a letter";
  } else if (input.length > 1) {
    message.innerText = "Please enter 1 letter";
  } else if (!input.match(acceptedLetter)) {
    message.innerText = "Please enter a letter from A to Z";
  } else {
    return input;
  }
};

const makeGuess = function (guess) {
  guess = guess.toUpperCase();
  if (guessedLetters.includes(guess)) {
    message.innerText = "You already guessed that letter silly. Try again.";
  } else {
    guessedLetters.push(guess);
    displayGuessedLetters();
    console.log(guessedLetters);
    countGuessesRemaining(guess);
    updateWords(guessedLetters);
  }
};

const displayGuessedLetters = function () {
  guessedListLetters.innerHTML = "";

  for (let letter of guessedLetters) {
    const li = document.createElement("li");
    li.innerText = letter;
    guessedListLetters.append(li);
  }
};

const updateWords = function (guessedLetters) {
  const wordUpper = word.toUpperCase();
  const wordArray = wordUpper.split("");
  const revealWord = [];
  for (let letter of wordArray) {
    if (guessedLetters.includes(letter)) {
      revealWord.push(letter.toUpperCase());
    } else {
      revealWord.push("●");
    }
  }
  wordInProgress.innerText = revealWord.join("");
  checkIfWin();
};

const countGuessesRemaining = function (guess) {
  const uppercaseWord = word.toUpperCase();
  if (!uppercaseWord.includes(guess)) {
    message.innerText = "Sorry try again, one chance down";
    remainingGuesses -= 1;
  } else {
    message.innerText = `Nice, the word has that letter. ${guess}`;
  }

  if (remainingGuesses === 0) {
    message.innerHTML = `Game over! The word was <span class="highlight">${word}</span>.`;
  } else if (remainingGuesses === 1) {
    guessRemainingSpan.innerText = `${remainingGuesses} guess`;
  } else {
    guessRemainingSpan.innerText = `${remainingGuesses} guesses`;
  }
};

const checkIfWin = function () {
  if (word.toUpperCase() === wordInProgress.innerText) {
    message.classList.add("win");
    message.innerHTML = '<p class="highlight">You guessed the correct word! Congrats!</p>';
  }
};


