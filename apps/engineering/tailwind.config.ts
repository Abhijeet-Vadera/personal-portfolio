/** @type {import('tailwindcss').Config} */
import sharedConfig from "@portfolio/config-tailwind";

export default {
    ...sharedConfig,
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        "../../packages/shared-ui/**/*.{js,ts,jsx,tsx}",
    ],
}
