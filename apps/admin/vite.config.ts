import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        port: 5196,
    },
    define: {
        global: 'window',
    },
    resolve: {
        dedupe: ['framer-motion', 'motion-utils', 'react', 'react-dom'],
    },
})
