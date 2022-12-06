import {ReactMediaRecorder} from 'react-media-recorder';
import Store_audio from "../Components/store_audio";
import Word_generator from '../Components/Word_generator';

function Record({onClick}) {
  const x = "Hi"; // Change depending on what word to say

return (
  <section>
    <ReactMediaRecorder
      audio
      render={({ status, startRecording, stopRecording, mediaBlobUrl }) => (
        <div>
         <Word_generator word = {x}></Word_generator>
          <p> Recording status: {status}</p>
          <button className='small--button' onClick={startRecording}>Start Recording</button>
          <button className='small--button' onClick={stopRecording}>Stop Recording</button>
          <audio src={mediaBlobUrl} controls />
          {/* <Store_audio url = {mediaBlobUrl}></Store_audio> */}
          <button className='small--button' onClick={onClick}>Next</button>
        </div> 
      )}
    />
    </section>
);

}
export default Record;

// Code based on the documentation provided for the react-media-recorder library at https://www.npmjs.com/package/react-media-recorder