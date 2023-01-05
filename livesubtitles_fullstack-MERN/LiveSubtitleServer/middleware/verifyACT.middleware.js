const jwt = require('jsonwebtoken')

const verifyACT = (req,res,next)=>{
    const prefixToken = req.headers['authorization'];
    if (!prefixToken) return res.sendStatus(401)
    console.log(prefixToken)
    const token =prefixToken.split(' ')[1];
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decodedToken) => {
            if (err) return res.sendStatus(403);
            req.username = decodedToken.username;
            next()
        }
    )
}

module.exports = verifyACT;