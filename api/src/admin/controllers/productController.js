const debug = require('debug')('api:productController');
const { MongoClient, ObjectID } = require('mongodb');

function productController(dbConfig) {

  function get (req, res) {
    const client = new MongoClient(dbConfig.url, { useNewUrlParser: true });
    (async () => {
      try{
        await client.connect();
        const db = await client.db(dbConfig.db);
        const col = await db.collection('product');
        let product = await col.find({}).toArray();
        client.close();

        if (product) {
          res.json(product);
        }else {
          res.json('Error getting product');
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
        const col = await db.collection('product');
        let r = await col.findOne({ _id:ObjectID(id) });
        client.close();

        if(r){
          res.json(r)
        }else{
          res.json('No product detected');
        }
      }catch (err) {
        debug(err.stack);
      }

    })();
  }

  function insert (req, res) {
    const product = req.body;

    const client = new MongoClient(dbConfig.url, { useNewUrlParser: true });

    (async () => {
      try{
        await client.connect();
        const db = await client.db(dbConfig.db);
        const col = await db.collection('product');
        let r = await col.insertOne(product);
        client.close();

        if(r.result.ok) {
          res.json(r.insertedId);
        } else {
          res.json(`Error inserting product`);
        }
      }catch (err) {
        debug(err.stack);
      }
    })();
  }

  function update (req, res) {
    const id = req.params.id;
    const product = req.body;
    delete product._id;

    const client = new MongoClient(dbConfig.url, { useNewUrlParser: true });
    (async() => {
      try{
          await client.connect();
          const db = await client.db(dbConfig.db);
          const col = await db.collection('product');
          let r = await col.updateOne({_id: ObjectID(id)}, {$set: product});
          client.close();

          if (r.modifiedCount) {
            debug(`Product updated successfully. Items modified: ${r.modifiedCount}`)
            res.json(`ok`);
          } else {
            res.json(`Error updating product`);
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
        const col = await db.collection('product');
        let r = await col.deleteOne({ _id: ObjectID(id) });
        client.close();

        res.json('ok');
        debug(`Product deleted ${r.deletedCount}`);

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
module.exports = productController;
