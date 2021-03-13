const fs = require('fs')



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
  model.insertMany(data).then(function(){ 
    res.send({
            status: true,
            msg: modelName + 'successfully updated'
          }
        );
  }).catch(function(error){ 
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
const helpers = {
    initializeCollection
}
module.exports = helpers;
