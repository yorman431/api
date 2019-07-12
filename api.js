const express = require('express');
const debug = require('debug')('api');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');

let api = express();
let port = process.env.PORT || 3000;
const dbConfig = {
  db: 'test',
  url: 'mongodb+srv://yormanh:cagg5kxz@admin-toi7g.gcp.mongodb.net/test?retryWrites=true&w=majority'
}

api.use(bodyParser.json());
api.use(bodyParser.urlencoded({ extended:false }));

const loginRouter = require('./src/admin/routes/loginRouter')(dbConfig);
const productRouter = require('./src/admin/routes/productRouter')(dbConfig);

api.use('/admin', loginRouter);
api.use('/admin/product', productRouter);


api.listen(port, () => {
  debug(`listening to port ${port}`)
})