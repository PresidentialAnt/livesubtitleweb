import React, { useEffect, useState } from "react";
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

const ModeSelect = ({ rawData, User }) => {
  const [Hover1, setHover1] = useState(false);
  const [Hover2, setHover2] = useState(false);

  const toggleHoverb1 = () => {
    setHover1((prevstate) => !prevstate);
  };

  const toggleHoverb2 = () => {
    setHover2((prevstate) => !prevstate);
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
    fontSize: fontsize,
  };

  let b2style = {
    backgroundColor: Hover2 ? "grey" : "green",
    color: "white",
    fontFamily: font,
    fontSize: fontsize,
  };

  return (
    <ThemeProvider theme={selectedTheme}>
      <GlobalStyles font={font} fontsize={fontsize} />

      <section>
        <button
          className="big--button"
          onClick={rawData}
          style={b2style}
          onMouseEnter={toggleHoverb2}
          onMouseLeave={toggleHoverb2}
        >
          Record Voice Only
        </button>
        <button
          className="small--button"
          style={b1style}
          onMouseEnter={toggleHoverb1}
          onMouseLeave={toggleHoverb1}
        >
          Play Game
        </button>
      </section>
    </ThemeProvider>
  );
};

export default ModeSelect;
