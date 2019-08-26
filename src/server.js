const app = require('../src/app');
const { PORT } = require('./config');
require('newrelic');

app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}.`)
});