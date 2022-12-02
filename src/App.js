import './App.css';
import "./styles.css";
import { useState } from 'react';

import SideBar from "./Components/Burger.js";
import ManInput from './Pages/ManInput.js';

function App() {

  const [Word, setWord]=useState("Default")
  const [DarkMode, setDarkMode]=useState(false)
  const [Page, setPage]=useState(1)

  const onClick = () => {
    setDarkMode(prevmode => !prevmode)
  }

  function PageSelect(Page){
    if (Page==1){
      return <ManInput playGame={onClick} DarkMode={DarkMode} word={Word}/>;
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
