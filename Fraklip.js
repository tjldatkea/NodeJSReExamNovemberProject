    Status her: det nye kursus med navnet fra endpointet, muligvis vha querystring,
  bliver gemt i db, men jeg får ikke objectet retur, men et promise pending,
    dette løser jeg midl med en setTimeout og får så et promise med det nye kursus objekt
    men ved brug af setTimeout er jeg så tilbage til start ? og får jeg så noget gavn af
    callback funktionerne ????
  grunden til at jeg får undefined lige nu tror jeg fordi jeg bruger newCourse.name
    på et promise
    Jeg får i hver fald gemt et kursus i databasen med et navn fra endpoint / querystring
    Så må jeg løse problemet med promiset, når det bliver nødvendigt



Eksempel på gitignore:

# Node build artifacts
node_modules
npm - debug.log

# Local development
  *.env
  *.dev
    .DS_Store

# Docker
Dockerfile
docker - compose.yml


// // function createCourseWithCallback(courseName, callback) {
// //   setTimeout(() => {
// //     //console.log('Writing course to simulated database')
// //     // callback(courseName)

// //     const course = new Course({
// //       name: courseName,
// //       author: 'Tosh',
// //       tags: ['node', 'backend'],
// //       isPublished: true
// //     })

// //     //let resultPromise = 
// //     course.save()

// //     callback(courseName)
// //     // setTimeout(() => {
// //     //   console.log("result af createCourseWithCallback i timeout" + resultPromise)
// //     //   //callback(resultPromise) // promise pending
// //     //   //callback(newCourse.name)
// //     //   callback(courseName) // det her er lidt snyd, da jeg bare returnere det som allerede er 
// //     //   //leveret til funktionen og ikke noget fra det objekt der returneres fra databasen
// //     // }, 3000);


// //     // saveFunction(course, (newCourse) => {
// //     //   console.log(newCourse)
// //     //   callback(newCourse.name) // kan jeg sætte callback'en her??? den siger promise pending
// //     //   //callback(courseName)
// //     // })

// //     // Status her: det nye kursus med navnet fra endpointet, muligvis vha querystring,
// //     // bliver gemt i db, men jeg får ikke objectet retur, men et promise pending,
// //     // dette løser jeg midl med en setTimeout og får så et promise med det nye kursus objekt
// //     // men ved brug af setTimeout er jeg så tilbage til start? og får jeg så noget gavn af
// //     // callback funktionerne????
// //     // grunden til at jeg får undefined lige nu tror jeg fordi jeg bruger newCourse.name
// //     // på et promise
// //     // Jeg får i hver fald gemt et kursus i databasen med et navn fra endpoint/querystring
// //     // Så må jeg løse problemet med promiset, når det bliver nødvendigt

// //   }, 1000);
// // }

// // // function saveFunction(course, callback) {
// // //   console.log("inside saveFunction")

// // //   let result = course.save()


// // //   setTimeout(() => {
// // //     console.log("result af saveFunctionen i timeout" + result)
// // //     callback(result)
// // //   }, 3000);
// // // }


CSS:
/* herfra er det til autocomplete */

* {
  box- sizing: border - box;
}

body {
  font: 16px Arial;
}

.autocomplete {
  /*the container must be positioned relative:*/
  position: relative;
  display: inline - block;
}

input {
  border: 1px solid transparent;
  background - color: #f1f1f1;
  padding: 10px;
  font - size: 16px;
}

input[type = text] {
  background - color: #f1f1f1;
  width: 100 %;
}

input[type = submit] {
  background - color: DodgerBlue;
  color: #fff;
}


.autocomplete - items {
  position: absolute;
  border: 1px solid #d4d4d4;
  border - bottom: none;
  border - top: none;
  z - index: 99;
  /*position the autocomplete items to be the same width as the container:*/
  top: 100 %;
  left: 0;
  right: 0;
}

.autocomplete - items div {
  padding: 10px;
  cursor: pointer;
  background - color: #fff;
  border - bottom: 1px solid #d4d4d4;
}

.autocomplete - items div:hover {
  /*when hovering an item:*/
  background - color: #e9e9e9;
}

.autocomplete - active {
  /*when navigating through the items using the arrow keys:*/
  background - color: DodgerBlue!important;
  color: #ffffff;
}

.intro {
  background - color: yellow;
}

.tilbudsKnapKlassen {

  height: 50px;
  width: 100px;
  background - color: lightgray;
}

#tilbudsStartKnap {

  height: 50px;
  width: 100px;
  background - color: green;
}

#tilbudsSlutKnap {

  height: 50px;
  width: 100px;
  background - color: red;
}

#tilbudsStartOgSlutKnap {

  height: 50px;
  width: 100px;
  background: linear - gradient(-25deg, red 50 %, green 50 %);
}

/*
#table0 {
  background-color: #ef2917;
}

#table1 {
  background-color: #ef8a17;
}

#table2 {
  background-color: #c6c013;
}
#table3 {
  background-color: #008148;
}
#table4 {
  background-color: #034732;
}

*/

#cvs

/*canvas-container */
{
  width: 100 %;
  text - align: center;
}

