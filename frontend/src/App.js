import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import Card from "./components/Card";
import WordInput from "./components/WordInput";
import {useEffect, useState} from "react";
import nextId from "react-id-generator";

function App() {
    const [wordInputCount, setWordInputCount] = useState([])

    const addInput = () => {
        setWordInputCount([...wordInputCount, nextId()])
    }

    const deleteInput = (index) => {
        let newArray = [...wordInputCount];
        newArray = newArray.filter(curItem => curItem !== wordInputCount[index])
        setWordInputCount(newArray)
    }

    useEffect(() => {
        setWordInputCount([''])
    }, [])

    const isFirstElement = (curInput) => {
        return wordInputCount[0] === curInput && wordInputCount.length <= 1
    }

    return (
        <Card>
            <form style={{width: '40%'}}>
                <div className="mb-3">
                    <select className="form-select form-select-lg mb-3" aria-label=".form-select-lg example">
                        <option defaultValue="1">Pick a language</option>
                        <option value="1">English</option>
                        <option value="2">French</option>
                    </select>
                </div>
                <p className="form-label"> Words</p>
                {wordInputCount.map((curInput, i) =>
                    <WordInput
                        key={wordInputCount[i]} addInput={addInput}
                        index={i} isFirst={isFirstElement(curInput)}
                        deleteInput={deleteInput}
                    />)}
                <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                    <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                </div>
            </form>
        </Card>
    )
}

export default App;
