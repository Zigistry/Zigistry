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
    extend:{
      backgroundImage: {
        'custom-gradient': 'linear-gradient(180deg, rgba(31, 41, 55, 1) 0%, rgba(17, 24, 39, 1) 100%)',
      },
    }
  },
  plugins: [
    flowbite.plugin(),
  ],
};
export default config;
