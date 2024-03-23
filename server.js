const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/connection');

const app = express();
const PORT = process.env.PORT;


app.use(express.json());
app.use(cors());


connectDB();

// Routes
app.use('/api', require('./routes/empRoute'));
// app.use('/api', require('./routes/tasks'));

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
