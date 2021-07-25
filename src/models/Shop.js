const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Shop = new Schema({
    nome: String,
    logo: String,
    categoria: String,
    destaque: Number,
    location: Object,
    recipient_id: String
})


module.exports = mongoose.model('Shop', Shop)