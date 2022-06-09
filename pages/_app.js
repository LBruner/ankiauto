import '../styles/globals.css'
import storeIndex from "../src/components/store/storeIndex";
import {Provider} from "react-redux";
import Navbar from "../src/components/Navbar";

function MyApp({Component, pageProps}) {
    return <>    <Provider store={storeIndex}>
        <Navbar/>
        <Component {...pageProps} />
    </Provider>
    </>
}

export default MyApp
