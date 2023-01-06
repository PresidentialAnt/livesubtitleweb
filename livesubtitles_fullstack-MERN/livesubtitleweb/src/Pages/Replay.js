import React, { useContext, useState} from 'react'
import { UrlContext } from '../Components/UrlContext';
import ReactPlayer from 'react-player'
import recordingService from '../services/recording.service';
import axios from 'axios'
const Replay = ({confirmRecording,retakeRecording, DarkMode, Recording}) => {
  
  const [Hover1, setHover1] = useState(false)
  const [Hover2, setHover2] = useState(false)
  const [Hover3, setHover3] = useState(false)
  const context = useContext(UrlContext);
  const audio = context[Object.keys(context)[0]];
  // console.log(audio);
  const url = Object.values(audio)[0];
  const blob = Object.values(audio)[1]; // retrieved blob that hopefully can be sent to server
  // console.log(blob);

  // Save blob as a file
  var file = new File([blob], "recording.wav");
  // console.log(file);


  // Note: File and url should be uploaded to a file storage system
  const body = ({therapistID: 444, patientID: 123, fullname: 'fred back at it again', audioBlob: JSON.stringify(audio),partURL: '/somewhere'}) // testing json
  const submission = (body) =>{
    recordingService.create(body)
        .then(response => {
          this.setState({
            patientID: response.data.patientID,
            fullname: response.data.fullname,
            audioBlob: response.data.audioBlob,
            partURL: response.data.partURL
          });
          console.log(response.data);
          axios.get('/recordings').then(res =>{
            console.log(res.data)
          })
          confirmRecording();
        })
        .catch(e => {
          console.log(e);
        });
        
      }
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
        <ReactPlayer
        className='react-player'
        url={file}
        playing={true} 
        controls = {true}/>
        <div className='options'>
          <button className='small--button' onClick={retakeRecording} style={b3style} onMouseEnter={toggleHoverb3} onMouseLeave={toggleHoverb3}>re-take recording</button>
          <button className='small--button' onClick={() => submission(body)} style={b2style} onMouseEnter={toggleHoverb2} onMouseLeave={toggleHoverb2}>Confirm recording</button>
        </div>
    </section>
  )
}


export default Replay