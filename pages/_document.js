import Document, {Html, Head, Main, NextScript} from 'next/document'

class MyDocument extends Document {
    render() {
        return (
            <Html lang="pt">
                <Head>
                    <link rel="icon" href="../static/favicon.png"/>
                </Head>
                <body>
                <Main/>
                <NextScript/>
                </body>
            </Html>
        )
    }
}

export default MyDocument;