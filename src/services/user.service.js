const UserData = require('../../modals/user')
const bcrypt = require("bcrypt") 



async function postUser(userBody) {

    const salt = await bcrypt.genSalt(10) 
   const secPass = await bcrypt.hash(userBody.password, salt)

    const data = await UserData.create({
        userMail: userBody.userMail,
        userName: userBody.userName,
        firstName: userBody.firstName,
        lastName: userBody.lastName,
        password: secPass,
    });

    return data
}

async function editUser(userId, userBody) {

    const data = await UserData.findByIdAndUpdate(userId, userBody)
    return data
}


module.exports = { postUser, editUser }

