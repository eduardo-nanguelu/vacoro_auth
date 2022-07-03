const express = require('express')
const router = express.Router()
const passport = require('passport')
require('../../app')
require('../../services/google')

function isLoggedIn(req,res,next){
    req.user ? next() : res.sendStatus(401);
}

router.get('/google', (req,res) => {
    res.send('<a href="/auth/google">Autenticar con google</a>')
})

router.get('/auth/google',
    passport.authenticate('google', {scope: ['email','profile'] })
)

router.get('/google/callback',
    passport.authenticate('google',{
        successRedirect: '/protected',
        failureRedirect: '/auth/failure'
    })
)

router.get('/auth/failure', (req,res) => {
    res.send("fallo")
})

router.post('/protected', isLoggedIn, (req,res) => {
    res.send(req.user) //obtenemos info del usuario
})

router.get('/logout', (req,res) =>{
    req.logout();
    req.session.destroy();
    res.send("bye")
})

module.exports = router