const express = require('express');
const app = express();
const port = 8080;

app.get('/', (req, res) => {
    res.status(200).send('[GET] Hello DK!');
});

app.post('/hello', (req, res) => {
    res.status(200).send('[POST] Hello DK!');
});

app.post('/customers', (req, res) => {
    res.status(200).json({
        firstName: "Don",
        lastName: "Klanakin"
    });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});