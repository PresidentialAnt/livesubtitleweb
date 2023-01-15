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
  /* Reference 1 - taken from https://blog.logrocket.com/build-react-theme-switcher-app-styled-components/ */
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
  /* end of reference 1*/

  //retrieve current font style and size from local storage
  const [font, setFont] = useState(localStorage.getItem("font") || "monospace");

  const [fontsize, setFontSize] = useState(
    localStorage.getItem("fontsize") || "18px"
  );

  // updating font style and size into local storage
  useEffect(() => {
    localStorage.setItem("font", font);
  }, [font]);

  useEffect(() => {
    localStorage.setItem("fontsize", fontsize);
  }, [fontsize]);

  return (
    <ThemeProvider theme={selectedTheme}>
      <div className="Settings">
        <GlobalStyles font={font} fontsize={fontsize} />
        <Header>Settings</Header>
        <ThemeContainer>
          <p2>Font:</p2>
          <input
            type="radio"
            class="radio-button"
            name="font"
            value="monospace"
            onChange={(e) => setFont(e.target.value)}
            checked={font === "monospace"}
          />
          <p2>Default</p2>
          <input
            type="radio"
            class="radio-button"
            name="font"
            value="Arial"
            onChange={(e) => setFont(e.target.value)}
            checked={font === "Arial"}
          />
          <p2>Better legibility</p2>
        </ThemeContainer>
        <ThemeContainer>
          <p2>Font size:</p2>
          <input
            type="radio"
            class="radio-button"
            name="size"
            value="14px"
            onChange={(e) => setFontSize(e.target.value)}
            checked={fontsize === "14px"}
          />
          <p2>Small</p2>
          <input
            type="radio"
            class="radio-button"
            name="size"
            value="18px"
            onChange={(e) => setFontSize(e.target.value)}
            checked={fontsize === "18px"}
          />
          <p2>Medium</p2>
          <input
            type="radio"
            class="radio-button"
            name="size"
            value="20px"
            onChange={(e) => setFontSize(e.target.value)}
            checked={fontsize === "20px"}
          />
          <p2>Large</p2>
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
