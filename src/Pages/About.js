import React, { useState, useEffect } from "react";
import { ThemeProvider } from "styled-components";
import { Header } from "../Components/styles/Header.styled";
import { ThemeContainer } from "../Components/styles/ThemeSwitching.styled";
import {
  light,
  dark,
  blue,
  green,
  brown,
  pink,
} from "../Components/styles/Theme.styled";
import { GlobalStyles } from "../Components/styles/Global";

const About = () => {
  const [selectedTheme, setSelectedTheme] = useState(light);
  useEffect(() => {
    const currentTheme = JSON.parse(localStorage.getItem("current-theme"));
    if (currentTheme) {
      setSelectedTheme(currentTheme);
    }
  }, []);
  return (
    <ThemeProvider theme={selectedTheme}>
      <div className="About">
        <GlobalStyles />
        <Header>About</Header>
        <ThemeContainer>
          <p>
            This tool is designed to take recordings from individuals with
            cerebral palsy to train a word recognition machine learning model.{" "}
          </p>
        </ThemeContainer>
        <ThemeContainer>
          <p>
            The recordings are also available to the speech therapists of the
            users.
          </p>
        </ThemeContainer>
      </div>
    </ThemeProvider>
  );
};

export default About;
