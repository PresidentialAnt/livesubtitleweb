import { ReactMediaRecorder } from "react-media-recorder";
import { useContext, useState, useEffect } from "react";
import { UrlContext } from "../Components/UrlContext";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "../Components/styles/Global";
import {
  light,
  dark,
  blue,
  green,
  brown,
  pink,
} from "../Components/styles/Theme.styled";

function Record({ onClick, Word }) {
  const x = "Hi"; // Change depending on what word to say
  const { url, setUrl } = useContext(UrlContext); // use this context to pass the stored blob and prompted word to a different page

  //retrieve theme, font style and font size from local storage
  const [selectedTheme, setSelectedTheme] = useState(light);
  useEffect(() => {
    const currentTheme = JSON.parse(localStorage.getItem("current-theme"));
    if (currentTheme) {
      setSelectedTheme(currentTheme);
    }
  }, []);

  const [font, setFont] = useState(localStorage.getItem("font") || "monospace");
  const [fontsize, setFontSize] = useState(
    localStorage.getItem("fontsize") || "18px"
  );

  let bstyle = {
    fontFamily: font,
    marginTop: 70,
    fontSize: fontsize,
  };
/* Reference - taken from https://www.npmjs.com/package/react-media-recorder*/
  return (
    <ThemeProvider theme={selectedTheme}>
      <section>
        <GlobalStyles font={font} fontsize={fontsize} />
        <ReactMediaRecorder
          audio 
          onStop={(mediaBlobUrl) => { 
            setUrl({ url: mediaBlobUrl, word: Word });
          }} // Save the audio and the word into an object to pass into replay.js
          render={({ status, startRecording, stopRecording, mediaBlobUrl }) => (
            <div>
              <h1>Please say: {Word}</h1>
              <p> Recording status: {status}</p>
              <button
                className="small--button green--button colored--button"
                onClick={startRecording}
                style={bstyle}
              >
                Start Recording
              </button>
              <button
                className="small--button red--button colored--button"
                onClick={() => {
                  stopRecording();
                  onClick();
                }}
                style={bstyle}
              >
                Stop Recording
              </button>
            </div>
          )}
        />
      </section>
    </ThemeProvider>
  );
}
export default Record;

/* End of reference */