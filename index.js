const express = require('express');
const cors = require('cors');
require('dotenv').config()
const app = express();
const port = process.env.PORT || 5000;


//middleware
app.use(cors());
app.use(express.json());


// userName:TaskManagement
// Pass:97LZ4JMAm4xskLhD
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.b2stcle.mongodb.net/?retryWrites=true&w=majority`;
console.log('process.env.DB_USER')
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();


    const taskCOllection =client.db('TaskDB').collection('task');



    app.post('/task',async(req, res)=>{
        const newTask = req.body;
        console.log(newTask);
        const result = await taskCOllection.insertOne(newTask);
        res.send(result);
    })


       //for my tasks get
       app.get('/task',async(req,res)=>{
        const cursor = taskCOllection.find();
        const result = await cursor.toArray();
        res.send(result);
  
      })


           //Delete Cart Product
           app.delete('/task/:id', async(req, res)=>{
            const id = req.params.id;
            console.log(id)
            const filter = {_id:new ObjectId(id )}
    
            const result = await taskCOllection.deleteOne(filter);
            res.send(result);
          })




    // ////get single data by id for update
    // app.get('/tasks/:id',async(req, res)=>{
    //   const id = req.params.id;
    //   console.log(id)
    //   const filter ={_id:new ObjectId(id)}
    //   const result =await taskCOllection.findOne(filter);
    //   res.send(result);
    // })







    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    // console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/tasks',(req, res)=>{
    res.send('Task management running')
})

app.listen(port,()=>{
    console.log(`Task Management Server is running on port ${port}`)
})