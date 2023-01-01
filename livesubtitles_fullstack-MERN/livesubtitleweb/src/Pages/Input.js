import React from 'react'
import {useState} from 'react'
import axios from '../api/axios';
const Input = ({onClick, registerDir, setUser}) => {

  const LOGIN_URL= '/login';

  const [username , setUsername] = useState('');
  const [password , setPassword] = useState('');


  const onSubmit =(e)=>{
    e.preventDefault()
    console.log(username)
    console.log(password)
    getUsers();
    login();
  }

  const login=async()=>{
    try{
      console.log(JSON.stringify({username, password}))
      let response = await axios.post(LOGIN_URL,{
        username: username,
        password: password
      });
      console.log(JSON.stringify(response));
      if (response.data[0]){
        setUser(username)               //To be replaced with a token system. Currently suceptible to JS hacking
        console.log("login success")
        onClick()
      } else{
        console.log("login failed")
      }
      return response.data[0]
    }catch (err) {
        console.log("login failed")
    }
  }

  const getUsers=()=>{ // Gets list of users from server. For testing connection, should be removed in release version.
    axios.get('/users').then(res =>{
       console.log(res.data)
     })
   }
 

  return (
      <section>
        <form className='input--box' onSubmit={onSubmit}>
          <h2>Enter your details</h2>
          <label className='label'>Username</label>
          <input className='text--input' type='text' placeholder='Username' value ={username} onChange={(e)=>setUsername(e.target.value)}/>
          <label className='label'>Password</label>
          <input className='text--input' type='password' placeholder='Password' value = {password} onChange={(e)=>setPassword(e.target.value)}/>
          <input className= 'small--button' type='submit' value='next'/>
        </form>
        <div className='bottom_right'>
      <button className= 'small--button' onClick={registerDir}>Register</button>
      </div>
      </section>
  )
}

export default Input