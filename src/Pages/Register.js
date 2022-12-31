import React from "react";
import { useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import axios from "../api/axios";
import { GlobalStyles } from "../Components/styles/Global";
import {
  light,
  dark,
  blue,
  brown,
  green,
  pink,
} from "../Components/styles/Theme.styled";
import { ThemeContainer } from "../Components/styles/ThemeSwitching.styled";

const Register = ({ onClick, loginDir }) => {
  var randomWords = require("random-words");

  const REGISTER_URL = "/register";

  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [cplevel, setCplevel] = useState("1");
  const [selectedTheme, setSelectedTheme] = useState(light);

  useEffect(() => {
    const currentTheme = JSON.parse(localStorage.getItem("current-theme"));
    if (currentTheme) {
      setSelectedTheme(currentTheme);
    }
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(username);
    console.log(password);
    console.log(fullname);
    console.log(cplevel);
    getUsers();
    register();
    // onClick();
  };

  function UsernameGenerator() {
    //Generates a random username
    let word = randomWords();
    let num = Math.floor(Math.random() * 999);
    let tmp_usr = word + num.toString();
    setUsername(tmp_usr);
  }

  const register = async () => {
    try {
      console.log(JSON.stringify({ username, password, fullname, cplevel }));
      let response = await axios.post(REGISTER_URL, {
        username: username,
        password: password,
        fullname: fullname,
        cplevel: cplevel,
      });
      console.log(JSON.stringify(response));
    } catch {
      console.log("registration failed");
    }
  };

  const getUsers = () => {
    // Gets list of users from server. For testing connection, should be removed in release version.
    axios.get("/users").then((res) => {
      console.log(res.data);
    });
  };

  useEffect(UsernameGenerator, []); //Random username generated on page load
  return (
    <section>
      <ThemeProvider theme={selectedTheme}>
        <form className="input--box" onSubmit={onSubmit}>
          <GlobalStyles />
          <h2>Register</h2>

          <label className="label">Username</label>
          <input
            className="text--input"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <label className="label">Full Name</label>
          <input
            className="text--input"
            type="text"
            placeholder="Full Name"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
          />

          <label className="label">Password</label>
          <input
            className="text--input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <label className="label">CP Level</label>
          <select
            className="dropdown"
            id="cplevel"
            onChange={(e) => setCplevel(e.target.value)}
          >
            <option value="1" selected>
              1
            </option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>

          <input className="small--button" type="submit" value="next" />
        </form>

        <button className="small--button" onClick={loginDir}>
          Login
        </button>
      </ThemeProvider>
    </section>
  );
};

export default Register;
