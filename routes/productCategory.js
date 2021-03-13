const express = require('express');
const router = express.Router();
const ProductCategory = require('../modals/productCategory');
const helper = require('./helper/helper');

// Fetch all product_categorys
router.get('/all',(req,res)=>{
  ProductCategory.find({}).then(product_categorys=>{
    return res.send({
      status:true,
      product_categorys
    });
  }).catch(e=>{
    return res.send({
      status:false,
      e
    });
  })
})
// Give single product_category with given product_category_id


router.get('/:name',(req,res)=>{
  ProductCategory.find({name:req.params.name}).then(product_category=>{
    return res.send({
      status:true,
      product_category
    });
  }).catch(e=>{
    return res.send({
      status:false,
      e
    });
  })
})
// Create a single product_category
router.post('/create', (req, res) => {
  console.log(req.body)
  /**TODO: We need to verify if the product_category already exisit before we save the product_category to remove duplicates*/
  const data = new ProductCategory({
    id: req.body.id,
    name:req.body.name,
    description:req.body.description,
    icon:req.body.icon,
  });
  data.save().then(product_category=>{
    res.send({
      status:true,
      product_category
    })
  }).catch(e=>{
    res.send({
      status:false,
      e
    })
  })
});
// Update single product_category
router.put('/', (req,res)=>{
  let {name, description, icon} = req.body;
  ProductCategory.findOne({name}).then(product_category => {
    if (product_category) {
      ProductCategory.findOneAndUpdate({name}, {
        $set: {
          description, icon
        }
      })
        .then(product_category => {
          res.send({
              status: true,
              msg: 'ProductCategory successfully updated'
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
          msg: 'No product_category found with the given url'
        }
      );
    }
  });
})
// Delete single product_category
router.delete('/', (req,res)=>{
  ProductCategory.findOneAndRemove({
    name: req.body.name
  }).then(product_category => {
    if (product_category === null) {
      res.send({
          'status': false,
          'err_msg': 'ProductCategory not found with the given name'
        }
      );
    } else {
      res.send({
          'status': true,
          'msg': 'ProductCategory successfully deleted'
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
router.post('/fn_fillAll', (req, res) => {
  const params = {
    req,
    res,
    filePath: './data/productCategory.json',
    modelName: "ProductCategory",
    model: ProductCategory
  }
  helper.initializeCollection(params)
}); 
module.exports = router;
