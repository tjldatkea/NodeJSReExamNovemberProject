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

  // setTimeout(() => {
  //   console.log("result i timeout" + result)
  // }, 5000);

} // slut på createItem funktionen

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




async function getItems() {

  const items = await Item
    .find() // w3: No parameters in the find() method gives you the same result as SELECT * in MySQL.
  //   .find({ group: 4 })
  //   .limit(10)
  // //.sort({ itemName: 1 }) // 1 er ascending order og -1 er descending order
  console.log("getItems: " + items)
  return items
}

// // async function updateCourse(id) {

// //   // Approach: Update first
// //   // Update directly
// //   //const result = await Course.update({_id: id}, {
// //   // Optionally: get the updated document
// //   const course = await Course.findByIdAndUpdate(id, {
// //     $set: {
// //       author: 'Jason',
// //       isPublished: false
// //     }
// //   }, { new: true }) // <-- uden den sidste får man kurset inden det blev ændret
// //   //console.log(result)
// //   console.log("updated course: " + course)

// //   // i video 18 af CRUD Operations Using Mongoose kan ses en liste og link til de forskellige update funktioner man kan bruge med Mongo

// // }



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



// forsøg på at lave en side, hvor man kan oprette nye elementer i databasen
// og redigere disse
const express = require('express');
const { urlencoded } = require('body-parser');

const app = express()
const delay = 3000

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
  <input type="submit" value="Submit">
</form>`

  // deleteItem/:itemId skal det være sådan her eller som skrevet herunder???? *****
  // og om det skal være en GET eller POST metode
  // id'et kunne også i stedet sættes ind deleteItem/:itemId og så er det i stedet en get metode det håndteres med
  const formTwoPartOne = `
<form action="https://nodeshoplistservertjldatkea.herokuapp.com/deleteItem" method="POST"> 
<input type="text" id="itemId" name="itemId" value="` // her skal value med id'et være
  const formTwoPartTwo = `"><br><br><input type="submit" value="Slet">
</form>`

  let HTMLForm = ""
  HTMLForm += form
  HTMLForm += "<br>"
  HTMLForm += "<table>"
  HTMLForm += "<th>itemName</th>"
  HTMLForm += "<th>group</th>"
  HTMLForm += "<th>date</th>"
  HTMLForm += "<th>id</th>"

  const numberOfGroups = 5 // find ud af hvor mange der skal være
  
  // husk at jeg egentlig ikke må bruge for løkker, 
  // men hvordan kommer jeg uden om den med en tabel for hver gruppe???
  let allHTML = HTMLForm
  let HTMLTable = ""
  for (let j = 1; j <= numberOfGroups; j++) {
    const partOfItems = items.filter((obj) => obj.group === j)

    HTMLTable = "<table>"
    //let HTMLTableRow = "<table>"
    let HTMLTableRow = ""
    partOfItems.map((element) => {
      HTMLTableRow = ""
      HTMLTableRow += "<tr>"
      HTMLTableRow += `<td>${element.itemName}</td>`
      HTMLTableRow += `<td>${element.group}</td>`
      HTMLTableRow += `<td>${element.date.getMonth()}</td>`
      // HTMLTableRow += `<td>${element._id}</td>` // begge virker
      HTMLTableRow += `<td>${element.id}</td>`
      HTMLTableRow += `<td>${formTwoPartOne}${element.id}${formTwoPartTwo}</td>`
      // HTMLTableRow += `<td><button type="button" onclick="() => {console.log('test')})">Click Me!</button></td>`
      HTMLTableRow += "</tr>"
      HTMLTable += HTMLTableRow
    })

    HTMLTable += "</table>"

    allHTML += HTMLTable
  } // slut på numberOfGroups for løkke

  res.send(allHTML)


})  // slut på app.get


app.get('/test', (req, res) => {
  let talliste = [1,2,3,4,5]
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


