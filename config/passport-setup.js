const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys');
var User = require('../model/user');
passport.serializeUser((user, done)=>{

})

passport.use(
    new GoogleStrategy({
        //options for strategy
        callbackURL:'/auth/google/redirect',
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret
    }, (accesToken, refreshToken, profile, done) =>{
        //passport callback
        console.log('passport callback function fired');
        console.log(profile);

        //check user
        User.findOne({email:profile.email})
        .then((currentUser)=>{
            if(currentUser){
                //Ya tenemos el usuario registrado
                console.log('user: '+ profile.email);
                done(null, currentUser);
            }else{
                //No tenemos el usuario
                var user=new User({
                    _id:profile.id,
                    userName:profile.displayName,
                    email: profile.email
                })
                user.save()
                .then(user => {
                    console.log(user);
                    done(null, user);
                }).catch(err => {
                    console.log({mensaje: 'error creando usuario'});
                });
            }
        });
    })
)