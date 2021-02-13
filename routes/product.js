const express = require('express');
const router = express.Router();
const Product = require('../modals/product');
// Fetch all products
router.get('/all',(req,res)=>{
  Product.find({}).then(products=>{
    return res.send({
      status:true,
      products
    });
  }).catch(e=>{
    return res.send({
      status:false,
      e
    });
  })
})
// Give single product with given product_id


router.get('/all/:name',(req,res)=>{
  Product.find({name:req.params.name}).then(product=>{
    return res.send({
      status:true,
      product
    });
  }).catch(e=>{
    return res.send({
      status:false,
      e
    });
  })
})
// Create a single product
router.post('/create', (req, res) => {
  /**TODO: We need to verify if the product already exisit before we save the product to remove duplicates*/
  const data = new Product({
    name:req.body.name,
    description:req.body.description,
    icon:req.body.icon,
    categories:req.body.categories,
  });
  data.save().then(product=>{
    res.send({
      status:true,
      product
    })
  }).catch(e=>{
    res.send({
      status:false,
      e
    })
  })
});
// Update single product
router.put('/', (req,res)=>{
  let {name, description, icon, categories} = req.body;
  Product.findOne({name}).then(product => {
    if (product) {
      Product.findOneAndUpdate({name}, {
        $set: {
          description, icon, categories
        }
      })
        .then(product => {
          res.send({
              status: true,
              msg: 'Product successfully updated'
            }
          );
        })
        .catch(err => {
          res.send({
              status: false,
              msg: 'Error occurred while updating the appplication'
            }
          );
        });
    } else {
      res.send({
          status: true,
          msg: 'No product found with the given url'
        }
      );
    }
  });
})
// Delete single product
router.delete('/', (req,res)=>{
  Product.findOneAndRemove({
    name: req.body.name
  }).then(product => {
    if (product === null) {
      res.send({
          'status': false,
          'err_msg': 'Product not found with the given name'
        }
      );
    } else {
      res.send({
          'status': true,
          'msg': 'Product successfully deleted'
        }
      );
    }
  }).catch(err => {
    res.send({
        'status': false,
        'err_msg': 'Error occurred while accessing the database'
      }
    );
  });
})
module.exports = router;
