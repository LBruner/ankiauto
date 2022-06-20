import userDecks from '../../../user/decks.json';
import {useEffect, useRef, useState} from "react";
import classes from './DeckPicker.module.css'

const DeckPicker = ({deck,setDeck}) => {
    const [filteredDeck, setFilteredDeck] = useState([...userDecks.allDecks || '']);

    const searchBoxRef =  useRef();
    const selectRef = useRef();
    const onChangeDeck = (e)=>{
        setDeck(e.target.value)
    }
    
    const onSearchLanguage = ()=>{
        const filteredDecks = userDecks.allDecks.filter(deckName => deckName.toLowerCase().startsWith(searchBoxRef.current.value))
        setFilteredDeck(filteredDecks)
        setDeck(selectRef.current.value)
    }
    
    useEffect(() => {
        const fetchDecks = async ()=>{
            if (userDecks.allDecks.length === 0)
                await fetch('http://localhost:3000/api/fetchDecks')
        }
        fetchDecks()
    }, []);
    
    if (userDecks.allDecks.length === 0) return <select>
        <option value="">Loading decks...</option>
    </select>
    
    return (
        <div className={classes['deck-container']}>
            <p>Choose Deck</p>
            <input ref={searchBoxRef} type="text" onChange={onSearchLanguage} placeholder={"Search..."} id={"search"}/>
            <select  ref={selectRef} onChange={onChangeDeck} value={deck} name="deck">
                {filteredDeck.map(deckName => <option key={deckName} value={deckName}>{deckName}</option>)}
            </select>
        </div>
    );
};

export default DeckPicker;