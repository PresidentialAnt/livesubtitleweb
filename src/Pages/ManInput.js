import React from 'react'
import {useState} from 'react'
const ManInput = ({playGame,rawData, DarkMode, word}) => {
  
  const [Hover1, setHover1] = useState(false)
  const [Hover2, setHover2] = useState(false)

  const toggleHoverb1 = ()=>{
    setHover1(prevstate => !prevstate)
  }

  const toggleHoverb2 = ()=>{
    setHover2(prevstate => !prevstate)
  }

  let b1style = {
    backgroundColor: Hover1 ? (DarkMode ?"grey ":"grey") :(DarkMode ? "white" : "green"),
    color: DarkMode ? "black" : "white",
  }

  let b2style = {
    backgroundColor: Hover2 ? (DarkMode ?"grey ":"grey") :(DarkMode ? "white" : "red"),
    color: DarkMode ? "black" : "white",
  }

  return (
    <section className='ManInput'>
        <button className='playGame' onClick={playGame} style={b1style} onMouseEnter={toggleHoverb1} onMouseLeave={toggleHoverb1}>Play Game</button>
        <button className='rawData' onClick={rawData} style={b2style} onMouseEnter={toggleHoverb2} onMouseLeave={toggleHoverb2}>Record Voice Only</button>
    </section>
  )
}

export default ManInput