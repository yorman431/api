const passport = require('passport');
const { Strategy } = require('passport-local');
const { MongoClient } = require('mongodb');
const debug = require('debug')('app:local.strategy');

function LocalPassport (dbConfig) {
  passport.use(new Strategy({
    usernameField: 'username',
    passwordField: 'password'
  }, (username, password, done) => {
    let client;

    (async () => {
      try {
        client = await MongoClient.connect(dbConfig.url, { useNewUrlParser: true });
        const db = await client.db(dbConfig.dataB);
        const col = await db.collection('user');

        const user = await col.findOne({
          username: username,
          password: password,
          status: true
        });

        client.close();

        if (user) {
          done(null, user);
        } else {
          done(null, false);
        }
      } catch (err) {
        debug(err.stack);
      }
    })();
  }));
}

module.exports = LocalPassport;
