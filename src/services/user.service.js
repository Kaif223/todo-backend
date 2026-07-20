const UserData = require('../../modals/user')



async function postUser(userBody) {

    const data = await UserData.create({
        userMail: userBody.userMail,
        userName: userBody.userName,
        firstName: userBody.firstName,
        lastName: userBody.lastName,
        password: userBody.password,
    });

    return data
}

async function editUser(userId, userBody) {

    const data = await UserData.findByIdAndUpdate(userId, userBody)
    return data
}


module.exports = { postUser, editUser }

