const debug = require('debug')('api:loginController');
const { MongoClient } = require('mongodb');

function loginController(dbConfig) {

  function login (req, res) {
    try{
      const user = req.body;
      debug(`${user.username}`);
      const client = new MongoClient(dbConfig.url, { useNewUrlParser: true })
      client.connect(async (err, client) => {
        if (!err) {
          const db = await client.db(dbConfig.db);
          const col = await db.collection('user');

          const resp = await col.insertOne(user);
          await client.close();

          if (resp){
            res.json(resp)
          }else{
            res.send('Error creating user');
          }
        } else {
          debug(err)
        }

      })
    }catch (err){
      debug(err.stack);
    }
  }

  function debuger (req, res) {
    debug('entro en la funcion perfectamete');
    res.json('funciona');
  }

  return {
    login,
    debuger
  };
}
module.exports = loginController;
