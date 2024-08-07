import express from 'express';
import path from 'path';
import fs from 'fs';

const app = express();

const PORT = process.env.PORT;

const root = path.join(__dirname, 'build');

// Serve static files directly. Note if index.html exists it will serve that instead of hitting the /* route below.
app.use(express.static(root));

app.get('/*', (_req, res) => {
    const indexFile = path.join(root, 'main.html');
    fs.readFile(indexFile, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading index.html', err);
            return res.status(500).send('Error loading index.html');
        }

        if (!process.env.BACKEND_BASE_URL) {
            console.error('No BACKEND_BASE_URL env var has been set');
            return res.status(500).send('Error loading index.html');
        }

        // Inject environment variables before serving the app
        data = data.replace(
            '<!-- envVars -->',
            `<script>
          window.env = {
            VITE_BACKEND_BASE_URL: '${process.env.BACKEND_BASE_URL}'
          };
        </script>`
        );

        res.send(data);
    });
});

app.listen(PORT, () => {
    console.log('Front end server started on port ' + PORT);
});
