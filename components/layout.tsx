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
            <NextTopLoader color="gold" height="3"/>
            <Navbar />
            <Head>
                <title>Zigistry: Library Registry for Zig Programming Language</title>
                <link rel="icon" href="/zigistry.png" sizes="any" />
                <ThemeModeScript />
                <meta name="description" content="Explore Zigistry, your comprehensive registry for all Zig programming language libraries. Find, discover, and contribute to the Zig community effortlessly." />
                <meta name="keywords" content="Zigistry, Zig libraries, Zig programming language, library registry, Zig community, Zig ecosystem, open-source Zig, Zig projects" />
                <meta property="og:title" content="Zigistry: Library Registry for Zig Programming Language" />
                <meta property="og:description" content="Discover and contribute to Zigistry, the central hub for Zig programming language libraries." />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://zigistry.dev/" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:image" content="https://zigistry.dev/zigistry.png" />
                <meta name="twitter:title" content="Zigistry: Library Registry for Zig Programming Language" />
                <meta property="og:image" content="https://zigistry.dev/zigistry.png"></meta>
                <meta property="og:site_name" content="Zigistry"></meta>
                <meta name="twitter:description" content="Discover and contribute to Zigistry, the central hub for Zig programming language libraries." />
                <link rel="canonical" href="https://zigistry.dev/" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta name="author" content="Rohan Vashisht" />
            </Head>
            <Analytics/>
            <Script async defer src="https://buttons.github.io/buttons.js"/>
            <Script src="/checkDarkMode.js"/>
            <main>{props.children}</main>
            <Foooter />
        </main>
    )
}
