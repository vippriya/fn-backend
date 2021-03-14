
function createMapFromArray(items, idKey="id"){
  const itemsMap = {}
   items.forEach((item) => {
     const key = item[idKey];
     itemsMap[key] = item;
  })
  return itemsMap;
}
function getAttributeList(items, attributeKey){
  return items.map(item=> item[attributeKey])
}
function getAllAttributesFromArrayKey(items, attributeKey){
  var result = [];
  items.forEach(item=> result = [...result, ...item[attributeKey]])
  return result;
}
const utils = {
    createMapFromArray,
    getAttributeList,
    getAllAttributesFromArrayKey
}
module.exports  = utils