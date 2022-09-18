require('dotenv').config();
const express = require('express')
const bcrypt = require('bcrypt')
const app = express(); 
const { userRouter, authRouter } =require ("./route")
const port = process.env.PORT || 3002
const mongoose = require('mongoose');
const User = require("./model/user");
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
  "password": ""
  },
  {
  "email": "user@gmail.com",
  "name": "user",
  "type": "user",
  "password": ""
  }
];

(async function hashingPass (datas)  {
  const newDatas = datas.map(async (e) => {
    const salt = await bcrypt.genSalt(10);
    let hashPassword;
    if (e.type === "admin") {
      hashPassword = await bcrypt.hash("qwerty12345", salt);
    } else {
      hashPassword = await bcrypt.hash("qwerty67890", salt);
    }
    
    e.password = hashPassword
    return e.password
  })
  arrPromises = await Promise.allSettled(newDatas)

})(newUsers)





database.once('connected', () => {
    
    console.log('Database Connected');
})
mongoose.set('debug', true);
const seedDb = async () => {
  await User.deleteMany({})
  await User.insertMany(newUsers)
}

seedDb().then(() => {
  console.log("succed seeding")
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