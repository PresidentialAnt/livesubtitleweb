import { createContext, useState } from "react";

export const TokenContext = createContext(""); // Had to set a default value to not get an error with context?

export function UserProvider({children}){
    const [accessToken, setAccessToken]=useState('tbd');
    return(
        <TokenContext.Provider value={{accessToken, setAccessToken}}>
                {children}
        </TokenContext.Provider>
        
    )
}
export default UserProvider;