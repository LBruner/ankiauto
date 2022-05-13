import {useRef, useState} from "react";
import WordInputList from "./WordInputList";
import axios from 'axios'
import classes from './WordInputForm.module.css';
import {useDispatch} from "react-redux";
import {uiActions} from "./store/UISlice";

const WordInputForm = () => {
    const dispatch = useDispatch();
    const [wordsForm, setWordsForm] = useState([])
    const [language, setLanguage] = useState('english');
    console.log(wordsForm)
    const selectEnglish = (e) =>{
        e.preventDefault();
        setLanguage('english')
    }
    
    const selectFrench= (e) =>{
        e.preventDefault();
        setLanguage('french')
    }
    
    const onSubmitHandler = async (e) => {
        e.preventDefault()
        dispatch(uiActions.toggleIsWaiting());
        const url = '/api/addCards';
        const words = {words: [...wordsForm], language: language};
        const response = await axios.post(url, words)
        const {data} = response;
        dispatch(uiActions.toggleIsWaiting());
    }

    return (
        <form onSubmit={onSubmitHandler} autoComplete={"off"}>
            <div className={classes['language-container']}>
                <h1>Choose Language</h1>
                <div className={classes['language-buttons']}>
                    <button onClick={selectEnglish} className={language === 'english' ? classes['selected-language'] : ''}>English</button>
                    <button onClick={selectFrench} className={language === 'french' ? classes['selected-language'] : ''}>French</button>
                </div>
            </div>
            <WordInputList wordsForm={wordsForm} setWordsForm={setWordsForm}/>
            <button className={classes['button-container']} type={"submit"}>Add Cards</button>
        </form>)
}

export default WordInputForm;