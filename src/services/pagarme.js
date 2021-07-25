const axios = require('axios')
const api_key = require('../data/keys.json').api_key

const api = axios.create({
    baseURL: 'https://api.pagar.me/1'
})

module.exports = {
    createRecipient: async (shop) => {
        try {
            const { data: response } = await api.post(`/recipients`, {
                api_key,
                automatic_anticipation_enabled: "true",
                bank_account: {
                    bank_code: "341",
                    agencia: "0932",
                    agencia_dv: "5",
                    conta: "58054",
                    type: "conta_corrente",
                    conta_dv: "1",
                    document_number: "26268738888",
                    legal_name: shop.nome
                },
                transfer_day: "5",
                transfer_enabled: "true",
                transfer_interval: "weekly",
                postback_url: "https://requestb.in/tl0092tl"
            })

            return {
                error: false,
                data: response
            }

        } catch (error) {
            return {
                error: true,
                response: error.response.data
            }
        }
    },
    createSplitTransaction: async (data) => {
        try {
            const { data: response } = await api.post(`/transactions`, {
                api_key,
                ...data
            })

            // console.log(response)

            return {
                error: false,
                data: response
            }

        } catch (error) {
            return {
                error: true,
                response: error.response.data
            }
        }
    }
}