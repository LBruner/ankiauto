import '../styles/globals.css'
import storeIndex from "../src/components/store/storeIndex";
import {Provider} from "react-redux";

function MyApp({Component, pageProps}) {
    return <>    <Provider store={storeIndex}>
        <Component {...pageProps} />
    </Provider>
    </>
}

export default MyApp
