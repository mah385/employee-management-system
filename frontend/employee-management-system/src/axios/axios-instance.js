import axios from "axios";

/*-------------------------------------------------------------------*/

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080",
  timeout: 600000,
  /*headers: {
       Authorization: "Bearer YOUR_ACCESS_TOKEN",
       AccessControlAllowOrigin: "*",
    },*/
});

export default axiosInstance;
