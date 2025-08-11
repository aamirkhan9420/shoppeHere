const mongoose = require('mongoose')
const bannerListSchema = mongoose.Schema({
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
const bannerListModel = mongoose.model('bannerList', bannerListSchema)
module.exports = { bannerListModel }
