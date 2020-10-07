const veiculo = require('../../config/database/veiculo')
const returnMessages = require('../../config/return.messages')

module.exports = postVeiculo = async (req, res) => {
    const placaRegex = /^[a-zA-Z]{3}[0-9]{4}$/
    let errors = []

    const { placa, marca, modelo, cor, ano_fabricacao } = req.body

    if (!placa) {
        errors.push('Placa não informada.')
    } else {
        if (!placa.match(placaRegex)) {
            errors.push('Formato da placa inválido.')
        }
    }

    if (!marca) {
        errors.push('Marca não informada.')
    }

    if (!modelo) {
        errors.push('Modelo não informada.')
    }

    if (!cor) {
        errors.push('Cor do veiculo não informada.')
    }

    if (!ano_fabricacao) {
        errors.push('Ano de fabricação não informado.')
    }

    //Verifica se não foram enviadas as inforamções e retorna um error
    if (errors.length > 0) {
        returnMessages.errorGeneral(res, errors)
        return
    }

    //Verifica se esse veiculo ja existe
    let veiculoEncontrado

    try {
        veiculoEncontrado = await veiculo.findOne({ "placa": placa.toUpperCase() })
    } catch (e) {
        returnMessages.errorDatabase(res)
        return
    }

    if (veiculoEncontrado) {
        returnMessages.errorGeneral(res, ['Veiculo ja cadastrado'])
        return
    }

    let novoVeiculo = new veiculo({
        "placa": placa.toUpperCase(),
        "marca": marca,
        "modelo": modelo,
        "cor": cor,
        "ano_fabricacao": ano_fabricacao,
    })

    try {
        await novoVeiculo.save()
    } catch (e) {
        returnMessages.errorDatabase(res)
        return
    }

    returnMessages.registerSuccess(res, novoVeiculo)
    return
}
