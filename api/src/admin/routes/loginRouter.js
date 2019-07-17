const Router = require('express');
const debug = require('debug')('api:loginRouter');
const passport = require('passport');

const loginRouter = Router();

function router (dbConfig) {
  const loginController = require('../controllers/loginController')(dbConfig);

  loginRouter.route('/')
    .post(passport.authenticate('local'),(req, res) => {
      if (req.user) {
        res.json(req.user);
      } else {
        res.status(401);
      }
    });

  loginRouter.route('/user')
    .post(loginController.insert);

  return loginRouter;
}
module.exports = router;
