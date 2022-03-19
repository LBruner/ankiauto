import {useRef, useState} from "react";
import './WordInput.css'

const WordInput = (props) => {
    const [word, setWord] = useState(' ')
    const [isInputAdded, setIsInputAdded] = useState(false)
    const input = useRef();
    
    const onChangeHandler = ()=>{
        setWord(input.current.value)
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
        <div className={'mb-3 word-input'}>
            <input onChange={onChangeHandler} type="text" className="form-control" id="exampleInputPassword1" ref={input}
                   />
            <button onClick={onClickHandler} type="button" className={`btn btn-danger ${isDisabled}`}>x</button>
        </div>
    )
}

export default WordInput;