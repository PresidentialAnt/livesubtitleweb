import axios from "axios";

const baseURL='http://localhost:5000'

export default axios.create({
    baseURL: baseURL
})
/*Reference 2 taken from https://www.youtube.com/watch?v=nI8PYZNFtac*/
export const axiosPrivate= axios.create({
    baseURL: baseURL,
    withCredentials: true
})