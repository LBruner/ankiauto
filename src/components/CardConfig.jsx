import LanguagePicker from "./Language/LanguagePicker";
import DeckPicker from "./Language/DeckPicker";

const CardConfig = ({language,deck,setDeck,setLanguage}) => {
    return (
        <div>
            <LanguagePicker language={language} setLanguage={setLanguage} setDeck={setDeck}/>
            <DeckPicker deck={deck} setDeck={setDeck}/>
        </div>
    );
};

export default CardConfig;