canvas {
  display: inline;
}


#shopButton1 {
  /* ser ikke ud til at virke */
  color: red;
}

.buttontrue {
  /* ser ikke ud til at virke */
  color: green;
}


/* Slut på autocomplete */


}


// midl udkomm:
// for (let j = 1; j < numberOfGroups; j++) {
//   const partOfItems = items.filter((obj) => obj.group === j)
//   for (let i = 0; i < partOfItems.length; i++) {
//     const element = partOfItems[i]

// for (let i = 0; i < items.length; i++) {
//   const element = items[i]

//     HTMLForm += "<tr>"
//     HTMLForm += `<td>${element.itemName}</td>`
//     HTMLForm += `<td>${element.group}</td>`
//     HTMLForm += `<td>${element.date.getMonth()}</td>`
//     // HTMLForm += `<td>${element._id}</td>` // begge virker
//     HTMLForm += `<td>${element.id}</td>`
//     HTMLForm += `<td>${formTwoPartOne}${element.id}${formTwoPartTwo}</td>`
//     // HTMLForm += `<td><button type="button" onclick="() => {console.log('test')})">Click Me!</button></td>`
//     HTMLForm += "</tr>"
//   }
// //} midl


// HTMLForm += "</table>"

//res.send(HTMLForm)


<style>
  body {
    margin: auto;
  margin-top: 1rem;
  width: 95%;
  border: 3px solid darkgray;
  padding: 10px;
  background-color: rgb(93, 109, 126); /*lightslategray;*/
    }
  #center {
    margin: auto;
  width: 60%;
  padding: 10px;
  text-align: center;
    }

  table {
    font - family: arial, sans-serif;
  border-collapse: collapse;
    }

  td,
  th {
    border: 1px solid darkgray;
  text-align: center;
  width: 100%;
  background-color: lightslategray;
    }

</style>




/*
hele test.html

<!DOCTYPE html>
<html>

<body>
  <h2>HTML Forms on heroku</h2>


  <!-- <form action="http://localhost:3000/hello" method="POST"> -->
  <form action="https://nodeshoplistservertjldatkea.herokuapp.com/hello" method="POST">
    <label for="fname">First name:</label><br>
    <input type="text" id="fname" name="fname" value="John"><br>
    <label for="lname">Last name:</label><br>
    <input type="text" id="lname" name="lname" value="Doe"><br><br>
    <input type="submit" value="Submit">
    <button>Make HTML to be scraped</button>
  </form>

  <p>If you click the "Submit" button, the form-data </p>


  <!-- <form action="http://localhost:3000/hello" method="POST"> -->
  <form action="https://nodeshoplistservertjldatkea.herokuapp.com/hello" method="POST">
    <div>
      <label for="to">Data to be transfered</label>
      <textarea name="dataForTransferField" id="dataForTransferField" value="From Yatzy.HTML" rows="4"
        cols="50"></textarea>
    </div>
    <div>
      <button>Make HTML to be scraped</button>
    </div>
  </form>

</body>

</html>

*/



hele app.js:

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

    // class
    Item = mongoose.model('Item', itemSchema)
    haveRunOnce = true
  }
  // object
  const item = new Item({
    itemName: itemName,
    group: Number(groupParam)
  })

  const result = await item.save()
  console.log("result udenfor timeout: " + result)

} // slut på createItem funktionen

async function getItems() {

  const items = await Item
    .find() // w3: No parameters in the find() method gives you the same result as SELECT * in MySQL.
  //   .find({ group: 4 })
  //   .limit(10)
  // //.sort({ itemName: 1 }) // 1 er ascending order og -1 er descending order
  console.log("getItems: " + items)
  return items
}

