const fs = require('fs')
const url = require('url');

const deleteAllData = async (model) => {
  try {
    await model.deleteMany();
    console.log('All Data successfully deleted');
  } catch (err) {
    console.log(err);
  }
};

 async function fillOnRequest({req, res, model, data, modelName})  {
  await deleteAllData(model);
  console.log("deleted exising data", modelName)
  model.insertMany(data).then(function(){ 
    res.send({
            status: true,
            msg: modelName + 'successfully updated'
          }
        );
      console.log("inserted new data", modelName)
  }).catch(function(error){ 
      console.log("error while inserting data", modelName)
      console.log(error)      // Failure 
       res.send({
              status: false,
              msg: modelName + 'updateerror'
            }
          );
  });
}

function initializeCollection({req, res,  filePath, modelName, model}) {
    fs.readFile(filePath, 'utf8', (err, jsonString) => {
    
    const data = JSON.parse(jsonString)
    
    fillOnRequest({req, res, data, model,modelName})

    if (err) {
        console.log("File read failed:", err)
        return
    }

  })
}

function onSuccess( res, result){
 return res.send({
      status:true,
      ...result
    })
}
 function onFailure(res, e){
   return res.send({
      status:false,
      e
    });
 }
 function getAppQueryListParams({requestParam, filterDbParam, req }){
    const queryObject = url.parse(req.url,true).query;
    const requestAppIds = queryObject[requestParam];
    if(!requestAppIds){
      return {};
    }
    var ids = requestAppIds.split(','); 
    return { [filterDbParam]: { $in: ids} };
}


const helpers = {
    getAppQueryListParams,
    initializeCollection,
    onSuccess,
    onFailure
}

module.exports = helpers;
