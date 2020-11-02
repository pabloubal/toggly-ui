import axios from 'axios';
import ConfigurationService from '../configuration-service/ConfigurationService';

const FeatureToggleService = {
  getAll() {
    return new Promise((res) => {
      ConfigurationService.getConfiguration().then((config) => {
        axios.get(`${config.controllerUrl}/features`).then((response) => {
          res(response.data)
        });
      })

    })
  },

  findOne(id) {
    return new Promise((res) => {
      ConfigurationService.getConfiguration().then((config) => {
        axios.get(`${config.controllerUrl}/features/${id}`).then((response) => {
          res(response.data)
        });
      })
    })
  },

  create(toggle) {
    return new Promise((res, rej) => {
      ConfigurationService.getConfiguration().then((config) => {
        axios.post(`${config.controllerUrl}/features`, toggle)
          .then((response) => {
            res(response.data)
          })
          .catch((error) => rej(error));
      })
    })
  },

  update(toggle) {
    return new Promise((res, rej) => {
      ConfigurationService.getConfiguration().then((config) => {
        axios.put(`${config.controllerUrl}/features/${toggle.id}`, toggle)
          .then((response) => {
            res(response.data)
          })
          .catch((error) => rej(error));
      })
    })
  },

  delete(toggle) {
    return new Promise((res, rej) => {
      ConfigurationService.getConfiguration().then((config) => {
        axios.delete(`${config.controllerUrl}/features/${toggle.id}`)
          .then((response) => {
            res(response.data)
          })
          .catch(error => rej(error));
      })
    })
  },



}

export default FeatureToggleService;