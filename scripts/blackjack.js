let deck = [
    { face: '2', suit: 'C' }, { face: '2', suit: 'S' }, { face: '2', suit: 'H' }, { face: '2', suit: 'D' },
    { face: '3', suit: 'C' }, { face: '3', suit: 'S' }, { face: '3', suit: 'H' }, { face: '3', suit: 'D' },
    { face: '4', suit: 'C' }, { face: '4', suit: 'S' }, { face: '4', suit: 'H' }, { face: '4', suit: 'D' },
    { face: '5', suit: 'C' }, { face: '5', suit: 'S' }, { face: '5', suit: 'H' }, { face: '5', suit: 'D' },
    { face: '6', suit: 'C' }, { face: '6', suit: 'S' }, { face: '6', suit: 'H' }, { face: '6', suit: 'D' },
    { face: '7', suit: 'C' }, { face: '7', suit: 'S' }, { face: '7', suit: 'H' }, { face: '7', suit: 'D' },
    { face: '8', suit: 'C' }, { face: '8', suit: 'S' }, { face: '8', suit: 'H' }, { face: '8', suit: 'D' },
    { face: '9', suit: 'C' }, { face: '9', suit: 'S' }, { face: '9', suit: 'H' }, { face: '9', suit: 'D' },
    { face: '10', suit: 'C' }, { face: '10', suit: 'S' }, { face: '10', suit: 'H' }, { face: '10', suit: 'D' },
    { face: 'J', suit: 'C' }, { face: 'J', suit: 'S' }, { face: 'J', suit: 'H' }, { face: 'J', suit: 'D' },
    { face: 'Q', suit: 'C' }, { face: 'Q', suit: 'S' }, { face: 'Q', suit: 'H' }, { face: 'Q', suit: 'D' },
    { face: 'K', suit: 'C' }, { face: 'K', suit: 'S' }, { face: 'K', suit: 'H' }, { face: 'K', suit: 'D' },
    { face: 'A', suit: 'C' }, { face: 'A', suit: 'S' }, { face: 'A', suit: 'H' }, { face: 'A', suit: 'D' }
];

let dealer = {
    hand: [],
    points: 0
};

let player = {
    hand: [],
    points: 0
};

const playerPointsContainer = document.getElementById('player-points');
const dealerPointsContainer = document.getElementById('dealer-points');

const dealerContainer = document.getElementById('dealer-hand');
const playerContainer = document.getElementById('player-hand');

const dealButton = document.getElementById('deal-button');
dealButton.addEventListener('click', deal);

const hitButton = document.getElementById('hit-button');
hitButton.addEventListener('click', hit);

const standButton = document.getElementById('stand-button');
standButton.addEventListener('click', stand);

function calculatePoints(playerOrDealerHand, playerOrDealerPoints) {
    playerOrDealerHand.forEach(card => points += card)
}

function deal() {
    if (player.hand.length > 0) {
        return;
    }
    getCard(dealerContainer, dealer.hand);
    getCard(dealerContainer, dealer.hand);
    getCard(playerContainer, player.hand);
    getCard(playerContainer, player.hand);
    pointsCheck(player.hand, player.points, playerPointsContainer);
    pointsCheck(dealer.hand, dealer.points, dealerPointsContainer);
}

function stand() {
    if (dealerPointsContainer.textContent < 17) {
        while (dealerPointsContainer.textContent < 17) {
            getCard(dealerContainer, dealer.hand);
            pointsCheck(dealer.hand, dealer.points, dealerPointsContainer);
        }
    }
}

function hit() {
    if (playerPointsContainer.textContent != 'BUST' && dealerPointsContainer.textContent != 'BUST') {
        getCard(playerContainer, player.hand);
        pointsCheck(player.hand, player.points, playerPointsContainer);
        if (dealerPointsContainer.textContent < 17) {
            getCard(dealerContainer, dealer.hand);
            pointsCheck(dealer.hand, dealer.points, dealerPointsContainer);
        }
    } else {
        return;
    }
}

function pointsCheck(playerOrDealerHand, playerOrDealerPoints, playerOrDealerPointsContainer) {
    playerOrDealerHand.forEach(card => {
        if (parseInt(card.face)) {
            playerOrDealerPoints += parseInt(card.face)
        } else if (card.face != 'A') {
            playerOrDealerPoints += 10;
        } else if (playerOrDealerPoints + 11 > 21){
            playerOrDealerPoints += 1;
        } else {
            playerOrDealerPoints += 11;
        }
    });
    if (playerOrDealerPoints > 21) {
        playerOrDealerPoints = 'BUST';
    };
    playerOrDealerPointsContainer.textContent = playerOrDealerPoints;
}

// grab random card and remove it from deck
function getCard(playerOrDealerContainer, playerOrDealerHand) {
    const dealtCard = deck[getRandomIndex(deck.length)];
    console.log(`${dealtCard.face} of ${dealtCard.suit}`);
    let updatedDeck = deck.filter(card => card != dealtCard);
    deck = updatedDeck;
    const cardElement = document.createElement('img');
    cardElement.setAttribute('class', 'card');
    cardElement.setAttribute('src', `images/${dealtCard.face}${dealtCard.suit}.jpg`);
    playerOrDealerContainer.appendChild(cardElement);
    playerOrDealerHand.push(dealtCard);
    console.log(`DECK LENGTH: ${deck.length}`);
}

// grab a random index for us to use in getCard()
function getRandomIndex(max) {
    return Math.floor(Math.random() * Math.floor(max));
}
