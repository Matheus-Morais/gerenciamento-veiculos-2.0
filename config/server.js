const port = process.env.PORT

const bodyParser = require('body-parser')
const express = require('express')
const server = express()


server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json())

server.get('/', (req, res) => {
    res.type('text/plain')
    res.send(`Gerenciador de veiculos`)
})

server.listen(port, function () {
    console.log(`Backend está rodando na porta: ${port}`)
})

module.exports = server
