import { createContext, useState } from "react";

export const TokenContext = createContext("");

export function UserProvider({children}){
    const [accessToken, setAccessToken]=useState('tbd');
    return(
        <TokenContext.Provider value={{accessToken, setAccessToken}}>
                {children}
        </TokenContext.Provider>
        
    )
}
export default UserProvider;