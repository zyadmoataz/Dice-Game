'use strict';

//selecting elements
const score0 = document.getElementById('score--0');
const score1 = document.getElementById('score--1');
const current0 = document.getElementById('current--0');
const current1 = document.getElementById('current--1');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const dicePic = document.querySelector('.dice');
const rollBTN = document.querySelector('.btn--roll');
const newBTN = document.querySelector('.btn--new');
const holdBTN = document.querySelector('.btn--hold');
const activePlayer = document.querySelector('.player--active');

let currentScoreGlobal, activePlayerGlobal, scores, playing;
//initilization function that reset all code
const init = function () {
  //store current score and active player
  currentScoreGlobal = 0;
  activePlayerGlobal = 0;
  //store both scores and starting with 0
  scores = [0, 0];
  //state variable that tells us the condition of the game if the game is finished or not
  playing = true;

  score0.textContent = 0;
  score1.textContent = 0;
  current0.textContent = 0;
  current1.textContent = 0;

  dicePic.classList.add('hidden');
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
  player1.classList.remove('player--active');
  player0.classList.add('player--active');
};

init();

//switch player function
const switchPlayer = function () {
  document.getElementById(`current--${activePlayerGlobal}`).textContent = 0;
  currentScoreGlobal = 0;
  //switch between play 0 and player 1
  activePlayerGlobal = activePlayerGlobal === 0 ? 1 : 0;
  // change style => toggle will ad the class if its not there and if its there it will remove it
  player1.classList.toggle('player--active');
  player0.classList.toggle('player--active');
};

// 1- ROLL DICE BTN
rollBTN.addEventListener('click', function () {
  if (playing) {
    //1-generate random no
    const randomNumber = Math.trunc(Math.random() * 6) + 1;
    //2- display dice
    dicePic.classList.remove('hidden');
    dicePic.src = `dice-${randomNumber}.png`;
    //3- check number 1 if true switch to other player
    if (randomNumber !== 1) {
      currentScoreGlobal += randomNumber;
      // current0.textContent = currentScore; this is static lets do it dynamically
      document.getElementById(`current--${activePlayerGlobal}`).textContent =
        currentScoreGlobal;
    } else {
      switchPlayer();
    }
  }
});

// 2- HOLD BTN
holdBTN.addEventListener('click', function () {
  if (playing) {
    //1- add current score to active player's score
    scores[activePlayerGlobal] += currentScoreGlobal;
    document.getElementById(`score--${activePlayerGlobal}`).textContent =
      scores[activePlayerGlobal];

    //2- check if player's score >=100
    if (scores[activePlayerGlobal] >= 20) {
      //if true congrats he wins
      playing = false;
      dicePic.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayerGlobal}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayerGlobal}`)
        .classList.remove('player--active');
    } else {
      //if not switch to next player
      switchPlayer();
    }
  }
});

//3- NEW GAME BTN
newBTN.addEventListener('click', initS);
