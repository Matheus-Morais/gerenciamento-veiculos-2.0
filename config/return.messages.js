module.exports = {
    registerSuccess: (res, registered) => {
        res.status(200).send({
            registered: registered,
            message: {
                title: 'Sucesso no cadastro.',
                message: 'Cadastro realizado com sucesso.'
            }
        })
    },

    returnOne: (res, result) => {
        res.status(200).send({
            result: result,
            message: {
                title: 'Sucesso na operação',
                message: 'Item retornado com sucesso.'
            }
        })
    },

    returnList: (res, results, count, list) => {
        res.status(200).send({
            totalPages: Math.ceil((count / results)),
            totalResults: count,
            list: list,
            message: {
                title: 'Sucesso na operação',
                message: 'Lista retornada com sucesso.'
            }
        })
    },

    errorGeneral: (res, errors = null) => {
        res.status(422).send({
            message: {
                title: 'Erro geral',
                message: 'Não foi possivel realizar a operação.'
            },
            errors: errors
        })
    },

    errorDatabase: (res) => {
        res.status(422).send({
            message: {
                title: 'Erro no banco de dados',
                message: 'Não foi possivel realizar a operação no banco de dados.'
            }
        })
    },
}
