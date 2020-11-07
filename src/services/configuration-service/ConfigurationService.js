import axios from 'axios';

const configuration = new Promise((res) => {
  const baseURL = process.env.PUBLIC_URL ?? '';
  axios.get(`${baseURL}/config.json`).then((response) => {
    res(response.data)
  })
});

const ConfigurationService = {
  getConfiguration() {
    return configuration;
  }
}

export default ConfigurationService;