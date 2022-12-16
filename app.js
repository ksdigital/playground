const express          = require('express')
const path             = require('path')
const cors             = require('cors')
const morgan           = require('morgan')
const https            = require('https');
const fs               = require('fs');

const cert = {
    key: fs.readFileSync(path.resolve(__dirname, 'cert', 'private.pem')),
    cert: fs.readFileSync(path.resolve(__dirname, 'cert', 'public.pem'))
}

const app = express()

app.use(morgan('dev'))
app.use(cors())

app.use(express.static('views/meleb'))
app.use(express.static('views/umnenok'))
// app.use(express.static('views/tickets'))
app.use(express.static('views/inquisitor'))
// app.use(express.static('views/certs'))

app.get('meleb', (req, res) => {


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

const httpsApp = https.createServer(cert, app)


module.exports = app