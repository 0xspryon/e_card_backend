var express = require('express');
var router = express.Router();
const authService = require('./../services/auth')
const authQueueProducer = require('./../queue/producer/AuthQueueProducer')


router.get('/', function (req, res, next) {
  res.json({ headers: req.headers }).status(200);
});

router.post('/', function (req, res, next) {
  const { firstname, lastname, email, password, username } = req.body
  authService.signUp({
    firstname,
    lastname,
    email,
    password,
    username
  })
    .then(user => {
      return authQueueProducer.registerNewUser({ email, username })
        .then(job => res.json({ user, job }).status(201))

    })
    .catch(err => res.status(500).json({ err }))
});

module.exports = router;
