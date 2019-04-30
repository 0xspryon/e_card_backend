"use strict";

const jwt = require('jsonwebtoken')
const User = require('../db/models').User
console.log({ User })

const signUp = ({ firstname, lastname, email, username, password }) => {
    return User.create({ firstname, lastname, email, username, password })
        .then(newUser => {
            return { firstname, lastname, email, username, id: newUser.id }

        })
        .catch(err => {
            return null
        })
}


const login = (email, password) => {
    return User.findOne({ where: { email } })
        .then(user => {
            if (!user) return null
            else {
                return user.auth(password)
                    .then((isMatched) => {
                        if (!isMatched) return null
                        else {
                            const { firstname, lastname, email, username, id } = user.get({ plain: true })
                            const body = { firstname, lastname, email, username, id }
                            //Sign the JWT token and populate the payload with the user email and id
                            const token = jwt.sign(body, 'super_secret')
                            //Send back the token to the user
                            //@todo: convert to jwt token and send back
                            return { token }
                        }
                    })
                    .catch(err => err)
            }
        })
        .catch(err => err)
}

module.exports = {
    signUp,
    login,
}