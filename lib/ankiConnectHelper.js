import axios from "axios";
import userDecks from '../user/decks.json'

export const fetchUserDecks = async () => {
    const url = 'http://localhost:8765';
    const decks = await axios.post(url, {
        "action": "deckNames",
        "version": 6
    })

    let deck;

    if (userDecks.favorites) {
        deck = {allDecks: [...userDecks.favorites], favorites: userDecks.favorites}

        const filteredDeck = decks.data.result.filter(deckName => !deck.allDecks.includes(deckName))

        for (let deckElement of filteredDeck) {
            deck.allDecks.push(deckElement)
        }
    }
    else{
        deck = {allDecks: [...decks.data.result]}
    }

    return {...deck};
}