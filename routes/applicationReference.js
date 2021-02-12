const express = require('express');
const router = express.Router();
const ApplicationReference = require('../models/applicationReference');
// Fetch all applications
router.get('/all',(req,res)=>{
  ApplicationReference.find({}).then(application_references=>{
    return res.send({
      status:true,
      application_references
    });
  }).catch(e=>{
    return res.send({
      status:false,
      e
    });
  })
})
// Give single application with given product_id
router.get('/all/:application_id',(req,res)=>{
  ApplicationReference.find({application_id:req.params.application_id}).then(application_reference=>{
    return res.send({
      status:true,
      application_reference
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
  /**TODO: We need to verify if the application_refence already exisit before we save the application to remove duplicates*/
  const data = new ApplicationReference({
    link_id:req.body.link_id,
    application_id:req.body.application_id,
    url:req.body.url,
    title:req.body.title,
    tags:req.body.tags,
  });
  data.save().then(application_reference=>{
    res.send({
      status:true,
      application_reference
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
  let {link_id, application_id, url, title,tags} = req.body;
  ApplicationReference.findOne({application_id}).then(application_reference => {
    if (application_reference) {
      ApplicationReference.findOneAndUpdate({application_id}, {
        $set: {
          link_id, url, title,tags
        }
      })
        .then(speculator => {
          res.send({
              status: true,
              msg: 'Application reference successfully updated'
            }
          );
        })
        .catch(err => {
          res.send({
              status: false,
              msg: 'Error occurred while updating the appplication reference'
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
  ApplicationReference.findOneAndRemove({
    application_id: req.body.application_id
  }).then(application_reference => {
    if (application_reference === null) {
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
module.exports = router;
