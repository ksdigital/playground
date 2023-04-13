const app = require('./app')
const redirect = require('./redirect')
const keys = require("./config/keys");

const port = process.env.PORT || 443



redirect.listen(80, () => {
    console.log(`Redirect run on 80 port`)
})

console.log('Preparing...')

app.listen(port, () => {
    console.log(`Server run on ${port} port`)
})


// const mailjet = require('node-mailjet')
//
// const mailjet1 = mailjet.apiConnect(keys.email.api, keys.email.secret)
// const request = mailjet1
//     .post("send", {'version': 'v3.1'})
//     .request({
//         "Messages":[
//             {
//                 "From": {
//                     "Email": "detektivinkvizitor@yandex.ru",
//                     "Name": "Admin"
//                 },
//                 "To": [
//                     {
//                         "Email": "detektivinkvizitor@yandex.ru",
//                         "Name": "Admin"
//                     }
//                 ],
//                 "Subject": "Greetings from Mailjet.",
//                 "TextPart": "My first Mailjet email",
//                 "HTMLPart": "<h3>Dear passenger 1, welcome to <a href='https://www.mailjet.com/'>Mailjet</a>!</h3><br />May the delivery force be with you!",
//                 "CustomID": "AppGettingStartedTest"
//             }
//         ]
//     })
// request
//     .then((result) => {
//         console.log(result.body)
//     })
//     .catch((err) => {
//         console.log(err.statusCode)
//     })