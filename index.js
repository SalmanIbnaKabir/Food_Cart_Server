const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const app = express()
const port = process.env.PORT || 5000;


// middleware
app.use(cors());
app.use(express.json());

// mongodb data 



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.0y4d7qh.mongodb.net/?retryWrites=true&w=majority`;
// console.log(uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
  try {
    const serviceCollection = client.db('assignmentDb_11').collection('services');
    const reviewsCollection = client.db('assignmentDb_11').collection('reviews');

    app.get('/services', async (req, res) => {
      const query = {};
      const cursor = serviceCollection.find(query);
      const services = await cursor.limit(3).toArray();
      res.send(services)
    })
    app.get('/services/services', async (req, res) => {
      const query = {};
      const cursor = serviceCollection.find(query);
      const services = await cursor.toArray();
      res.send(services)
    });

    app.get('/services/:id', async (req, res) => {
      // console.log(req.params.id);
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const service = await serviceCollection.findOne(query);
      res.send(service);
    })
    app.get('/services/services/:id', async (req, res) => {
      // console.log(req.params.id);
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const service = await serviceCollection.findOne(query);
      res.send(service);
    })

    app.post('/reviews', async (req, res) => {
      const review = req.body;
      // console.log(review);
      const result = await reviewsCollection.insertOne(review);
      res.send(result)
    });

    app.get('/reviews', async (req, res) => {
      const serviceName = req.query.serviceName;
      console.log(serviceName);
      const query = { serviceName: serviceName };
      const reviews = await reviewsCollection.find(query).toArray();
      res.send(reviews)
    })


  }
  finally {

  }

}

run().catch(e => console.error(e))



app.get('/', (req, res) => {
  res.send('Assignment 11 server is running')
});

app.listen(port, () => {
  console.log(`Assignment 11 Server running in   ${port}`);
});
