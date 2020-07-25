const express = require('express');
const app = express();

//set database
const mongoose = require('mongoose');mongoose.Promise = global.Promise;

//conect database
mongoose.connect('mongodb://127.0.0.1/oauth',{
    useUnifiedTopology: true,
    useNewUrlParser: true,
  }).then(() => {
      console.log("Successfully connected to the database");    
  }).catch(err => {
      console.log('Could not connect to the database. Exiting now...', err);
      process.exit();
  });

//set up view engine
app.set('view engine', 'ejs');

app.get('/', (req, res) =>{
    res.render('home');
});

app.listen(3500, ()=>{
    console.log('app run on port 3500');
});

const authRoutes = require('./routes/oauth');

app.use('/auth', authRoutes);