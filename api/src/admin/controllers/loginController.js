const debug = require('debug')('api:loginController');
const { MongoClient } = require('mongodb');

function loginController(dbConfig) {

  function login (req, res) {
    const user = req.body;
    const client = new MongoClient(dbConfig.url, { useNewUrlParser: true });
    (async () => {
      try{
        await client.connect();
        const db = await client.db(dbConfig.db);
        const col = await db.collection('user');
        const r = await col.findOne({
          username: user.username,
          password: user.password,
          status: true
        });
        client.close();

        if (r){
          res.json(r)
        }else{
          res.json('No user');
        }
      }catch (err){
        debug(err.stack);
      }
    })();
  }

  function insert (req, res) {
    const user = req.body;
    user.status = true;
    const client = new MongoClient(dbConfig.url, { useNewUrlParser: true });

    try{
      (async () => {
        await client.connect();
        const db = await client.db(dbConfig.db);
        const col = await db.collection('user');
        let r = await col.insertOne(user);
        client.close();

        if (r.result.ok){
          res.json(r.insertedId);
        }else {
          res.json(`Error inserting an User`);
        }
      })();
    }catch (err){
      debug(err.stack);
    }
  }

  return {
    login,
    insert
  };
}
module.exports = loginController;
