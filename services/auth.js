"use strict";

const jwt = require('jsonwebtoken')
const User = require('../db/models').User
const { sendEmail } = require('./email')
const signUp = ({ firstname, lastname, email, username, password }) => {
    return User.create({ firstname, lastname, email, username, password })
        .then(newUser => ({ firstname, lastname, email, username, id: newUser.id }))
        .catch(err => {
            throw err
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

const sendRegistrationEmail = ({ email, username }) => {
    const options = {
        to: email,
        from: 'welcome@e_card.com', // Totally up to you
        subject: "Welcome to e_card",
        html: `<h1>Hi ${username}. <br/>
        We personally at e_card will like to thank you for using our service.
        <br />
        Click the link below to verify your account</h1>`,
    };
    return sendEmail(options)
        .catch(err => {
            console.log({ sendRegistrationEmailErr: err })
        })
}

module.exports = {
    signUp,
    login,
    sendRegistrationEmail,
}