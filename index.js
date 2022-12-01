const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const port = process.env.PORT || 5000;
const app = express();

//user:Pick-a-Book
//pass:Ul83fAF4uzdDmhNo
// middleware
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.memgfjc.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
   // const collection = client.db("test").collection("devices");
    


async function run(){
  try{

  }
  finally{

  }
}
run().catch(console.log)


app.get('/', async (req, res) => {
    res.send('pick-a-book server is running');
})

app.listen(port, () => console.log(`Pick-a-Book running on ${port}`))