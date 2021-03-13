const express = require('express');
const router = express.Router();
const Application = require('../modals/application');
const Product= require('../modals/product');
const helper = require('./helper/helper');

function onSuccess( res, result){
 return res.send({
      status:true,
      msg: "hello",
      ...result
    })
}
 function onFailure(res, e){
   return res.send({
      status:false,
      e
    });
 }


router.get('/all',(req,res)=>{

  Application.find({}).then(applications=>{
      console.log(":::::::::2::::::::::::", applications)
    return res.send({
      status:true,
      applications
    });
  }).catch(e=>{
    return res.send({
      status:false,
      e
    });
  })
})

// Fetch all applications
// Give single application with given product_id
router.get('/:product_id',(req,res)=>{
  Application.find({product_id:req.params.product_id}).then(application=>{
    return res.send({
      status:true,
      application
    });
  }).catch(e=>{
    return res.send({
      status:false,
      e
    });
  })
})
// Create a single application
router.post('/create', (req, res) => {
  /**TODO: We need to verify if the application already exisit before we save the application to remove duplicates*/
  const data = new Application({
    name:req.body.name,
    description:req.body.description,
    version:req.body.version,
    product_id:req.body.product_id,
  });
  data.save().then(application=>{
    res.send({
      status:true,
      application
    })
  }).catch(e=>{
    res.send({
      status:false,
      e
    })
  })
});
// Update single application
router.put('/', (req,res)=>{
  let {name, description, version, product_id} = req.body;
  Application.findOne({product_id}).then(application => {
    if (application) {
      Application.findOneAndUpdate({product_id}, {
        $set: {
          name, description, version
        }
      })
        .then(speculator => {
          res.send({
              status: true,
              msg: 'Application successfully updated'
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
          msg: 'No application found with the given product_id'
        }
      );
    }
  });
})
// Delete single application
router.delete('/', (req,res)=>{
  Application.findOneAndRemove({
    product_id: req.body.product_id
  }).then(application => {
    if (application === null) {
      res.send({
          'status': false,
          'err_msg': 'Application not found with the given product_id'
        }
      );
    } else {
      res.send({
          'status': true,
          'msg': 'Application successfully deleted'
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
    filePath: './data/application.json',
    modelName: "Application",
    model: Application
  }
  helper.initializeCollection(params)
}); 

module.exports = router;
