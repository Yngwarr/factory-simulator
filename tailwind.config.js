/** @type {import('tailwindcss').Config} */
// biome-ignore lint/style/noDefaultExport: autogenerated code
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}"
    ],
    safelist: [
        // resource colors
        { pattern: /(bg|border|fill)-(blue|red|green|yellow|purple)-600/ }
    ],
    theme: {
        extend: {
            gridTemplateRows: {
                factory: '120px 1fr',
            },
            gridTemplateColumns: {
                factory: '1fr 3fr',
            }
        },
    },
    plugins: [],
}

