import React, { useContext, useState, useEffect } from "react";
import { UrlContext } from "../Components/UrlContext";
import ReactPlayer from "react-player";
import recordingService from "../services/recording.service";
import { TokenContext } from "../Components/UserControl";
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
import { ThemeContainer } from "../Components/styles/ThemeSwitching.styled";
import axios from "../api/axios";
import { default as axiosDef } from "axios";
const Replay = ({ confirmRecording, retakeRecording, Recording }) => {
  const { accessToken, setAccessToken } = useContext(TokenContext);

  const [Hover1, setHover1] = useState(false);
  const [Hover2, setHover2] = useState(false);
  const [Hover3, setHover3] = useState(false);
  const context = useContext(UrlContext);

  const info = context[Object.keys(context)[0]]; // retrieve the url and word from the context
  var audio = info.url; // save the blob url
  var word = info.word;
  // console.log(audio); // verify that the word passed from context exists

  // Save blob as a file
  var file = new File([audio], "recording.wav");
  console.log(file);

  // Note: File and url should be uploaded to a file storage system
  let body = { audioBlob: audio, partURL: "SomeURL", word: word }; // testing json
  const submission = async (body) => {
    console.log(accessToken);
    /* Reference 2 - taken from https://stackoverflow.com/a/48642305*/
    await axiosDef({
      method: "get",
      url: audio,
      responseType: "blob",
    }).then((response) => {
      console.log(response);
      var reader = new FileReader();
      reader.readAsDataURL(response.data);
      reader.onloadend = function () {
        var base64data = reader.result;
        /* end of reference 2 */
        body.audioBlob = base64data;
        recordingService.create(body, accessToken);
      };
    });
  };

  const toggleHoverb2 = () => {
    setHover2((prevstate) => !prevstate);
  };
  const toggleHoverb3 = () => {
    setHover3((prevstate) => !prevstate);
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
    fontFamily: font,
    fontSize: fontsize,
  };

  let b2style = {
    backgroundColor: Hover2 ? "grey" : "green",
    color: "white",
    fontFamily: font,
    fontSize: fontsize,
  };

  let b3style = {
    backgroundColor: Hover3 ? "grey" : "blue",
    color: "white",
    fontFamily: font,
    fontSize: fontsize,
  };

  const getUsers = async () => {
    // Gets list of users from server. For testing connection, should be removed in release version.
    console.log(accessToken);
    await axios
      .get("/users", {
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        console.log(res.data);
      });
  };

  const refreshToken = async () => {
    const response = await axios.get("/refresh", {
      withCredentials: true,
    });
    setAccessToken(response.data.accessToken);
    console.log(accessToken);
  };

  const UrltoBlob = async () => {
    await axiosDef({
      method: "get",
      url: audio, // blob url eg. blob:http://127.0.0.1:8000/e89c5d87-a634-4540-974c-30dc476825cc
      responseType: "blob",
    }).then((response) => {
      console.log(response);
      var reader = new FileReader();
      reader.readAsDataURL(response.data);
      reader.onloadend = function () {
        var base64data = reader.result;
        console.log(String(base64data));
        //  self.props.onMainImageDrop(base64data)
      };
    });
  };

  return (
    <ThemeProvider theme={selectedTheme}>
      <section>
        <GlobalStyles font={font} fontsize={fontsize} />
        <ReactPlayer
          data-testid = 'audio_player'
          className="react-player"
          url={audio}
          playing={true}
          controls={true}
        />
        <div className="options">
          <button
            className="small--button"
            onClick={retakeRecording}
            style={b3style}
            onMouseEnter={toggleHoverb3}
            onMouseLeave={toggleHoverb3}
          >
            re-take recording
          </button>
          <button
            className="small--button"
            onClick={() => {
              submission(body);
              console.log(accessToken);
            }}
            style={b2style}
            onMouseEnter={toggleHoverb2}
            onMouseLeave={toggleHoverb2}
          >
            Confirm recording
          </button>
          <button className="small--button" onClick={getUsers} style={b1style}>
            get Users
          </button>
          <button className="small--button" onClick={UrltoBlob} style={b1style}>
            blobbify
          </button>
          <button
            className="small--button"
            onClick={refreshToken}
            style={b1style}
          >
            refresh
          </button>
        </div>
      </section>
    </ThemeProvider>
  );
};

export default Replay;
