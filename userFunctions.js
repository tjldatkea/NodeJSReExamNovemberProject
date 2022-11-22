// Functions related to Users

//const mongoose = require('mongoose') // er det tilstrækkeligt at sende mongoose med eller er der brug for denne linie??? -***

let haveRunOnce = false
// Det her skal muligvis i sin egen model class eller noget i den stil *****
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

        console.log('User(mongoose.model): ')
        console.log(User)

        haveRunOnce = true

        console.log('I have run once')

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
    console.log("user: " + userWithId)

    return userWithId

} // slut på createUser funktionen


async function getUsers(User) {

  const users = await User.find() 
  return users
}


// utestet og skal argumentet være email eller skal andet med? ****
// Måske skal denne funktionalitet klares med flere seperate funktioner:
// findUserByEmail(email)
// changeUsersMail(oldEmail/user, newEmail)
// changeUsersPassword()
// changeUsersName()
async function updateUser(User, oldEmail) {
    //const user = await User.findByIdAndUpdate(id, {
    const user = await User.findByIdAndUpdate(oldEmail, {  
        $set: {
        //name: name,
        //email: email, **** der skal tjekkes at en evt ny email ikke allerede er brugt
        //hashedPassword: **** her skal enten genereres et nyt password eller også skal det gøres i en seperat funktion
        // husk komma'er
        }
    }, { new: true }) // <-- uden den sidste får man kurset inden det blev ændret

  console.log("updated item: " + user)

  return user // return updated user
}

// utestet ****  skal det være id eller email
async function removeOneUser(User, id) {
    const user = await User.findByIdAndRemove(id)

    return user // hvad returnerer den??? ***
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


module.exports = {createUserMongooseModel, createUser, getUsers, updateUser, removeOneUser, findUserIdByEmail, findUser, doesEmailExistInUserDatabase}
