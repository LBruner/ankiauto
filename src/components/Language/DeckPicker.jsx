import userDecks from '../../../user/decks.json';
import {useEffect} from "react";

const DeckPicker = ({deck,setDeck}) => {
    
    const onChangeDeck = (e)=>{
        setDeck(e.target.value)
    }
    
    useEffect(() => {
        const fetchDecks = async ()=>{
            if (userDecks.names.length === 0)
                await fetch('http://localhost:3000/api/fetchDecks')
        }
        fetchDecks()
    }, []);
    
    if (userDecks.names.length === 0) return <select>
        <option value="">Loading decks...</option>
    </select>
    
    return (
        <div>
            <select onChange={onChangeDeck} value={deck} name="deck">
                {userDecks.names.map(deckName => <option key={deckName} value={deckName}>{deckName}</option>)}
            </select>
        </div>
    );
};

export default DeckPicker;