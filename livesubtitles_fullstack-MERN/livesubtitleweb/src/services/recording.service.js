import axios, { axiosPrivate } from "../api/axios";
import useAxiosInterceptors from "../Components/useAxiosInterceptors";

// service constructed as RESTful API

class RecordingDataService {
  // static axiosPrivate = useAxiosInterceptors()
  getAll(accessToken) {
    return axios.get("/recordings", {
      headers:{
        'authorization': `Bearer ${accessToken}`
      }
    })
    .then(res => console.log(res));
  }

  get(id, accessToken) {
    return axios.get(`/recordings/${id}`, {
      headers:{
        'authorization': `Bearer ${accessToken}`
      }
    });
  }

  create(data, accessToken) {
    return axios.post("/recordings", data, {
      headers:{
        'authorization': `Bearer ${accessToken}`
      }
    })
    .then(res => console.log(res.data));
  }

  update(id, data, accessToken) {
    return axios.put(`/recordings/${id}`, data, {
      headers:{
        'authorization': `Bearer ${accessToken}`
      }
    });
  }

  delete(id, accessToken) {
    return axios.delete(`/recordings/${id}`, {
      headers:{
        'authorization': `Bearer ${accessToken}`
      }
    });
  }

  deleteAll(accessToken) {
    return axios.delete(`/recordings`, {
      headers:{
        'authorization': `Bearer ${accessToken}`
      }
    });
  }
}

export default new RecordingDataService();