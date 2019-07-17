const debug = require('debug')('api:productController');
const { MongoClient, ObjectID } = require('mongodb');

function navController(dbConfig) {

  function get (req, res) {
    const client = new MongoClient(dbConfig.url, { useNewUrlParser: true });
    (async () => {
      try{
        await client.connect();
        const db = await client.db(dbConfig.db);
        const col = await db.collection('link');
        let r = await col.find({}).toArray();
        client.close();

        if (r) {
          res.json(r);
        }else {
          res.json('Error getting link');
        }
      }catch(err) {
        debug(err.stack);
      }
    })();
  }

  function getOne (req, res) {
    const client = new MongoClient(dbConfig.url, { useNewUrlParser: true });
    const id = req.params.id;
    (async () => {
      try {
        await client.connect();
        const db = await client.db(dbConfig.db);
        const col = await db.collection('link');
        let r = await col.findOne({ _id:ObjectID(id) });
        client.close();

        if(r){
          res.json(r)
        }else{
          res.json('No link detected');
        }
      }catch (err) {
        debug(err.stack);
      }

    })();
  }

  function insert (req, res) {
    const link = req.body;

    const client = new MongoClient(dbConfig.url, { useNewUrlParser: true });

    (async () => {
      try{
        await client.connect();
        const db = await client.db(dbConfig.db);
        const col = await db.collection('link');
        let r = await col.insertOne(link);
        client.close();

        if(r.result.ok) {
          res.json(r.insertedId);
        } else {
          res.json(`Error inserting link`);
        }
      }catch (err) {
        debug(err.stack);
      }
    })();
  }

  function update (req, res) {
    const id = req.params.id;
    const link = req.body;
    delete link._id;

    const client = new MongoClient(dbConfig.url, { useNewUrlParser: true });
    (async() => {
      try{
          await client.connect();
          const db = await client.db(dbConfig.db);
          const col = await db.collection('link');
          let r = await col.updateOne({_id: ObjectID(id)}, {$set: link});
          client.close();

          if (r.modifiedCount) {
            debug(`link updated successfully. Items modified: ${r.modifiedCount}`);
            res.json(`ok`);
          } else {
            res.json(`Error updating link`);
          }
      }catch (err) {
        debug(err.stack);
      }
    })();
  }

  function remove (req, res) {
    const client = new MongoClient(dbConfig.url, { useNewUrlParser: true });
    const id = req.params.id;
    (async () => {
      try{
        await client.connect();
        const db = await client.db(dbConfig.db);
        const col = await db.collection('link');
        let r = await col.deleteOne({ _id: ObjectID(id) });
        client.close();

        res.json('ok');
        debug(`Link deleted ${r.deletedCount}`);

      }catch (err) {
        debug(err.debug);
      }
    })();
  }

  return {
    get,
    getOne,
    insert,
    update,
    remove
  };
}
module.exports = navController;
