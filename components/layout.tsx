import Navbar from './Header'
import Foooter from './Foooter'
import Head from 'next/head'
import Script from 'next/script'

export default function Layout(props: { children: JSX.Element }): JSX.Element {
    return (
        <main className='dark'>
            <Navbar />
            <Head>
                <title>Zigistry: Library Registry for Zig Programming Language</title>
                <link rel="icon" href="/zigistry.png" sizes="any" />
                <meta name="description" content="Explore Zigistry, your comprehensive registry for all Zig programming language libraries. Find, discover, and contribute to the Zig community effortlessly." />
                <meta name="keywords" content="Zigistry, Zig libraries, Zig programming language, library registry, Zig community, Zig ecosystem, open-source Zig, Zig projects" />
                <meta property="og:title" content="Zigistry: Library Registry for Zig Programming Language" />
                <meta property="og:description" content="Discover and contribute to Zigistry, the central hub for Zig programming language libraries." />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://zigistry.dev/" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:image" content="https://zigistry.dev/zigistry.png" />
                <meta name="twitter:title" content="Zigistry: Library Registry for Zig Programming Language" />
                <meta name="twitter:description" content="Discover and contribute to Zigistry, the central hub for Zig programming language libraries." />
                <link rel="canonical" href="https://zigistry.dev/" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta name="author" content="Rohan Vashisht" />
            </Head>
            <Script async defer src="https://buttons.github.io/buttons.js"/>
            <main>{props.children}</main>
            <Foooter />
        </main>
    )
}