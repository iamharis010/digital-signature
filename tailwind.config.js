/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,jsx,ts,tsx}",
        "./node_modules/flowbite/**/*.js",
        "node_modules/flowbite-react/lib/esm/**/*.js"
    ],
    theme: {
        extend: {
            screens: {
                'xss': '410px',
              },
        },
    },
    plugins: [require("flowbite/plugin")],
};
