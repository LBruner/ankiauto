import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import Card from "./components/Card";
import {useEffect, useRef, useState} from "react";
import axios from 'axios';
import WordInputForm from "./components/WordInputForm";

function App() {
    const [isWaiting, setIsWaiting] = useState(false);
    
    useEffect(() => {
        axios.post('http://localhost:5000/ankimate')
    }, [])
    

    return (
        <Card>
            {!isWaiting &&
               <WordInputForm setIsWaiting={setIsWaiting}/> 
            }
            {isWaiting && <div className="loader"></div>}
        </Card> 
    )
}

export default App;
