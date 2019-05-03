// var nr = require('newrelic');
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
const router = require('./router.js');
const app = express();
const port = process.argv[2] || 3003;

app.use(bodyParser.json());
app.use(morgan('dev'));

app.use('/', express.static(path.join(__dirname, '../client/dist')));

app.use('/api/reservations', router);
app.use('/loaderio-1f922ed8c29eea0f9d45f0e55b3a234b', (req, res) => {
    res.sendStatus(200).send('loaderio-1f922ed8c29eea0f9d45f0e55b3a234b');
});

app.listen(port, () => console.log(`App listening on port ${port}!`));
