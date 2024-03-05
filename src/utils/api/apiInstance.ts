import axios from "axios";

const apiInstance = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com/",
  timeout: 180000,
  timeoutErrorMessage: "Servis çağrısı zaman aşımına uğradı!",
});

export default apiInstance;
