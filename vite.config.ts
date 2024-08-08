import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
    plugins: [react()],
    server: {
        open: false,
        port: 3000,
        host: true,
        strictPort: true,
    },
    build: {
        outDir: 'build',
        rollupOptions: {
            input: path.resolve(__dirname, 'main.html'), // Specify main.html as the entry point
        },
    },
});
