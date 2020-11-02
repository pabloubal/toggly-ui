import axios from 'axios';

const configuration = new Promise((res) => {
  axios.get('config.json').then((response) => {
    res(response.data)
  })
});

const ConfigurationService = {
  getConfiguration() {
    return configuration;
  }
}

export default ConfigurationService;