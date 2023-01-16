import React, { useContext } from "react";
import { slide as Menu } from "react-burger-menu";
import axios from "../api/axios";
import { TokenContext } from "./UserControl";




const SideBar = ({aboutDir,settingsDir,loginDir}) => {

  const {accesstoken, setAccessToken} = useContext(TokenContext)

  const logOut = async () => {
    setAccessToken("");
    const response = await axios.get("/logout", {
      withCredentials: true,
    });
    console.log(response);
    loginDir();
  };

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

      <label className="menu-item" onClick={logOut}>
        Log Out
      </label>
    </Menu>
  );
};
export default SideBar
