const express = require('express');
const controllers = require('./controllers');

const app = express();
app.use(express.json());


app.get('/api/items/', controllers.getItemList);

app.get('/api/items/:itemId', controllers.getItem);

app.post('/api/items/', controllers.createItem);

app.post('/api/log/', controllers.createLog);


module.exports = {
  app,
};
