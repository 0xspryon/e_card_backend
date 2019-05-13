const authService = require('./../../../services/auth')
const {
    USER_REGISTRATION_QUEUE,
} = require('../../../utilities/constants')
const registerQueue = require('../../Queue').registerQueue(USER_REGISTRATION_QUEUE)

registerQueue.process(async job => {
    const { email, username } = job.data
    await authService.sendRegistrationEmail({ email, username })
})