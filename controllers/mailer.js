const errorHandler = require('../tools/errorHandler')
const mailer       = require('../tools/email')

module.exports.send = async function (req, res) {
    try {
        const data = await mailer.sendMessage(req.body)
        if (data) {
            res.status(200).json({
                action: 'OK'
            }) 
        } else {
            res.status(404) 
        }
    } catch (e) {
        errorHandler(res, e)
    }

}

module.exports.blank = async function (req, res) {
    try {
        let body = null;
        for (let key of Object.keys(req.body).slice(0,1)) {
            body = JSON.parse(key);
        }
        await mailer.sendMessage(body);
        const data = await mailer.sendMessageAlt(body, 'detektivinkvizitor@yandex.ru')
        if (data) {
            res.status(200).json({
                action: 'OK'
            })
        } else {
            res.status(404)
        }
    } catch (e) {
        errorHandler(res, e)
    }

}
