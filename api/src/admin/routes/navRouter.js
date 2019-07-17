const Router = require('express');
const debug = require('debug')('api:productRouter');

const navRouter = Router();

function router (dbConfig) {
  const navController = require('../controllers/navController')(dbConfig);

  navRouter.route('/')
    .get(navController.get)
    .post(navController.insert);

  navRouter.route('/:id')
    .get(navController.getOne)
    .patch(navController.update)
    .delete(navController.remove);

  return navRouter;
}
module.exports = router;