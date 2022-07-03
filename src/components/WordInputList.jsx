import {useEffect, useState} from "react";
import nextId from "react-id-generator";
import WordInput from "./WordInput";
import classes from './WordInputList.module.css'
import {useDispatch} from "react-redux";
import {uiActions} from "./store/UISlice";

const WordInputList = (props) => {
    const {wordsForm, setWordsForm} = props;
    const [wordInputCount, setWordInputCount] = useState([''])
    const dispatch = useDispatch();
    
    const onUpdateWord = (input, index) => {
        let newArray = [...wordsForm];
        newArray[index] = input;
        setWordsForm(newArray)
        dispatch(uiActions.setFieldCount({fieldCount : wordsForm.length}))
    }

    const addInput = () => {
        setWordInputCount([...wordInputCount, nextId()])
    }

    const deleteInput = (index) => {
        if (wordInputCount.length === 1) return;
        let newArray = [...wordInputCount];
        newArray = newArray.filter(curItem => curItem !== wordInputCount[index])
        setWordInputCount(newArray)
        let newFormArray = [];
        newFormArray = wordsForm.filter((item, i) => i !== index)
        setWordsForm(newFormArray);
        dispatch(uiActions.setFieldCount({fieldCount : wordsForm.length}))
    }

    useEffect(() => {
        if(props.deletingIds){
            const newArray = wordInputCount.filter((word,i) => !props.deletingIds.includes(i))
            props.setDeletingIds(null);
            setWordInputCount(newArray)
        }}, [props.deletingIds]);

    const isFirstElement = (curInput) => {
        return wordInputCount[0] === curInput && wordInputCount.length <= 1
    }
    const render = wordInputCount.map((curInput, i) =>
        <WordInput
            key={wordInputCount[i]} addInput={addInput}
            index={i} isFirst={isFirstElement(curInput)}
            deleteInput={deleteInput} onUpdateWord={onUpdateWord}
            isInvalid={props.invalidIds.includes(i)}
        />)

    return (
        <div className={classes['form-container']}>
            <h1>Words</h1>
            {render
            }
            <button onClick={props.onSubmitHandler} className={`${props.class} ${!props.isFormValid ? props.invalidClass : ''}`}
                    type={"submit"}>Add Cards
            </button>
        </div>
    )
}

export default WordInputList;