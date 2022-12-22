import React from "react";
import { slide as Menu } from "react-burger-menu";

const SideBar = ({aboutDir,settingsDir}) => {
  return (
    // Pass on our props
    <Menu {...SideBar}>
      <a className="menu-item" href="/">
        Home
      </a>

      <label className="menu-item" onClick={aboutDir} >
        About
      </label>

      <label className="menu-item" onClick={settingsDir}>
        Settings
      </label>
    </Menu>
  );
};
export default SideBar
