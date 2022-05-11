import WordInputForm from "../src/components/WordInputForm";
import {useEffect} from "react";
import {useSelector} from "react-redux";
import Card from "../src/components/Card";

const HomePage = () => {
    const isWaiting = useSelector(state => state.ui.isWaiting)
    useEffect(() => {
        const startWebScrapper = async () => {
            const response = await fetch('/api/addCards');
            const data = await response.json();
            console.log(data)
        }
    
        startWebScrapper();
    }, []);


    if (isWaiting) {
        return (
            <div className="center">
                <div className="loader"></div>
            </div>
        )
    }
    return (
        <Card>
            <WordInputForm/>
        </Card>
    )
};

export default HomePage;