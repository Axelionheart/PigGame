
var roundScore, scores, activePlayer, gamePlaying, lastDice;

init();

document.querySelector('.btn-roll').addEventListener('click',function(){

    if(gamePlaying){
      var dice = Math.floor(Math.random() * 6) + 1;

      var diceDOM = document.querySelector('.dice');
      diceDOM.style.display = 'block';
      diceDOM.src = 'images/dice-' + dice + '.png';

      if(lastDice === 6 && dice === 6){
        scores[activePlayer] = 0;
        document.getElementById('score-' + activePlayer).textContent = '0';
        nextPlayer();
        lastDice = 0;
      }
      else if(dice !== 1){
        roundScore += dice;
        lastDice = dice;
        document.querySelector('#current-' + activePlayer).textContent = roundScore;
      }else{
        nextPlayer();
      }
    }
  });

document.querySelector('.btn-hold').addEventListener('click',function(){

    if(gamePlaying){
      scores[activePlayer] += roundScore;

      document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
      var maxScore = document.querySelector('.max-score').value;
      var winningScore;

      if(maxScore){
        winningScore = maxScore;
      }else{
        winningScore = 100;
      }

      if(scores[activePlayer] >= winningScore){

        document.querySelector('#name-' + activePlayer).textContent = 'WINNER!';
        removeDIce();
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
        gamePlaying = false;
      }else{
        nextPlayer();
      }
    }
});

document.querySelector('.btn-new').addEventListener('click',init);

function nextPlayer(){

  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
  roundScore = 0;

  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';

  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');

  removeDIce();
}

function init(){
  scores = [0,0];
  roundScore = 0;
  activePlayer = 0;
  lastDice = 0;
  gamePlaying = true;

  removeDIce();
  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';
  document.getElementById('name-0').textContent = 'Player-1';
  document.getElementById('name-1').textContent = 'Player-2';
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.add('active');
}

function removeDIce(){
  //document.querySelector('.dice').style.display = 'none';
}
