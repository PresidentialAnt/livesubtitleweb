const express = require('express');
const bcrypt = require('bcrypt');
const path = require('path');
const data = {}
data.userlist = require('../models/accounts.json')

users = [{  //To be replaced with actual database
    username: "Fred123",
    password: "$2b$10$iRwJOgtDDcCHAwePEh1e4uglG.AtICBUZIdBlLJazOW2eKQGq2cPW", //The password is 1234. This is encypted
    fullname: "Fred McDonald",
    cplevel: "4"}
];

const Login = async (req,res)=> { //Verifies existance in user array and checks password. Not ideal
    const username = req.body.username;
    const password = req.body.password;
    user = users.find(user => user.username == username)
    console.log(user)
    let msg= [false]
    if (user == null) {
        msg= [false, "No such user"]
     }else if (await bcrypt.compare(password, user.password)) {
        msg= [true,"login successful"]
    } else {
        msg = [false,"incorrect password"]
    }
    res.send(msg)
};

const Register = async (req, res)=> { //allows addition to users array
    const username = req.body.username;
    const password = req.body.password;
    const fullname = req.body.fullname;
    const cplevel = req.body.cplevel;
    try {
        const hashedPwd = await bcrypt.hash(password, 10);
        users.push({
            username: username,
            password: hashedPwd,
            unhashed_password: password, //for testing purposes, will be removed in release
            fullname: fullname,
            cplevel: cplevel
        })
        console.log(users)
        res.status(201).json({ 'success': `New user ${user} created!` })
    } catch {
    }
    // console.log(users)
};

const getUsers = (req, res)=>{ //returns users as json
    res.json(users)
}


module.exports = { Login, Register, getUsers};