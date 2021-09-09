const express = require('express');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 3100;

const root = path.join(__dirname, 'build');

app.use(express.static(root));

app.get('/*', (req, res) => {
    res.sendFile('index.html', { root });
});

app.listen(PORT, () => {
    console.log('Front end server started on port ' + PORT);
});
