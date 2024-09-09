//!===============================================================
//!                     Blog Page "/apps"
//!===============================================================
//!	Author  : Rohan Vashisht
//! License : Please check license file
//! Details : This is the default blog search page.
//!===============================================================

// ===================
//       Imports
// ===================


import { Button, Card } from "flowbite-react";
import Link from "next/link";

export default function apps() {
  return (
    <div className="min-h-screen">
      <div className="flex justify-center py-5 px-5 w-full">
        <div className="block">
          <h1 className="text-4xl mb-2">Zigistry&apos;s Apps and Programs</h1>
          <p className="text-center">Use various apps and programs built by Zigistry.</p>
        </div>
      </div>
      <div className="flex flex-wrap py-5 px-5 space-x-5">
        <Card
          className="max-w-sm"
          imgAlt="Meaningful alt text for an image that is not purely decorative"
          imgSrc="https://raw.githubusercontent.com/Zigistry/Zilite/main/assets/logo.png"
        >
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Zilite
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            A syntax highlighter for the web.
          </p>
          <Button as={Link} href={"apps/zilite-highlighter"}>
            Read more
            <svg className="-mr-1 ml-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </Button>
        </Card>
        <Card
          className="max-w-sm"
          imgAlt="Meaningful alt text for an image that is not purely decorative"
          imgSrc="https://raw.githubusercontent.com/Zigistry/Zilite/main/assets/logo.png"
        >
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Z2j
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            Convert Zon to json on the web.
          </p>
          <Button as={Link} href={"apps/z2j-app"}>
            Use the app
            <svg className="-mr-1 ml-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </Button>
        </Card>
      </div>
    </div>
  );
}
