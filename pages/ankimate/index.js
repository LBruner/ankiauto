import WordInputForm from "../../src/components/WordInputForm";
import {useDispatch, useSelector} from "react-redux";
import Card from "../../src/components/Card";
import Head from "next/head";
import classes from '../../src/components/loader.module.css'
import Notification from "../../src/UI/Notification";
import {useElapsedTime} from "use-elapsed-time";
import {useEffect} from "react";
import {uiActions} from "../../src/components/store/UISlice";
import Timer from "../../src/UI/Timer";

const HomePage = () => {
    const isWaiting = useSelector(state => state.ui.isWaiting)
    const notification = useSelector(state => state.ui.activeNotification)
    const showNotification = useSelector(state => state.ui.showNotification)
    const { elapsedTime,reset } = useElapsedTime({ isPlaying: isWaiting})
    const dispatch = useDispatch();
    
    useEffect(() => {
        if (isWaiting)
            dispatch(uiActions.setTimer({timer: fmtMSS(elapsedTime.toFixed(0))}))
    }, [elapsedTime]);

    function fmtMSS(s) {
        return (s - (s %= 60)) / 60 + (9 < s ? ':' : ':0') + s
    }
    return (
        <>
            <Head>
                <title>Ankimate</title>
                <meta name="description" content={"Add Cards to anki in a easier way"}
                />
            </Head>
            {isWaiting &&
                <div className={classes['center']}>
                    <div className="loader"></div>
                    <Timer class={'modal'}/>
                </div>}
            <Card>
                <WordInputForm resetTimer={reset}/>
            </Card>
            {showNotification &&
                <Notification notification={notification}/>
            }
        </>
    )
}

export default HomePage;