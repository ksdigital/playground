const keys    = require('../config/keys')
const mailjet = require('node-mailjet')
var UniSender = require('unisender');


let a = null;
let uniSender = null;

module.exports.connect = function () {
    a = mailjet.apiConnect(keys.email.api, keys.email.secret)
    uniSender = new UniSender({
        api_key: '6cudqey5x36tb66o4zcj1wq84ebkyaedzbajbype',
        lang: 'ru'
    });
}

module.exports.sendMessage = async function (body, target) {
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
module.exports.sendMessageAlt = async function (body, target) {
    return new Promise((resolve, reject) => {
        uniSender.sendEmail({
            email: `${target ? target : keys.email.target}`,
            sender_name: 'KSD',
            sender_email: `info@ksdigital.ru`,
            subject: 'Новая заявка',
            body: `<h2>На сайте новая заявка от ${body.email}</h2><br />Текст заявки: ${body.message || '-'}<br />Телефон для связи: ${body.phone || '-'}`,
            list_id: 1
        })
            .then((response) => {
                console.log('Email response ', response);
                resolve(true);
            })
            .catch((err) => {
                console.log('Email error ', err);
                resolve(false)
            })
    })
}