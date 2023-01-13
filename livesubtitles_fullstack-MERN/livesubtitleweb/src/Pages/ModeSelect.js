import React from 'react'
import { useEffect } from 'react';
import {useState} from 'react'
const ModeSelect = ({rawData, User}) => {
  
  const [Hover1, setHover1] = useState(false)
  const [Hover2, setHover2] = useState(false)

  const toggleHoverb1 = ()=>{
    setHover1(prevstate => !prevstate)
  }

  const toggleHoverb2 = ()=>{
    setHover2(prevstate => !prevstate)
  }

  let b1style = {
    backgroundColor: Hover1 ? ("grey") :("red"),
    color: "white",
  }

  let b2style = {
    backgroundColor: Hover2 ? ("grey") :("green"),
    color: "white",
  }
  return (
    <section>
              <button className='big--button' onClick={rawData} style={b2style} onMouseEnter={toggleHoverb2} onMouseLeave={toggleHoverb2}>Record Voice Only</button>
        <button className='small--button' style={b1style} onMouseEnter={toggleHoverb1} onMouseLeave={toggleHoverb1}>Play Game</button>

    </section>
  )
}


export default ModeSelect