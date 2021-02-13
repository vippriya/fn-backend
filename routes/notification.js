const express = require('express');
const router = express.Router();
const Notification = require('../modals/notification');
// Fetch all notifications
router.get('/all',(req,res)=>{
  Notification.find({}).then(notifications=>{
    return res.send({
      status:true,
      notifications
    });
  }).catch(e=>{
    return res.send({
      status:false,
      e
    });
  })
})
// Give single notification with given product_id


/**TODO: We need to know if url is the unique field value*/
router.get('/all/:url',(req,res)=>{
  Notification.find({url:req.params.url}).then(notification=>{
    return res.send({
      status:true,
      notification
    });
  }).catch(e=>{
    return res.send({
      status:false,
      e
    });
  })
})
// Create a single notification
router.post('/create', (req, res) => {
  /**TODO: We need to verify if the notification already exisit before we save the notification to remove duplicates*/
  const data = new Notification({
    title:req.body.title,
    short_desc:req.body.short_desc,
    detail_desc:req.body.detail_desc,
    url:req.body.url,
    type:req.body.type,
  });
  data.save().then(notification=>{
    res.send({
      status:true,
      notification
    })
  }).catch(e=>{
    res.send({
      status:false,
      e
    })
  })
});
// Update single notification
router.put('/', (req,res)=>{
  let {title, short_desc, detail_desc, url, type} = req.body;
  Notification.findOne({url}).then(notification => {
    if (notification) {
      Notification.findOneAndUpdate({url}, {
        $set: {
          title, short_desc, detail_desc, type
        }
      })
        .then(notification => {
          res.send({
              status: true,
              msg: 'Notification successfully updated'
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
          msg: 'No notification found with the given url'
        }
      );
    }
  });
})
// Delete single notification
router.delete('/', (req,res)=>{
  Notification.findOneAndRemove({
    url: req.body.url
  }).then(notification => {
    if (notification === null) {
      res.send({
          'status': false,
          'err_msg': 'Notification not found with the given url'
        }
      );
    } else {
      res.send({
          'status': true,
          'msg': 'Notification successfully deleted'
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
