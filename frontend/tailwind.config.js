/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{tsx,jsx}"],
    theme: {
        extend: {
            colors: {
                sec: "#d97706",
            },
            fontFamily: {
                display: ["fantasy"],
                ptsans: ["PTSans"],
                cubano: ["Cubano", "sans-serif"],
                wotfard: ["Wotfard"],
                sans: ["open sans", "sans-serif"],
                "wotfard-sb": ["WotfardSB"],
                "wotfard-md": ["WotfardMD"],
            },
            boxShadow: {
                shadowSec:
                    "inset 0 0 1em rgba(217,119,6,0.4), 0 0 1em rgba(217,119,6,0.4);",
                shadowRed:
                    "inset 0 0 1em rgba(220,38,38,0.4), 0 0 1em rgba(220,38,38,0.4);",
                shadowSecHover:
                    "inset 0 0 0 rgba(217,119,6,0.4), 0 0 1.5em rgba(217,119,6,0.7);",
                shadowRedHover:
                    "inset 0 0 0 rgba(220,38,38,0.4), 0 0 1.5em rgba(220,38,38,0.7);",
                box: "-0.2em 0.2em 1em rgba(0,0,0,0.2)",
            },
            screens: {
                tablet: { min: "768px", max: "1024px" },
                laptop: { min: "1024px", max: "1280px" },
                pc: { min: "1280px" },
                mobile: { max: "768px" },
                wireless: { max: "1024px" },
            },
            backgroundImage: {
                "basketball": "url('./../public/basketball-bg.jpg')",
                "basketball-player": "url('./../public/basketball-player-bg.jpg')",
                "basketball-team": "url('./../public/basketball-team-bg.jpg')",
                "basketball-league": "url('./../public/basketball-league-bg.jpg')",
            },
        },
    },
    plugins: [],
};