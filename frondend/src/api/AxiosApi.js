import axios  from "axios";

const BASE_URL = 'https://101395302-comp-3123-assignment1-6iliazy4c-hius-projects.vercel.app'
const instance = axios.create({  
    baseURL:BASE_URL,
    timeout: 1000,
    //headers:{'Custom-Header-2':'assignment2'}
});

export default instance;