import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";
import SideBar from "./Burger";

function App() {
  return (
    <div id="App">
      <SideBar pageWrapId={"page-wrap"} outerContainerId={"App"} />

      <div id="page-wrap">
        <h1>Hallo</h1>
      </div>
    </div>
  );
}

export default App;