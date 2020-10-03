import axios from 'axios';

const BASE_URL = "http://localhost:4000/api";

const FeatureToggleService = {
  getAll() {
    return new Promise((res) => {
      axios.get(`${BASE_URL}/features`).then((response) => {
        res(response.data)
      });
    })
  },

  findOne(id) {
    return new Promise((res) => {
      axios.get(`${BASE_URL}/features/${id}`).then((response) => {
        res(response.data)
      });
    })
  },

  create(toggle) {
    return new Promise((res) => {
      axios.post(`${BASE_URL}/features`, toggle).then((response) => {
        res(response.data)
      });
    })
  },

  update(toggle) {
    return new Promise((res) => {
      axios.put(`${BASE_URL}/features/${toggle.id}`, toggle).then((response) => {
        res(response.data)
      });
    })
  },

  delete(toggle) {
    return new Promise((res, rej) => {
      axios.delete(`${BASE_URL}/features/${toggle.id}`).then((response) => {
        res(response.data)
      }).catch(error => rej(error));
    })
  },
  

  
}

export default FeatureToggleService;