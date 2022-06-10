import axios from "axios";

export const fetchUserDecks = async ()=>{
    const url = 'http://localhost:8765';
    const decks = await axios.post(url,{
        "action": "deckNames",
        "version": 6
    })

    return {"names": decks.data.result};
}