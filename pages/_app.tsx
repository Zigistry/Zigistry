//!===============================================================
//!                     Custom App Component
//!===============================================================
//!	Author  : Rohan Vashisht
//! License : Please check license file
//! Details : This file overrides the default app component.
//!===============================================================

// ===================
//       Imports
// ===================

// --------- Types ------------
import { JSX } from "react";

// ------- Components ---------
import Layout from "@/components/layout";

// --------- Styles -----------
import "@/styles/globals.css";

// ========================================
//       Exports custom app component
// ========================================
export default function MyApp(Props: {
  Component: JSX.ElementType;
  pageProps: JSX.IntrinsicAttributes;
}): JSX.Element {
  return (
    <Layout>
      <Props.Component {...Props.pageProps} />
    </Layout>
  );
}
