const passport = require('passport');

function PassportConfig (api, dbConfig) {
  require('./strategies/local.strategy')(dbConfig);

  api.use(passport.initialize());
  api.use(passport.session());

  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    done(null, user);
  });
}

module.exports = PassportConfig;
