const express = require('express');
const app = express();

//set up view engine
app.set('view engine', 'ejs');

app.get('/', (req, res) =>{
    res.render('home');
});

app.listen(3500, ()=>{
    console.log('app run on port 3500');
});