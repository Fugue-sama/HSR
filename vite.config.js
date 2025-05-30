import { defineConfig } from 'vite'
import laravel from 'laravel-vite-plugin'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
    plugins: [
        laravel({
            input:['resources/js/app.jsx', 'resources/css/app.css'],
            refresh: true,
        }),
        tailwindcss(),
        react()
    ],
    resolve: {
        alias: {
            '~': '/resources/js',
            '~css':'/resources/css',
            '~utils':'/resources/js/Utils',
        }
    },
    base: '/',
    build: {
        sourcemap: false
    }
})
