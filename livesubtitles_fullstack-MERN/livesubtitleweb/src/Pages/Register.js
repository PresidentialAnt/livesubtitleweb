import React, { useEffect, useRef, useState } from "react";
import axios from "../api/axios";
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
const Register = ({loginDir }) => {
  var randomWords = require("random-words");

  const REGISTER_URL = "/register";
  const nameRef = useRef();
  const userRef = useRef();
  const passRef = useRef();
  const cpRef = useRef();

  const onSubmit = (e) => {
    e.preventDefault();
    register();
  };

  function UsernameGenerator() {
    //Generates a random username
    let word = randomWords();
    let num = Math.floor(Math.random() * 999);
    let tmp_usr = word + num.toString();
    userRef.current.value = tmp_usr;
  }

  const register = async () => {
    try {
      console.log(
        JSON.stringify({
          username: userRef.current.value,
          password: passRef.current.value,
          fullname: nameRef.current.value,
          cplevel: cpRef.current.value,
        })
      );

      let response = await axios.post(REGISTER_URL, {
        username: userRef.current.value,
        password: passRef.current.value,
        fullname: nameRef.current.value,
        cplevel: cpRef.current.value,
      });
      console.log(JSON.stringify(response));
      loginDir();
    } catch (err) {
      console.log("registration failed");
      console.log(err);
    }
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

  useEffect(UsernameGenerator, []); //Random username generated on page load
  return (
    <ThemeProvider theme={selectedTheme}>
      <section>
        <form className="input--box" onSubmit={onSubmit}>
          <GlobalStyles font={font} fontsize={fontsize} />
          <h2>Register</h2>
          <label className="label">Username</label>
          <input
            className="text--input"
            type="text"
            placeholder="Username"
            ref={userRef}
          />
          <label className="label">Full Name</label>
          <input
            className="text--input"
            type="text"
            placeholder="Full Name"
            ref={nameRef}
          />
          <label className="label">Password</label>
          <input
            className="text--input"
            type="password"
            placeholder="Password"
            ref={passRef}
          />
          <label className="label">GMFCS Level</label>
          <select
            className="dropdown"
            id="cplevel"
            ref={cpRef}
            defaultValue="1"
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          <input
            className="small--button white--button colored--button"
            type="submit"
            value="next"
            style={b1style}
          />
        </form>
        <div className="bottom_right">
          <button className="small--button white--button colored--button" onClick={loginDir} style={b1style}>
            Login
          </button>
        </div>
      </section>
    </ThemeProvider>
  );
};

export default Register;
