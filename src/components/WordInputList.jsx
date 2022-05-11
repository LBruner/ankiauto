import {useState} from "react";
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
    }

    const isFirstElement = (curInput) => {
        return wordInputCount[0] === curInput && wordInputCount.length <= 1
    }

    return (
        <div className={classes['form-container']}>
            {wordInputCount.map((curInput, i) =>
                <WordInput
                    key={wordInputCount[i]} addInput={addInput}
                    index={i} isFirst={isFirstElement(curInput)}
                    deleteInput={deleteInput} onUpdateWord={onUpdateWord}
                />)
            }
        </div>
    )
}

export default WordInputList;