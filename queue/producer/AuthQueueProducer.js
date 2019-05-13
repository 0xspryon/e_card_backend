
const {
    USER_REGISTRATION_QUEUE,
} = require('./../../utilities/constants')
const registerQueue = require('./../Queue').registerQueue(USER_REGISTRATION_QUEUE)

const registerNewUser = ({ email, username }) => {
    console.log({ email })
    return registerQueue.add({ email, username })
}

module.exports = {
    registerNewUser,
}