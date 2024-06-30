import axios from "axios";

/*-------------------------------------------------------------------*/

const empAppAxiosInstance = axios.create({
  baseURL: "http://localhost:8080",
  timeout: 300000,
  /*headers: {
      Authorization: "Bearer YOUR_ACCESS_TOKEN",
      AccessControlAllowOrigin: "*",
    },*/
});

export default empAppAxiosInstance;
