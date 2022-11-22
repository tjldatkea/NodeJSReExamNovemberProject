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

      console.log('Item(mongoose.model): ')
      console.log(Item)

      haveRunOnce = true

      console.log('I have also run once Item')
    }
  }
  
  async function createItem(Item, itemName, groupParam) {
    // if (!(haveRunOnce)) {
    //   createItemMongooseModel()
    // }
    // object
    const item = new Item({
      itemName: itemName,
      group: Number(groupParam)
    })
  
    const result = await item.save()
    console.log("result udenfor timeout: " + result)
  
  
  } // slut på createItem funktionen
  
  
  
  async function getItems(Item) {
  
    const items = await Item
      .find() // w3: No parameters in the find() method gives you the same result as SELECT * in MySQL.
    //   .find({ group: 4 })
    //   .limit(10)
    // //.sort({ itemName: 1 }) // 1 er ascending order og -1 er descending order
    console.log("getItems: " + items)
    return items
  }
  
  async function updateItem(Item, id, /*name, */groupNumber) {
  
    // Approach: Update first
    // Update directly
    //const result = await Course.update({_id: id}, {
    // Optionally: get the updated document
    const item = await Item.findByIdAndUpdate(id, {
      $set: {
        // itemName: name,
        group: groupNumber
      }
    }, { new: true }) // <-- uden den sidste får man kurset inden det blev ændret
  
    console.log("updated item: " + item)
  
    // i video 18 af CRUD Operations Using Mongoose kan ses en liste og link til de forskellige update funktioner man kan bruge med Mongo
  
  }
  
  
  
  // denne er nød til at være der, da der skal være mindst en kørsel af createCourse aht opsætning
  // createItem('EtEllerAndetFire', 5)
  //createItemMongooseModel() // *******************************************************************
  
  
  //async function removeItem(id) {
  async function removeManyItems(Item, groupNumber) {
    //const result = await Item.deleteMany({_id: id})
    const result = await Item.deleteMany({ group: groupNumber })
    //const course = await Item.findByIdAndRemove(id)
    //console.log(course)
  }
  
  async function removeOneItem(Item, id) {
    //const result = await Item.deleteMany({_id: id})
    //const result = await Item.deleteMany({group: groupNumber})
    const item = await Item.findByIdAndRemove(id)
    //console.log(course)
  }
  
  //removeCourse('62bf09a5871a37128405073c')
  
  //const { makeFormForButtonToChangeItemsGroup } = require('./util.js')
  


  // skal newItemGroup have et bedre navn???
  function makeFormForButtonToChangeItemsGroup(itemId,/* itemName, itemGroup, */endpoint, newItemGroup, address, groupNames) {
  
    const formTemplate = `
    <form action="${address}${endpoint}" method="POST"> 
    <input type="text" id="itemIdFive" name="itemIdFive" style="display:none;" value="${itemId}">
    <input type="text" id="newItemGroup" name="newItemGroup" style="display:none;" value="${newItemGroup}">
    <input class="changeGroupButton groupColorNumber${newItemGroup}" type="submit" value="Flyt til ${groupNames[newItemGroup - 1]}">
    </form>`
  
    // <input type="text"  style="display:none;" value="${itemName}">
    // <input type="text"  style="display:none;" value="${itemGroup}">
  
    //id="itemId-${id}" name="itemId-${id}"
  
    return formTemplate
  }
  
  module.exports = {createItemMongooseModel, createItem, getItems, updateItem, removeManyItems, removeOneItem, makeFormForButtonToChangeItemsGroup}