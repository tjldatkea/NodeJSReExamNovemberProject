//  Router for user related routes

const express = require("express")
const bcrypt = require('bcryptjs')
const router = express.Router()

const userFunctions = require('./userFunctions.js')

const { createUserMongooseModel, createUser, getUsers, updateUser, removeOneUser, findUserIdByEmail, findUser, doesEmailExistInUserDatabase} = userFunctions

const redirectLogin = (req, res, next) => {
    if (!req.session.userId) {
        res.redirect('/login')
    }
    else {
        next()
    }
}

const redirectHome = (req, res, next) => {
    if (req.session.userId) {
        res.redirect('/home')
    }
    else {
        next()
    }
}


router.get('/', async (req, res) => {
    console.log('/')  // Brug Morgen tiny
    console.log(req.session)

    const { userId } = req.session
    const { user } = req.session
    
    console.log("userId: " + userId)

    let HTMLTekst = ''
    HTMLTekst += userId ?
        `
    <h1>Welcome ${user.name}</h1>
    <a href="/home">Home</a>
    <form method="post" action="/logout">
        <button>Logout</button>
    </form>
    ` : `
    <h1>Welcome </h1>
    <a href="/login">Login</a>
    <a href="/register">Register</a>
    `

    res.send(HTMLTekst)
})

router.get('/home', redirectLogin, (req, res) => {
    console.log("Get /home")
    
    const { userId } = req.session
    const { user } = req.session
    
    res.send(`
    <h1>Home</h1>
    <a href="/">Main</a>
    <ul>
        <li>Name: ${user.name}</li>
        <li>Email: ${user.email}</li>
    </ul>
    `)
})

// router.get('/profile', (req, res) => {
//     const { user } = res.locals
// })


router.get('/login', redirectHome, (req, res) => {
    res.send(`
    <h1>Login</h1>
    <form method="post" action='/login'>
        <input type='email' name='email' placeholder='Email' required></input>
        <input type='password' name='password' placeholder="Password" required></input>
        <input type='submit' value='Login'></input>
    </form>
    <a href='/register'>Register</a>
    `
    )
})

router.get('/register', redirectHome, (req, res) => {
    res.send(`
    <h1>Register</h1>
    <form method="post" action='/register'>
        <input type='text' name='name' placeholder='Name' required></input>
        <input type='email' name='email' placeholder='Email' required></input>
        <input type='password' name='password' placeholder="Password" required></input>
        <input type="datetime-local">
        <input type='submit' value='Register'></input>
    </form>
    <a href='/login'>Login</a>
    `
    )
})


router.post('/login', async (req, res) => {
    console.log('login post')
    const { email, password } = req.body 

    if (email && password) {  // skal der foretages yderligere validering her??? ****
        // Med denne fremgangsmåde hentes alle brugere fra databasen og herefter ledes efter en bruger med den pågældende mail og pw
        // Det er nok bedre at kigge efter i data basen om der er en bruger med den rette mail
        const users = await User.find()
    
        const user = users.find(
            user => user.email === email && bcrypt.compareSync(password, user.hashedPassword) // (user entered plaintext pw from login form, hashedpw from 'db') <- bemærk rækkefølgen
        )

        if (user) {
            req.session.userId = user.id
            req.session.user = user

            return res.redirect('/home')
        }

    }
    res.redirect('/login')
})


// husk snabelA i mailen ellers kommer den ikke videre fra register og den giver ingen besked herom
// email valideringen accepterer heller ikke æ,ø og å
router.post('/register', async (req, res) => {
    console.log('register post')
    const { name, email, password } = req.body

    if (name && email && password) { // ordentlig validering
        
        const exists = await doesEmailExistInUserDatabase(User, email)

        if (!(exists)) {

            let salt = bcrypt.genSaltSync(10) // skal denne kaldes hver gang???
            let hash = bcrypt.hashSync(password, salt)

            const user = {
                name,
                email,
                hashedPassword: hash
            }

            const newUserFromDb = await createUser(User, user.name, user.email, user.hashedPassword)

            req.session.user = newUserFromDb
            req.session.userId = newUserFromDb.id

            return res.redirect('/home')
        }
    }
    res.redirect('/register') // To do: query string /register?error=error.auth.userExists eller ikke en email eller passwordTooShort


})

router.post('/logout', redirectLogin, (req, res) => {
    req.session.destroy(error => {
        if (error) {
            return res.redirect('/home') // eller main, hvad er der præcis der er sket hvis session ikke kan slettes??? ***
        }
        res.clearCookie(process.env.SESS_NAME) // skal det være sådan her mht SESS_NAME ???
        res.redirect('/login')
    })
})

// midlertidig for at kunne logge ud med et endpoint
router.get('/logout', (req, res) => {
    req.session.destroy(error => {
        if (error) {
            return res.redirect('/home') // eller main, hvad er der præcis der er sket hvis session ikke kan slettes??? ***
        }
        res.clearCookie(process.env.SESS_NAME) // skal det være sådan her mht SESS_NAME ???
        res.redirect('/login')
    })
})

module.exports = router
