import axios from 'axios';
import appConfig from '../utils/config.json'
import logger from './logService'

axios.interceptors.request.use((request) =>{
    request.url = appConfig.baseURL + request.url
    //modify other request parameters here if needed
    return request;
}, (error) =>{
    logger.log(error)
    alert("An unexpected error occurred.");
    return Promise.error(error);
})

axios.interceptors.response.use((response) => {
    //modify the responce if needed
    return response;
}, function(error) {
    logger.log(error)
    if(!(error.response && error.response.status >=400 && error.response.status <500))
        alert("An unexpected error occurred.")
    
    return Promise.reject(error.response);
})

export function setToken(token){
    //for calling Protected API
    axios.defaults.headers.common['x-auth-token'] = token;
}

export default {
    get:axios.get,
    post:axios.post,
    put: axios.put,
    delete: axios.delete,
    setToken
}