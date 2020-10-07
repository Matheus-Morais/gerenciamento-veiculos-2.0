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

    //Rota que busca um veiculo com uma placa
    serverV1.get('/encontrar-veiculo/:placa', controllers.getVeiculo)

    //Rota que busca todos os veiculos
    serverV1.get('/buscar-veiculos', controllers.getVeiculos)

    //Rota para alterar um veiculo
    serverV1.put('/atualizar-veiculo/:placa', controllers.putVeiculo)

    //Rota para deletar um veiculo
    serverV1.delete('/deletar-veiculo/:placa', controllers.deleteVeiculo)

    //Rota para adicionar uma revisão a um veiculo
    serverV1.post('/adicionar-revisao/:placa', controllers.postRevisao)

    //Rota para buscar os valores das revisões
    serverV1.get('/buscar-valor-revisao', controllers.getValorRevisoes)
}
