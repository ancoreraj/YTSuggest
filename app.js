const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv')
const path = require('path')
const app = express();
const cors = require('cors')

dotenv.config({ path: './config/config.env' })

// Connect to MongoDB
mongoose
  .connect(
    process.env.MONGO_URI,
    { useNewUrlParser: true ,useUnifiedTopology: true }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));


// Express body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(cors())
// Routes
app.use('/', require('./routes/index.js'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running on  ${PORT}`));
