import {ReactMediaRecorder} from 'react-media-recorder';
import Store_audio from "../Components/store_audio";
import Word_generator from '../Components/Word_generator';
import {useState} from 'react'

function Record({onClick, Word}) {
  const x = "Hi"; // Change depending on what word to say
  const [Hover1, setHover1] = useState(false)
  const [Hover2, setHover2] = useState(false)

  const toggleHoverb1 = ()=>{
    setHover1(prevstate => !prevstate)
  }

  const toggleHoverb2 = ()=>{
    setHover2(prevstate => !prevstate)
  }

  let b1style = {
    backgroundColor: Hover1 ? "grey": "red",
    color: "white",
  }

  let b2style = {
    backgroundColor: Hover2 ? "grey": "green",
    color: "white",
  }


return (
  <section>
<ReactMediaRecorder
      audio
      render={({ status, startRecording, stopRecording, mediaBlobUrl }) => (
        <div>
         <Word_generator word = {Word}></Word_generator>
          <p> Recording status: {status}</p>
          <button className='small--button' style={b2style} onMouseEnter={toggleHoverb2} onMouseLeave={toggleHoverb2}>Start Recording</button>
          <button className='small--button' onClick={onClick} style={b1style} onMouseEnter={toggleHoverb1} onMouseLeave={toggleHoverb1}>Stop Recording</button>
          {/* <audio src={mediaBlobUrl} controls />
          {/* <Store_audio url = {mediaBlobUrl}></Store_audio> */}
          {/* <button className='small--button' onClick={onClick}>Next</button> */} 
        </div> 
      )}
    />
    </section>
);

}
export default Record;

// Code based on the documentation provided for the react-media-recorder library at https://www.npmjs.com/package/react-media-recorder