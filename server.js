const express = require('express');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const app = express();
const santaWish = require('./route/santa-wish');
const { PORT } = require('./config/index');
const { sendNotSentEmails } = require('./util');

global.memoryDB = [];

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: false }));
app.use(morgan());

app.engine(
  'hbs',
  handlebars.engine({
    layoutsDir: `${__dirname}/views/layouts`,
    extname: '.hbs',
    defaultLayout: 'index',
  })
);
app.set('view engine', 'hbs');

app.use(express.static('public'));

app.get('/', (_req, res) => {
  res.send('Index...').end();
});

// Santa routes
app.use('/', santaWish);

app.listen(PORT, () => {
  console.info(`Your app is listening on port ${PORT}`);
  // Sending pending emails with provided interval
  sendNotSentEmails(15000, memoryDB);
});
