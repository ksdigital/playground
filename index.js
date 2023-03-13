const app = require('./app')
const redirect = require('./redirect')

const port = process.env.PORT || 443

redirect.listen(80, () => {
    console.log(`Redirect run on 80 port`)
})

console.log('Preparing...')

app.listen(port, () => {
    console.log(`Server run on ${port} port`)
})