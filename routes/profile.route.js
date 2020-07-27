const router = require('express').Router();


const authCheck= (req, res, next) =>{
    if(!req.user){
        //if user is not loggin
        res.redirect('/auth/login');
    }else{
        next();
    }
}

router.get('/',authCheck, (req, res)=>{
    res.render('profile',{usuarios:req.user});
})

module.exports = router;