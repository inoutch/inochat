import Document, { Head, Main, NextScript } from 'next/document'

export default class extends Document {
    render() {
        return (
            <html>
            <Head>
                <link rel="stylesheet"
                      href={`https://cdnjs.cloudflare.com/ajax/libs/sanitize.css/2.0.0/sanitize.css`}/>
            </Head>
            <body>
            <Main />
            <NextScript />
            </body>
            </html>
        )
    }
}