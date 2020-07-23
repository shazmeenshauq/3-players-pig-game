var scores, roundScore, activePlayer, gamePlaying;

document.querySelector('.yes').addEventListener('click', function () {
  console.log();
  document.querySelector('.container').style.opacity = '1';
  document.querySelector('#confirm').style.display = 'none';
});

init();

// -------- Button ROLL ----------

document.querySelector('.btn-roll').addEventListener('click', function () {
  if (gamePlaying) {
    // 1. Random number

    var dice = Math.floor(Math.random() * 6) + 1;
    var dice1 = Math.floor(Math.random() * 6) + 1;

    console.log(dice, dice1);

    // 2. Display the result

    var diceDOM = document.querySelector('.dice');
    diceDOM.style.display = 'block';

    var diceDOM1 = document.querySelector('.dice-1');
    diceDOM1.style.display = 'block';

    diceDOM.src = 'dice-' + dice + '.png';
    diceDOM1.src = 'dice-' + dice1 + '.png';

    //3. Update Round score if rolled num is not 1

    if (dice === 6 && dice1 === 6) {
      scores[activePlayer] = 0;
      document.querySelector('#score-' + activePlayer).textContent = '0';
      nextPlayer();
    } else if (dice !== 1 && dice1 !== 1) {
      //Add score
      // roundScore += dice;
      roundScore = roundScore + dice + dice1;
      document.querySelector(
        '#current-' + activePlayer
      ).textContent = roundScore;
    } else {
      // Next player
      nextPlayer();
    }
  }
});

document.querySelector('.btn-hold').addEventListener('click', function () {
  if (gamePlaying) {
    // 1. Add current score to global score

    scores[activePlayer] += roundScore;
    document.querySelector('#score-' + activePlayer).textContent =
      scores[activePlayer];

    // 2. Update UI

    // 3. Check if player WON the game
    if (scores[activePlayer] >= win_score) {
      document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
      document.querySelector('.dice').style.display = 'none';
      document.querySelector('.dice-1').style.display = 'none';
      document
        .querySelector('.player-' + activePlayer + '-panel')
        .classList.add('winner');
      document
        .querySelector('.player-' + activePlayer + '-panel')
        .classList.remove('active');
      gamePlaying = false;
    } else {
      // Next Player

      nextPlayer();
    }
  }
});

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
  scores = [0, 0, 0];
  roundScore = 0;
  activePlayer = 0;
  gamePlaying = true;

  win_score = 100;
  document.getElementById('win-score').value = '';
  var win_score_btn = document.getElementById('win-score-btn');

  /* Input value */

  win_score_btn.addEventListener('click', function () {
    input = document.getElementById('win-score');

    win_score_input = document.getElementById('win-score').value;
    if (win_score_input < 10) {
      alert('Winning score should be greater than 10');
    } else {
      win_score = win_score_input;
    }

    console.log(win_score);
    console.log(typeof win_score);
  });

  document.querySelector('.dice').style.display = 'none';
  document.querySelector('.dice-1').style.display = 'none';

  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
  document.getElementById('score-2').textContent = '0';
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';
  document.getElementById('current-2').textContent = '0';

  document.getElementById('name-0').textContent = 'Player 1';
  document.getElementById('name-1').textContent = 'Player 2';
  document.getElementById('name-2').textContent = 'Player 3';

  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-2-panel').classList.remove('winner');

  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-2-panel').classList.remove('active');

  document.querySelector('.player-0-panel').classList.add('active');
}

function nextPlayer() {
  if (activePlayer === 0) {
    activePlayer = 1;
  } else if (activePlayer === 1) {
    activePlayer = 2;
  } else {
    activePlayer = 0;
  }

  roundScore = 0;

  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';
  document.getElementById('current-2').textContent = '0';

  if (activePlayer === 0) {
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-2-panel').classList.remove('active');
  } else if (activePlayer === 1) {
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.add('active');
    document.querySelector('.player-2-panel').classList.remove('active');
  } else {
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');

    document.querySelector('.player-2-panel').classList.add('active');
  }

  document.querySelector('.dice').style.display = 'none';
  document.querySelector('.dice-1').style.display = 'none';
}
