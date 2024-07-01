/*===============================================================================*/
/*                            Custom App Component                               */
/*===============================================================================*/

/*
 | Author:
 | Rohan Vashisht
 |
 | Details:
 | This file overrides the default app component.
 | Please check license file for copyright details.
 */

// ===================
//       Imports
// ===================

// --------- Types ------------
import { JSX } from "react"

// ------- Components ---------
import Layout from "@/components/layout"

// --------- Styles -----------
import '@/styles/globals.css'

// ========================================
//       Exports custom app component
// ========================================
export default function MyApp(Props: { Component: JSX.ElementType, pageProps: JSX.IntrinsicAttributes }): JSX.Element {
  return (
    <Layout>
      <Props.Component {...Props.pageProps} />
    </Layout>
  )
}