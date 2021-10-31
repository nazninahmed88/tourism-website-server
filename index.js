const express = require('express')
const cors = require('cors')
require('dotenv').config()
const { MongoClient } = require('mongodb');
const app = express();
require('dotenv').config()
const port = process.env.PORT || 5000 ;

app.use(cors())
app.use(express.json())


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.zew5s.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

console.log(uri)


async function run() {

  try {

    await client.connect();
   const database = client.db('tourisum');
   const serviceCollection = database.collection('services');
   const hotelsCollection = database.collection('hotels');

//  get Services
   app.get('/services' , async(req , res )=>{
    const cursor = serviceCollection.find({});
      const services = await cursor.toArray();
      res.send(services)

   })


   app.get('/hotels' , async(req , res )=>{
    const cursor = hotelsCollection.find({});
      const hotels = await cursor.toArray();
      res.send(hotels)

   })
    

    // const result = await foods.insertMany(docs, options);

    // console.log(`${result.insertedCount} documents were inserted`);

  }
   finally {

    // await client.close();

  }

}

run().catch(console.dir);






app.get('/', (req, res) => {
  res.send('Hello World Tourisum!')
})

app.listen(port, () => {
  console.log('Example app listening at' , port)
})