var express = require('express');
var router = express.Router();
const AuthService = require('../services/auth')
const jwt = require('jsonwebtoken')

const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization
    jwt.verify(token, 'super_secret', function (err, payload) {
      if (payload) {
        req.user = payload;
        next()
      } else {
        next()
      }
    })
  } catch (e) {
    next()
  }
}

const protectRouteMiddleWare = (req, res, next) => {
  // if user exists the token was sent with the request and parsed by authMiddleware
  if (req.user) {
    //if user exists then go to next middleware
    next();
  }
  // token was not sent with request send error to user
  else {
    res.status(500).json({ error: 'login is required' });
  }
}

router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/login', function (req, res, next) {
  const { email, password } = req.body
  AuthService.login(
    email,
    password,
    // username,
  )
    .then(jwtTokenObject => {
      if (Boolean(jwtTokenObject)) {
        // authQueueProducer.registerNewUser(email)
        //   .then(() => res.json(jwtTokenObject).status(201))
        return res.json(jwtTokenObject).status(201)
      } else {
        res.json({ message: 'user or password incorrect' }).status(400)
      }

    })
    .catch(err => res.status(500).json({ err }))
});

module.exports = {
  router,
  authMiddleware,
  protectRouteMiddleWare
};
