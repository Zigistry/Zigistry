import { Html, Head, Main, NextScript } from 'next/document'
import { Header } from './components/Header'
import { Foooter } from './components/Foooter'

export default function Document() {
  return (
    <Html lang="en" className='dark'>
      <Head />
      <body>
        <Header/>
      <Main />
      <NextScript />
      <Foooter/>
      </body>
    </Html>
  )
}