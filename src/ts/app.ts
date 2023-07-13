

let deck:string[] = [];

enum TyposCard { 'C', 'D', 'H', 'S' }

const createDeck = () => {
    for (let i:number = 2; i <= 10; i++) {
        deck.push( `${i}` )
    }

    console.log(deck)
}

createDeck()

