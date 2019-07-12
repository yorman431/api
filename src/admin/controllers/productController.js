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
          res.json(`Error inserting a product`);
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
            res.json(`Product updated successfully. Items modified: ${r.modifiedCount}`);
          } else {
            res.json(`Error updating product`);
          }
      }catch (err) {
        debug(err.stack);
      }
    })();
  }

  return {
    get,
    insert,
    update
  };
}
module.exports = productController;
