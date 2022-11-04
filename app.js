require('dotenv').config()
const path = require('path')

const mongoose = require('mongoose')

const uri = `mongodb+srv://${process.env.DATABASEUSERNAME}:${process.env.DATABASEPASSWORD}@clusterformongodbexerci.dao5cc1.mongodb.net/?retryWrites=true&w=majority`;

mongoose.connect(uri)
  .then(() => console.log('Connected to MongoDb database'))
  .catch(err => {
    console.error('Could not connect to database', err)
    console.error(err)
    console.log('Could not connect to database')
    console.log(err)
  })

let Item;
let haveRunOnce = false


async function createItem(itemName, groupParam) {
  if (!(haveRunOnce)) {
    const itemSchema = new mongoose.Schema({
      itemName: String,
      group: Number,
      date: { type: Date, default: Date.now }
    })

    Item = mongoose.model('Item', itemSchema)
    haveRunOnce = true
  }

  const item = new Item({
    itemName: itemName,
    group: Number(groupParam)
  })

  const result = await item.save()

}

async function getItems() {
  const items = await Item.find()
  return items
}

async function updateItem(id, /*name, */groupNumber) {

  const item = await Item.findByIdAndUpdate(id, {
    $set: {
      group: groupNumber
    }
  }, { new: true })

}

// denne er nød til at være der, da der skal være mindst en kørsel af createCourse aht opsætning
createItem('EnEkstraVare', 5)

async function removeManyItems(groupNumber) {
  const result = await Item.deleteMany({ group: groupNumber })
}

async function removeOneItem(id) {
  const item = await Item.findByIdAndRemove(id)
}

function makeFormForButtonToChangeItemsGroup(itemId,/* itemName, itemGroup, */endpoint, newItemGroup) {

  const formTemplate = `
  <form action="https://nodeshoplistservertjldatkea.herokuapp.com/${endpoint}" method="POST"> 
  <input type="text" id="itemIdFive" name="itemIdFive" style="display:none;" value="${itemId}">
  <input type="text" id="newItemGroup" name="newItemGroup" style="display:none;" value="${newItemGroup}">
  <input type="submit" value="Flyt til ${newItemGroup}">
  </form>`

  return formTemplate
}


const express = require('express');
const helmet = require("helmet");
const { urlencoded } = require('body-parser');

const app = express()
const delay = 3000

app.use(helmet());
app.use(express.json())
app.use(express.urlencoded())
app.use(express.static(path.join(__dirname, 'public')))


app.get('/', (req, res) => {
  res.send('<h1>Welcome to shopListServer</h1>')
})

app.get('/deleteGroup/:groupNumber', (req, res) => {
  removeManyItems(req.params.groupNumber)
  res.send(`<h1>Group number ${req.params.groupNumber} deleted</h1>`)
})

app.get('/add', (req, res) => {
  createItem('vareFire fra add endpointet', 5)
  res.send('<h1>Object added to database</h1>')
})

app.get('/table', async (req, res) => {
  const items = await getItems()

  const form = `
  <form action="https://nodeshoplistservertjldatkea.herokuapp.com/addItem" method="POST">
  <label for="itemNameEt">Item name:</label><br>
  <input type="text" id="itemNameEt" name="itemNameEt" value="Mælk"><br>
  <label for="groupNumber">Group:</label><br>
  <input type="text" id="groupNumber" name="groupNumber" value="1"><br><br>
  <input type="submit" value="Add Item">
</form>
<br>`

  const formTwoPartOne = `
<form action="https://nodeshoplistservertjldatkea.herokuapp.com/deleteItem" method="POST"> 
<input type="text" id="itemId" name="itemId" style="display:none;" value="` // her skal value med id'et være
  const formTwoPartTwo = `"><input type="submit" value="Delete">
</form>`

  let allTablesAndForm = form

  const numberOfGroups = 5

  let HTMLTable = ""
  for (let j = 1; j <= numberOfGroups; j++) {
    const partOfItems = items.filter((obj) => obj.group === j)

    HTMLTable = "<table><th>itemName</th><th>group</th><th>move buttons</th><th>delete button</th>"
    let HTMLTableRow = ""
    partOfItems.map((element) => {
      HTMLTableRow = ""
      HTMLTableRow += "<tr>"
      HTMLTableRow += `<td>${element.itemName}</td>`
      HTMLTableRow += `<td>${element.group}</td>`
      HTMLTableRow += "<td><table><tr>"
      for (let k = 1; k <= numberOfGroups; k++) {
        if (k != element.group) {
          HTMLTableRow += `<td>${makeFormForButtonToChangeItemsGroup(element.id, /*element.itemName, element.group,*/ "updateItem", k)}</td>`
        }
      }
      HTMLTableRow += "</tr></table></td>"
      HTMLTableRow += `<td>${formTwoPartOne}${element.id}${formTwoPartTwo}</td>`
      HTMLTableRow += "</tr>"
      HTMLTable += HTMLTableRow
    })

    HTMLTable += "</table>"

    allTablesAndForm += HTMLTable
  }

  let allHTML = `
  <!DOCTYPE html>
<html>

<head>
    <link type="text/css" rel="stylesheet" href="./style.css">

    <meta charset="utf-8" />
    <meta name="wievport" content="width=device-width, initial-scale=1.0">
    <title>Node Shop List</title>
    
</head>

<body>
${allTablesAndForm}
    <script></script>
</body>

</html>
  `
  res.send(allHTML)
})


app.post('/updateItem', async (req, res) => {
  const item = await updateItem(req.body.itemIdFive,/* req.body.itemName, */req.body.newItemGroup)

  setTimeout(() => {
    res.redirect('/table')
  }, delay)

})

app.post('/deleteItem', async (req, res) => {
  const item = await removeOneItem(req.body.itemId)

  setTimeout(() => {
    res.redirect('/table')
  }, delay)

})

app.post('/addItem', (req, res) => {
  createItem(req.body.itemNameEt, req.body.groupNumber)

  setTimeout(() => {
    res.redirect('/table')
  }, delay)

})



const PORT = (process.env.PORT || 8080)

app.listen(PORT, () => {
  console.log(`Listening at port ${PORT}`)
})


