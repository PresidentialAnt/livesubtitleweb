import { ReactMediaRecorder } from "react-media-recorder";
import Word_generator from "../Components/Word_generator";
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
  const [Hover1, setHover1] = useState(false);
  const [Hover2, setHover2] = useState(false);
  const { url, setUrl } = useContext(UrlContext);
  const toggleHoverb1 = () => {
    setHover1(!Hover1);
  };

  const toggleHoverb2 = () => {
    setHover2(!Hover2);
  };

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

  let b1style = {
    backgroundColor: Hover1 ? "grey" : "red",
    color: "white",
    fontFamily: font,
    marginTop: 70,
    fontSize: fontsize,
  };

  let b2style = {
    backgroundColor: Hover2 ? "grey" : "green",
    color: "white",
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
              <Word_generator word={Word}></Word_generator>
              <p> Recording status: {status}</p>
              <button
                className="small--button"
                onClick={startRecording}
                style={b2style}
                onMouseEnter={toggleHoverb2}
                onMouseLeave={toggleHoverb2}
              >
                Start Recording
              </button>
              <button
                className="small--button"
                onClick={() => {
                  stopRecording();
                  onClick();
                }}
                style={b1style}
                onMouseEnter={toggleHoverb1}
                onMouseLeave={toggleHoverb1}
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