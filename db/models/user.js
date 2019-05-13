'use strict'
const bcrypt = require('bcrypt')

let hashPassword = password => bcrypt.hash(password, 10)

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    email: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
  }, {})
  User.associate = function (models) {
    // associations can be defined here
  }

  //add method to compare password to hash on user model
  User.prototype.auth = function (passw) {
    return bcrypt.compare(passw, this.password)
  }

  // hook to always hash the password before saving the user.
  User.beforeCreate('hash_password', (user, options) => {
    return hashPassword(user.password).then(hashedPw => {
      user.password = hashedPw
    })
  })

  // User.afterCreate('queueing_service_send_mail', (user,options) => {

  // })

  return User
}