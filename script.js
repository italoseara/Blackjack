// VARIABLES DECLARATION
var cards, activePlayer, hold, gameState, score;

// INIT
init();

// EVENT LISTENERS
document.querySelector('.dealer').addEventListener('click', function() {
    if (gameState) { if (cards[activePlayer].length < 9) {
        addCard(cards[activePlayer].length, activePlayer)}};
});

document.querySelector('.btn-hold').addEventListener('click', function() {
    if (gameState) {
        hold += 1;
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
        activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('active');
        
        if (hold === 2) {
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            if (score[0] > score[1]) {
                document.querySelector('.player-0-panel').classList.add('winner');
                document.querySelector('#name-0').textContent = 'Winner!';
            } else if (score[1] > score[0]) {
                document.querySelector('#name-1').textContent = 'Winner!';
                document.querySelector('.player-1-panel').classList.add('winner');
            } else {
                document.querySelector('#name-1').textContent = 'Draw!';
                document.querySelector('#name-0').textContent = 'Draw!';
            }
            gameState = false};
    }});

document.querySelector('.btn-new').addEventListener('click', init)

// FUNCTIONS
function addCard(cardNumber, player) {

    var suits = ['♦', '♥', '♣', '♠'];

    var num = Math.floor(Math.random() * 13) + 1;
    if (num === 1) num = 'A'; else if (num === 11) num = 'J';
    else if (num === 12) num = 'Q'; else if (num === 13) num = 'K';

    var suit = suits[Math.floor(Math.random() * 4)];

    cards[player].push([num, suit]);

    var cardDistance = 55 * cardNumber;
    var card = document.querySelector('.player' + player).cloneNode(true);
    
    card.style.left += String(cardDistance + 'px');
    card.style.display = 'block';
    card.classList.add(String('clone'));

    card.querySelector('.bottom-num').textContent = String(num);
    card.querySelector('.top-num').textContent = String(num);
    card.querySelector('.suit').textContent = suit;
    if (suit === '♥' || suit === '♦') card.style.color = '#EB4D4D';
    else card.style.color = '#000';
    
    document.querySelector('.wrapper').appendChild(card);

    var index = cards[player][cards[player].length - 1][0];
    if (index === 'J' || index === 'Q' || index === 'K') index = 10;
    else if (index === 'A') index = 1;;
    score[player] += index;

    if (score[activePlayer] > 21) { // Check if someone won the game
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
        
        activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
        document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');

        gameState = false;}
        else if (score[activePlayer] === 21) {
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('#name-' + activePlayer).textContent = 'BlackJack!';
        }
};

function init() {
    cards = [[], []];
    activePlayer = Math.floor(Math.random() * 2);
    hold = 0;
    gameState = true;
    score = [0, 0]
    
    document.querySelectorAll('.clone').forEach(function(a) {a.remove()});
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('#name-0').textContent = 'Player 1';
    document.querySelector('#name-1').textContent = 'Player 2';
    document.querySelector('.player-' + activePlayer + '-panel').classList.add('active');

    addCard(cards[0].length, 0);
    addCard(cards[1].length, 1);
};