import React, { useContext, useState, useEffect } from "react";
import { UrlContext } from "../Components/UrlContext";
import ReactPlayer from "react-player";
import { TokenContext } from "../Components/UserControl";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "../Components/styles/Global";
import useRefresh from "../Components/useRefresh";
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
import useAxiosInterceptors from "../Components/useAxiosInterceptors";
import { default as axiosDef } from "axios";
const Replay = ({ confirmRecording, retakeRecording, Recording }) => {
  const { accessToken, setAccessToken } = useContext(TokenContext);
  const refreshToken = useRefresh()
  const axiosPrivate = useAxiosInterceptors()
  const context = useContext(UrlContext); // retrieve the stored blob and word from the record page

  const info = context[Object.keys(context)[0]]; // retrieve the url and word from the context
  var audio = info.url; // save the blob url
  var word = info.word;
  // console.log(audio); // verify that the word passed from context exists

  // Save blob as a file
  var file = new File([audio], "recording.wav");
  console.log(file);

  // Note: File and url should be uploaded to a file storage system
  let body = { audioBlob: '', partURL: "placeholder for scalability", word: word }; 
  const submission = async (body) => {
    console.log(accessToken);
    /* Reference 2 - taken from https://stackoverflow.com/a/48642305*/
    await axiosDef({ // Finds the BLOB stored in the browser and converts it to a string
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
        axiosPrivate.post("/recordings", body)
        .then(function(res){
          console.log(res.data)
          confirmRecording()
        }).catch(function(err){
          console.log(err)
        }); //Sends data to server

      };
    });
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

  let bstyle = {
    fontFamily: font,
    fontSize: fontsize,
  };

  const getUsers = async () => {
    // Gets list of users from server. For testing connection, removed in production.
    console.log(accessToken);
    await axiosPrivate
      .get("/users")
      .then((res) => {
        console.log(res.data);
      });
  };

/* Reference 2 - taken from https://stackoverflow.com/a/48642305*/
  const UrltoBlob = async () => {
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
        console.log(String(base64data));
      };
    });
  };
/* end of reference 2 */
  return (
    <ThemeProvider theme={selectedTheme}>
      <section>
        <GlobalStyles font={font} fontsize={fontsize} />
        <ReactPlayer
          data-testid = 'audio_player'
          className="react-player"
          url={audio}
          playing={false}
          controls={true}
        />
        <div className="options">
          <button
            className="small--button blue--button colored--button"
            onClick={retakeRecording}
            style={bstyle}
          >
            re-take recording
          </button>
          <button
            className="small--button green--button colored--button"
            onClick={() => {
              submission(body);
              console.log(accessToken);
            }}
            style={bstyle}
          >
            Confirm recording
          </button>
          <button className="small--button " onClick={getUsers} style={bstyle}>
            get Users
          </button>
          <button className="small--button" onClick={UrltoBlob} style={bstyle}>
            blobbify
          </button>
          <button
            className="small--button"
            onClick={()=>{
              const refTok = async()=>{
                const newTok=await refreshToken()
                console.log(newTok)
              }
              refTok()
            }}
            style={bstyle}
          >
            refresh
          </button>
        </div>
      </section>
    </ThemeProvider>
  );
};

export default Replay;
