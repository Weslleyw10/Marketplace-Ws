const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Product = new Schema({
    shop_id: {
        type: Schema.Types.ObjectId,
        ref: 'Shop'
    },
    nome: String,
    capa: String,
    preco: String,
    avaliacoes: Number,
})

module.exports = mongoose.model('Product', Product)