const express = require('express');
const app = express();
const keys = require('./config/keys');
const mongoose = require('mongoose');mongoose.Promise = global.Promise;
const cookieSesion = require('cookie-session');
const passport = require('passport');

app.use(cookieSesion({
    maxAge: 24*60*60*1000,
    keys: [keys.session.cookieKey]
}));

//Iniciar passport
app.use(passport.initialize());
app.use(passport.session());

//set database and conect database
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
const profileRoutes = require('./routes/profile.route');

app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);