/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var scores, roundScore, activePlayer, dice, dice2, gamePlaying, inputScore;

init();

document.querySelector('.btn-roll').addEventListener('click', function(){
    if(gamePlaying){
        // 1. Random number
        var dice = Math.floor(Math.random() * 6) + 1; //Dice rundom generator numbers
        var dice2 = Math.floor(Math.random() * 6) + 1; //Dice rundom generator numbers
            
        // 2. Display result
        var diceDOM = document.querySelector('.dice1');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';

        var diceDOM = document.querySelector('.dice2');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice2 + '.png';
        

        // 3. Update the round score IF the rolled number was NOT an 1
        if (dice !== 1 && dice2 !== 1){
            //Add score
            roundScore += dice + dice2;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        }
        else {
            //Next player
            console.log(dice + ' ' + dice2);
            nextPlayer();
        }
    }
   
});

document.querySelector('.btn-hold').addEventListener('click', function(){ // Btn Hold Action
    if(gamePlaying) {
        // Add to CURRENT score to GLOBAL score
        scores[activePlayer] += roundScore;
        
        // Update the UI
        document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];

        // Check Winning Score

        var input = document.getElementById('inputScore').value;
        var winningScore;
        input ? winningScore = input : winningScore = 100; //ternary operator 
        console.log(winningScore);

        // Check if player won the game
        if(scores[activePlayer] >= winningScore) {
            document.getElementById('name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            document.querySelector('.dice1').style.display = 'none';
            document.querySelector('.dice2').style.display = 'none';
            gamePlaying = false;
        } else {
            // Next player
            nextPlayer();
        }
    }
});

document.querySelector('.btn-new').addEventListener('click', init);

function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0; // ternary operator 
    roundScore = 0;

    document.getElementById('current-0').textContent = 0; // reset round score
    document.getElementById('current-1').textContent = 0; // reset round score

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    document.querySelector('.dice1').style.display = 'none';
    document.querySelector('.dice2').style.display = 'none';
}


function init() {
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;
    inputScore = 100;

    // Hide dice
    document.querySelector('.dice1').style.display = 'none';
    document.querySelector('.dice2').style.display = 'none';
    
    //Reset score
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.getElementById('name-0').textContent = 'player 1';
    document.getElementById('name-1').textContent = 'player 2';   
    
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}