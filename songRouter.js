const { setupSchemaAndModel, createSong, getSongs, getSongById, findFirstSongWithGivenName, updateSong } = require('./database/util.js')
//const { setupSchemaAndModel } = require('./database/util.js')

//let Song = setupSchemaAndModel()
// *************** Hvor skal den være henne???? ***********
setupSchemaAndModel() // scriptet bliver kørt, når det require's eller importeres, så måske kan dette funktionskald være i database scriptet


app.get('/', (req, res) => {
  res.send(restApiDescription.description)
})

app.get('/allSongs', (req, res) => {
  res.redirect('allSongs.html')
})

//GET	         | /songs	   | Get all the songs <br>
app.get('/songs', async (req, res) => {
  res.send(await getSongs())


  //res.redirect('./allSongs.html')

})


// GET	         | /songs/ID | Get a song by ID <br>
app.get('/songs/:id', async (req, res) => {

  //const songs = await getSongs()
  const song = await getSongById(req.params.id)
  // const song = songs.find(u => u.id === parseInt(req.params.id))

  if (!song) {
    return res.status(404).send(`song with id:${req.params.id} has not been found`)
  }

  res.send(song)
  //res.send('test')
})


// POST	       | /songs    | Creates a new song <br>
app.post('/songs', async (req, res) => {

  // add new song to database
  const song = await createSong(req.body.name)

  // validate name ***** skal bruge JOI
  // const { error } = validateGenre(req.body)
  // if (error) { return res.status(400).send(error.details[0].message) }

  res.send(song)
})

// PUT	         | /songs/name | Update the whole ressource of a song by name<br>
app.put('/songs/:songName', async (req, res) => {

  const song = await findFirstSongWithGivenName(req.params.songName)
  const updatedSong = await updateSong(song.id, req.body.name)
  if (updateSong) {
    res.send(updatedSong)
  }
  else {
    res.send(`song with id ${req.params.id}`)
  }
})

// ****************************
// hvordan skal den kunne kende forskel på om det er et id eller navn uden query strings
// PUT	         | /songs/ID | Update the whole ressource of a song by ID <br>
app.put('/songs/:id', async (req, res) => {
  const updatedSong = await updateSong(req.params.id, req.body.name)
  if (updateSong) {
    res.send(updatedSong)
  }
  else {
    res.send(`song with id ${req.params.id}`)
  }



  // find song with given id
  // const song = await songs.find(g => g.id === parseInt(req.params.id))

  // if (!song) { return res.status(404).send(`song with id:${req.params.id} has not been found`) }

  // // validate name husk JOI
  // // const { error } = validateGenre(req.body)

  // // if (error) { return res.status(400).send(error.details[0].message) }

  // song.name = req.body.name
  // res.send(song)

  //updateSong('630b920b6fb624fe5591d5f5', 'Ja')


})

// PATCH	       | /songs/ID | Update part of the ressource of a song by ID <br>


// DELETE       | /songs/ID | Deletes a song by ID <br>`
app.delete('/songs/:id', (req, res) => {

  const song = songs.find(u => u.id === parseInt(req.params.id))

  if (!song) {
    return res.status(404).send(`song with id:${req.params.id} has not been found`)
  }

  console.log(
    //songs = songs.filter((song) => { return song.id !== parseInt(req.params.id) })
    songs = songs.filter((song) => { return song.id !== parseInt(req.params.id) })
  )

  // res.send(song)
  res.send(songs)
})

