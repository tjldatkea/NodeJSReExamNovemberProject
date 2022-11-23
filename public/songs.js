
let songs
async function getSongs() {
  await fetch("http://localhost:3000/songs").then(res => res.json()).then(res => {

    console.log(res)
    songs = res

    const body = document.body


    for (let i = 0; i < songs.length; i++) {
      const element = songs[i]

      const div = document.createElement('div')

      const p = document.createElement('p')

      const iTag = document.createElement('i')
      const a = document.createElement('a')

      a.href = `/songs/${element._id}`
      a.textContent = 'link'
      //console.log(element._id)

      p.textContent = `${element.name}`
      iTag.textContent = ` (${element.artist})`

      p.append(iTag)
      div.append(p)
      div.append(a)
      body.append(div)

    }

  })

}

getSongs()


