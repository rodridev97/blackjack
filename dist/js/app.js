"use strict";
let deck = [];
const createDeck = () => {
    for (let i = 2; i <= 10; i++) {
        deck.push(`${i}C`);
    }
    console.log(deck);
};
createDeck();
