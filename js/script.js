// an unorderedlist where guessed letters will appear
const guessedLetters = document.querySelector(".guessed-letters"); 

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
const word = "magnolia";

const placeholder = function () {
  const placeholderLetters = [];
  for (let letter of word) {
    console.log(letter);
    placeholderLetters.push("●");
  } 
  wordInProgress.innerText = placeholderLetters.join("");
};

placeholder(word);

guessButton.addEventListener("click", function (e) {
  e.preventDefault();
  const input = letter.value;
  console.log(input);
  letter.value = "";
});