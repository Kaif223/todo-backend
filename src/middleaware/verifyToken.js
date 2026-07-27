const jwt = require('jsonwebtoken')

const secret = "secret123"


const verifyToken = (req, res, next) => {
        const token =  req.cookies.accessToken
        if(!token){
            return res.status(401).json({message:"unauthorized"})
        }
        try {
            
            const decode = jwt.verify(
                token, 
                secret
            )
            req.user = decode
            next()
        } catch (error) {
            return res.status(401).json({message:"unauthorized"})
        }

}

module.exports = verifyToken;