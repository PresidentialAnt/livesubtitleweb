import './App.css';
import "./styles.css";
import { useState } from 'react';

import SideBar from "./Components/Burger.js";
import ManInput from './Pages/ManInput.js';
import About from './Pages/About.js';
import Settings from './Pages/Settings';

function App() {

  const [Word, setWord]=useState("Default")
  const [DarkMode, setDarkMode]=useState(false)
  const [Page, setPage]=useState(2) /*  Page numbers:
                                        0 is GDPR/cookies
                                        1 is individual info
                                        2 is game/raw select
                                        3 is raw entry
                                        4 is audio confirmation
                                        5 is game
                                        8 is settings
                                        9 is about page */
                                        
  const onClick = () => {
    setDarkMode(prevmode => !prevmode)
  }

  const indinfDir = () =>{
    setPage(1);
  }
  const rawData = () =>{
    setPage(3);
  }
  const settingsDir = () =>{
    setPage(8);
  }
  const aboutDir = () =>{
    setPage(9);
  }
  function PageSelect(Page){
    switch(Page){
      case 2:
        return <ManInput playGame={onClick} DarkMode={DarkMode} word={Word} rawData={rawData}/>;
      case 3:
        return <h1>{Word}</h1>
      case 8:
        return <Settings/>
      case 9:
        return <About/>
    }
  }

  return (
    <div className="App">
      <SideBar pageWrapId={"page-wrap"} outerContainerId={"App"} aboutDir={aboutDir} settingsDir={settingsDir}/>

      <main id="page-wrap">
        {PageSelect(Page)}
        
      </main>

    </div>
  );
}

export default App;