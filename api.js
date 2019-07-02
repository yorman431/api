const express = require('express');
const debug = require('debug')('api');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');

let api = express();
let port = process.env.PORT || 3000;
const dbConfig = {
  db: 'admin',
  url: 'mongodb+srv://yorman431:cagg5kxz@yherrera-lqjam.mongodb.net/test?retryWrites=true&w=majority'
}

api.use(bodyParser.json());
api.use(bodyParser.urlencoded({ extended:false }));

const loginRouter = require('./src/admin/routes/loginRouter')(dbConfig)

api.use('/admin', loginRouter);


api.listen(port, () => {
  debug(`listening to port ${port}`)
})