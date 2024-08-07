import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        open: false, // Opens the browser automatically
        port: 3000,
        host: '0.0.0.0',
        strictPort: true,
    },
    build: {
        outDir: 'build', // CRA uses `build` as the output directory
    },
});
