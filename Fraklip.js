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
      font-family: arial, sans-serif;
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