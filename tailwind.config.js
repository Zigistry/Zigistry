const flowbite = require("flowbite-react/tailwind");


export const content = [
  './src/**/*.{js,jsx,ts,tsx}',
  'node_modules/flowbite-react/lib/esm/**/*.js',
  flowbite.content(),
];
export const theme = {
  extend: {},
};
export const plugins = [
  require('flowbite/plugin'),
  flowbite.plugin(),
];