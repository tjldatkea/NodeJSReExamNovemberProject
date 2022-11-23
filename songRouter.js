
const express = require("express")
const router = express.Router()

const { songs } = require('./data/songsData.js')

router.get('/nodes/:songNumber', async (req, res) => {
  res.send(songs[req.params.songNumber])
})

router.get('/allSongs', (req, res) => {
  res.redirect('allSongs.html')
})


// allSongs.html og songs.js virker ikke uden denne og den skal have data fra en songsData/sql/mongo db
// router.get('/songs', (req, res) => {

//   res.send(***************)
// })


module.exports = router