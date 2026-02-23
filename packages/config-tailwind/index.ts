import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        "../../apps/*/src/**/*.{js,ts,jsx,tsx}",
        "../../packages/shared-ui/src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "#050505", // Deep cinematic black
                foreground: "#FFFFFF",
                accent: {
                    gold: "#D4AF37",
                    silver: "#C0C0C0",
                    neural: "#4A90E2",
                },
            },
            fontFamily: {
                sans: ["Inter", "sans-serif"],
                display: ["Outfit", "sans-serif"],
            },
            animation: {
                "fade-in": "fadeIn 0.5s ease-out forwards",
                "slide-up": "slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
            },
            keyframes: {
                fadeIn: {
                    "0%": { opacity: "0" },
                    "100%": { opacity: "1" },
                },
                slideUp: {
                    "0%": { transform: "translateY(20px)", opacity: "0" },
                    "100%": { transform: "translateY(0)", opacity: "1" },
                },
            },
        },
    },
    plugins: [],
};

export default config;
