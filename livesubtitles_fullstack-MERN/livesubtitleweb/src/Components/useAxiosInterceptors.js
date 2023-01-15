import React, { useContext, useEffect } from 'react'
import useRefresh from './useRefresh'
import { TokenContext } from './UserControl'
import { axiosPrivate } from '../api/axios'
const useAxiosInterceptors = () => {

    const refreshToken=useRefresh();
    const {accessToken} = useContext(TokenContext);

    useEffect(()=>{

        const requestIntercept = axiosPrivate.interceptors.request.use(
            config =>{
                if (!config.headers['authorization']){
                    config.headers['authorization'] = `Bearer ${accessToken}`
                }
                return config;
            }, (error)=>{
                Promise.reject(error)
            }
        )

        const responseIntercept = axiosPrivate.interceptors.response.use(
            response => response,
            async (error)=>{
                const prevRequest = error?.config;
                if (error?.response?.status ===403 && !prevRequest?.sent){
                    prevRequest.sent=true;
                    const newAccessToken= await refreshToken();
                    prevRequest.headers['authorization'] = `Bearer ${newAccessToken}`
                    return axiosPrivate(prevRequest); 

                }
                return Promise.reject(error);
            }
        )

        return()=>{
            axiosPrivate.interceptors.request.eject(requestIntercept)
            axiosPrivate.interceptors.response.eject(responseIntercept)
        }
    },[accessToken, refreshToken])

  return axiosPrivate
}

export default useAxiosInterceptors