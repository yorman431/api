const Router = require('express');
const debug = require('debug')('api:productRouter');

const productRouter = Router();

function router (dbConfig) {
  const productController = require('../controllers/productController')(dbConfig);

  productRouter.route('/')
    .get(productController.get)
    .post(productController.insert);

  productRouter.route('/:id')
    .patch(productController.update);

  return productRouter;
}
module.exports = router;
