import axios from "../api/axios";
// service constructed as RESTful API 
class RecordingDataService {
  getAll() {
    return axios.get("/recordings")
    .then(res => console.log(res));
  }

  get(id) {
    return axios.get(`/recordings/${id}`);
  }

  create(data) {
    return axios.post("/recordings", data)
    .then(res => console.log(res.data));
  }

  update(id, data) {
    return axios.put(`/recordings/${id}`, data);
  }

  delete(id) {
    return axios.delete(`/recordings/${id}`);
  }

  deleteAll() {
    return axios.delete(`/recordings`);
  }
}

export default new RecordingDataService();