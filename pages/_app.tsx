import "./globals.css";

import { AppProps } from "next/app";

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
    return <Component {...pageProps} />;
}

export default MyApp;