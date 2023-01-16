const jwt = require('jsonwebtoken')
const mongoose = require('mongoose');

require('../models/user.model')
const User = mongoose.model("users");

const TokenRefresher = async (req,res)=> { 
    if (!req.cookies?.jwt) return res.sendStatus(401);
    token=req.cookies.jwt;
    let user = await User.findOne({ refreshToken: token })
    if (!user) {
        return res.sendStatus(403);
     }else {
        (jwt.verify(
        token, 
        process.env.REFRESH_TOKEN_SECRET, 
        (err, decoded)=>{
            if (err || user.username !== decoded.username) return res.sendStatus(403);
            const accessToken=jwt.sign(
                { "username": decoded.username},
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn:'300s'}
            )
            res.json({accessToken: accessToken})
        })) 
        
    }
};

module.exports = {TokenRefresher};