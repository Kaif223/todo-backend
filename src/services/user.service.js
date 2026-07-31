const UserData = require('../../modals/user')
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const secret = "secret123";
const refreshSecret = "refresh123"


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

const signinService = async (data) => {

    const { userMail, password } = data;

    const user = await UserData.findOne({ userMail });

    if (!user) {
        throw {
            status: 404,
            message: "User not found",
        };
    }

    const passwordCompare = await bcrypt.compare(password, user.password);

    if (!passwordCompare) {
        throw {
            status: 400,
            message: "Invalid password",
        };
    }

    const payload = {
        userId: user._id,
        userMail: user.userMail,
    };

    const token = jwt.sign(payload, secret, {
        expiresIn: "10s",
    });
    const refreshToken = jwt.sign(payload, refreshSecret, {
        expiresIn: "7d",
    });

    return {
        status: 200,
        message: "Login successful",
        token,
        refreshToken,
        user,
    };
};

const signoutService = async (token) => {

    if (!token) {
        throw {
            status: 401,
            message: "No active session",
        };
    }

    return true;
};


module.exports = {
    postUser,
    editUser,
    signinService,
    signoutService
}

