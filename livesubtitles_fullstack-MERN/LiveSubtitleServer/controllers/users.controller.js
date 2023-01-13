const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose');

require('../models/user.model')
const User = mongoose.model("users");

const Register = async (req, res)=> { //adds to mongoDB schema
    const username = req.body.username;
    const password = req.body.password;
    const fullname = req.body.fullname;
    const cplevel = req.body.cplevel;

    //mis-input conditions
    if (!username || !password || !fullname || !cplevel) return res.status(400).send(['All fields must be filled in'])

    let duplicate = await User.findOne({ username: username })
    if (duplicate) return res.status(409).send(['duplicate user']);

    try {
        const hashedPwd = await bcrypt.hash(password, 10);
        await User.create({
            username: username,
            password: hashedPwd,
            fullname: fullname,
            cplevel: cplevel,
            refreshToken: ""
        })
        res.status(201).send([`New user ${username} created!` ])
    } catch (err){
        res.status(500).json({'err': err.message})
        console.log(err.message)
    }
};

const Login = async (req,res)=> { //Verifies existance of user in database and checks if password matches. Provides access and refresh tokens if true
    const username = req.body.username;
    const password = req.body.password;
    let user = await User.findOne({ username: username })
    if (!user) {
        return res.json({accessToken: "invalid"}).status(404);
     }else if (await bcrypt.compare(password, user.password)) {
        const accessToken = jwt.sign(
            {"username":username},
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn:'300s'}
        )
        const refreshToken = jwt.sign(
            {"username":username},
            process.env.REFRESH_TOKEN_SECRET,
            {expiresIn:'7d'}
        );
        await User.updateOne({ username: username }, { refreshToken: refreshToken })
        res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 2592000}); //30 days
        return res.json({accessToken: accessToken}).status(200);
    } else {
        return res.json({accessToken: "invalid"}).status(401);
    }
};

const Logout = async (req, res)=>{
    if (!req.cookies?.jwt) return res.sendStatus(204);
    token=req.cookies.jwt;
    await User.updateOne({ refreshToken: token }, { refreshToken: "" })
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true})
    res.status(200).send("Logged Out")
    }
    

const getUsers = async (req, res)=>{ //returns users as json
    let users = await User.find().lean()
    res.json(users)
}


module.exports = { Register, Login, Logout, getUsers};