import React from "react";
import { useState, useEffect, useRef } from "react";
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
import { Header } from "../Components/styles/Header.styled";
import { ThemeContainer } from "../Components/styles/ThemeSwitching.styled";
const GDPRetc = ({ onClick }) => {
  const checkRef = useRef();
  const onSubmit = (e) => {
    console.log('') // For unit testing
    e.preventDefault();
    if (checkRef.current.checked) {
      onClick();
    }
  };

  //retrieve theme, font style and font size from local storage
  const [selectedTheme, setSelectedTheme] = useState(light);
  const [font, setFont] = useState(localStorage.getItem("font") || "monospace");
  const [fontsize, setFontSize] = useState(
    localStorage.getItem("fontsize") || "18px"
  );

  useEffect(() => {
    const currentTheme = JSON.parse(localStorage.getItem("current-theme"));
    if (currentTheme) {
      setSelectedTheme(currentTheme);
    }
  }, []);

  let b1style = {
    fontFamily: font,
    fontSize: fontsize,
  };

  return (
    <section className="gdpr_section">
      <ThemeProvider theme={selectedTheme}>
        <form className="input--box" onSubmit={onSubmit}>
          <GlobalStyles font={font} fontsize={fontsize} />
          <h2>GDPR</h2>
          <ThemeContainer>
            <p className="GDPR">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
              scelerisque sit amet elit non porttitor. Phasellus in enim
              rhoncus, luctus sapien eu, sodales nunc. Suspendisse potenti.
              Curabitur euismod libero lorem, viverra pretium risus rhoncus et.
              Aenean ultrices nec erat at scelerisque. Etiam accumsan neque ac
              ipsum scelerisque rutrum. Quisque sed diam faucibus, commodo
              tellus id, iaculis nunc. Vestibulum ac vehicula lacus, non
              lobortis nibh. Ut rutrum pellentesque augue nec consectetur. Sed
              eget odio mauris. Praesent imperdiet ante sit amet lacus finibus,
              eu scelerisque erat rutrum. Nunc ac libero est. Pellentesque
              scelerisque mauris scelerisque lobortis varius. Mauris finibus
              hendrerit ex eget rhoncus. Pellentesque habitant morbi tristique
              senectus et netus et malesuada fames ac turpis egestas. Donec
              scelerisque nulla libero, eget tincidunt nunc placerat sed.
              Aliquam aliquet mi in erat rutrum rhoncus. Mauris facilisis, risus
              euismod luctus rhoncus, lacus lacus condimentum nisl, sit amet
              dictum lacus tellus at mi. Morbi auctor vulputate neque, eu
              iaculis leo eleifend eget. Ut tincidunt id sapien vitae rhoncus.
              Donec eget tempor turpis. Vivamus congue justo a lorem efficitur
              dictum sed sit amet eros. Donec molestie luctus rutrum. Nulla eget
              tempor augue, eget aliquet dolor. Vestibulum fermentum nisl nulla,
              et ultrices ipsum placerat sit amet. Maecenas in felis vehicula,
              fringilla arcu condimentum, maximus leo. Quisque consectetur
              malesuada nunc et vestibulum. Aliquam aliquam dolor at laoreet
              molestie. Pellentesque congue non felis ut laoreet. Sed pretium
              vehicula consectetur. Duis lacinia elit nulla. Sed efficitur
              auctor nunc sit amet tincidunt. Vestibulum nec facilisis metus.
              Etiam in venenatis nibh. Sed condimentum ac velit sed pulvinar.
              Aliquam congue hendrerit velit non tempus. Duis tellus tortor,
              ullamcorper at tortor non, luctus accumsan ipsum. Quisque in
              laoreet purus. Donec diam nibh, finibus vitae mollis sit amet,
              tristique quis elit. Aenean interdum dolor augue, eget gravida
              augue pellentesque a. Nulla at augue ante. Suspendisse aliquam
              orci ac dignissim porttitor. Donec hendrerit magna eget diam
              viverra tempor quis vitae arcu. Proin fermentum egestas diam, a
              vestibulum quam condimentum non. Aliquam consectetur feugiat
              ligula ut vestibulum. Pellentesque cursus enim felis, sit amet
              condimentum sem tempor eu. Duis et condimentum ante, ut dignissim
              ex. Phasellus in cursus eros. Nunc vel purus ac odio posuere
              mollis at sed elit. Vestibulum nisi orci, ullamcorper vel
              fermentum eget, tempor ac odio. Integer vulputate erat vel congue
              posuere. Sed placerat nunc sit amet odio scelerisque, sit amet
              venenatis ante viverra. Praesent eu ornare nulla. Nam at nisi vel
              orci convallis sollicitudin nec porttitor augue. Nulla sit amet
              arcu neque. Vivamus rutrum orci massa, in auctor urna semper ac.
              Donec laoreet ipsum eget laoreet elementum. Aliquam lobortis dolor
              nec gravida imperdiet. In feugiat vitae turpis sit amet elementum.
              Nunc tincidunt nisl a sem bibendum scelerisque. Cras eget
              facilisis nibh. Nulla suscipit ut nisi sed molestie. Mauris porta,
              enim ut dictum scelerisque, tortor lacus ullamcorper massa, nec
              laoreet purus odio eu orci. Quisque non turpis turpis. Maecenas
              sed mi a urna luctus porta quis ac mi. Vivamus fringilla tortor
              non massa egestas, quis iaculis nulla malesuada. Pellentesque eget
              odio volutpat, eleifend est at, cursus neque. Pellentesque iaculis
              facilisis massa, in rutrum risus tincidunt id. Nullam vehicula
              tellus eget velit porta consectetur.
            </p>
          </ThemeContainer>

          <ThemeContainer>
            <div className="confirmation">
              <label className="label">I understand and consent</label>
              <input className="text--input" type="checkbox" ref={checkRef} />
            </div>
          </ThemeContainer>
          <ThemeContainer>
            <input
              className="small--button"
              type="submit"
              value="next"
              style={b1style}
            />
          </ThemeContainer>
        </form>
      </ThemeProvider>
    </section>
  );
};

export default GDPRetc;
