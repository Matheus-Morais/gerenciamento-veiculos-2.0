const veiculo = require('../../config/database/veiculo')
const returnMessages = require('../../config/return.messages')

module.exports = getValorRevisoes = async (req, res) => {
    let queryGeneric

    let { marca, placa } = req.params

    //Se for enviado uma marca na query, é adicionando a query de busca
    if (marca) {
        queryGeneric['marca'] = marca
    }

    if (placa) {
        queryGeneric['placa'] = placa.toUpperCase()
    }

    let listReturn

    try {
        if (queryGeneric) {
            listReturn = await veiculo.aggregate([
                {
                    $match: queryGeneric
                },
                {
                    $project: {
                        revisoes: { $sum: "$revisoes.valor" }
                    }
                },
                {
                    $group: {
                        _id: null,
                        valor: {
                            $sum: '$revisoes'
                        }
                    }
                },
                {
                    $project: { _id: 0, valor: 1 }
                }
            ])
        } else {
            listReturn = await veiculo.aggregate([
                {
                    $project: {
                        revisoes: { $sum: "$revisoes.valor" }
                    }
                },
                {
                    $group: {
                        _id: null,
                        valor: {
                            $sum: '$revisoes'
                        }
                    }
                },
                {
                    $project: { _id: 0, valor: 1 }
                }
            ])
        }
    } catch (error) {
        returnMessages.errorDatabase(res)
        return
    }

    returnMessages.returnOne(res, listReturn[0])
    return
}
