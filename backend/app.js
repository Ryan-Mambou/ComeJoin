const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const username = process.env.USER;
const password = process.env.PASSWORD;
const userRoutes = require('./routes/user');
const questionRoutes = require('./routes/question');
const path = require('path');

mongoose.connect(`mongodb+srv://${username}:${password}@cluster0.mbxky.mongodb.net/?retryWrites=true&w=majority`,
{ useNewUrlParser: true,
useUnifiedTopology: true })
.then(() => console.log('MongoDB connected !'))
.catch(() => console.log('MongoDB not connected !'));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });


  app.use(cors());
  app.use(express.json());

  app.use('/api/auth', userRoutes);
  app.use('/api/questions', questionRoutes);

  //Serve static assets id in production
  __dirname = path.resolve();
  if(process.env.NODE_ENV === 'production') {
    //Set static folder
    app.use(express.static(path.join(__dirname, 'frontend/build')));

    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
    })
  }

  module.exports = app;