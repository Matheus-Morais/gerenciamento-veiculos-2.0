const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

//mensagens de erro genericas
mongoose.Error.messages.general.required = "O atributo '{PATH}' é obrigatório."
mongoose.Error.messages.Number.min = "O '{VALUE}' informado é menor que o limite mínimo de '{MIN}'."
mongoose.Error.messages.Number.max = "O '{VALUE}' informado é maior que o limite máximo de '{MAX}'."
mongoose.Error.messages.String.enum = "'{VALUE}' não é válido para o atributo '{PATH}'."
mongoose.Error.messages.String.maxlength = "O '{PATH}' tem mais de '{MAXLENGTH}' caracteres."
mongoose.Error.messages.String.minlength = "O '{PATH}' tem menos de '{MINLENGTH}' caracteres."

//exporta a conexão para ser usado em outros modulos
module.exports = mongoose
