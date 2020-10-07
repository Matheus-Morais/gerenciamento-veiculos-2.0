const veiculo = require('../../config/database/veiculo')
const returnMessages = require('../../config/return.messages')

module.exports = postRevisao = async (req, res) => {
    const placaIdenticador = req.params.placa.toUpperCase()
    let veiculoEncontrado

    //Se não for mandado a placa, é retornado erro
    if (!placaIdenticador) {
        returnMessages.errorGeneral(res, ['Placa do veiculo não informada.'])
        return
    }

    try {
        veiculoEncontrado = await veiculo.findOne({ "placa": placaIdenticador })
    } catch (e) {
        returnMessages.errorDatabase(res)
        return
    }

    //Se não existir um veiculo com aquela placa, é retornado um erro
    if (!veiculoEncontrado) {
        returnMessages.errorGeneral(res, ['Veiculo não encontrado.'])
        return
    }

    const { valor, data_revisao } = req.body

    if (!valor) {
        returnMessages.errorGeneral(res, ['Valor não foi informado.'])
        return
    }

    //Cria o body da revisão
    let revisao = {
        "valor": valor
    }

    //A data se for nula, é salva automaticamente a data do momento
    if (data_revisao) {
        revisao['data_revisao'] = data_revisao
    }

    await veiculoEncontrado.revisoes.push(revisao)

    try {
        await veiculoEncontrado.save()
    } catch (e) {
        returnMessages.errorDatabase(res)
        return
    }

    returnMessages.returnOne(res, veiculoEncontrado)
    return
}
