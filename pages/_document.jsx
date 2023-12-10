import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <link rel="shortcut icon" href="/planet/static/favicon.ico" />
      <title>Portfolio A.PICHAT</title>
      <Head />
      {/* <script type="module" src="planet/app.js" /> </Head> */}
      <body >
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
