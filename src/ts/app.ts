/// <reference path="underscore.browser.d.ts" />

// BLACKJACK APP //
let deck:string[] = [];

const typosCard:string[]         = [ 'C', 'D', 'H', 'S' ];
const cardLetterSpecial:string[] = [ 'J', 'Q', 'K', 'A'];

let playerPoints = 0,
    cpuPoints = 0;

// Reference to HTML
const btnPick = document.querySelector('#btnPick'); 
const btnStop = document.querySelector('#btnStop');  
const btnNew  = document.querySelector('#btnNew');

const pointsHTML = document.querySelectorAll('small');

const divPlayerCard = document.querySelector('#player-card');
const divPlayerCardCPU = document.querySelector('#cpu-card');

// This function create a new deck
const createDeck = () => {
    for (let i:number = 2; i <= 10; i++) {
        for (let t in typosCard) {
            deck.push( `${i + typosCard[t]}` );
        }
    }

    for (let tipo of typosCard) {
        for (let esp of cardLetterSpecial) {
            deck.push( esp + tipo );
        }   
    }

    deck = _.shuffle(deck);
    
    return deck;
}
createDeck();
// This function pick a card 

const pickCard = () => {
    
    if ( deck.length === 0 ) {
        throw 'The deck is Empty';
    }

    const card:string = deck.pop()!;
    
    return card;
}

const valueCard = ( card:string ) => {

    const value:any  = card.substring(0, card.length -1);
    return ( isNaN(value) ) ? ( ( value === 'A' ) ? 11 : 10 ) : value * 1;
}

const cardSelected = pickCard()  
const value = valueCard( cardSelected );

// Turn of Computer
const turnComputer = ( pointsMin:number ) => {

    do {
        const cardPick = pickCard();
        cpuPoints = cpuPoints + valueCard( cardPick );
        pointsHTML[1].innerHTML = cpuPoints.toString();

        // Create image
        const imgCard = document.createElement('img');
        imgCard.className = 'card';
        imgCard.src = `../assets/cartas/${cardPick}.png`;
        divPlayerCardCPU?.append(imgCard);    

        if ( pointsMin > 21 ) {
            break;
        }

    } while ( (cpuPoints < playerPoints) && ( pointsMin <= 21 ) );
    

    if ( cpuPoints === pointsMin ) {
        alert('Pass !!!');
    } else if ( pointsMin > 21 ) {
        alert('Computer Winner :0 ')
    } else if ( cpuPoints > 21 ) {
        alert(' Player Winner !!! :) ')
    } else {
        alert('Computer winner')
    }

}


// Events
btnPick?.addEventListener('click', () => {

    const cardPick = pickCard();
    playerPoints = playerPoints + valueCard( cardPick );
    pointsHTML[0].innerHTML = playerPoints.toString();

    // Create image
    const imgCard = document.createElement('img');
    imgCard.className = 'card';
    imgCard.src = `../assets/cartas/${cardPick}.png`;
    divPlayerCard?.append(imgCard);

    if ( playerPoints > 21 ) {
        console.error( `I'am sorry, Game Over !!!` );
        btnPick.setAttribute('disabled','true');
        btnStop?.setAttribute('disabled','true');
        turnComputer( playerPoints );
    } else if ( playerPoints === 21 ) {
        alert('Congrats, you are winner!!');
        btnPick.setAttribute('disabled','true');
        btnStop?.setAttribute('disabled','true');
        turnComputer( playerPoints );
    }

});

btnStop?.addEventListener('click', () => {
    btnPick?.setAttribute('disabled','true');
    btnStop?.setAttribute('disabled','true');
    turnComputer( playerPoints );  
});


btnNew?.addEventListener('click', () => {

    deck = [];
    deck = createDeck();
    btnPick?.removeAttribute('disabled');
    btnStop?.removeAttribute('disabled');
    playerPoints = 0;
    cpuPoints = 0;

    pointsHTML[0].innerText = '0';
    pointsHTML[1].innerText = '0';

    divPlayerCard!.innerHTML = "";
    divPlayerCardCPU!.innerHTML = "";

});