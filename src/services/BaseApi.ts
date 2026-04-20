import axios from 'axios';


export const api = axios.create({
    baseURL:"https://dashboard-api-42wq.onrender.com/",
    timeout:5000,
}
)
