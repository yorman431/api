const express = require('express');
const debug = require('debug')('api');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const session = require('express-session');


let api = express();
let port = process.env.PORT || 3000;
const dbConfig = {
  db: 'test',
  url: 'mongodb+srv://yormanh:cagg5kxz@admin-toi7g.gcp.mongodb.net/test?retryWrites=true&w=majority'
}

api.use(bodyParser.json());
api.use(bodyParser.urlencoded({ extended:false }));
api.use(cookieParser());
api.use(session({
  secret: 'Administracion',
  resave: false,
  saveUninitialized: false
}));

require('./src/config/passport')(api, dbConfig);

const loginRouter = require('./src/admin/routes/loginRouter')(dbConfig);
const productRouter = require('./src/admin/routes/productRouter')(dbConfig);
const navRouter = require('./src/admin/routes/navRouter')(dbConfig);

api.use('/admin', loginRouter);
api.use('/admin/product', productRouter);
api.use('/admin/link', navRouter);

api.listen(port, () => {
  debug(`listening to port ${port}`)
})