const express = require('express')
const router = express.Router()
const passport = require('passport')
require('../../app')
require('../../services/facebook')

function isLoggedIn(req,res,next){
    req.user ? next() : res.sendStatus(401);
}

router.get('/', (req,res) => {
    res.send('<a href="/auth/facebook">Autenticar con Facebook</a>')
})

router.get('/auth/facebook',
  passport.authenticate('facebook'));


  router.get('/facebook/callback',
  passport.authenticate('facebook',{
      successRedirect: '/protected',
      failureRedirect: '/auth/failure'
  })
)

router.get('/auth/failure', (req,res) => {
    res.send("fallo")
})

router.get('/protected', isLoggedIn, (req,res) => {
    res.send(req.user) //obtenemos info del usuario
})

router.get('/logout', (req,res) =>{
    req.logout();
    req.session.destroy();
    res.send("bye")
})

module.exports = router