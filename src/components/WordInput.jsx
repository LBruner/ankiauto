import {useRef, useState} from "react";
import classes from './WordInputCell.module.css'

const WordInput = (props) => {
    const [isInputAdded, setIsInputAdded] = useState(false)
    const {isInvalid} = props;
    const input = useRef();
    const phrase = useRef();
    const meaning = useRef();
    
    const onChangeHandler = ()=>{
        props.onUpdateWord(
            {word: input.current.value, 
                phrase: phrase.current.value, 
                meaning: meaning.current.value
            }, props.index)

        if(!isInputAdded || props.isFirst){
            props.addInput()
            setIsInputAdded(true)
            setTimeout(() =>{
                window.scrollTo({
                    top: window.scrollY + window.innerHeight,
                    behavior: 'smooth'
                })
            }, 500)
        }
    }

    const onClickHandler = ()=>{
        props.deleteInput(props.index)
    }

    return (
        <div className={classes['cell-container']}>
            <input onDrop={onChangeHandler} onChange={onChangeHandler} type="text" tabIndex={1} className={isInvalid ? classes['not-valid'] : '' }  ref={input} placeholder={"Word..."}
            /> 
            <input onChange={onChangeHandler} type="text" tabIndex={1} ref={phrase} placeholder={"Phrase..."}
            />
            <input onChange={onChangeHandler} type="text" tabIndex={1} ref={meaning} placeholder={"Meaning..."}
            />
            <button onClick={onClickHandler} type="button" tabIndex={0} className={`${classes['cell-container']} ${props.isFirst ? classes['isDisabled'] : ''}`}>x</button>
            <button onClick={onClickHandler} type="submit" style={{display: 'none'}}></button>
        </div>
    )
}

export default WordInput;