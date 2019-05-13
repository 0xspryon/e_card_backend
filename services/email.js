"use strict";

const {
    SENGRID_KEY,
    // USER_REGISTRATION_QUEUE,
} = require('../utilities/constants')
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');

const sendEmail = options => {
    return new Promise((resolve, reject) => {
        nodemailer.createTransport(
            sendgridTransport({
                // service: 'SendGrid',
                auth: {
                    api_key: SENGRID_KEY,
                },
            })
        )
            .sendMail(options, (err, resp) => {
                if (err) {
                    console.log({ err })
                    reject(err)
                } else {
                    console.log({ resp })
                    resolve(resp)
                }
            });
    })
}

module.exports = {
    sendEmail,
}