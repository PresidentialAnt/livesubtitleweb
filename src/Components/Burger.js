import React from "react";
import { slide as Menu } from "react-burger-menu";

const SideBar = ({aboutDir}) => {
  return (
    // Pass on our props
    <Menu {...aboutDir}>
      <a className="menu-item" href="/">
        Home
      </a>

      <l className="menu-item" onClick={aboutDir} >
        About
      </l>

      <l className="menu-item">
        Services
      </l>

      <a className="menu-item" href="/contact">
        Contact us
      </a>
    </Menu>
  );
};
export default SideBar
