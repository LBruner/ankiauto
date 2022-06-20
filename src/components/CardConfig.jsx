import LanguagePicker from "./Language/LanguagePicker";
import DeckPicker from "./Language/DeckPicker";
import classes from './CardConfig.module.css'

const CardConfig = ({language,deck,setDeck,setLanguage}) => {
    return (
        <div className={classes['config-container']}>
            <h1>Cards config</h1>
            <div className={classes['config-group']}>
                <LanguagePicker language={language} setLanguage={setLanguage} setDeck={setDeck}/>
                <DeckPicker deck={deck} setDeck={setDeck}/> 
            </div>
           
        </div>
    );
};

export default CardConfig;