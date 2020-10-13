var cards, activePlayer;

init();

document.querySelector('.dealer').addEventListener('click', function() {
    if (cards[activePlayer].length < 9) {
        addCard(cards[activePlayer].length, activePlayer)}}
);

document.querySelector('.btn-hold').addEventListener('click', function() {
    document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    document.querySelector('.player-' + activePlayer + '-panel').classList.add('active');
});

document.querySelector('.btn-new').addEventListener('click', init)

function addCard(cardNumber, player) {

    var suits = ['♦', '♥', '♣', '♠'];
    var num = Math.floor(Math.random() * 13) + 1;
    if (num === 1) {
        num = 'A';
    } else if (num === 11) {
        num = 'J';
    } else if (num === 12) {
        num = 'Q';
    } else if (num === 13) {
        num = 'K';
    };
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
    if (suit === '♥' || suit === '♦') {
        card.style.color = '#EB4D4D';
    } else {
        card.style.color = '#000';
    };
    
    document.querySelector('.wrapper').appendChild(card);
};

function init() {
    cards = [[], []];
    activePlayer = Math.floor(Math.random() * 2)
    
    document.querySelectorAll('.clone').forEach(function(a) {a.remove()});
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-' + activePlayer + '-panel').classList.add('active');

    addCard(cards[0].length, 0);
    addCard(cards[1].length, 1);
};