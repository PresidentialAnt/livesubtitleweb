import { createContext, useState } from "react";

// const tokenContext = createContext({});

export const UserControl = () => {
    const [accessToken, setAccessToken]=useState();
    return [accessToken, setAccessToken]
}

export default UserControl;