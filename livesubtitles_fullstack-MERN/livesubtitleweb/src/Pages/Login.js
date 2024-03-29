import React, { useRef, useEffect, useContext, useState } from "react";
import axios from "../api/axios";
import { TokenContext } from "../Components/UserControl";
import {
  light,
  dark,
  blue,
  green,
  brown,
  pink,
} from "../Components/styles/Theme.styled";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "../Components/styles/Global";
import useRefresh from "../Components/useRefresh";
import useAxiosInterceptors from "../Components/useAxiosInterceptors";
const Login = ({ onClick, registerDir }) => {
  const { accessToken, setAccessToken } = useContext(TokenContext);
  const refreshToken = useRefresh()
  const axiosPrivate = useAxiosInterceptors()
  const LOGIN_URL = "/login";

  const userRef = useRef();
  const passRef = useRef();

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(userRef.current.value);
    console.log(passRef.current.value);
    login();
  };

  const login = async () => {
    try {
      console.log(
        JSON.stringify({
          username: userRef.current.value,
          password: passRef.current.value,
        })
      );
      let response = await axios.post(
        LOGIN_URL,
        {
          username: userRef.current.value,
          password: passRef.current.value,
        },
        {
          withCredentials: true,
        }
      );
      console.log(JSON.stringify(response));
      if (response.data.accessToken != "invalid") {
        console.log("login success");
        setAccessToken(response.data.accessToken);
        onClick();
      } else {
        console.log("login failed");
      }
      return response.data.accessToken != "invalid";
    } catch (err) {
      console.log(err);
    }
  };

  const getUsers = async () => {
    // Gets list of users from server. For testing connection, should be removed in production version.
    await axiosPrivate
      .get("/users")
      .then((res) => {
        console.log(res.data);
      });
  };

  const logOut = async () => {
    setAccessToken("");
    const response = await axios.get("/logout", {
      withCredentials: true,
    });
    console.log(response);
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

  useEffect(() => {
    try {
      async function tryLogin() {
        await refreshToken();
        onClick();
      }
      tryLogin();
    } catch (err) {
      console.log(err);
    }
  }, []);
  return (
    <ThemeProvider theme={selectedTheme}>
      <section>
        <form className="input--box" onSubmit={onSubmit}>
          <GlobalStyles font={font} fontsize={fontsize} />
          <h2>Enter your details</h2>
          <label className="label">Username</label>
          <input
            className="text--input"
            type="text"
            placeholder="Username"
            ref={userRef}
          />
          <label className="label">Password</label>
          <input
            className="text--input"
            type="password"
            placeholder="Password"
            ref={passRef}
          />
          <input className="small--button white--button colored--button" type="submit" value="next" style={b1style}/>
        </form>
        <button className="small--button white--button colored--button" onClick={refreshToken}>
          refresh
        </button>
        <button className="small--button white--button colored--button" onClick={logOut}>
          logout
        </button>
        <button className="small--button white--button colored--button" onClick={getUsers}>
          get Users
        </button>
        <div className="bottom_right">
          <button className="small--button white--button colored--button" onClick={registerDir} style={b1style}>
            Register
          </button>
        </div>
      </section>
    </ThemeProvider>
  );
};

export default Login;
