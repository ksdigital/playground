const keys    = require('../config/keys')
const mailjet = require('node-mailjet')


let a = null;

module.exports.connect = function () {
    a = mailjet.apiConnect(keys.email.api, keys.email.secret)
}

module.exports.sendMessage = async function (body, target) {
    console.log('BODY EMAIL', body.email)
    return new Promise((resolve, reject) => {
        const request = a
            .post("send", {'version': 'v3.1'})
            .request({
                "Messages":[
                    {
                        "From": {
                            "Email": `${target ? target : keys.email.target}`,
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