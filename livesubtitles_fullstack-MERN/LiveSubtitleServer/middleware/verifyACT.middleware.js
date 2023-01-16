const jwt = require('jsonwebtoken')

/* Reference 3 - taken from https://www.youtube.com/watch?v=f2EqECiTBL8*/
const verifyACT = (req,res,next)=>{
    const prefixToken = req.headers['authorization'];
    if (!prefixToken) return res.sendStatus(401)
    const token =prefixToken.split(' ')[1];
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decodedToken) => {
            if (err) return res.sendStatus(403);
            req.username = decodedToken.username;
            next()
            /*End Reference 3*/
        }
    )
}

module.exports = verifyACT;