import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
      <link rel="icon" href="/favigcon.ico?v=4" sizes="any" />
      <meta name="description" content="Amaury PICHAT Développeur Web"></meta>
      {/* <meta name="title" content="Amaury PICHAT"></meta> */}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}