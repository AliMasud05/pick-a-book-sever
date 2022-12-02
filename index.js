const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();
const port = process.env.PORT || 5000;
const app = express();

//user:Pick-a-Book
//pass:Ul83fAF4uzdDmhNo
// middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.memgfjc.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri);
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
// const collection = client.db("test").collection("devices");

async function run() {
  try {
    const booksTitleCollection = client.db("Pic-a-Book").collection("booksTitle");
    const productItemsCollection = client.db("Pic-a-Book").collection("ProductItems");
    const bookingCollection = client.db("Pic-a-Book").collection("Booking");
    const usersCollection = client.db("Pic-a-Book").collection("users");

    app.get("/booktitle", async (req, res) => {
      const query = {};
      const title = await booksTitleCollection.find(query).toArray();
      res.send(title);
    });
    app.get("/category/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await booksTitleCollection.findOne(query);
      const query2 = { category: result.categoryName };
      const result2 = await productItemsCollection.find(query2).toArray();

      res.send(result2);
    });
    app.post("/bookings", async (req, res) => {
      const user = req.body;

      const result = await bookingCollection.insertOne(user);
      res.send(result);
    });
    app.post("/users", async (req, res) => {
      const user = req.body;
      const result = await usersCollection.insertOne(user);
      res.send(result);
    });
    app.post("/product", async (req, res) => {
      const user = req.body;

      const result = await productItemsCollection.insertOne(user);
      res.send(result);
    });
    app.get('/user',  async (req, res) => {
      const email=req.query.email;
      const result=await usersCollection.find({email:email}).toArray();
      res.send(result) 
    });

    app.get('/buyers', async (req, res) => {
      const cursor = await usersCollection.find({ role: "buyer" }).toArray()
      res.send(cursor)
    });
    app.get('/sellers', async (req, res) => {
      const cursor = await usersCollection.find({ role: "seller" }).toArray()
      res.send(cursor)
    });

    app.get('/myproduct',  async (req, res) => {
      const email=req.query.email;
      const result=await productItemsCollection.find({email:email}).toArray();
      res.send(result) 
    });
    app.delete("/categories/:id", async (req, res) => {
      const id = req.params.id;
      console.log(id);
      const query = { _id: ObjectId(id) };
      const result = await productItemsCollection.deleteOne(query);
      res.send(result)

      
    });
    app.delete('/buyers/:id', async (req, res) => {
      const id = req.params.id;
      const query = {
        _id: ObjectId(id)
      }
      const result = await usersCollection.deleteOne(query);
      res.send(result)

    })

  } finally {
  }
}
run().catch(console.log);

app.get("/", async (req, res) => {
  res.send("pick-a-book server is running");
});

app.listen(port, () => console.log(`Pick-a-Book running on ${port}`));
