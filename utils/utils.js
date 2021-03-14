
function createMapFromArray(items, idKey="id"){
  const itemsMap = {}
   items.forEach((item) => {
     const key = item[idKey];
     itemsMap[key] = item;
  })
  return itemsMap;
}
const utils = {
    createMapFromArray
}
module.exports  = utils