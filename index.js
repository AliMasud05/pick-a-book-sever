const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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
      const booksTitleCollection = client.db('Pic-a-Book').collection('booksTitle');
    const productItemsCollection = client.db('Pic-a-Book').collection('ProductItems');
    const bookingCollection = client.db('Pic-a-Book').collection('Booking');

      app.get('/booktitle', async(req, res)=>{
        const query ={};
        const title =await booksTitleCollection.find(query).toArray();
        res.send(title);
      });
      app.get('/category/:id', async(req, res)=>{
        const id =req.params.id;
        const query ={_id:ObjectId(id)};
        const result = await booksTitleCollection.findOne(query);
        const query2 ={category:result.categoryName}
        const result2 =await productItemsCollection.find(query2).toArray();

      res.send(result2);
      });
    app.post('/bookings', async (req, res) => {
      const user = req.body;
      console.log(user);
      const result = await bookingCollection.insertOne(user);
      res.send(result);
    });
   
  }
  finally{

  }
}
run().catch(console.log)


app.get('/', async (req, res) => {
    res.send('pick-a-book server is running');
})

app.listen(port, () => console.log(`Pick-a-Book running on ${port}`))