const veiculo = require('../../config/database/veiculo')
const returnMessages = require('../../config/return.messages')

module.exports = putVeiculos = async (req, res) => {
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

    const { placa, marca, modelo, cor, ano_fabricacao } = req.body

    //Verifica quais campos foram enviados para alteração e seta no veiculo encontrado.
    if (placa) {
        const placaRegex = /^[a-zA-Z]{3}[0-9]{4}$/
        if (!placa.match(placaRegex)) {
            returnMessages.errorGeneral(res, ['Formato da placa inválido.'])
            return
        }

        let veiculoCadastrado

        try {
            veiculoCadastrado = await veiculo.findOne({ "placa": placa.toUpperCase() })
        } catch (e) {
            returnMessages.errorDatabase(res)
            return
        }

        //Se ja tiver um veiculo cadastrado retorna um error.
        if (veiculoCadastrado) {
            returnMessages.errorGeneral(res, ['Esta placa ja esta cadastrada.'])
            return
        }

        await veiculoEncontrado.set('placa', placa.toUpperCase())
    }

    if (marca) {
        await veiculoEncontrado.set('marca', marca)
    }

    if (modelo) {
        await veiculoEncontrado.set('modelo', modelo)
    }

    if (cor) {
        await veiculoEncontrado.set('cor', cor)
    }

    if (ano_fabricacao) {
        await veiculoEncontrado.set('ano_fabricacao', ano_fabricacao)
    }

    try {
        await veiculoEncontrado.save()
    } catch (e) {
        returnMessages.errorDatabase(res)
        return
    }

    returnMessages.returnOne(res, veiculoEncontrado)
    return
}
