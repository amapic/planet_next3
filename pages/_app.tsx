import '../styles/globals.css'
import '../styles/Home.module.css'
import '../styles/copy.css'
import '../styles/perso.css'
// import '../styles/glitch.scss'
// import '../styles/glitch2.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
