'use strict';
// selecting the elements
//  so that we can use it again and again
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnRollEl = document.querySelector('.btn--roll');
const btnNewEl = document.querySelector('.btn--new');
const btnHoldEl = document.querySelector('.btn--hold');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
// good to have the value in dom and code itself
const scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;

// starting conditions
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

// state variable to determine the state of the statment
let playing = true;

// reusable functions
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0; //this variable is independent of the player
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// Rolling dice functionality

btnRollEl.addEventListener('click', function () {
  if (playing) {
    // Generate random dice roll no between 1-6
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);

    // display dice img with the exact dice roll no
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    // if the dice roll is 1 : switch the player -- and current score becomes 0
    // if not store the dice roll to current score

    if (dice !== 1) {
      // add the dice to current score and display current score
      // currentScore = currentScore + dice;
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore; // change player later
    } else {
      // switch to next player and make current score to 0
      switchPlayer();
    }
  }
});

// Holding the score functionality
btnHoldEl.addEventListener('click', function () {
  if (playing) {
    // add the currentscore to the mainscore
    // console.log(currentScore);
    scores[activePlayer] += currentScore;
    // console.log(scores[activePlayer]);
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 20) {
      playing = false;
      // if the activeplayer main score is >= 100 active player wins
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      diceEl.classList.add('hidden');
    } else {
      switchPlayer();
    }
  }
});

//New Game Button Functionality

btnNewEl.addEventListener('click', function () {
  // set all the scores to 0 and remove winner class and set actiive player to zer0
  // set the playing to true;
  playing = true;
  // setting active player to 0 i.e player 1;
  activePlayer = 0;
  // 1.Removing winner class
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add('player--active');
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');
  // 2.adding hidden class to dice
  diceEl.classList.add('hidden');
  // set current score to 0
  currentScore = 0;
  // set the main scores of both players to 0
  scores[0] = 0;
  scores[1] = 0;
  // set the textcontent of current score to 0;
  document.getElementById(`current--0`).textContent = 0;
  document.getElementById(`current--1`).textContent = 0;
  // set the textcontent main scores to zero
  document.getElementById(`score--0`).textContent = 0;
  document.getElementById(`score--1`).textContent = 0;
});
