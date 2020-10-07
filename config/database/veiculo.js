
const mongoose = require('mongoose')

const veiculoSchema = mongoose.Schema({
    placa: { type: String, minlength: 7, maxlength: 7, required: true },
    marca: { type: String, required: true },
    modelo: { type: String, required: true },
    cor: { type: String, required: true },
    ano_fabricacao: { type: Number, required: true },
    data_cadastro: { type: Date, default: Date.now },
    revisoes: [{
        data_revisao: { type: Date },
        valor: { type: Number, min: 0 }
    }]
})

const veiculo = mongoose.model('veiculo', veiculoSchema)

module.exports = veiculo
