const express = require('express');
const bcrypt = require('bcrypt');
const path = require('path');
const fs = require('fs');
const fsPromises = require('fs/promises')
const userDB = {
    userlist:require('../models/accounts.json'),
    setUsers: function (userDB) {this.userlist = userDB}
}

const Login = async (req,res)=> { //Verifies existance in user array and checks password. Not ideal
    const username = req.body.username;
    const password = req.body.password;
    user = userDB.userlist.find(user => user.username === username)
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
            cplevel: cplevel
        }
        userDB.setUsers([...userDB.userlist, newUser])
        console.log(userDB.userlist)
        await fsPromises.writeFile(
            path.join(__dirname, '..', 'models', 'accounts.json')
        , JSON.stringify(userDB.userlist, null, 4))
        res.status(201).json({ 'success': `New user ${username} created!` })
    } catch (err){
        res.status(500).json({err: err.message})
        console.log(err.message)
    }
    // console.log(users)
};

const getUsers = (req, res)=>{ //returns users as json
    res.json(userDB.userlist)
}


module.exports = { Login, Register, getUsers};