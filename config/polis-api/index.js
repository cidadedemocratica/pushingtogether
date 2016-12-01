var axios = require('axios');

settings = {

  method: 'get', // default

  baseURL: 'https://api.pol.is/api/v3',
  url: 'https://api.pol.is/api/v3',

  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'user' : process.env.POLIS_API_KEY,
    'Authorization': process.env.POLIS_AUTH_HASH 
  },

  responseType: 'json', // default

  xsrfCookieName: 'XSRF-TOKEN', // default

  xsrfHeaderName: 'X-XSRF-TOKEN', // default

  onUploadProgress: (progressEvent) => {
  },

  onDownloadProgress: (progressEvent) => {
  },

  maxContentLength: 52000,

  validateStatus: (status) => {
    return status >= 200 && status < 500; // default
  },

  maxRedirects: 5, // default

};

var instance = axios.create(settings);
module.exports = instance;
