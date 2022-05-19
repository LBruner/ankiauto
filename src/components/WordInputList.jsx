import {useEffect, useState} from "react";
import nextId from "react-id-generator";
import WordInput from "./WordInput";
import classes from './WordInputList.module.css'

const WordInputList = (props) => {
    const {wordsForm, setWordsForm} = props;
    const [wordInputCount, setWordInputCount] = useState([''])

    const onUpdateWord = (input, index) => {
        let newArray = [...wordsForm];
        newArray[index] = input;
        setWordsForm(newArray)
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
            {render
            }
        </div>
    )
}

export default WordInputList;