const veiculo = require('../../config/database/veiculo')
const returnMessages = require('../../config/return.messages')

module.exports = deleteVeiculos = async (req, res) => {
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

    try {
        await veiculoEncontrado.delete()
    } catch (e) {
        returnMessages.errorDatabase(res)
        return
    }

    returnMessages.returnOne(res, 'Veiculo deletado com sucesso.')
    return
}
