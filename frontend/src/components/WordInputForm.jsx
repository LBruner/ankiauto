import {useRef, useState} from "react";
import WordInputList from "./WordInputList";
import axios from 'axios'

const WordInputForm = ({setIsWaiting}) => {
    const languageRef = useRef();
    const [wordsForm, setWordsForm] = useState([])

    const onSubmitHandler = async (e) => {
        e.preventDefault()
        setIsWaiting(true);
        
        const url = 'http://localhost:5000/ankimate';
        const words = {words: [...wordsForm], language: languageRef.current.value};
        const response = await axios.post(url, words)
        console.log(response)
        
        setIsWaiting(false)
    }
    
    return (
        <form style={{width: '40%'}} onSubmit={onSubmitHandler}>
            <div className="mb-3 cardPickers">
                <select defaultValue="english" ref={languageRef} className="form-select form-select-lg mb-3"
                        aria-label=".form-select-lg example">
                    <option>Pick a language</option>
                    <option value="english">English</option>
                    <option value="french">French</option>
                </select>
                {/*<select defaultValue="english" ref={deck} className="form-select form-select-lg mb-3"*/}
                {/*        aria-label=".form-select-lg example">*/}
                {/*    <option>Deck</option>*/}
                {/*    <option value="english">English</option>*/}
                {/*    <option value="french">French</option>*/}
                {/*</select>*/}
            </div>
            <div>
                <p className="form-label"> Words</p>
                <WordInputList wordsForm={wordsForm} setWordsForm={setWordsForm}/>
                <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                <div>
                    <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                </div>
                <div className="mb-3">
                    <button type={"submit"} className={'btn btn-primary'}>Submit</button>
                </div>
            </div>
        </form>)
}

export default WordInputForm;