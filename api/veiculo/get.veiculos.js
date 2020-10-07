const veiculo = require('../../config/database/veiculo')
const returnMessages = require('../../config/return.messages')

module.exports = getVeiculos = async (req, res) => {
    let page = 1
    let results = 20
    let queryGeneric = {}

    if (req.query.page) {
        page = parseInt(req.query.page)
    }

    if (req.query.results) {
        results = parseInt(req.query.results)
    }

    if (results > 10) {
        results = 10
    }

    //Se for enviado uma marca na query, é adicionando a query de busca
    if (req.query.marca) {
        queryGeneric['marca'] = req.query.marca
    }

    if (req.query.cor) {
        queryGeneric['cor'] = req.query.cor
    }

    let count
    let listReturn

    try {
        count = await veiculo.countDocuments(queryGeneric)

        listReturn = await veiculo.find(queryGeneric)
            .sort({ "data_cadastro": 1 })
            .limit(results)
            .skip((page * results) - results)
    } catch (e) {
        returnMessages.errorDatabase(res)
        return
    }

    returnMessages.returnList(res, results, count, listReturn)
    return
}
