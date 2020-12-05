var express = require('express');
var router = express.Router();
var models = require('../models');
var authService = require('../services/auth');
const config = require('../config/index')[process.env.NODE_ENV || 'development'];
const log = config.log();


router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


//User signup route
router.post('/signup', async (req, res, next) => {
  try {
  models.users
    .findOrCreate({
      where: {
        Username: req.body.username
      },
      defaults: {
        FirstName: req.body.firstname,
        LastName: req.body.lastname,
        Email: req.body.email,
        Password: authService.hashPassword(req.body.password)
      }
    })
    .then(function(result, created) {
      if (created) {
        res.send('User successfully created');
      } else {
        res.status(200).json({
          message: 'user already exists',
          status: 400
        });
      }
    })
  } catch (error) {
    log.info(error);
  }
  });

//User secure login route
router.post('/login', async (req, res, next) => {
  try{
  models.users.findOne({
    where: { Username: req.body.username }
  }).then(user => {
    if (!user) {
      console.log('User not found')
      return res.status(401).json({
        message: "Login Failed"
      });
    } else {
      let passwordMatch = authService.comparePasswords(req.body.password, user.Password);
      if (passwordMatch) {
        let token = authService.signUser(user);
        res.cookie('jwt', token);
        res.send('Login successful');
      } else {
        log.info('Wrong password');
        res.send('Wrong password');
      }
    }
  });
} catch(error) {
  log.info(error)
}
});

module.exports = router;