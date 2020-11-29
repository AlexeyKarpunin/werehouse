const express = require('express');
const controllers = require('./controllers');

const app = express();
app.use(express.json());

/*

GET   /api/items/             - items list
GET   /api/items/{itemId}     - get item
POST  /api/items/             - craete item

POST  /api/log/               - create log

*/

app.get('/api/items/', controllers.getItemList );

app.get('/api/items/{itemId}', controllers.getItem );

app.post('/api/items/', controllers.createItem);

app.post('/api/log/', controllers.createLog);


module.exports = {
  app,
};
