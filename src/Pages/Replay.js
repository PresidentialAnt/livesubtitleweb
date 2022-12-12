import React from 'react'
import {ReactMediaRecorder} from 'react-media-recorder';
import {useState} from 'react'
const Replay = ({confirmRecording,retakeRecording, DarkMode, Recording}) => {
  
  const [Hover1, setHover1] = useState(false)
  const [Hover2, setHover2] = useState(false)
  const [Hover3, setHover3] = useState(false)

  const toggleHoverb1 = ()=>{
    setHover1(prevstate => !prevstate)
  }
  const toggleHoverb2 = ()=>{
    setHover2(prevstate => !prevstate)
  }
  const toggleHoverb3 = ()=>{
    setHover3(prevstate => !prevstate)
  }
  let b1style = {
    backgroundColor: Hover1 ? (DarkMode ?"grey ":"grey") :(DarkMode ? "white" : "green"),
    color: DarkMode ? "black" : "white",
  }

  let b2style = {
    backgroundColor: Hover2 ? (DarkMode ?"grey ":"grey") :(DarkMode ? "white" : "green"),
    color: DarkMode ? "black" : "white",
  }

  let b3style = {
    backgroundColor: Hover3 ? (DarkMode ?"grey ":"grey") :(DarkMode ? "white" : "blue"),
    color: DarkMode ? "black" : "white",
  }

  return (
    <section>
        <audio controls autoPlay />
        <div className='options'>
          <button className='small--button' onClick={retakeRecording} style={b3style} onMouseEnter={toggleHoverb3} onMouseLeave={toggleHoverb3}>re-take recording</button>
          <button className='small--button' onClick={confirmRecording} style={b2style} onMouseEnter={toggleHoverb2} onMouseLeave={toggleHoverb2}>Confirm recording</button>
        </div>
    </section>
  )
}


export default Replay