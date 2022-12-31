import React, { useState, useEffect } from "react";
import { Header } from "../Components/styles/Header.styled";
import {
  ThemeButton,
  ThemeContainer,
} from "../Components/styles/ThemeSwitching.styled";
import { ThemeProvider } from "styled-components";
import {
  light,
  dark,
  blue,
  green,
  brown,
  pink,
} from "../Components/styles/Theme.styled";
import { GlobalStyles } from "../Components/styles/Global";

const Settings = () => {
  const [selectedTheme, setSelectedTheme] = useState(light);
  // function to handle user theme selection on click and save it to local storage
  useEffect(() => {
    const currentTheme = JSON.parse(localStorage.getItem("current-theme"));
    if (currentTheme) {
      setSelectedTheme(currentTheme);
    }
  }, []);
  const HandleThemeChange = (theme) => {
    setSelectedTheme(theme);
    localStorage.setItem("current-theme", JSON.stringify(theme));
  };
  return (
    <ThemeProvider theme={selectedTheme}>
      <div className="Settings">
        <GlobalStyles />
        <Header>Settings</Header>
        <ThemeContainer>
          <p>Font:</p>
          <input type="radio" name="font" checked />
          <p>Default</p>
          <input type="radio" name="font" />
          <p>Better legibility</p>
        </ThemeContainer>
        <ThemeContainer>
          <p>Font size:</p>
          <input type="radio" name="size" />
          <p>Small</p>
          <input type="radio" name="size" checked />
          <p>Medium</p>
          <input type="radio" name="size" />
          <p>Large</p>
        </ThemeContainer>

        <ThemeContainer>
          <span>Themes: </span>
          <ThemeButton
            className={`light ${selectedTheme === light ? "active" : ""}`}
            onClick={() => HandleThemeChange(light)}
          ></ThemeButton>
          <ThemeButton
            className={`dark ${selectedTheme === dark ? "active" : ""}`}
            onClick={() => HandleThemeChange(dark)}
          ></ThemeButton>
          <ThemeButton
            className={`blue ${selectedTheme === blue ? "active" : ""}`}
            onClick={() => HandleThemeChange(blue)}
          ></ThemeButton>
          <ThemeButton
            className={`green ${selectedTheme === green ? "active" : ""}`}
            onClick={() => HandleThemeChange(green)}
          ></ThemeButton>
          <ThemeButton
            className={`brown ${selectedTheme === brown ? "active" : ""}`}
            onClick={() => HandleThemeChange(brown)}
          ></ThemeButton>
          <ThemeButton
            className={`pink ${selectedTheme === pink ? "active" : ""}`}
            onClick={() => HandleThemeChange(pink)}
          ></ThemeButton>
        </ThemeContainer>
      </div>
    </ThemeProvider>
  );
};

export default Settings;
