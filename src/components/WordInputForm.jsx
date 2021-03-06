import {useCallback, useEffect, useState} from "react";
import WordInputList from "./WordInputList";
import axios from 'axios'
import classes from './WordInputForm.module.css';
import {useDispatch} from "react-redux";
import {uiActions} from "./store/UISlice";
import CardConfig from "./CardConfig";

const WordInputForm = (props) => {
    const dispatch = useDispatch();
    const [wordsForm, setWordsForm] = useState([])
    const [language, setLanguage] = useState({input: 'en', output: 'pt',});
    const [deck, setDeck] = useState('English');
    const [invalidIds, setInvalidIds] = useState([]);
    const [deletingIds, setDeletingIds] = useState([]);
    const [isFormValid, setIsFormValid] = useState(false);

    const listenForEnterKey = (event) => {
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

    const onSubmitHandler = async (e) => {
        e.preventDefault()

        if (!isFormValid) return;

        dispatch(uiActions.hideNotification())
        dispatch(uiActions.toggleIsWaiting());
        const url = '/api/addCards';
        const words = {words: [...wordsForm], language, deck};
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
        if (deleteIds.length !== 0) setDeletingIds(deleteIds);

        setWordsForm(newFormArray)
        dispatch(uiActions.setFieldCount({fieldCount : wordsForm.length}))
        dispatch(uiActions.toggleIsWaiting());
    }
    const onDropHandler = (e) => {
        console.log(e)
    }
    return (
        <form onDrop={onDropHandler} className={classes['form-container']} onKeyDown={listenForEnterKey}
              onSubmit={onSubmitHandler} autoComplete={"off"}>
            <CardConfig language={language} setLanguage={setLanguage} deck={deck} setDeck={setDeck}/>
            <WordInputList deletingIds={deletingIds} setDeletingIds={setDeletingIds} wordsForm={wordsForm}
                           setWordsForm={setWordsForm} invalidIds={invalidIds}
                           isFormValid={isFormValid} onButtonSubmit={onSubmitHandler}
                           class={classes['button-container']} invalidClass={classes['invalid']}
            />

        </form>)
}

export default WordInputForm;