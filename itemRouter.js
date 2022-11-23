const express = require("express")
const bcrypt = require('bcryptjs')

const router = express.Router()

const itemFunctions = require('./itemFunctions.js')
const { createItemMongooseModel, createItem, getItems, updateItem, removeManyItems, removeOneItem, makeFormForButtonToChangeItemsGroup } = itemFunctions
const { address, putItInHTMLTemplate } = require('./util.js')

const groupNames = ["Mangler", "Måske", "I kurv", "Lager", "Papirkurv"]

const numberOfGroups = groupNames.length // find ud af hvor mange der skal være

// Både i denne og i userRouter!!!
const redirectLogin = (req, res, next) => {
  if (!req.session.userId) {
    res.redirect('/login')
  }
  else {
    next()
  }
}

router.get('/shopList', (req, res) => {
  res.send('<h1>Welcome to shopListServer</h1><a href="/table">Gå til listen</a>')
})

router.get('/deleteGroup/:groupNumber', (req, res) => {
  removeManyItems(Item, req.params.groupNumber)

  res.redirect('/table')
})

// router.get('/deleteItem/:itemId', (req, res) => {
//   removeOneItem(req.params.itemId)
//   res.send(`<h1>Item with id ${req.params.itemId} deleted</h1>`)
// })


// husk at post skal flyttes ned
router.post('/updateItem', async (req, res) => {
  console.log('updateItem endpoint - post')
  console.log(req.body.itemId)

  // tjek denne linie: hvad er det for argumenter der bruges i funktionskaldet
  const item = await updateItem(Item, req.body.itemIdFive,/* req.body.itemName, */req.body.newItemGroup)
  res.redirect('/table')

  // setTimeout(() => {
  //   res.redirect('/table')
  // }, delay)

})

// husk at post skal flyttes ned
router.post('/deleteItem', async (req, res) => {
  console.log('deleteItem endpoint - post')
  console.log(req.body.itemId)
  const item = await removeOneItem(Item, req.body.itemId)
  // if (item) { // virker ikke, den går til else, men sletter det valgte item, så gør async/await så noget her???? ****
  //   res.redirect('/table')
  // }
  // else {
  //   console.log("ikke noget i item")
  // }


  res.redirect('/table')

  // setTimeout(() => {
  //   res.redirect('/table')
  // }, delay)

})


router.get('/add', (req, res) => {

  createItem(Item, 'vareFire fra add endpointet', 5)
  res.send('<h1>Object added to database</h1>')
})

router.get('/table', redirectLogin, async (req, res) => {
  const items = await getItems(Item) // returnerer en liste med objekter

  const form = `
  <form action="${address}createItemEndpoint" method="POST">
  <label for="itemNameEt">Varens navn:</label><br>
  <input type="text" id="itemNameEt" name="itemNameEt" value="Mælk"><br>
  <label for="groupNumber">Gruppens nummer:</label><br>
  <input type="text" id="groupNumber" name="groupNumber" value="1"><br><br>
  <input type="submit" value="Tilføj vare">
</form>
<br>`

  // deleteItem/:itemId skal det være sådan her eller som skrevet herunder???? *****
  // og om det skal være en GET eller POST metode
  // id'et kunne også i stedet sættes ind deleteItem/:itemId og så er det i stedet en get metode det håndteres med
  const formTwoPartOne = `
<form action="${address}deleteItem" method="POST"> 
<input type="text" id="itemId" name="itemId" style="display:none;" value="` // her skal value med id'et være
  const formTwoPartTwo = `"><input type="submit" value="Slet">
</form>`

  let allTablesAndForm = form


  // husk at jeg egentlig ikke må bruge for løkker. Se nodeExerciseOne for alternativ

  let HTMLTable = ""
  for (let j = 1; j <= numberOfGroups; j++) {
    const partOfItems = items.filter((obj) => obj.group === j)

    HTMLTable = `<table><h3 class="textColorNumber${j}">${j} - ${groupNames[j - 1]}:</h3>`
    //HTMLTable += `<th>itemName</th><th>group</th><th>move buttons</th><th>delete button</th>`

    let HTMLTableRow = ""
    partOfItems.map((element) => {
      HTMLTableRow = ""
      HTMLTableRow += "<tr>"
      HTMLTableRow += `<td class="nameTd">${element.itemName}</td>`
      //HTMLTableRow += `<td>${element.group}</td>`
      // HTMLTableRow += `<td>${element.date}</td>`
      // HTMLTableRow += `<td>${element._id}</td>` // begge virker
      // HTMLTableRow += `<td>${element.id}</td>`
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
  } // slut på numberOfGroups for løkke

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
  // Prøv at få det ovenstående ud i en seperat fil og importér det eller kald en metode med det der skal ind i HTML'en som argument
  // href="./public/style.css" blev blokeret pga forkert MIME type???? ***

  res.send(allHTML)


})  // slut på router.get /table

// slettes??
router.get('/test', (req, res) => {
  let talliste = [1, 2, 3, 4, 5]
  res.send(talliste)
})

// Vil man kunne undgå den falsk positive phishing besked ved at sætte dette endpoint til /
router.post('/createItemEndpoint', async (req, res) => {
  console.log('createItemEndpoint endpoint - post')
  console.log(req.body.itemNameEt)
  console.log(req.body.groupNumber)
  await createItem(Item, req.body.itemNameEt, req.body.groupNumber)
  res.redirect('/table')
  //res.redirect('/table');  
  //res.send(req.body)

  // setTimeout(() => {
  //   res.redirect('/table')
  // }, delay)

})


// slettes?
router.post('/hello', async (req, res) => {
  console.log('hello endpoint - post')
  console.log(req.body.fname)
  console.log(req.body.lname)
  await createItem(Item, req.body.fname, 3)
  res.send(req.body)
})



// router.all('*', (req, res) => {
//   res.status(404).send('Siden kunne ikke findes')
// })


module.exports = router