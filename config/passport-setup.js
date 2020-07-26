const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys');
var User = require('../model/user');


/*passport.serializeUser((user, done)=>{
    done(null,user.id);
});
passport.deserializeUser((id, done)=>{
    User.findById(id).then((user)=>{
        done(null,user.id);
    });
})*/

passport.use(
    new GoogleStrategy({
        //options for strategy
        callbackURL:'/auth/google/redirect',
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret
    }, (accesToken, refreshToken, profile, done) =>{
        //check user
        console.log(profile);
        User.findOne({googleId:profile.id})
        .then((currentUser)=>{
            if(currentUser){
                //Ya tenemos el usuario registrado
                console.log('Ya esta registrados user: '+ currentUser);
                //done(null, currentUser);
            }else{
                //No tenemos el usuario
                var user=new User({
                    userName:profile.displayName,
                    googleId: profile.id,
                    email: profile._json.email
                })
                user.save()
                .then(user => {
                    console.log('Usuario creado'+user);
                    //done(null, user);
                }).catch(err => {
                    console.log({mensaje: 'error creando usuario'});
                });
            }
        });
    })
)