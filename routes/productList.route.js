const express = require('express')
const {ProductListModel} =  require('../model/product.model')
const ProductListRouter = express.Router()
ProductListRouter.get('/productlist',async(req,res)=>{
    let productList =  await ProductListModel.find()
 try {
    if(productList.length>0){
        res.send({'message':'Product list successfully fetched',data:productList})
    }else{
        res.send({'message':'No product found!',data:[]})
    }
    
 } catch (error) {
    res.send({'message':'Product list failed to fetch!','error':error})
 }
})
ProductListRouter.post('/productAdd',async(req,res)=>{
   let body = req.body
 try {
  let data=  new ProductListModel(body)
   await data.save()
    res.send({ 'message': 'data added.' })
 } catch (error) {
    res.send({'message':'Product list failed to fetch!','error':error})
 }
})
module.exports={ProductListRouter}
