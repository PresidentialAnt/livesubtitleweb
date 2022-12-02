import './App.css';
import "./styles.css";
import { useState } from 'react';

import SideBar from "./Components/Burger.js";
import ManInput from './Pages/ManInput.js';

function App() {

  const [Word, setWord]=useState("Default")
  const [DarkMode, setDarkMode]=useState(false)

  const onClick = () => {
    setDarkMode(prevmode => !prevmode)
  }

  return (
    <div className="App">
      <SideBar pageWrapId={"page-wrap"} outerContainerId={"App"} />

      <main id="page-wrap">
        <ManInput playGame={onClick} DarkMode={DarkMode} word={Word}/>
      </main>

    </div>
  );
}

export default App;
