import './App.css';
import "./styles.css";
import { useState } from 'react';

import GDPRetc from './Pages/GDPRetc';
import Input from './Pages/Input.js';
import SideBar from "./Components/Burger.js";
import ManInput from './Pages/ManInput.js';
import Replay from './Pages/Replay.js';
import Record from './Pages/Record.js';
import About from './Pages/About.js';
import Settings from './Pages/Settings.js';
import Thanks from './Pages/Thanks';

function App() {
  var randomWords = require('random-words');
  
  function randomWord(){
    let tmpword=randomWords();
    tmpword=tmpword.charAt(0).toUpperCase() + tmpword.slice(1);
    return(tmpword)
  }

  const [Word, setWord]=useState(randomWord)
  const [DarkMode, setDarkMode]=useState(false)
  
  const [Page, setPage]=useState(0) /*  Page numbers:
                                        0 is GDPR/cookies
                                        1 is individual info
                                        2 is game/raw select
                                        3 is raw entry
                                        4 is audio confirmation
                                        5 is thank you page
                                        6 is game
                                        8 is settings
                                        9 is about page */
                                        
  const onClick = () => {
    setDarkMode(prevmode => !prevmode)
  }

  const nextPage = () =>{
    setPage(Page+1);
  }
  const prevPage = () =>{
    setPage(Page-1);
  }

  // theres gotta be a better way to do this, but you cant assign <SideBar aboutDir = {setPage(9)}> so good enough for now
  const settingsDir = () =>{
    setPage(8);
  }
  const aboutDir = () =>{
    setPage(9);
  }

  const recordDir = () =>{
    setPage(3);
    setWord(randomWord);
  }


  function PageSelect(Page){
    switch (Page){
      case 0:
        return <GDPRetc onClick={nextPage}/>
      case 1:
        return <Input onClick={nextPage}/>
      case 2:
        return <ManInput playGame={onClick} DarkMode={DarkMode} word={Word} rawData={nextPage}/>;
      case 3:
        return <Record onClick={nextPage} Word={Word}/>
      case 4:
        return <Replay playGame={onClick} DarkMode={DarkMode}  confirmRecording={nextPage} retakeRecording={prevPage}/>
      case 5:
        return <Thanks onClick={recordDir}/>
      case 8:
        return <Settings/>
      case 9:
        return <About/>
    }
  }
  return (
    <div className="App" onload="randomWord()">
      <SideBar pageWrapId={"page-wrap"} outerContainerId={"App"} aboutDir={aboutDir} settingsDir={settingsDir}/>

      <main id="page-wrap">
        {PageSelect(Page)}
        
      </main>

    </div>
  );
}

export default App;