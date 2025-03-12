const express = require('express')
const dotenv = require('dotenv')
const { MongoClient } = require('mongodb');
const bodyparser = require("body-parser");
const cors = require("cors")
const app = express()

dotenv.config();



const port = process.env.PORT;
const url = process.env.mongo_URI;
const client = new MongoClient(url);

const dbName = 'PassOP';
console.log(url)

client.connect();
app.use(bodyparser.json())
app.use(cors())

console.log("connected successfully")


app.get('/', async (req, res) => {
  const db = client.db(dbName);
  const collection = db.collection('passwords');
  const finddata = await collection.find({}).toArray();
  res.json(finddata)
})


app.post('/Adddata', async (req, res) => {
  const password = req.body;
  const db = client.db(dbName);
  const collection = db.collection('passwords');
  const insertdata = await collection.insertOne(password)
  res.send("added")
})

app.post('/Delete', async (req, res) => {
  const { Id } = req.body;
  const db = client.db(dbName);
  const collection = db.collection('passwords');
  console.log(req.body)
  const deletedata = await collection.deleteOne({ "Id": Id })
  res.send("deleted")
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
