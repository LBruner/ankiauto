import WordInputForm from "../src/components/WordInputForm";
import {useSelector} from "react-redux";
import Card from "../src/components/Card";
import Head from "next/head";
import classes from '../src/components/loader.module.css'
import Notification from "../src/UI/Notification";

const HomePage = () => {
    const isWaiting = useSelector(state => state.ui.isWaiting)
    const notification = useSelector(state => state.ui.activeNotification)
    const showNotification = useSelector(state => state.ui.showNotification)
    return (
        <>
            <Head>
                <title>Ankiauto</title>
                <meta name="description" content={"Add Cards to anki in a easier way"}
                />
            </Head>
            {isWaiting &&
                <div className={classes['center']}>
                    <div className="loader"></div>
                </div>}
            <Card>
                <WordInputForm/>
            </Card>
            {showNotification &&
                <Notification notification={notification}/>
            }
        </>
    )
}

export default HomePage;