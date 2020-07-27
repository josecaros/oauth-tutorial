const router = require('express').Router();
const passport = require('passport');
const passportSetup = require('../config/passport-setup');

//oauth with login
router.get('/login', (req, res)=>{
    res.render('login');
});

//oauth loggout
router.get('/logout', (req, res) => {
    // handle with passport
    res.send('logging out');
    req.logout();
});

//oauth with google
router.get('/google', passport.authenticate('google',{
    scope:['profile','email']
}));

//call back for google response
router.get('/google/redirect',passport.authenticate('google'), (req, res)=>{
    console.log(req.user);
    res.redirect('/profile');
})
module.exports = router;