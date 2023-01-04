const jwt = require('jsonwebtoken')
require('dotenv').config();

const userDB = {
    userlist:require('../models/accounts.json'),
    setUsers: function (userDB) {this.userlist = userDB}
}

const TokenRefresher = (req,res)=> { 
    if (!req.cookies?.jwt) return res.sendStatus(401);
    token=req.cookies.jwt;
    user = userDB.userlist.find(user => user.refreshToken === token)
    console.log(user)
    let msg= [false]
    if (user == null) {
        msg= [false, "No such user"]
     }else {
        (jwt.verify(
        token, 
        process.env.REFRESH_TOKEN_SECRET, 
        (err, decoded)=>{
            if (err || user.username !== decoded.username) return res.sendStatus(403);
            const accessToken=jwt.sign(
                { "username": decoded.username},
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn:'30s'}
            )
            msg= [true,"valid token",accessToken]
        })) 
        
    }
    res.send(msg)
};

module.exports = {TokenRefresher};