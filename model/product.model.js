const mongoose = require('mongoose')
const productListSchema = mongoose.Schema({
    id: Number,
    img: String,
    name: String,
    text: String, 
    type: String,
    size: [String],
    color: [String],
    gender: String,
    price: Number,
    inCart:Boolean,
    quantity:Number
})
const ProductListModel = mongoose.model('productList', productListSchema)
module.exports = { ProductListModel }
