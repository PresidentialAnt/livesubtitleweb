const express = require('express');
const bcrypt = require('bcrypt');
const path = require('path');
const fs = require('fs');
const jwt = require('jsonwebtoken')
require('dotenv').config();

const userDB = {
    userlist:require('../models/accounts.json'),
    setUsers: function (userDB) {this.userlist = userDB}
}
async function WriteUsersToFile(){
    await fs.promises.writeFile(
    path.join(__dirname, '..', 'models', 'accounts.json'), 
    JSON.stringify(userDB.userlist, null, 4))
}

async function ClearCookies(res){
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true}) //secure: true in production
    res.sendStatus(204)
}

const Register = async (req, res)=> { //allows addition to users array
    const username = req.body.username;
    const password = req.body.password;
    const fullname = req.body.fullname;
    const cplevel = req.body.cplevel;

    //mis-input conditions
    if (!username || !password || !fullname || !cplevel) return res.status(400).send(['All fields must be filled in'])
    duplicate = userDB.userlist.find(user => user.username === username)
    if (duplicate) return res.status(409).send(['duplicate user']);

    try {
        const hashedPwd = await bcrypt.hash(password, 10);

        const newUser = {
            username: username,
            password: hashedPwd,
            unhashed_password: password, //for testing purposes, will be removed in release
            fullname: fullname,
            cplevel: cplevel,
            refreshToken: ""
        }

        userDB.setUsers([...userDB.userlist, newUser])
        console.log(userDB.userlist)
        WriteUsersToFile()
        res.status(201).send([`New user ${username} created!` ])
    } catch (err){
        res.status(500).json({'err': err.message})
        console.log(err.message)
    }
    // console.log(users)
};

const Login = async (req,res)=> { //Verifies existance in user array and checks password. Not ideal
    const username = req.body.username;
    const password = req.body.password;
    user = userDB.userlist.find(user => user.username === username)
    console.log(user)
    let msg= [false]
    if (user == null) {
        msg= [false, "No such user"]
     }else if (await bcrypt.compare(password, user.password)) {
        const accessToken = jwt.sign(
            {"username":username},
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn:'1d'}
        )
        const refreshToken = jwt.sign(
            {"username":username},
            process.env.REFRESH_TOKEN_SECRET,
            {expiresIn:'7d'}
        );
        const userComplement = userDB.userlist.filter(user => user.username !== username)
        const currentUser = {...user, refreshToken}
        userDB.setUsers([...userComplement, currentUser]);
        WriteUsersToFile()
        res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 2592000}); //30 days
        msg= [true,"login successful",accessToken]
    } else {
        msg = [false,"incorrect password"]
    }
    res.send(msg)
};

const Logout = async (req, res)=>{
    if (!req.cookies?.jwt) return res.sendStatus(204);
    token=req.cookies.jwt;
    user = userDB.userlist.find(user => user.refreshToken === token)
    console.log(user)
    let msg= [false]
    if (user == null) {
        ClearCookies(res)
     }else {
        const userComplement = userDB.userlist.filter(user => user.refreshToken !== token)
        const currentUser = {...user, refreshToken: ''}
        userDB.setUsers([...userComplement, currentUser]);
        WriteUsersToFile()
        ClearCookies(res)
        }
    }
    

const getUsers = (req, res)=>{ //returns users as json
    res.json(userDB.userlist)
}


module.exports = { Register, Login, Logout, getUsers};