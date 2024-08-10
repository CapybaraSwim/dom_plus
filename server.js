const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors()); // разрешить все домены

app.get('/api/hello', (req, res) => {
    res.send('Привет от сервера');
});

app.listen(3001, () => {
    console.log('Сервер запущен на https://xn--d1aochgn4g.com/');
});
