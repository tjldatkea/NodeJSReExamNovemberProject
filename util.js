const developmentAddress = "http://localhost:" + process.env.PORT + "/"
const productionAddress = "https://nodeshoplistservertjldatkea.herokuapp.com/"

const inDevelopmentMode = process.env.DEV === "true"
const address = inDevelopmentMode ? developmentAddress : productionAddress


function putItInHTMLTemplate(it) {
  let HTMLText = `
<!DOCTYPE html>
<html>
<head>
    <link type="text/css" rel="stylesheet" href="./style.css">

    <meta charset="utf-8" />
    <meta name="wievport" content="width=device-width, initial-scale=1.0">
    <title></title>

    <style></style>
</head>
<body>
${it}
</body>
</html>`

  return HTMLText
}

module.exports = { address, putItInHTMLTemplate }