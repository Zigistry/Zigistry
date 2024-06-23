import type { Config } from "tailwindcss";
import flowbite from "flowbite-react/tailwind";


const config: Config = {
  content: [
    "./node_modules/flowbite-react/lib/**/*.js",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    flowbite.content(),
  ],
  theme: {
  },
  plugins: [
    flowbite.plugin(),
  ],
};
export default config;
