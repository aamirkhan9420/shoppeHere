const express = require('express')
const {bannerListModel} =  require('../model/banner.model')
const bannerListRouter = express.Router()

bannerListRouter.post('/addbanner',async(req,res)=>{
   let body = req.body
   try {
  let data= await bannerListModel.insertMany(req.body);
   await data.save()
    res.send({ 'message': 'data added.' })
 } catch (error) {
    res.send({'message':'Product list failed to fetch!','error':error})
 }
})
bannerListRouter.get('/bannerdata',async(req,res)=>{
    let productList =  await bannerListModel.find()
 try {
    if(productList.length>0){
        res.send({'message':'Banner list successfully fetched',data:productList})
    }else{
        res.send({'message':'No product found!',data:[]})
    }
    
 } catch (error) {
    res.send({'message':'Product list failed to fetch!','error':error})
 }
})
module.exports={bannerListRouter}
