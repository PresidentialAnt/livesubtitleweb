import React from "react";
import { slide as Menu } from "react-burger-menu";

const SideBar = ({aboutDir,settingsDir,indinfDir}) => {
  return (
    // Pass on our props
    <Menu {...SideBar}>
      <a className="menu-item" href="/">
        Home
      </a>

      <l className="menu-item" onClick={aboutDir} >
        About
      </l>

      <l className="menu-item" onClick={settingsDir}>
        Settings
      </l>
    </Menu>
  );
};
export default SideBar
