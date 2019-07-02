const Router = require('express');
const debug = require('debug')('api:loginRouter');

const loginRouter = Router();

function router (dbConfig) {
  const loginController = require('../controllers/loginController')(dbConfig);

  loginRouter.route('/')
  .get(loginController.debuger)
  .post(loginController.login)
  
  return loginRouter;
}
module.exports = router;
