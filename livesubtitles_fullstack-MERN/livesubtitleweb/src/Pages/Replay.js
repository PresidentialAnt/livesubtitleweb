import React, { useContext, useState} from 'react'
import { UrlContext } from '../Components/UrlContext';
import ReactPlayer from 'react-player'
import recordingService from '../services/recording.service';
import {TokenContext} from '../Components/UserControl';
import axios from '../api/axios'
const Replay = ({confirmRecording,retakeRecording, Recording}) => {
  
  const {accessToken, setAccessToken}= useContext(TokenContext)

  const [Hover1, setHover1] = useState(false)
  const [Hover2, setHover2] = useState(false)
  const [Hover3, setHover3] = useState(false)
  const context = useContext(UrlContext);

  const info = context[Object.keys(context)[0]]; // retrieve the url and word from the context
  var audio = info.url; // save the blob url
  var word = info.word;
  // console.log(audio); // verify that the word passed from context exists

  // Save blob as a file
  var file = new File([audio], "recording.wav");
  console.log(file);


  // Note: File and url should be uploaded to a file storage system
  const body = ({audioBlob: audio, partURL: "SomeURL", word: word}) // testing json
  const submission = (body) =>{
    console.log(accessToken)
    recordingService.create(body, accessToken)
        // .then(response => {
        //   this.setState({
        //     patientID: response.data.patientID,
        //     fullname: response.data.fullname,
        //     audioBlob: response.data.audioBlob,
        //     partURL: response.data.partURL,
        //     word: response.data.word,
        //   });
        //   console.log(response.data);
        //   axios.get('/recordings').then(res =>{
        //     console.log(res.data)
        //   })
        //   confirmRecording();
        // })
        // .catch(e => {
        //   console.log(e);
        // })
        ;
        
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
    backgroundColor: Hover1 ? ("grey") : ("green"),
    color: "white",
  }

  let b2style = {
    backgroundColor: Hover2 ? ("grey") : ("green"),
    color: "white",
  }

  let b3style = {
    backgroundColor: Hover3 ? ("grey") : ("blue"),
    color: "white",
  }

  const getUsers= async ()=>{ // Gets list of users from server. For testing connection, should be removed in release version.
    console.log(accessToken)
    await axios.get('/users', {
      headers:{
        'authorization': `Bearer ${accessToken}`
      }
    }).then(res =>{
       console.log(res.data)

     })
   }

   const refreshToken = async ()=>{
    const response = await axios.get('/refresh', {
      withCredentials: true
    })
    setAccessToken(response.data.accessToken)
    console.log(accessToken)
   }

  return (
    <section>
        <ReactPlayer
        className='react-player'
        url={audio}
        playing={true} 
        controls = {true}/>
        <div className='options'>
          <button className='small--button' onClick={retakeRecording} style={b3style} onMouseEnter={toggleHoverb3} onMouseLeave={toggleHoverb3}>re-take recording</button>
          <button className='small--button' onClick={() => {submission(body);console.log(accessToken)}} style={b2style} onMouseEnter={toggleHoverb2} onMouseLeave={toggleHoverb2}>Confirm recording</button>
          <button className= 'small--button' onClick={getUsers}>get Users</button>
          <button className= 'small--button' onClick={refreshToken}>refresh</button>
        </div>
    </section>
  )
}


export default Replay