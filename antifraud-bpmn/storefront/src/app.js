const routes = require('./routes');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json({ type: 'text/plain' }));
app.set('view engine', 'ejs');
app.use('/static', express.static('dist'));

app.use('/api', routes.api);
app.use('', routes.core);

app.listen(port, () => console.log(`Listening on port ${port}!`));
