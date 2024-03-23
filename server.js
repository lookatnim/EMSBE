const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/connection');

const app = express();
const PORT = process.env.PORT;


app.use(express.json());

const allowedOrigins = ['http://localhost:3000'];
const corsOptions = {
  origin: (origin,callback)=>{
    if(allowedOrigins.indexOf(origin)!==-1||!origin){
      callback(null,true)
      console.log(`Allowed  ${allowedOrigins}`)
    }else{
      callback(new Error('Not allowed.'))
    }
  }
}

app.use(cors(corsOptions));


connectDB();


app.use('/api', require('./routes/empRoute'));


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
