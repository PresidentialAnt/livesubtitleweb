import React,  { useEffect, useState, useRef} from 'react';
import axios from '../api/axios';
const Register = ({onClick, loginDir}) => {
  var randomWords = require('random-words');
  
  const REGISTER_URL= '/register';
  const nameRef = useRef();
  const userRef = useRef();
  const passRef = useRef();
  const cpRef = useRef();

  const onSubmit =(e)=>{
    e.preventDefault()
    register();
  }

  function UsernameGenerator(){//Generates a random username
    let word=randomWords()
    let num = Math.floor(Math.random() * 999)
    let tmp_usr = word + num.toString()
    userRef.current.value=tmp_usr
  }

  const register=async()=>{
    try{
      console.log(JSON.stringify({
        username: userRef.current.value, 
        password: passRef.current.value, 
        fullname: nameRef.current.value, 
        cplevel: cpRef.current.value}))

      let response = await axios.post(REGISTER_URL,{
        username: userRef.current.value, 
        password: passRef.current.value, 
        fullname: nameRef.current.value, 
        cplevel: cpRef.current.value});
      console.log(JSON.stringify(response));
      onClick()
    }catch (err){
        console.log("registration failed")
        console.log(err)
    }
  }

  useEffect(UsernameGenerator, []) //Random username generated on page load
  return (
      <section>
        <form className='input--box' onSubmit={onSubmit}>
          <h2>Register</h2>
          <label className='label'>Username</label>
          <input className='text--input' type='text' placeholder='Username' ref={userRef}/>
          <label className='label'>Full Name</label>
          <input className='text--input' type='text' placeholder='Full Name' ref={nameRef}/>
          <label className='label'>Password</label>
          <input className='text--input' type='password' placeholder='Password' ref={passRef}/>
          <label className='label'>CP Level</label>
          <select className='dropdown' id = "cplevel" ref={cpRef} defaultValue="1">
            <option value ="1">1</option>
            <option value ="2">2</option>
            <option value ="3">3</option>
            <option value ="4">4</option>
            <option value ="5">5</option>
          </select>
          <input className= 'small--button' type='submit' value='next'/>
        </form>
        <div className='bottom_right'>
      <button className= 'small--button' onClick={loginDir}>Login</button>
      </div>
      </section>
  )
}

export default Register