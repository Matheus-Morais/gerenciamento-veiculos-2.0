const express = require('express')
const controllers = require('../api/index')

module.exports = function (server) {
    const serverV1 = express.Router()
    server.use('/v1', serverV1)

    serverV1.get('/', (req, res) => {
        res.type('text/plain')
        res.send(`API - v1`)
    })

    //Rota para criar um veiculo
    serverV1.post('/novo-veiculo', controllers.postVeiculo)
}
