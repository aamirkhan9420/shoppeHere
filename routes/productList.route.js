const express = require('express')
const { ProductListModel } = require('../model/product.model')
const ProductListRouter = express.Router()
ProductListRouter.get('/productlist', async (req, res) => {
  let productList = await ProductListModel.find()
  try {
    if (productList.length > 0) {
      res.send({ 'message': 'Product list successfully fetched', data: productList })
    } else {
      res.send({ 'message': 'No product found!', data: [] })
    }

  } catch (error) {
    res.send({ 'message': 'Product list failed to fetch!', 'error': error })
  }
})
ProductListRouter.post('/productAdd', async (req, res) => {
  let body = req.body
  try {
    let data = new ProductListModel(body)
    await data.save()
    res.send({ 'message': 'data added.' })
  } catch (error) {
    res.send({ 'message': 'Product list failed to fetch!', 'error': error })
  }
})
ProductListRouter.patch('/update-images', async (req, res) => {
  const updates = [
    { id: 250, img: "https://i.ibb.co/Kp76WFQ2/dress1.jpg" },
    { id: 260, img: "https://i.ibb.co/gFVcWqDR/dress2.jpg" },
    { id: 270, img: "https://i.ibb.co/yByt36jL/dress3.jpg" },
    { id: 280, img: "https://i.ibb.co/7NT6NDJT/dress4.jpg" },
    { id: 290, img: "https://i.ibb.co/20fty0QP/dress5.jpg" },
    { id: 300, img: "https://i.ibb.co/hJNWJHSg/dress6.jpg" },
    { id: 31, img: "https://i.ibb.co/0y5vccVm/dress7.jpg" },
    { id: 32, img: "https://i.ibb.co/fYKzd49j/dress8.jpg" },
    { id: 33, img: "https://i.ibb.co/KcP2qnr6/jeans1.jpg" },
    { id: 34, img: "https://i.ibb.co/b5jSgvnt/jeans2.jpg" },
    { id: 35, img: "https://i.ibb.co/yFpBfg8y/jeans3.jpg" },
    { id: 36, img: "https://i.ibb.co/bjHjc2Gp/jeans4.jpg" },
    { id: 37, img: "https://i.ibb.co/6ctytmT4/jeans5.jpg" },
    { id: 370, img: "https://i.ibb.co/5hrYpSH0/jeans6.jpg" },
    { id: 38, img: "https://i.ibb.co/4wd9RSKJ/jeans7.jpg" },
    { id: 39, img: "https://i.ibb.co/7tv0T4Dk/jeans8.jpg" },
    { id: 40, img: "https://i.ibb.co/k2zdNVcs/jacket1.jpg" },
    { id: 41, img: "https://i.ibb.co/0wz0J8M/jacket2.jpg" },
    { id: 42, img: "https://i.ibb.co/4gpPMJj2/jacket3.jpg" },
    { id: 43, img: "https://i.ibb.co/3ms52fvF/jacket4.jpg" },
    { id: 44, img: "https://i.ibb.co/9KdPB03/jacket5.jpg" },
    { id: 45, img: "https://i.ibb.co/ycstX2W0/jacket6.jpg" },
    { id: 46, img: "https://i.ibb.co/mCdxbCRx/jacket7.jpg" },
    { id: 47, img: "https://i.ibb.co/C5fRkwk0/jacket8.jpg" },
    { id: 48, img: "https://i.ibb.co/2YsMy3h0/bag1.jpg" },
    { id: 49, img: "https://i.ibb.co/JjGJpf0m/bag2.jpg" },
    { id: 50, img: "https://i.ibb.co/9Hyxbx1r/bag3.jpg" },
    { id: 51, img: "https://i.ibb.co/X60NsCD/bag4.jpg" },
    { id: 52, img: "https://i.ibb.co/N2YkNRbw/bag5.jpg" },
    { id: 53, img: "https://i.ibb.co/d4zMb649/bag6.jpg" },
    { id: 54, img: "https://i.ibb.co/r2nMp4hf/bag7.jpg" },
    { id: 55, img: "https://i.ibb.co/jPn9rfpL/bag8.jpg" },
    { id: 56, img: "https://i.ibb.co/JWcp9mxR/suit1.jpg" },
    { id: 57, img: "https://i.ibb.co/dswh7tCw/suit2.jpg" },
    { id: 58, img: "https://i.ibb.co/6R1Gnwt3/suit3.jpg" },
    { id: 59, img: "https://i.ibb.co/B5VMHVVx/suit4.jpg" },
    { id: 60, img: "https://i.ibb.co/8LfjR85k/suit5.jpg" },
    { id: 61, img: "https://i.ibb.co/TMyBpBdF/suit6.jpg" },
    { id: 62, img: "https://i.ibb.co/p6c1nKjK/suit7.jpg" },
    { id: 63, img: "https://i.ibb.co/5gWfkKRv/suit8.jpg" },

  ];
  try {
    const bulkOps = updates.map(item => ({
      updateOne: {
        filter: { id: item.id },
        update: { $set: { img: item.img } }
      }
    }));

    const result = await ProductListModel.bulkWrite(bulkOps);

    res.json({
      message: 'Images updated successfully',
      modifiedCount: result.modifiedCount
    });
  } catch (err) {
    res.status(500).json({ error: 'Update failed', details: err });
  }
});
ProductListRouter.patch('/update-product', async (req, res) => {
  try {
    const result = await ProductListModel.updateMany(
      {}, 
      { $set: { isFavourite: false } }
    );

    console.log("Update Result:", result);

    res.json({
      success: true,
      message: 'isFavourite added successfully to all products',
      matchedCount: result.matchedCount,
      modifiedCount: result.modifiedCount
    });
  } catch (err) {
    console.error("Update Error:", err);
    res.status(500).json({
      success: false,
      error: 'Update failed',
      details: err.message
    });
  }
});
ProductListRouter.put('/update-favourite', async (req, res) => {
  try {
    const { _id, isFavourite } = req.body;
    if (!_id) {
      return res.status(400).json({ 
        success: false, 
        message: 'Product id is required' 
      });
    }

    const result = await ProductListModel.updateOne(
      { _id: _id },             
      { $set: { isFavourite: isFavourite } }
    );

    res.json({
      success: true,
      message: 'isFavourite updated successfully',
      matchedCount: result.matchedCount,
      modifiedCount: result.modifiedCount
    });
  } catch (err) {
    console.error("Update Error:", err);
    res.status(500).json({
      success: false,
      error: 'Update failed',
      details: err.message
    });
  }
});




ProductListRouter.get('/', async (req, res) => {
  try {
    const { gender, sort, color, size, type } = req.query;

    let filter = {};

    if (gender) filter.gender = gender.toLowerCase(); // male/female
    if (type) filter.type = type; // Suits, Shirts, etc.
    if (color) filter.color = { $in: [color.toLowerCase()] }; // matches if color is in array
    if (size) filter.size = { $in: [size.toUpperCase()] };   // matches if size is in array

    let query = ProductListModel.find(filter);

    // Sorting
    if (sort === 'highPrice') {
      query = query.sort({ price: -1 }); // highest first
    } else if (sort === 'lowPrice') {
      query = query.sort({ price: 1 });  // lowest first
    }

    const products = await query.exec();
    if(products.length==0){
       return res.json({
        success: false,
        message: "No products found matching your filters."
      });
    }else{
       res.json({
      success: true,
      count: products.length,
      data: products
    });
    }
   
  } catch (err) {
    console.error("Filter Error:", err);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch products',
      details: err.message
    });
  }
});



module.exports = { ProductListRouter }
