const veiculo = require('../../config/database/veiculo')
const returnMessages = require('../../config/return.messages')

module.exports = getVeiculo = async (req, res) => {
    const placa = req.params.placa.toUpperCase()
    let veiculoEncontrado

    try {
        veiculoEncontrado = await veiculo.findOne({ "placa": placa })
    } catch (e) {
        returnMessages.errorDatabase(res)
        return
    }

    if (!veiculoEncontrado) {
        returnMessages.errorGeneral(res, ['Veiculo não encontrado.'])
        return
    }

    returnMessages.returnOne(res, veiculoEncontrado)
    return
}
