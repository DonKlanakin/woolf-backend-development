const express = require('express');
const morgan = require('morgan');
const userRoutes = require('./routes/userRoutes');

const port = 8080;

const app = express();
app.use(express.json());
app.use(morgan('dev'));
app.use((req, res, next) => {
    req.requestedAt = new Date().toISOString();
    next();
});
app.use('/api/v1/users', userRoutes);
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});