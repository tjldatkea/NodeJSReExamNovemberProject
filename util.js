const developmentAddress = "http://localhost:" + process.env.PORT + "/"
const productionAddress = "https://nodeshoplistservertjldatkea.herokuapp.com/"

const inDevelopmentMode = process.env.DEV === "true"
const address = inDevelopmentMode ? developmentAddress : productionAddress

module.exports = {address}