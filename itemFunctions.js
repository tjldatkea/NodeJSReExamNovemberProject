// Function related to Items

let haveRunOnce = false

function createItemMongooseModel(mongoose) {
    if (!(haveRunOnce)) {
      const itemSchema = new mongoose.Schema({
        itemName: String,
        group: Number,
        date: { type: Date, default: Date.now }
      })
  
      // class
      Item = mongoose.model('Item', itemSchema)

      haveRunOnce = true
    }
  }
  

  async function createItem(Item, itemName, groupParam) {
    // object
    const item = new Item({
      itemName: itemName,
      group: Number(groupParam)
    })
  
    const result = await item.save()
  }
  
  
  async function getItems(Item) {
  
    const items = await Item.find()
    return items
  }
  
  
  async function updateItem(Item, id, groupNumber) {

    const item = await Item.findByIdAndUpdate(id, {
      $set: {
        group: groupNumber
      }
    }, { new: true })
  }
  
  
  async function removeManyItems(Item, groupNumber) {
    const result = await Item.deleteMany({ group: groupNumber })
  }
  

  async function removeOneItem(Item, id) {
    const item = await Item.findByIdAndRemove(id)
  }


  // Function that makes a button to change an items group
  function makeFormForButtonToChangeItemsGroup(itemId, endpoint, newItemGroup, address, groupNames) {
  
    const formTemplate = `
    <form action="${address}${endpoint}" method="POST"> 
    <input type="text" id="itemIdFive" name="itemIdFive" style="display:none;" value="${itemId}">
    <input type="text" id="newItemGroup" name="newItemGroup" style="display:none;" value="${newItemGroup}">
    <input class="changeGroupButton groupColorNumber${newItemGroup}" type="submit" value="Flyt til ${groupNames[newItemGroup - 1]}">
    </form>`
    
    return formTemplate
  }
  
  module.exports = {createItemMongooseModel, createItem, getItems, updateItem, removeManyItems, removeOneItem, makeFormForButtonToChangeItemsGroup}