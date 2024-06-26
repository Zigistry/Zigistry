import { JSX } from "react"
import Layout from "../components/layout"
import './globals.css'

export default function MyApp(Props: { Component: JSX.ElementType, pageProps: JSX.IntrinsicAttributes }): JSX.Element {
  return (
    <Layout>
      <Props.Component {...Props.pageProps} />
    </Layout>
  )
}