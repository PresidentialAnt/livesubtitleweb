import React from 'react'
import {useState} from 'react'
import axios from '../api/axios';
import TokenControl from '../Components/TokenControl';
// import {accessToken, setAccessToken} from '../Components/TokenControl'
const Login = ({onClick, registerDir, setUser}) => {

  const LOGIN_URL= '/login';

  const [username , setUsername] = useState('');
  const [password , setPassword] = useState('');
  let accessToken = ''
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
      }, {
        withCredentials: true
      });
      console.log(JSON.stringify(response));
      if (response.data.accessToken!="invalid"){
        // setUser(username)               //To be replaced with a token system. Currently suceptible to JS hacking
        console.log("login success")
        accessToken =response.data.accessToken
        console.log(accessToken)
        getUsers(accessToken);
      // refreshToken();
        // onClick()
      } else{
        console.log("login failed")
      }
      return (response.data.accessToken!="invalid")
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
    const response = await axios.get('/refresh', {
      withCredentials: true
    })
    accessToken =response.data.accessToken
    console.log(accessToken)
   }


   const logOut= async ()=>{
    const response = await axios.get('/logout', {
      withCredentials: true
    })
    console.log(response)
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
        <button className= 'small--button' onClick={refreshToken}>refresh</button>
        <button className= 'small--button' onClick={logOut}>logout</button>
        <div className='bottom_right'>
      <button className= 'small--button' onClick={registerDir}>Register</button>
      </div>
      </section>
  )
}

export default Login