import './App.css';
import "./styles.css";
import { useState } from 'react';

import GDPRetc from './Pages/GDPRetc';
import Input from './Pages/Input.js';
import SideBar from "./Components/Burger.js";
import ManInput from './Pages/ManInput.js';
import Replay from './Pages/Replay.js';
import Record from './Pages/Record';

function App() {

  const [Word, setWord]=useState("Default")
  const [DarkMode, setDarkMode]=useState(false)
  
  const [Page, setPage]=useState(0) /*  Page numbers:
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

  const nextPage = () =>{
    setPage(Page+1);
  }

  function PageSelect(Page){
    if (Page==0){
      return <GDPRetc onClick={nextPage}/>
    }else if (Page==1){
      return <Input onClick={nextPage}/>
    }else if (Page==2){
      return <ManInput playGame={onClick} DarkMode={DarkMode} word={Word} nextPage={nextPage}/>;
    }else if(Page==3){
      return <Record onClick={nextPage}/>
    }else if(Page==4){
      return <Replay playGame={onClick} DarkMode={DarkMode} word={Word} rawData={nextPage}/>
    }
  }

  return (
    <div className="App">
      <SideBar pageWrapId={"page-wrap"} outerContainerId={"App"} />

      <main id="page-wrap">
        {PageSelect(Page)}
        
      </main>

    </div>
  );
}

export default App;
