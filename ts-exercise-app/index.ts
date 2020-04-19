import express = require('express');

const app = express();
const PORT = 3003;

app.get('/hello', (_req, res) => res.send('Hello FS!'));
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
