const errorHandler = require('../tools/errorHandler')
const mailer       = require('../tools/email')

module.exports.send = async function (req, res) {
    try {
        const data = await mailer.sendMessage(req.body)
        if (data) {
            return res.status(200).json({
                action: 'OK'
            })
        } else {
            return res.status(404)
        }
    } catch (e) {
        errorHandler(res, e)
    }

}
