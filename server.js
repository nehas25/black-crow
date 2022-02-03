const express = require('express');
const app = express();
const PORT = 4000;
const crowsController = require('./controllers/crowsController');
const accessoriesController = require('./controllers/accessoriesController');
const cartController = require('./controllers/cartController');
const favicon = require('serve-favicon');

app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));
app.use(favicon(__dirname + '/public/images/favicon.ico'));

// app.use(express.urlencoded({ extended: false }));

app.use('/crows', crowsController);
app.use('/accessories', accessoriesController);
app.use('/cart', cartController);

app.get('/', (req, res) => {
  res.render('index.ejs');
});

app.listen(PORT, () => {
  console.log('Server is up and running and listening on port: ' + PORT);
})