import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://matafome-api.ashyfield-34914be1.brazilsouth.azurecontainerapps.io',
   
});

export default axiosInstance;
