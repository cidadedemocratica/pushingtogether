var axios = require('axios');

console.log('-------------------------------------------------------------------------------------------------------');
console.log(process.env.POLIS_API_KEY);
console.log(process.env.PT_PORT);

settings = {

  method: 'get', // default

  baseUrl: 'https://api.pol.is/api/v3',
  url: 'https://api.pol.is/api/v3',

  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'user' : process.env.POLIS_API_KEY
  },

  responseType: 'json', // default

  xsrfCookieName: 'XSRF-TOKEN', // default

  xsrfHeaderName: 'X-XSRF-TOKEN', // default

  onUploadProgress: (progressEvent) => {
  },

  onDownloadProgress: (progressEvent) => {
  },

  maxContentLength: 2000,

  validateStatus: (status) => {
    return status >= 200 && status < 500; // default
  },

  maxRedirects: 5, // default

};

var instance = axios.create(settings);
module.exports = instance;
