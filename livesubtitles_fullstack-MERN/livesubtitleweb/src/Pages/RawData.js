import "../App.css";
import { ReactMediaRecorder } from "react-media-recorder";
import Store_audio from "../Components/store_audio";
import Word_generator from "../Components/Word_generator";

const RawData = () => {
  const x = "Hi"; // Change depending on what word to say

  return (
    <body>
      <ReactMediaRecorder
        audio
        blobPropertyBag={"audio/wav"}
        render={({ status, startRecording, stopRecording, mediaBlobUrl }) => (
          <div>
            <Word_generator word={x}></Word_generator>
            <p> Recording status: {status}</p>
            <button onClick={startRecording}>Start Recording</button>
            <button onClick={stopRecording}>Stop Recording</button>
            <audio src={mediaBlobUrl} controls autoPlay loop />
            <Store_audio url={mediaBlobUrl}></Store_audio>
          </div>
        )}
      />
    </body>
  );
};

export default RawData;
