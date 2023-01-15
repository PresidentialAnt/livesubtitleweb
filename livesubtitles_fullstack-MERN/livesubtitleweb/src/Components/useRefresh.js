import React, { useContext } from 'react'
import {TokenContext} from './UserControl'
import axios from '../api/axios'
const useRefresh = () => {
    const { setAccessToken }=useContext(TokenContext)

    const refreshToken = async () => {
        const response = await axios.get("/refresh", {
          withCredentials: true,
        });
        setAccessToken(response.data.accessToken);
        // console.log(response.data.accessToken)
        return response.data.accessToken;
      };

  return (
    refreshToken
  )
}

export default useRefresh