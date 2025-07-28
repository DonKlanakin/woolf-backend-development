const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');

const systemRoutes = require('./routes/systemRoutes');
const userRoutes = require('./routes/userRoutes');
const errorHandler = require('./utils/errorHandler');
const dateTimeManager = require('./utils/dateTimeManager');

dotenv.config({path: './configs/config.env'});
const port = process.env.PORT || 8080;

const app = express();
app.use(express.json());
app.use(express.static('./public'));
app.use(morgan('dev'));
app.use(dateTimeManager.updateRequestInfo);
app.use('/api/v1/users', userRoutes);
app.use('/', systemRoutes);
app.use(errorHandler);
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});