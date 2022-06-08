import {useCallback, useEffect, useState} from "react";
import WordInputList from "./WordInputList";
import axios from 'axios'
import classes from './WordInputForm.module.css';
import {useDispatch} from "react-redux";
import {uiActions} from "./store/UISlice";

const WordInputForm = (props) => {
    const dispatch = useDispatch();
    const [wordsForm, setWordsForm] = useState([])
    const [language, setLanguage] = useState('english');
    const [invalidIds, setInvalidIds] = useState([]);
    const [deletingIds, setDeletingIds] = useState([]);
    const [isFormValid, setIsFormValid] = useState(false);

    const listenForEnterKey=(event)=> {
        if (event.keyCode === 13) {
            onSubmitHandler(event)
        }
    }
    
    const checkFormValidity = useCallback(() => {
        const newArray = [];
        wordsForm.forEach((item, i) => {
            if (item.word === '')
                newArray.push(i)
        })
        setIsFormValid(newArray.length === 0 && wordsForm.length !== 0);
        setInvalidIds(newArray)
    }, [wordsForm])

    useEffect(() => {
        checkFormValidity();
    }, [wordsForm]);
    
    const selectEnglish = (e) => {
        e.preventDefault();
        setLanguage('english')
    }

    const selectFrench = (e) => {
        e.preventDefault();
        setLanguage('french')
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault()

        if (!isFormValid) return;

        dispatch(uiActions.hideNotification())
        dispatch(uiActions.toggleIsWaiting());
        const url = '/api/addCards';
        const words = {words: [...wordsForm], language: language};
        const response = await axios.post(url, words)
        const {data} = response;
        const errorNumber = data.cardsLog.errors.length;
        const successNumber = data.cardsLog.successful.length;
        
        props.resetTimer(0);
        
        if (errorNumber === 0) {
            dispatch(uiActions.showNotification(
                {
                    notification: {
                        title: `${data.cardsLog.successful.length} cards were added!`,
                        message: 'No errors',
                        status: 'success'
                    }
                }))
        } else if (errorNumber !== 0 && successNumber !== 0) {
            dispatch(uiActions.showNotification(
                {
                    notification: {
                        title: `${data.cardsLog.successful.length} cards were added!`,
                        message: `${errorNumber} cards were not added`,
                        status: 'alert'
                    }
                }))
        } else {
            dispatch(uiActions.showNotification(
                {
                    notification: {
                        title: `Any card were added`,
                        message: `Something went wrong`,
                        status: 'error'
                    }
                }))
        }
        let deleteIds = []
        
        const newFormArray = wordsForm.filter((word, i) => {
            if (!data.cardsLog.successful.includes(word.word)) {
                return true
            } else {
                deleteIds.push(i);
                return false
            }
        })
        if(deleteIds.length !== 0) setDeletingIds(deleteIds);
        
        setWordsForm(newFormArray)
        dispatch(uiActions.toggleIsWaiting());
    }

    return (
        <form onKeyDown={listenForEnterKey} onSubmit={onSubmitHandler} autoComplete={"off"}>
            <div className={classes['language-container']}>
                <h1>Choose Language</h1>
                <div className={classes['language-buttons']}>
                    <button onClick={selectEnglish}
                            className={language === 'english' ? classes['selected-language'] : ''}>English
                    </button>
                    <button onClick={selectFrench}
                            className={language === 'french' ? classes['selected-language'] : ''}>French
                    </button>
                </div>
            </div>
            <WordInputList deletingIds={deletingIds} setDeletingIds={setDeletingIds} wordsForm={wordsForm} setWordsForm={setWordsForm} invalidIds={invalidIds}/>
            <button className={`${classes['button-container']} ${!isFormValid ? classes['invalid'] : ''}`}
                    type={"submit"}>Add Cards
            </button>
        </form>)
}

export default WordInputForm;