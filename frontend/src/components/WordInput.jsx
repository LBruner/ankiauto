import {useRef, useState} from "react";
import './WordInput.css'

const WordInput = (props) => {
    const [word, setWord] = useState(' ')
    const [isValidated, setIsValidated] = useState(false);
    const [isInputAdded, setIsInputAdded] = useState(false)
    const input = useRef();

    const onChangeHandler = (e) => {
        setWord(input.current.value)
        if (word.trim().length === 0) {
            setIsInputAdded(false)
            setIsValidated(false)
        }
        setIsValidated(true)
        
        if (!isInputAdded){
            props.addInput(props.index);
            setIsInputAdded(true)
        }
    }
    const xButtonClickHandler = () =>{
        console.log('WIH', props.index)
        props.removeInput(props.index)
    }
    
    return (
        <div className={'mb-3 word-input'}>
            <input type="text" className="form-control" id="exampleInputPassword1" ref={input}
                   onChange={onChangeHandler}/>
            <button onClick={xButtonClickHandler} type="button" className="btn btn-danger">x</button>
        </div>
    )
}

export default WordInput;