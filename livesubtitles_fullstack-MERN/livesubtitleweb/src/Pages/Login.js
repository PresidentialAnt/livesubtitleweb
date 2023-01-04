import React from 'react'
import {useState} from 'react'
import axios from '../api/axios';
const Login = ({onClick, registerDir, setUser}) => {

  const LOGIN_URL= '/login';

  const [username , setUsername] = useState('');
  const [password , setPassword] = useState('');
  let accessToken = ""

  const onSubmit =(e)=>{
    e.preventDefault()
    console.log(username)
    console.log(password)
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
        // setUser(username)               //To be replaced with a token system. Currently suceptible to JS hacking
        console.log("login success")
        accessToken=response.data[2]
        console.log(accessToken)
        getUsers(accessToken);
      // refreshToken();
        onClick()
      } else{
        console.log("login failed")
      }
      return response.data[0]
    }catch (err) {
        console.log("login failed")
    }
  }

  const getUsers= async ()=>{ // Gets list of users from server. For testing connection, should be removed in release version.
    await axios.get('/users', {
      headers:{
        'authorization': `Bearer ${accessToken}`
      }
    }).then(res =>{
       console.log(res.data)

     })
   }
   const refreshToken= async ()=>{
    await axios.get('/refresh', {
      withCredentials: true
    }).then(res =>{
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

export default Login