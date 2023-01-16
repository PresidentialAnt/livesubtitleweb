import React, { useContext } from 'react'
import {TokenContext} from './UserControl'
import axios from '../api/axios'
/*Reference 2 based on https://www.youtube.com/watch?v=nI8PYZNFtac*/
const useRefresh = () => {
    const { setAccessToken }=useContext(TokenContext)

    const refreshToken = async () => {
        const response = await axios.get("/refresh", {
          withCredentials: true,
        });
        setAccessToken(response.data.accessToken);
        return response.data.accessToken;
      };

  return (
    refreshToken
  )
}

export default useRefresh