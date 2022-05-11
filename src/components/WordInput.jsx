import {useRef, useState} from "react";
import classes from './WordInputCell.module.css'

const WordInput = (props) => {
    const [isInputAdded, setIsInputAdded] = useState(false)
    const input = useRef();
    const phrase = useRef();
    console.log(props.isFirst)
    const onChangeHandler = ()=>{
        props.onUpdateWord({word: input.current.value, phrase: phrase.current.value }, props.index)
        
        if(!isInputAdded || props.isFirst){
            props.addInput()
            setIsInputAdded(true)
        }
    }

    const onClickHandler = ()=>{
        props.deleteInput(props.index)
    }

    const isDisabled =  props.isFirst ? 'disabled' : '';
    return (
        <div className={classes['cell-container']}>
            <input onChange={onChangeHandler} type="text" tabIndex={1} className="form-control" id="exampleInputPassword1" ref={input} placeholder={"Word..."}
            /> 
            <input onChange={onChangeHandler} type="text" tabIndex={1} className="form-control" id="exampleInputPassword1" ref={phrase} placeholder={"Phrase..."}
            />
            <button onClick={onClickHandler} type="button" tabIndex={0} className={`${classes['cell-container']} ${props.isFirst ? classes['isDisabled'] : ''}`}>x</button>
        </div>
    )
}

export default WordInput;