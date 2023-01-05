import React from 'react'
import { useState } from 'react'
import axios from '../api/axios'
import UserControl from './UserControl'


  const TokenControl= async ()=>{
    const response = await axios.get('/refresh', {
      withCredentials: true
    })
    UserControl.setAccessToken(response.data.accessToken)
    console.log(UserControl.accessToken)
   }

export default TokenControl