//  Router for user related routes

const express = require("express")
const bcrypt = require('bcryptjs')
const Joi = require('joi')

const router = express.Router()

const userFunctions = require('./userFunctions.js')

const { createUserMongooseModel, createUser, getUsers, updateUser, removeOneUser, findUserIdByEmail, findUser, doesEmailExistInUserDatabase } = userFunctions

const { address, putItInHTMLTemplate } = require('./util.js')

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

// Hjem
router.get('/', async (req, res) => {
    const { userId } = req.session
    const { user } = req.session

    let HTMLText = ''
    HTMLText += userId ?
        `
    <h2>Hej ${user.name}</h2>
    <span class='button'><a href="/home">Profil</a></span><br><br>
    <span class='button'><a href="/table">Indkøbslisten</a></span><br><br>
    <form method="post" action="/logout">
        <button>Log ud</button>
    </form>
    ` : `
    <h2>Velkommen til indkøbslisten</h2>
    <span class='button'><a href="/login">Log ind</a></span>
    <span class='button'><a href="/register">Opret bruger</a></span>
    `
    HTMLText = `<center>${HTMLText}</center>`
    res.send(putItInHTMLTemplate(HTMLText))
})


// Profil eller profile i stedet for home
router.get('/home', redirectLogin, (req, res) => {

    const { userId } = req.session
    const { user } = req.session
    console.log(userId)
    console.log(user.id)  //undefined

    let HTMLText = `<h2>Profil</h2>
    <span class='button'><a href="/">Hjem</a></span>
    <ul>
        <li>Navn: ${user.name}</li>
        <li>Email: ${user.email}</li>
    </ul>

    <form action="${address}removeUser/${userId}" method="POST"> 
    
    <input type="submit" value="Slet">
    </form>`

    //<input type="text" id="itemId" name="itemId" style="display:none;" value=" ">// her mellem gåseøjenene skal value med id'et være

    res.send(putItInHTMLTemplate(HTMLText)
    )
})


router.post('/removeUser/:id', async (req, res) => {
    const removedUser = await removeOneUser(User, req.body.id)
    res.redirect('/logout')
    //res.send(removedUser)
})


router.get('/login', redirectHome, (req, res) => {
    let HTMLText = `
    <h2>Log ind</h2>
    <form method="post" action='/login'>
        <input type='email' name='email' placeholder='Email' required></input>
        <input type='password' name='password' placeholder="Password" required></input>
        <input type='submit' value='Log ind'></input>
    </form>
    <a href='/register'>Opret bruger</a>
    `

    HTMLText = putItInHTMLTemplate(HTMLText)

    res.send(HTMLText)
})


router.get('/register', redirectHome, (req, res) => {
    let HTMLText = `
    <h2>Opret bruger</h2>
    <form method="post" action='/register'>
        <input type='text' name='name' placeholder='Navn' required></input>
        <input type='email' name='email' placeholder='Email' required></input>
        <input type='password' name='password' placeholder="Password" required></input>
        <input type='submit' value='Opret Bruger'></input>
    </form>
    <a href='/login'>Log ind</a>
    `
    HTMLText = putItInHTMLTemplate(HTMLText)

    res.send(HTMLText)
})


router.post('/login', async (req, res) => {
    const { email, password } = req.body

    if (email && password) {
        // Med denne fremgangsmåde hentes alle brugere fra databasen og herefter ledes efter en bruger med den pågældende mail og pw
        // Det er nok bedre at kigge efter i data basen om der er en bruger med den rette mail
        const users = await User.find()

        const user = users.find(
            user => user.email === email && bcrypt.compareSync(password, user.hashedPassword) // (user entered plaintext pw from login form, hashedpw from 'db') <- bemærk rækkefølgen
        )

        if (user) {
            req.session.userId = user.id
            req.session.user = user

            return res.redirect('/')
        }

    }
    res.redirect('/login')
})


// husk snabelA i mailen ellers kommer den ikke videre fra register og den giver ingen besked herom
// email valideringen accepterer heller ikke æ,ø og å
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body

    const schema = Joi.object({
        name: Joi.string()
            .alphanum()
            .min(1)
            .max(50)
            .required(),

        email: Joi.string()
            .required(),
        //     .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'dk'] } }),


        password: Joi.string()
            .min(1)
            .max(50)
            .required()

    })
        .with('name', 'password')
    // .with('name', 'email', 'password') 


    const result = schema.validate(req.body)
    console.log(result)


    if (result.error) {
        let HTMLText = putItInHTMLTemplate(`<p>${result.error.details[0].message}</p><a href="/register">Go back</a>`)
        res.status(400).send(HTMLText)
        return
    }
    else if (name && email && password) {
        const exists = await doesEmailExistInUserDatabase(User, email)

        if (!(exists)) {

            let salt = bcrypt.genSaltSync(10)
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
            return res.redirect('/home')
        }
        res.clearCookie(process.env.SESS_NAME)
        res.redirect('/login')
    })
})

// for at kunne logge ud med et endpoint
router.get('/logout', (req, res) => {
    req.session.destroy(error => {
        if (error) {
            return res.redirect('/home')
        }
        res.clearCookie(process.env.SESS_NAME)
        res.redirect('/login')
    })
})

module.exports = router
