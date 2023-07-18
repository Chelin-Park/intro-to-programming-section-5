const guessInput = document.getElementById('guess');
const submitButton = document.getElementById('submit');
const resetButton = document.getElementById('reset');
const messages = document.getElementsByClassName('message');
const tooHighMessage = document.getElementById('too-high');
const tooLowMessage = document.getElementById('too-low');
const maxGuessesMessage = document.getElementById('max-guesses');
const numberOfGuessesMessage = document.getElementById('number-of-guesses');
const correctMessage = document.getElementById('correct');
const bePositive = document.getElementById('havetobepositive');             //음수일 때
const lessthanHunnit = document.getElementById('max100');             //100보다 클 때
const notthisnumber = document.getElementById('notanumber');             //NAN일 때

let targetNumber;
let attempts = 0;
let maxNumberOfAttempts = 5;

// Returns a random number from min (inclusive) to max (exclusive)
// Usage:
// > getRandomNumber(1, 50)
// <- 32
// > getRandomNumber(1, 50)
// <- 11
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function checkGuess() {
  // Get value from guess input element
  hideAllMessages();
  const guess = parseInt(guessInput.value, 10);
  attempts++;

  
  //
  if(isNaN(guess) === true){ //NaN일 때
  notthisnumber.style.display = '';
  numberOfGuessesMessage.style.display = '';
  //numberOfGuessesMessage.innerHTML = `You made ${attempts} guesses`;
  submitButton.disabled = false;
  guessInput.disabled = false;
  attempts--;
  }
  else if (guess < 0) {    //음수일 때
    bePositive.style.display = '';
    //numberOfGuessesMessage.style.display = '';
    numberOfGuessesMessage.innerHTML = `You made ${attempts} guesses`;
    submitButton.disabled = false;
    guessInput.disabled = false;
    attempts--;
  }
  else if(guess > 99){ //100보다 클 때
    lessthanHunnit.style.display = '';
    //numberOfGuessesMessage.style.display = '';
    numberOfGuessesMessage.innerHTML = `You made ${attempts} guesses`;
    submitButton.disabled = false;
    guessInput.disabled = false;
    attempts--;
  }
  else{   //
   
    if (guess === targetNumber) {
      numberOfGuessesMessage.style.display = '';
      numberOfGuessesMessage.innerHTML = `You made ${attempts} guesses`;
      correctMessage.style.display = '';
      submitButton.disabled = false;
      guessInput.disabled = false;
    }

    if (guess !== targetNumber) {
      if (guess < targetNumber) {
        tooLowMessage.style.display = '';
      } else {
        tooHighMessage.style.display = '';
      }

      const remainingAttempts = maxNumberOfAttempts - attempts;

      numberOfGuessesMessage.style.display = '';
      numberOfGuessesMessage.innerHTML = `You guessed ${guess}. <br> ${remainingAttempts} guesses remaining`;
    }

    if (attempts === maxNumberOfAttempts) {
        if (guess !== targetNumber)
        {
          submitButton.disabled = true;
          guessInput.disabled = true;
          numberOfGuessesMessage.style.display = '';
          numberOfGuessesMessage.innerHTML = `You have reached max attempt. Hit reset button`;  //Hit the rest button
          resetButton.disabled = false;
      }
    }
  }

  guessInput.value = '';

  resetButton.style.display = '';
}

function hideAllMessages() {
  for (let elementIndex = 0; elementIndex < messages.length; elementIndex++) {
  messages[elementIndex].style.display = 'none';
  }
}
  //Chelin : 랜덤 넘버를 세팅하는 곳
function setup()
{
  // Get random number
  targetNumber = getRandomNumber(1, 100);
  console.log(`target number: ${targetNumber}`);

  // Reset number of attempts + attempts reset to 0
  maxNumberOfAttempts = 5;
  attempts = 0;

  // Enable the input and submit button
  submitButton.disabled = false;
  guessInput.disabled = false;

  hideAllMessages();
  resetButton.style.display = 'none';
}

submitButton.addEventListener('click', checkGuess);
resetButton.addEventListener('click', setup);

setup();
