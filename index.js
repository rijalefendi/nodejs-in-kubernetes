require('dotenv').config();
const express = require('express')
const app = express(); 
const { userRouter, authRouter } =require ("./route")
const port = process.env.PORT || 3002
const mongoose = require('mongoose');
const User = require("./model/user")
const mongoString = "mongodb+srv://rijal6690:kenari121931@cluster0.7rja7lc.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log("error: ", error)
})

const newUsers = [
  {
  "email": "admin@gmail.com",
  "name": "admin",
  "type": "admin",
  "password": "12345qwerty"
  },
  {
  "email": "admin@gmail.com",
  "name": "admin",
  "type": "admin",
  "password": "12345qwerty"
  }
];



database.once('connected', () => {
    
    console.log('Database Connected');
})
mongoose.set('debug', true);
const seedDb = async () => {
  await User.deleteMany({})
  await User.insertMany(newUsers)
}

seedDb().then(() => {
  mongoose.connection.close();
})

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World 12345!!!')
})

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})