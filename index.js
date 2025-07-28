const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');

const systemRoutes = require('./routes/systemRoutes');
const userRoutes = require('./routes/userRoutes');

dotenv.config({path: './configs/config.env'});
const port = process.env.PORT || 8080;

const app = express();
app.use(express.json());
app.use(express.static('./public'));
app.use(morgan('dev'));
app.use((req, res, next) => {
    req.requestedAt = new Date().toISOString();
    next();
});
app.use('/api/v1/users', userRoutes);
app.use('/', systemRoutes);
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});