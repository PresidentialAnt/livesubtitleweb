import React from 'react'
import {useState} from 'react'
const Input = ({onClick}) => {
  const onSubmit =(e)=>{
    e.preventDefault()
    onClick(e)
  }
  return (
      <section>
        <form className='input--box' onSubmit={onSubmit}>
          <h2>Enter your details</h2>
          <label className='label'>Username</label>
          <input className='text--input' type='text' placeholder='Username'/>
          <label className='label'>Password</label>
          <input className='text--input' type='text' placeholder='Password'/>
          <input className= 'small--button' type='submit' value='next'/>
        </form>
      </section>
  )
}

export default Input