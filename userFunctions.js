// Functions related to Users

let haveRunOnce = false

function createUserMongooseModel(mongoose) {
    if (!(haveRunOnce)) {
        const userSchema = new mongoose.Schema({
            name: String,
            email: String,
            hashedPassword: String,
            date: { type: Date, default: Date.now }
        })

        // class
        User = mongoose.model('User', userSchema)

        haveRunOnce = true

        return User
    }
}


async function createUser(User, nameParam, emailParam, hashedPasswordParam) {

    // object
    const user = new User({
        name: nameParam,
        email: emailParam,
        hashedPassword: hashedPasswordParam
    })

    const userWithId = await user.save()

    return userWithId
}


async function getUsers(User) {
    const users = await User.find()
    return users
}


// Funktionen virker, men bruges ikke endnu
async function updateUser(User, oldEmail, newName, newEmail) {
    const result = await User.find({ email: oldEmail })

    const user = result[0] // da der kun skulle være en bruger med netop den mail

    const newEmailAlreadyInDb = await doesEmailExistInUserDatabase(User, newEmail)

    if (!(newEmailAlreadyInDb)) {
        const updatedUser = await User.findByIdAndUpdate(user.id, {
            $set: {
                name: newName,
                email: newEmail
            }
        }, { new: true })

        return updatedUser
    }
    else {
        return
    }
}

// Virker, men bruges ikke endnu
async function removeOneUser(User, id) {
    const user = await User.findByIdAndRemove(id)
    console.log(user)
    return user
}

async function findUserIdByEmail(User, email) {
    const user = await findUser(User, email)

    return user.id
}

async function findUser(User, email) {
    const users = await User.find()

    const user = users.find(
        user => user.email === email
    )
    return user
}

async function doesEmailExistInUserDatabase(User, email) {

    // to do: nøjes med at tjekke i database fremfor at hente alle brugere

    const users = await User.find()

    const exists = users.some(
        user => user.email === email
    )

    return exists
}


module.exports = { createUserMongooseModel, createUser, getUsers, updateUser, removeOneUser, findUserIdByEmail, findUser, doesEmailExistInUserDatabase }
