import React from 'react'
import {useState} from 'react'
const GDPRetc = ({onClick}) => {
  const onSubmit =(e)=>{
    e.preventDefault()
    onClick(e)
  }
  return (
    <section>
      <form className='input--box' onSubmit={onSubmit}>
        <h2>GDPR blabla</h2>
        <p className='GDPR'>Loren Ipsum and nonsense
        </p>

        <div className='confirmation'>
            <label className='label'>I consent to this</label>
            <input className='text--input' type='checkbox'/>

        </div>
        
        <input className= 'small--button' type='submit' value='next'/>
      </form>
      </section>
  )
}

export default GDPRetc