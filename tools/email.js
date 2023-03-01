const keys    = require('../config/keys')
const mailjet = require('node-mailjet')

module.exports.connect = function () {
    mailjet.apiConnect(keys.email.api, keys.email.secret)
}

module.exports.sendMessage = async function (body) {
    return new Promise((resolve, reject) => {
        const request = mailjet
            .post("send", {'version': 'v3.1'})
            .request({
                "Messages":[
                    {
                        "From": {
                            "Email": `${keys.email.target}`,
                            "Name": "KSD"
                        },
                        "To": [
                            {
                                "Email": "info@ksdigital.ru",
                                "Name": "KSD"
                            }
                        ],
                        "Subject": "Новая заявка",
                        "TextPart": "Новая заявка",
                        "HTMLPart": `<h2>На сайте новая заявка от ${body.email}</h2><br />Текст заявки: ${body.message || '-'}<br />Телефон для связи: ${body.phone || '-'}`,
                        "CustomID": "AppGettingStartedTest"
                    }
                ]
            })
        request
            .then((result) => {
                resolve(true)
            })
            .catch((err) => {
                resolve(false)
            })
    })
}