async function updateItem(id, /*name, */groupNumber) {

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
createItem('EtEllerAndetFire', 5)



// setTimeout(() => {
//   let resultat = getItems()
//   console.log(resultat)
// }, 3000);


// // setTimeout(() => {
// //   let resultat = updateCourse('62f22a268e4b5ffe11fb1402') // Posh
// //   console.log(resultat)
// // }, 4000);

//async function removeItem(id) {
async function removeManyItems(groupNumber) {
  //const result = await Item.deleteMany({_id: id})
  const result = await Item.deleteMany({ group: groupNumber })
  //const course = await Item.findByIdAndRemove(id)
  //console.log(course)
}

async function removeOneItem(id) {
  //const result = await Item.deleteMany({_id: id})
  //const result = await Item.deleteMany({group: groupNumber})
  const item = await Item.findByIdAndRemove(id)
  //console.log(course)
}

//removeCourse('62bf09a5871a37128405073c')
function makeFormForButtonToChangeItemsGroup(itemId,/* itemName, itemGroup, */endpoint, newItemGroup) {

  const formTemplate = `
  <form action="https://nodeshoplistservertjldatkea.herokuapp.com/${endpoint}" method="POST"> 
  <input type="text" id="itemIdFive" name="itemIdFive" style="display:none;" value="${itemId}">
  <input type="text" id="newItemGroup" name="newItemGroup" style="display:none;" value="${newItemGroup}">
  <input type="submit" value="Flyt til ${newItemGroup}">
  </form>`

  // <input type="text"  style="display:none;" value="${itemName}">
  // <input type="text"  style="display:none;" value="${itemGroup}">

  //id="itemId-${id}" name="itemId-${id}"

  return formTemplate
}



// forsøg på at lave en side, hvor man kan oprette nye elementer i databasen
// og redigere disse


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

// app.get('/deleteItem/:itemId', (req, res) => {
//   removeOneItem(req.params.itemId)
//   res.send(`<h1>Item with id ${req.params.itemId} deleted</h1>`)
// })


// husk at post skal flyttes ned
app.post('/updateItem', async (req, res) => {
  console.log('updateItem endpoint - post')
  console.log(req.body.itemId)
  const item = await updateItem(req.body.itemIdFive,/* req.body.itemName, */req.body.newItemGroup)

  setTimeout(() => {
    res.redirect('/table')
  }, delay)

})

// husk at post skal flyttes ned
app.post('/deleteItem', async (req, res) => {
  console.log('deleteItem endpoint - post')
  console.log(req.body.itemId)
  const item = await removeOneItem(req.body.itemId)
  // if (item) { // virker ikke, den går til else, men sletter det valgte item, så gør async/await så noget her???? ****
  //   res.redirect('/table')
  // }
  // else {
  //   console.log("ikke noget i item")
  // }

  setTimeout(() => {
    res.redirect('/table')
  }, delay)

})


app.get('/add', (req, res) => {

  createItem('vareFire fra add endpointet', 5)
  res.send('<h1>Object added to database</h1>')
})

app.get('/table', async (req, res) => {
  const items = await getItems() // returnerer en liste med objekter

  const form = `
  <form action="https://nodeshoplistservertjldatkea.herokuapp.com/helloTwo" method="POST">
  <label for="itemNameEt">Item name:</label><br>
  <input type="text" id="itemNameEt" name="itemNameEt" value="Mælk"><br>
  <label for="groupNumber">Group:</label><br>
  <input type="text" id="groupNumber" name="groupNumber" value="1"><br><br>
  <input type="submit" value="Add Item">
</form>
<br>`

  // deleteItem/:itemId skal det være sådan her eller som skrevet herunder???? *****
  // og om det skal være en GET eller POST metode
  // id'et kunne også i stedet sættes ind deleteItem/:itemId og så er det i stedet en get metode det håndteres med
  const formTwoPartOne = `
<form action="https://nodeshoplistservertjldatkea.herokuapp.com/deleteItem" method="POST"> 
<input type="text" id="itemId" name="itemId" style="display:none;" value="` // her skal value med id'et være
  const formTwoPartTwo = `"><input type="submit" value="Delete">
</form>`
  // let formValue = ""
  // const formTwo = `
  // <form action="https://nodeshoplistservertjldatkea.herokuapp.com/deleteItem" method="POST"> 
  // <input type="text" id="itemId" name="itemId" value="${formValue}"><br><br><input type="submit" value="Slet">
  // </form>`

  let allTablesAndForm = form

  const numberOfGroups = 5 // find ud af hvor mange der skal være

  // husk at jeg egentlig ikke må bruge for løkker. Se nodeExerciseOne for alternativ

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
      // HTMLTableRow += `<td>${element.date}</td>`
      // HTMLTableRow += `<td>${element._id}</td>` // begge virker
      // HTMLTableRow += `<td>${element.id}</td>`
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
  } // slut på numberOfGroups for løkke


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
  // Prøv at få det ovenstående ud i en seperat fil og importér det eller kald en metode med det der skal ind i HTML'en som argument
  // href="./public/style.css" blev blokeret pga forkert MIME type???? ***

  res.send(allHTML)


})  // slut på app.get


app.get('/test', (req, res) => {
  let talliste = [1, 2, 3, 4, 5]
  res.send(talliste)
})


app.post('/helloTwo', (req, res) => {
  console.log('helloTwo endpoint - post')
  console.log(req.body.itemNameEt)
  console.log(req.body.groupNumber)
  createItem(req.body.itemNameEt, req.body.groupNumber)

  //res.redirect('/table');  
  //res.send(req.body)

  setTimeout(() => {
    res.redirect('/table')
  }, delay)

})


app.post('/hello', (req, res) => {
  console.log('hello endpoint - post')
  console.log(req.body.fname)
  console.log(req.body.lname)
  createItem(req.body.fname, 3)
  res.send(req.body)
})


// // app.get('/addQS/:name', (req, res) => {
// //   const courseNameFromUser = req.params.name

// //   createCourseWithCallback(courseNameFromUser, (newCourse) => {
// //     //createCourse(courseNameFromUser, (newCourse) => {
// //     res.send(`<h1>Object with course name: ${courseNameFromUser} added to database</h1>
// //     <p>${newCourse} </p>`)
// //   })
// // })



// // setTimeout(() => {
// //   res.send(`<h1>Object with course name: ${courseNameFromUser} added to database</h1>
// //   <p>${newCourse} </p>`) 
// // }, 4000);






const PORT = (process.env.PORT || 8080)
app.listen(PORT, () => {
  console.log(`Listening at port ${PORT}`)
})


