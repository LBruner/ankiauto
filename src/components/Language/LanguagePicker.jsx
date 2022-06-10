import classes from "../WordInputForm.module.css";
import userDecks from '../../../user/decks.json';

const LanguagePicker = ({language, setLanguage, setDeck}) => {
    const onChangeInput = (e) => {
        const newLanguage = {...language};

        if (e.target.name === 'inputLanguage') {
            const optionName = e.target[e.target.selectedIndex].text;

            const hasDeck = userDecks.names.filter(item => item === optionName)
            newLanguage.input = e.target.value;

            if (hasDeck.length !== 0)
                setDeck(optionName)
        } else if (e.target.name === 'outputLanguage') {
            newLanguage.output = e.target.value;
        }

        if (newLanguage.input === newLanguage.output) {
            const optionsArray = Array.from(e.target);
            const filteredOptions = optionsArray.filter(item => item.value !== newLanguage.input)
            newLanguage.output = filteredOptions[0].value
        }

        setLanguage(newLanguage)
    }

    return (<div className={classes['language-buttons']}>
        <div className={classes['language-container']}>
            <h1>Choose Language</h1>
            <div className={classes.input}>
                <select value={language.input} onChange={onChangeInput} name="inputLanguage" id="">
                    <option value="pt">Portuguese</option>
                    <option value="en">English</option>
                    <option value="fr">French</option>
                </select>
            </div>
            <div className={classes.output}>
                <select value={language.output} onChange={onChangeInput} name="outputLanguage" id="">
                    <option value="pt">Portuguese</option>
                    <option value="en">English</option>
                    <option value="fr">French</option>
                </select>
            </div>
        </div>
    </div>);
}

export default LanguagePicker;