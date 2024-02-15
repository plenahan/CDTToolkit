const express = require('express')
const passport = require('passport')
const router = express.Router()

// @desc    Auth with Google
// @route   GET /auth/google
router.get('/google', passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email'] }),
  // passport.authenticate('google-drive'),
  // function (req, res){
  // The request will be redirected to Google for authentication, so this
  // function will not be called.
// }
)

// @desc    Google auth callback
// @route   GET /auth/google/callback
router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/account/dashboard')
  },
  // passport.authenticate('google-drive', { failureRedirect: '/' }),
  // function (req, res) {
  //   res.redirect('/account/dashboard');
  // }
)

// @desc    Logout user
// @route   /auth/logout
router.get('/logout', (req, res, next) => {
  req.logout((error) => {
      if (error) {return next(error)}
      res.redirect('/account/login')
  })
})

module.exports = router