import LanguagePicker from "./Language/LanguagePicker";
import DeckPicker from "./Language/DeckPicker";
import classes from './CardConfig.module.css'

const CardConfig = ({language,deck,setDeck,setLanguage}) => {
    return (
        <div className={classes['config-container']}>
            <LanguagePicker language={language} setLanguage={setLanguage} setDeck={setDeck}/>
            <DeckPicker deck={deck} setDeck={setDeck}/>
        </div>
    );
};

export default CardConfig;