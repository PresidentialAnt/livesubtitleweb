import React from "react";
import Cookies from 'universal-cookie';
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
      cookies.set('GDPRAccepted', true, { path: '/' });
      onClick();
    }
  };

  //retrieve theme, font style and font size from local storage
  const [selectedTheme, setSelectedTheme] = useState(light);
  const [font, setFont] = useState(localStorage.getItem("font") || "monospace");
  const [fontsize, setFontSize] = useState(
    localStorage.getItem("fontsize") || "18px"
  );
  const cookies = new Cookies();
  useEffect(() => {
    if (cookies.get('GDPRAccepted')){
      onClick();
    }
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
          <h2>The Cerebral Palsy Speech Collection Tool Privacy Policy</h2>
          <ThemeContainer>
            <p className="GDPR">
              The Cerebral Palsy Speech Collection Tool is part of INSERT MAIN ORGANISATION. This privacy policy will explain how our organization uses the personal data we collect from you when you use our website.
              <br></br>
              <br></br>
              <b>Topics:</b>
              <ul>
                <li>What data do we collect?</li>
                <li>How do we collect your data?</li>
                <li>How will we use your data?</li>
                <li>How do we store your data?</li>
                <li>What are your data protection rights?</li>
                <li>What are cookies?</li>
                <li>How do we use cookies?</li>
                <li>What types of cookies do we use?</li>
                <li>How to manage your cookies</li>
                <li>Privacy policies of other websites</li>
                <li>Changes to our privacy policy</li>
                <li>How to contact us</li>
                <li>How to contact the appropriate authorities</li>
              </ul>
              <br></br>
              <h3>
              What data do we collect?
              </h3>
              The Cerebral Palsy Speech Collection Tool collects the following data:
              <br></br>
              <br></br>
              <ul>
                <li>Personal identification information (Name, Gross Motor Function Classification System Level)</li>
                </ul>
              <br></br>
              <br></br>
              <h3>How do we collect your data?</h3>
              You directly provide The Cerebral Palsy Speech Collection Tool with all of the data we collect. We collect data and process data when you register online or place an order for any of our products or services.
              <br></br>
              <br></br>
              <h3>How will we use your data?</h3>
              The Cerebral Palsy Speech Collection Tool collects your data so that we can:
              <br></br>
              <br></br>
              <ul>
                <li>Process and manage your account.</li>
                <li>Provide your submitted recordings to your speech therapist.</li>
                <li>Train a live subtitling model for the speech of individuals with cerebral palsy.</li>
              </ul>
              <br></br>
              If you agree, The Cerebral Palsy Speech Collection Tool will share your data with our partner companies below so that they may offer you their products and services.
              <br></br>
              <br></br>
              <ul>
                <li>The Pace Centre</li>
                <li>INSERT ANY OTHER PARTNER COMPANIES</li>
              </ul>
              <br></br>
              <h3>How do we store your data?</h3>
              The Cerebral Palsy Speech Collection Tool securely stores your data in a MongoDB Cluster.

              The Cerebral Palsy Speech Collection Tool will keep your data indefinitely, or until you request its removal. 

              <br></br>
              <br></br>
              <h3>What are your data protection rights?</h3>
              The Cerebral Palsy Speech Collection Tool would like to make sure you are fully aware of all of your data protection rights. Every user is entitled to the following:
              <br></br>
              <br></br>
              <ul>
                <li>The right to access – You have the right to request The Cerebral Palsy Speech Collection Tool for copies of your personal data.</li>
                
                <li>The right to rectification – You have the right to request that The Cerebral Palsy Speech Collection Tool correct any information you believe is inaccurate. You also have the right to request The Cerebral Palsy Speech Collection Tool to complete the information you believe is incomplete.</li>
                
                <li>The right to erasure – You have the right to request that The Cerebral Palsy Speech Collection Tool erase your personal data.</li>
                
                <li>The right to restrict processing – You have the right to request that The Cerebral Palsy Speech Collection Tool restrict the processing of your personal data.</li>
                
                <li>The right to object to processing – You have the right to object to The Cerebral Palsy Speech Collection Tool’s processing of your personal data.</li>
                
                <li>The right to data portability – You have the right to request that The Cerebral Palsy Speech Collection Tool transfer the data that we have collected to another organization, or directly to you.</li>
              </ul>
              <br></br>
              If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us at our email: INSERT EMAIL
              <br></br>
              <br></br>
              Call us at: INSERT PHONE NUMBER
              <br></br>
              <br></br>
              Or write to us: INSERT ADDRESS
              <br></br>
              <br></br>
              <h3>Cookies</h3>
              Cookies are text files placed on your computer to collect standard Internet log information and visitor behavior information. When you visit our websites, we may collect information from you automatically through cookies or similar technology

              For further information, visit allaboutcookies.org.
              <br></br>
              <br></br>
              <h3>How do we use cookies?</h3>
              The Cerebral Palsy Speech Collection Tool uses cookies in a range of ways to improve your experience on our website, including:
              <br></br>
              <br></br>
              <ul>
                <li>Keeping you signed in</li>
                <li>Skipping some information pages you will have already seen</li>
              </ul>
              <br></br>
              <h3>What types of cookies do we use?</h3>
              There are a number of different types of cookies, however, our website uses:
              <br></br>
              <br></br>
              <ul>
                <li>Functionality – The Cerebral Palsy Speech Collection Tool uses these cookies so that we recognize you on our website and remember your previously selected preferences. These could include what fonts you prefer, or what user account is logged in.</li>
              </ul>
              <br></br>
              <h3>How to manage cookies</h3>
              You can set your browser not to accept cookies, and the above website tells you how to remove cookies from your browser. However, in a few cases, some of our website features may not function as a result.
              <br></br>
              <br></br>
              <h3>Privacy policies of other websites</h3>
              The The Cerebral Palsy Speech Collection Tool website contains links to other websites. Our privacy policy applies only to our website, so if you click on a link to another website, you should read their privacy policy.
              <br></br>
              <br></br>
              <h3>Changes to our privacy policy</h3>
              The Cerebral Palsy Speech Collection Tool keeps its privacy policy under regular review and places any updates on this web page. This privacy policy was last updated on 15 January 2023.
              <br></br>
              <br></br>
              <h3>How to contact us</h3>
              If you have any questions about The Cerebral Palsy Speech Collection Tool’s privacy policy, the data we hold on you, or you would like to exercise one of your data protection rights, please do not hesitate to contact us.
              <br></br>
              <br></br>
              Email us at: INSERT EMAIL
              <br></br>
              <br></br>
              Call us: INSERT PHONE NUMBER
              <br></br>
              <br></br>
              Or write to us at: INSERT ADDRESS
              <br></br>
              <br></br>
              <h3>How to contact the appropriate authority</h3>
              Should you wish to report a complaint or if you feel that The Cerebral Palsy Speech Collection Tool has not addressed your concern in a satisfactory manner, you may contact the Information Commissioner’s Office.
              <br></br>
              <br></br>
              Email: INSERT EMAIL
              <br></br>
              <br></br>
              Address: INSERT ADDRESS
              <br></br>
              <br></br>
            </p>
          </ThemeContainer>

          <ThemeContainer>
            <div className="confirmation">
              <label className="label">I understand and accept the privacy policy</label>
              <input className="text--input" type="checkbox" ref={checkRef} />
            </div>
          </ThemeContainer>
          <ThemeContainer>
            <input
              className="small--button white--button colored--button"
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
