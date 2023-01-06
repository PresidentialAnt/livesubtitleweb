import { createContext, useContext, useState } from "react";
import axios from "../api/axios";

const TokenContext = createContext();
const SetTokenContext = createContext();

export function useToken(){
    return useContext(TokenContext)
}

export function useSetToken(){
    return useContext(SetTokenContext)
}

export function UserProvider({children}){
    const [accessToken, setAccessToken]=useState('');
    return(
        <TokenContext.Provider value={accessToken}>
            <SetTokenContext.Provider value = {setAccessToken}>
                {children}
            </SetTokenContext.Provider>
        </TokenContext.Provider>
        
    )
}

export async function TokenControl(){
    const response = await axios.get('/refresh', {
      withCredentials: true
    })
    useSetToken(response.data.accessToken)
    console.log(useToken)
   }


export default UserProvider;