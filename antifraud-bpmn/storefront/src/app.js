const routes = require('./routes');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

app.use(bodyParser());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use('/static', express.static(path.join(__dirname, 'dist')));

app.use('/api', routes.api);
app.use('', routes.core);

app.listen(port, () => console.log(`Listening on port ${port}!`));
