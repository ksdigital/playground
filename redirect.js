const express          = require('express')

const app = express()

app.get('*', function(req, res) {
    res.redirect('https://' + req.headers.host + req.url);

})

module.exports = app
