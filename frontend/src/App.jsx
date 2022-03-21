import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import Card from "./components/Card";
import WordInput from "./components/WordInput";
import {useEffect, useRef, useState} from "react";
import nextId from "react-id-generator";
import axios from 'axios';

function App() {
    const [wordInputCount, setWordInputCount] = useState([''])
    const [wordsForm, setWordsForm] = useState([])
    const [isWaiting, setIsWaiting] = useState(false);
    const language = useRef();
    const deck = useRef();

    useEffect(() => {
        axios.post('http://localhost:5000/ankimate')
    }, [])

    const onUpdateWord = (input, index) => {
        let newArray = [...wordsForm];
        newArray[index] = input;
        setWordsForm(prevState => newArray)
    }

    const addInput = () => {
        setWordInputCount([...wordInputCount, nextId()])
    }

    const deleteInput = (index) => {
        let newArray = [...wordInputCount];
        newArray = newArray.filter(curItem => curItem !== wordInputCount[index])
        setWordInputCount(newArray)
    }

    const isFirstElement = (curInput) => {
        return wordInputCount[0] === curInput && wordInputCount.length <= 1
    }

    const onSubmitHandler = async (e) => {
        setIsWaiting(true);
        e.preventDefault()
        const url = 'http://localhost:5000/ankimate';
        const words = {words: [...wordsForm], language: language.current.value}
        console.log(words);
        const response = await axios.post(url, words)
        console.log(response)
        setIsWaiting(false)
    }

    return (
        <Card>
            {!isWaiting &&
                <form style={{width: '40%'}} onSubmit={onSubmitHandler}>
                    <div className="mb-3 cardPickers">
                        <select defaultValue="english" ref={language} className="form-select form-select-lg mb-3"
                                aria-label=".form-select-lg example">
                            <option>Pick a language</option>
                            <option value="english">English</option>
                            <option value="french">French</option>
                        </select>
                        <select defaultValue="english" ref={deck} className="form-select form-select-lg mb-3"
                                aria-label=".form-select-lg example">
                            <option>Deck</option>
                            <option value="english">English</option>
                            <option value="french">French</option>
                        </select>
                    </div>
                    <p className="form-label"> Words</p>
                    {wordInputCount.map((curInput, i) =>
                        <WordInput
                            key={wordInputCount[i]} addInput={addInput}
                            index={i} isFirst={isFirstElement(curInput)}
                            deleteInput={deleteInput} onUpdateWord={onUpdateWord}
                        />)}
                    <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                    <div>
                        <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                    </div>
                    <div className="mb-3">
                        <button type={"submit"} className={'btn btn-primary'}>Submit</button>
                    </div>
                </form>
            }
            {isWaiting && <div className="loader"></div>}
        </Card>
    )
}

export default App;
