const express          = require('express')
const path             = require('path')
const cors             = require('cors')
const morgan           = require('morgan')
const compression      = require('compression');
const bodyParser       = require('body-parser')
const mailingRoutes    = require('./routes/mailer')
const inquisitorRoutes = require('./routes/mailer')
const https            = require('https');
const fs               = require('fs');
const mailer           = require('./tools/email')

const cert = {
    key: fs.readFileSync(path.resolve(__dirname, 'cert', 'private.pem')),
    cert: fs.readFileSync(path.resolve(__dirname, 'cert', 'public.pem'))
}

mailer.connect();

const app = express()

app.use(morgan('dev'))
app.use(cors())
app.use(compression())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use('/api/mailer', mailingRoutes)
app.use('/api/inquisitor/mailer', mailingRoutes)

app.use(express.static('views/ksd'))
app.use(express.static('views/meleb'))
app.use(express.static('views/umnenok'))
// app.use(express.static('views/tickets'))
app.use(express.static('views/inquisitor'))
app.use(express.static('views/certs'))


app.get('/ksd', (req, res) => {


    res.sendFile(
        path.resolve(
            __dirname, 'views', 'ksd', 'index.html'
        )
    )
})
app.get('/meleb', (req, res) => {


    res.sendFile(
        path.resolve(
            __dirname, 'views', 'meleb', 'index.html'
        )
    )
})
app.get('/umnenok', (req, res) => {


    res.sendFile(
        path.resolve(
            __dirname, 'views', 'umnenok', 'index.html'
        )
    )
})
app.get('/inquisitor', (req, res) => {


    res.sendFile(
        path.resolve(
            __dirname, 'views', 'inquisitor', 'index.html'
        )
    )
})
app.get('/inquisitor/:page', (req, res) => {

    const page = req.params.page;
    res.sendFile(
        path.resolve(
            __dirname, 'views', 'inquisitor', `${page}`
        )
    )
})
// app.get('tickets', (req, res) => {
//
//
//     res.sendFile(
//         path.resolve(
//             __dirname, 'views', 'tickets', 'index.html'
//         )
//     )
// })
// app.get('certs', (req, res) => {
//
//
//     res.sendFile(
//         path.resolve(
//             __dirname, 'views', 'certs', 'index.html'
//         )
//     )
// })

app.get('/certs', (req, res) => {


    res.sendFile(
        path.resolve(
            __dirname, 'views', 'certs', 'index.html'
        )
    )
})
const httpsApp = https.createServer(cert, app)


module.exports = httpsApp