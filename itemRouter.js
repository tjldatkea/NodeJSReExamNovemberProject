const express = require("express")

const router = express.Router()

const itemFunctions = require('./itemFunctions.js')
const { createItemMongooseModel, createItem, getItems, updateItem, removeManyItems, removeOneItem, makeFormForButtonToChangeItemsGroup } = itemFunctions
const { address, putItInHTMLTemplate } = require('./util.js')

const groupNames = ["Mangler", "Måske", "I kurv", "Lager", "Papirkurv"]

const numberOfGroups = groupNames.length


const redirectLogin = (req, res, next) => {
  if (!req.session.userId) {
    res.redirect('/login')
  }
  else {
    next()
  }
}

router.get('/table', redirectLogin, async (req, res) => {
  const items = await getItems(Item)

  const form = `
  <form action="${address}createItemEndpoint" method="POST">
  <label for="itemNameEt">Varens navn:</label><br>
  <input type="text" id="itemNameEt" name="itemNameEt" value="Mælk"><br>
  <label for="groupNumber">Gruppens nummer:</label><br>
  <input type="text" id="groupNumber" name="groupNumber" value="1"><br><br>
  <input type="submit" value="Tilføj vare">
</form>
<br>`

  
  const formTwoPartOne = `
<form action="${address}deleteItem" method="POST"> 
<input type="text" id="itemId" name="itemId" style="display:none;" value="` // her skal value med id'et være
  const formTwoPartTwo = `"><input type="submit" value="Slet">
</form>`

  let allTablesAndForm = form

  let HTMLTable = ""
  for (let j = 1; j <= numberOfGroups; j++) {
    const partOfItems = items.filter((obj) => obj.group === j)

    HTMLTable = `<table><h3 class="textColorNumber${j}">${j} - ${groupNames[j - 1]}:</h3>`

    let HTMLTableRow = ""
    partOfItems.map((element) => {
      HTMLTableRow = ""
      HTMLTableRow += "<tr>"
      HTMLTableRow += `<td class="nameTd">${element.itemName}</td>`
      HTMLTableRow += "<td><table><tr>"
      for (let k = 1; k <= numberOfGroups; k++) {
        if (k != element.group) {
          HTMLTableRow += `<td>${makeFormForButtonToChangeItemsGroup(element.id, "updateItem", k, address, groupNames)}</td>`
        }
      }
      HTMLTableRow += "</tr></table></td>"
      HTMLTableRow += `<td>${formTwoPartOne}${element.id}${formTwoPartTwo}</td>`
      HTMLTableRow += "</tr>"
      HTMLTable += HTMLTableRow
    })

    HTMLTable += "</table>"

    allTablesAndForm += HTMLTable
  } // slut på ydre numberOfGroups for løkke

  // knap til at tømme papirkurven - button to empty the trashbin
  allTablesAndForm += `
    <br><form action="${address}deleteGroup/5" method="GET">
    <input type="submit" value="Tøm Papirkurv">
    </form>
    <br>`

  let allHTML = `
  <!DOCTYPE html>
<html lang="da">

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

})  // slut på router.get /table


router.get('/deleteGroup/:groupNumber', (req, res) => {
  removeManyItems(Item, req.params.groupNumber)

  res.redirect('/table')
})


router.post('/createItemEndpoint', async (req, res) => {
  await createItem(Item, req.body.itemNameEt, req.body.groupNumber)
  res.redirect('/table')
})


router.post('/updateItem', async (req, res) => {
  const item = await updateItem(Item, req.body.itemIdFive, req.body.newItemGroup)
  
  res.redirect('/table')
})


router.post('/deleteItem', async (req, res) => {
  const item = await removeOneItem(Item, req.body.itemId)

  res.redirect('/table')
})

module.exports = router