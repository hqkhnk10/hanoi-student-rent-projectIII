import axios from "axios";
import { ElMessage } from "element-plus";


axios.defaults.baseURL = 'http://localhost:5142/';
// axios.defaults.headers.common['Authorization'] = '';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.request_timeout = 60000;

const service = axios.create({
  baseURL: axios.defaults.baseURL, // `baseURL` will be prepended to `url` unless `url` is absolute.
  timeout: axios.defaults.request_timeout, // `timeout` specifies the number of milliseconds before the request times out.
  // If the request takes longer than `timeout`, the request will be aborted.
});
//REQUEST
service.interceptors.request.use(
  (config) => {
    config.headers['Authorization'] = `Bearer ${JSON.parse(localStorage.getItem('token'))}`
    // FromQuery
    if (config.method === "get" && config.params) {
      let url = config.url;
      url += "?";
      //convert to fromQueryString (for example get:/user?id=1&name=John)
      const keys = Object.keys(config.params);
      for (const key of keys) {
        if (config.params[key] !== void 0 && config.params[key] !== null) {
          url += `${key}=${encodeURIComponent(config.params[key])}&`;
        }
      }
      url = url.substring(0, url.length - 1);
      config.params = {};
      config.url = url;
    }
    return config;
  },
  (error) => {
    console.log(error); // for debug
    Promise.reject(error);
  }
);

//RESPONSE
service.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    ElMessage.error(error.message)
    return Promise.reject(error);
  }
);
export { service };
