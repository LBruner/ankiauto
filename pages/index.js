import WordInputForm from "../src/components/WordInputForm";
import {useSelector} from "react-redux";
import Card from "../src/components/Card";
import Head from "next/head";
import classes from '../src/components/loader.module.css'

const HomePage = () => {
    const isWaiting = useSelector(state => state.ui.isWaiting)
    //
    // if (isWaiting) {
    //     return (
    //         <div className="center">
    //             <div className="loader"></div>
    //         </div>
    //     )
    // }
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
        </>
    )
}

export default HomePage;