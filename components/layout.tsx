/*===============================================================================*/
/*                               Layout Component                                */
/*===============================================================================*/

/*
 | Author:
 | Rohan Vashisht
 |
 | Details:
 | This file contains the boiler plate code to be used
 | throughout this website.
 | Please check license file for copyright details.
 */

// ===================
//       Imports
// ===================

// ------- Components ---------
import Navbar from './Header'
import Foooter from './Foooter'
import Head from 'next/head'
import Script from 'next/script'
import { ThemeModeScript } from "flowbite-react";
import { Analytics } from "@vercel/analytics/react";
import NextTopLoader from 'nextjs-toploader';

// =====================================
//       Exports Layout component
// =====================================
export default function Layout(props: { children: JSX.Element }): JSX.Element {
    return (
        <main className="dark:bg-custom-gradient bg-white dark:text-white text-black">
            <NextTopLoader color="gold" height={3} />
            <Navbar />
            <Head>
                <title>Zigistry: Zig Programming Language Packages Library Registry</title>
                <link rel="icon" href="/zigistry.png" sizes="any" />
                <ThemeModeScript />
                <meta name="description" content="Zigistry: Explore and contribute to the leading registry of Zig programming language libraries and Zig packages. Join the Zig community today!" />
                <meta name="keywords" content="Zig packages, Zigistry, Zig libraries, Zig programming, library registry, Zig community, open-source Zig, Zig projects" />
                <meta property="og:title" content="Zigistry: Zig Programming Language Library Registry" />
                <meta property="og:description" content="Discover and contribute to Zigistry, the leading hub for Zig programming language libraries." />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://zigistry.dev/" />
                <meta property="og:image" content="https://zigistry.dev/zigistry.png" />
                <meta property="og:site_name" content="Zigistry" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:image" content="https://zigistry.dev/zigistry.png" />
                <meta name="twitter:title" content="Zigistry: Zig Programming Language Library Registry" />
                <meta name="twitter:description" content="Discover and contribute to Zigistry, the leading hub for Zig programming language libraries." />
                <meta name="robots" content="index, follow" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
                <link rel="canonical" href="https://zigistry.dev/" />
                <meta name="twitter:site" content="@Rohan__Vashisht" />
                <meta name="author" content="Rohan Vashisht" />
            </Head>
            <Analytics />
            <Script async defer src="https://buttons.github.io/buttons.js" />
            <Script src="/checkDarkMode.js" />
            <Script src='/mainld.json' type="application/ld+json"/>
            <main>{props.children}</main>
            <Foooter />
        </main>
    )
}
