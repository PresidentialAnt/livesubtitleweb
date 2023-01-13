import { createContext, useContext, useState } from "react";
import axios from "../api/axios";
import {useToken, useSetToken, TokenContext, SetTokenContext} from './UserControl';

const useGetUsers2=async ()=>{ // Gets list of users from server. For testing connection, should be removed in release version.
    
  const accessToken= useContext(TokenContext)
  const setAccessToken=useContext(SetTokenContext)

    await axios.get('/users', {
      headers:{
        'authorization': `Bearer ${accessToken}`
      }
    }).then(res =>{
       console.log(res.data)

     })
   }

export default useGetUsers2;